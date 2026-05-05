export function downloadText(filename: string, content: string, type = "application/json") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportJson(filename: string, data: unknown) {
  downloadText(filename, JSON.stringify(data, null, 2));
}

export function exportCsv(filename: string, rows: string[][]) {
  downloadText(filename, rows.map((row) => row.join(",")).join("\n"), "text/csv");
}
