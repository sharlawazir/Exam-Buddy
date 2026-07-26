import { type ReactNode } from 'react';

/**
 * Minimal markdown renderer tuned for Exam Buddy AI responses.
 * Supports: ## headings, **bold**, *italic*, `code`, - / * bullets,
 * 1. numbered lists, and paragraphs. Intentionally small — no deps.
 */
export function Markdown({ text, className = '' }: { text: string; className?: string }) {
  const blocks = parseBlocks(text);
  return <div className={`prose-buddy ${className}`}>{blocks.map((b, i) => renderBlock(b, i))}</div>;
}

type Block =
  | { type: 'heading'; level: number; content: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; content: string };

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Heading
    const h = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length, content: h[2] });
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }

    // Paragraph (collect consecutive non-empty, non-list, non-heading lines)
    const paraLines: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'paragraph', content: paraLines.join(' ') });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Tokenize **bold**, *italic*, `code`
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[2] !== undefined) {
      nodes.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      nodes.push(
        <code key={key++} className="rounded bg-ink-100 dark:bg-ink-800 px-1 py-0.5 text-[0.85em] font-mono text-accent-700 dark:text-accent-300">
          {match[4]}
        </code>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderBlock(b: Block, i: number): ReactNode {
  if (b.type === 'heading') {
    return <h2 key={i}>{renderInline(b.content)}</h2>;
  }
  if (b.type === 'paragraph') {
    return <p key={i}>{renderInline(b.content)}</p>;
  }
  if (b.type === 'list') {
    const items = b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>);
    return b.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>;
  }
  return null;
}
