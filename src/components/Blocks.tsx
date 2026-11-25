import { Icon } from "@/components/ui/Icon";
import type { Block } from "@/lib/types";

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="reading space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={headingId(block.text)}
              className="anchor pt-6 font-display text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "note") {
          return (
            <aside
              key={index}
              className="flex gap-4 rounded-2xl border border-gold/30 bg-gold/6 px-5 py-4 text-base leading-relaxed text-fg"
            >
              <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{block.text}</span>
            </aside>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
