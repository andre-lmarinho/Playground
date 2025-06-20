/*
    hello.c — overengineered Hello World in C
    featuring pointer/memory antics, JIT shellcode, and manual syscalls.
    Simplified stub to return via ret for portability.
    Cross-platform support: Linux (mmap + syscall) and Windows (VirtualAlloc + WriteFile).

    Build (Linux):   gcc -std=c11 -O2 -Wall -Wextra -o hello hello.c
    Build (Windows): gcc -std=c11 -O2 -Wall -Wextra -o hello.exe hello.c

    Run: ./hello    (Linux)
        hello.exe  (Windows)
*/

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32
#include <windows.h>
// Define POSIX prot/flags stubs for Windows
#define PROT_READ   0
#define PROT_WRITE  0
#define PROT_EXEC   0
#define MAP_PRIVATE 0
#define MAP_ANON    0
// mmap wrapper
static void *mmap(void *addr, size_t length, int prot, int flags, int fd, size_t offset) {
    (void)addr; (void)prot; (void)flags; (void)fd; (void)offset;
    return VirtualAlloc(NULL, length, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
}
static int munmap(void *addr, size_t length) {
    (void)length;
    return VirtualFree(addr, 0, MEM_RELEASE) ? 0 : -1;
}
#else
#include <sys/mman.h> // POSIX memory mapping
#endif

// 1. Obfuscated message encoding using Fibonacci offsets
static const uint8_t fibs[] = {0,1,1,2,3,5,8,13,21,34,55};
#define FIB(n) fibs[(n)]
#define ENC(c) ((c) + FIB((__COUNTER__ % 10) + 1))

// 2. Build encoded "Hello, world!\n" via macros
#define H     ENC('H')
#define e     ENC('e')
#define l     ENC('l')
#define o     ENC('o')
#define comma ENC(',')
#define sp    ENC(' ')
#define w     ENC('w')
#define r     ENC('r')
#define d     ENC('d')
#define excl  ENC('!')
#define nl    ENC('\n')

// // // // // // // // // // // // // // // 

// pre-computed offsets for each character
static uint8_t encoded[15];  // just reserve space

void init_encoded(void) {
    // use the same ENC(...) logic, but in a function body
    encoded[0]  = 'H' + FIB(1);
    encoded[1]  = 'e' + FIB(2);
    // … fill all 14 entries …
    encoded[14] = 0;
}

// // // // // // // // // // // // 

// Decode message forward into dynamically allocated buffer using pointer arithmetic
static size_t decode_message(uint8_t **out_msg) {
    size_t len = sizeof(encoded) - 1;
    uint8_t *buf = malloc(len + 1);
    if (!buf) { perror("malloc"); exit(EXIT_FAILURE); }
    // Use pointer to write sequentially
    uint8_t *dst = buf;
    for (const uint8_t *src = encoded; *src; ++src) {
        *dst++ = *src - FIB(((src - encoded) % 10) + 1);
    }
    *dst = '\0';
    *out_msg = buf;
    return len;
}

// Emit x86-64 shellcode: write(1, msg_ptr, msg_len) then ret
static void build_shellcode(uint8_t *code, uint8_t *msg_ptr, uint32_t msg_len) {
    const uint8_t stub[] = {
        0xB8,0x01,0x00,0x00,0x00,      // mov eax,1
        0xBF,0x01,0x00,0x00,0x00,      // mov edi,1
        0x48,0xBE,0,0,0,0,0,0,0,0,     // mov rsi,msg_ptr
        0xBA,0,0,0,0,                  // mov edx,msg_len
        0x0F,0x05,                     // syscall
        0xC3                           // ret
    };
    memcpy(code, stub, sizeof(stub));
    *(uint64_t*)(code + 10) = (uint64_t)msg_ptr;
    *(uint32_t*)(code + 20) = msg_len;
}

int main(void) {

    init_encoded();           // now it's a true runtime assignment

    // Allocate RWX memory
    uint8_t *code = mmap(NULL, 4096,
        PROT_READ | PROT_WRITE | PROT_EXEC,
        MAP_PRIVATE | MAP_ANON, -1, 0);
    if (!code) { perror("mmap"); return 1; }

    uint8_t *message;
    uint32_t length = (uint32_t)decode_message(&message);
    // Build shellcode stub
    build_shellcode(code, message, length);
    // Copy message after stub for demonstration (unused by stub)
    memcpy(code + 64, message, length + 1);

#ifdef _WIN32
    // On Windows, use WriteFile for output
    DWORD written;
    HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
    if (h != INVALID_HANDLE_VALUE) {
        WriteFile(h, message, length, &written, NULL);
    }
#else
    // On Linux, execute JIT stub (syscall write)
    ((void(*)())code)();
#endif

    free(message);
    munmap(code, 4096);
    return 0;
}
