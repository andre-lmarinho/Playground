// Overengineered Hello World Flow

BEGIN main
    // 1. Allocate executable memory
    IF running_on_Windows THEN
        CALL VirtualAlloc to reserve RWX buffer
    ELSE
        CALL mmap to reserve RWX buffer
    ENDIF
    IF allocation_failed THEN
        PRINT error and EXIT(1)
    ENDIF

    // 2. Decode hidden message
    CALL decode_message(OUT message_ptr, OUT message_length)

    // 3. Build runtime shellcode stub
    CALL build_shellcode(buffer_ptr=code_buffer,
        msg_ptr=message_ptr,
        msg_len=message_length)

    // 4. (Optional) Copy decoded message after stub for inspection
    MEMCOPY(destination=code_buffer+stub_size,
            source=message_ptr,
            size=message_length+1)

    // 5. Execute or print message
    IF running_on_Windows THEN
        HANDLE = GetStdHandle(STD_OUTPUT_HANDLE)
        IF HANDLE valid THEN
            CALL WriteFile(HANDLE, message_ptr, message_length)
        ENDIF
    ELSE
        CAST code_buffer to function pointer and CALL it
        // stub performs syscall write(1, msg_ptr, msg_len)
    ENDIF

    // 6. Cleanup
    FREE(message_ptr)
    IF running_on_Windows THEN
        CALL VirtualFree on code_buffer
    ELSE
        CALL munmap on code_buffer
    ENDIF
    RETURN 0
END main

// Helper: decode_message
FUNCTION decode_message(OUT msg_ptr, OUT msg_len)
    msg_len = LENGTH(encoded_array)
    ALLOCATE buffer of size msg_len + 1
    dst = buffer
    FOR each byte in encoded_array DO
        decoded_byte = byte - Fibonacci_offset
        STORE decoded_byte at *dst
        INCREMENT dst
    ENDFOR
    STORE '\0' at *dst
    msg_ptr = buffer
    RETURN
END FUNCTION

// Helper: build_shellcode
FUNCTION build_shellcode(code_ptr, msg_ptr, msg_len)
    DEFINE stub_bytes[] with machine instructions:
        mov eax,1
        mov edi,1
        mov rsi,msg_ptr
        mov edx,msg_len
        syscall
        ret
    COPY stub_bytes into code_ptr
    PATCH code_ptr at offset for msg_ptr
    PATCH code_ptr at offset for msg_len
END FUNCTION