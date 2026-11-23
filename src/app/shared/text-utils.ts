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

const htmlEscapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const parentPlaceholder = (role: 'Sire' | 'Dam'): string =>
  [
    `${role}: (Link to Tokotna Import page)`,
    `Owner Approval: (Leave blank if you are the owner)`,
    `${role}'s Hereditary Mutations/Traits/Breeding Companions:`,
  ].join('\n');

export const formatParentBlock = (
  rawText: string,
  role: 'Sire' | 'Dam',
  isPlaceholder = false,
): string[] => {
  const labels = [
    `${role}:`,
    `Owner Approval:`,
    `${role}'s Hereditary Mutations/Traits/Breeding Companions:`,
  ];

  return rawText.split('\n').map((line) => {
    const trimmed = line.trim();
    const matchedLabel = labels.find((label) =>
      trimmed.toLowerCase().startsWith(label.toLowerCase()),
    );

    if (matchedLabel) {
      const rest = trimmed.slice(matchedLabel.length).trim();
      const cleanLabel = trimmed.slice(0, matchedLabel.length);

      if (isPlaceholder) {
        const formatted = rest ? `**${cleanLabel}** ${rest}` : `**${cleanLabel}**`;
        return `<span class="text-danger">${formatted}</span>`;
      }

      const escapedLabel = escapeBasic(cleanLabel);
      let escapedRest = escapeKeepLinks(rest);

      if (
        matchedLabel.toLowerCase() === 'owner approval:' &&
        escapedRest.toLowerCase() === '(leave blank if you are the owner)'
      ) {
        escapedRest = `<span class="text-danger">${escapedRest}</span>`;
      }

      return escapedRest ? `**${escapedLabel}** ${escapedRest}` : `**${escapedLabel}**`;
    }

    return isPlaceholder
      ? `<span class="text-danger">${line}</span>`
      : escapeKeepLinks(line);
  });
};





export const escapeBasic = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => htmlEscapeMap[c] ?? c);

const escapeKeepLinks = (text: string): string =>
  text
    .split(/(<a\s+href=["'][^"']+["'][^>]*>[^<]+<\/a>)/gi)
    .map((part) =>
      /^<a\s+href=["'][^"']+["'][^>]*>[^<]+<\/a>$/i.test(part)
        ? part
        : escapeBasic(part),
    )
    .join('');

