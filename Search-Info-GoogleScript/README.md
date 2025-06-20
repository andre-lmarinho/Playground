# Workana Project Fetcher · Google Sheets + Apps Script

Este script automatiza a leitura de **status** e **título** de projetos da Workana a partir de URLs coladas em uma planilha do Google Sheets.

## 🧩 O que ele faz

- Lê as URLs coladas na **coluna D** da planilha.
- Preenche automaticamente:
  - **Coluna E** com o status do projeto (`Aberto`, `Encerrado`, etc.)
  - **Coluna F** com o título do projeto.
- Usa um **gatilho `onEdit`** para atualizar os dados sempre que uma URL nova for inserida ou editada.

## ⚙️ Como funciona

1. A função `fetchPartial(url, kb)` baixa só os primeiros KBs do HTML para economizar requisições.
2. A `buscarStatusWorkana(url)` usa regex para capturar o status do projeto.
3. A `buscarTituloWorkana(url)` busca o `<h1>` com a classe `"h3 title"` para extrair o título.
4. A `atualizarWorkana()` varre todas as URLs da planilha e atualiza em lote.
5. O `onEdit(e)` é o gatilho que detecta edições na coluna D e atualiza as colunas ao lado.

## 🧪 Exemplo de uso

| D (URL)                                | E (Status)      | F (Título)                        |
|----------------------------------------|------------------|-----------------------------------|
| https://www.workana.com/job/exemplo-1 | Aberto           | Criar site institucional moderno  |
| https://www.workana.com/job/exemplo-2 | Projeto Encerrado| Título não encontrado             |

## 📌 Observações

- O regex depende da estrutura atual da Workana. Mudanças no site podem exigir ajustes.
- Evite colar muitas URLs de uma vez para não ultrapassar limites do Apps Script.


## ⚠️ Configuração necessária
Para que o script funcione automaticamente ao editar a planilha, você precisa adicionar um gatilho de edição manualmente no Google Apps Script:

1. No menu do seu Google Sheets: Extensões → Apps Script
2. No editor que abrir, vá em: Relógio (ícone de gatilhos) → Adicionar gatilho
3. Configure assim:
- Função a ser executada: onEdit
- Evento: Ao editar uma planilha
- Tipo de acionador: Acionador simples (onEdit)

Salve e feche. Pronto!

Agora, ao colar ou editar uma URL na coluna D, o script atualizará automaticamente status (E) e título (F).

## ✅ Sugestão de melhorias futuras

- Armazenar cache em planilha oculta para evitar repetições.
- Adicionar botão para atualização manual.
- Logar erros de resposta HTTP ou HTML malformado.

---

> Script simples, útil e direto ao ponto para quem prospecta ou monitora projetos na Workana via planilha.

