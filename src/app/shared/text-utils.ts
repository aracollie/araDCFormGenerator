export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"'*\[\]]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '*': '&#42;',
      '[': '&#91;',
      ']': '&#93;',
    };
    return entities[character];
  });
