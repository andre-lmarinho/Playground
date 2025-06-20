function fetchPartial(url, kb) {
  return UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    headers: { Range: 'bytes=0-'+(kb*1024-1) }
  }).getContentText();
}

function buscarStatusWorkana(url) {
  const html = fetchPartial(url, 3); // só 3 KB em vez de página inteira
  const m = html.match(/<span\s+class="pry label rounded[^"]*">([^<]+)<\/span>/i);
  return m ? m[1].trim() : "Projeto Encerrado";
}

function buscarTituloWorkana(url) {
  // Busca todo o HTML
  const html = UrlFetchApp.fetch(url, {muteHttpExceptions: true}).getContentText();
  // Regex para capturar o texto da tag h1 (classe h3 title)
  const match = html.match(/<h[1-6][^>]*class="h3 title"[^>]*>([^<]+)<\/h[1-6]>/);
  return match && match[1]
    ? match[1].trim()
    : "Título não encontrado";
}

function atualizarWorkana() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();            // ou getSheetByName("NomeDaAba")
  const urls  = sheet.getRange("D2:D"+sheet.getLastRow()).getValues();
  
  // Pré-aloca ranges de escrita
  const statusRange = sheet.getRange("E2:E"+sheet.getLastRow());
  const titleRange  = sheet.getRange("F2:F"+sheet.getLastRow());
  const statuses = [], titles = [];
  
  urls.forEach(row => {
    const url = row[0];
    if (url) {
      statuses.push([ buscarStatusWorkana(url) ]);
      titles.push( [ buscarTituloWorkana(url) ] );
    } else {
      statuses.push([""]);
      titles.push ([""]);
    }
  });
  
  statusRange.setValues(statuses);
  titleRange.setValues(titles);
}

/**
 * Gatilho que dispara toda vez que algo muda na planilha.
 * Se a edição foi na coluna D (URL), busca status e título
 * na mesma linha, colunas E e F.
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  // Opcional: limitar a uma aba específica
  // if (sheet.getName() !== 'NomeDaSuaAba') return;
  
  // Coluna D = 4, linhas de dados começam em 2
  if (range.getColumn() === 4 && range.getRow() >= 2) {
    const url = e.value || '';
    const row = range.getRow();
    const statusCell = sheet.getRange(row, 5); // coluna E
    const titleCell  = sheet.getRange(row, 6); // coluna F
    
    if (url) {
      // chama as suas funções já criadas
      const status = buscarStatusWorkana(url);
      const titulo = buscarTituloWorkana(url);
      statusCell.setValue(status);
      titleCell.setValue(titulo);
    } else {
      // se apagou a URL, limpa status e título
      statusCell.clearContent();
      titleCell.clearContent();
    }
  }
}