// Small, local fuzzy matcher: accents, punctuation, word order, and common typos.
// Every query word must match; one-letter queries never receive typo expansion.
globalThis.GuideSearch = (() => {
  function normalize(value = '') {
    return String(value).toLowerCase().normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['ʻ’‘ʼ]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  function distance(a, b) {
    const rows = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) rows[i][0] = i;
    for (let j = 0; j <= b.length; j++) rows[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1]));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
      }
    }
    return rows[a.length][b.length];
  }

  function score(query, ...fields) {
    const q = normalize(query);
    if (!q) return 0;
    const normalized = fields.flat().map(normalize).filter(Boolean);
    const words = normalized.flatMap(field => field.split(' '));
    let total = 0;
    for (const token of q.split(' ')) {
      let best = Infinity;
      for (const word of words) {
        if (word === token) { best = 0; break; }
        if (token.length >= 2 && word.startsWith(token)) best = Math.min(best, 1);
        if (token.length >= 3 && word.includes(token)) best = Math.min(best, 2);
        const maxEdits = token.length >= 7 ? 2 : token.length >= 4 ? 1 : 0;
        if (maxEdits && Math.abs(word.length - token.length) <= maxEdits) {
          const edits = distance(token, word);
          if (edits <= maxEdits) best = Math.min(best, 3 + edits);
        }
      }
      if (!Number.isFinite(best)) return Infinity;
      total += best;
    }
    // Exact phrases win ties; callers preserve chronological order for schedules.
    return total + (normalized.some(field => field.includes(q)) ? 0 : 0.25);
  }
  return { normalize, score };
})();
