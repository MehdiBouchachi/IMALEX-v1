// app/blogs/[slug]/Inline.js
// NOTE: no "use client"

export default function Inline({ text = "" }) {
  return <>{parseInline(String(text))}</>;
}

/** Very small inline Markdown parser:
 *  **bold**  __bold__  *italic*  _italic_  `code`
 *  [label](https://...) or (/relative)
 */
function parseInline(src) {
  const out = [];
  let i = 0;
  const re =
    /\*\*(.+?)\*\*|__(.+?)__|\*(.+?)\*|_(.+?)_|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g;

  let m;
  while ((m = re.exec(src))) {
    if (m.index > i) out.push(src.slice(i, m.index));

    if (m[1] || m[2])
      out.push(<strong key={out.length}>{m[1] || m[2]}</strong>);
    else if (m[3] || m[4]) out.push(<em key={out.length}>{m[3] || m[4]}</em>);
    else if (m[5]) out.push(<code key={out.length}>{m[5]}</code>);
    else if (m[6] && m[7]) {
      const href = m[7];
      out.push(
        <a key={out.length} href={href} rel="nofollow">
          {m[6]}
        </a>
      );
    }

    i = re.lastIndex;
  }
  if (i < src.length) out.push(src.slice(i));
  return out;
}
