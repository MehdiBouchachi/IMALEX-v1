"use client";

/** Minimal inline formatter:
 *  - **bold**, _italic_, `code`, [label](url)
 *  - allows <strong>/<b>, <em>/<i>, <code> if they appear in the text
 *  - everything else is escaped for safety
 */
export default function Inline({ text = "" }) {
  const html = toHTML(String(text));
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function toHTML(src) {
  // 1) Escape everything
  let s = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2) Allow a tiny whitelist of raw HTML tags
  s = s.replace(/&lt;(\/?)(strong|b|em|i|code)&gt;/g, "<$1$2>");

  // 3) Markdown-like transforms (simple & safe)
  // Links: [text](url) (http(s) or /relative)
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g,
    '<a href="$2" rel="nofollow">$1</a>'
  );
  // Inline code: `code`
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold: **text** or __text__
  s = s.replace(/(\*\*|__)(.+?)\1/g, "<strong>$2</strong>");
  // Italic: *text* or _text_ (kept simple)
  s = s.replace(/(\*|_)([^*_]+?)\1/g, "<em>$2</em>");

  return s;
}
