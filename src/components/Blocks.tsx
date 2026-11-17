import type { Block } from "@/lib/types";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-4 font-serif text-3xl leading-tight">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
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
              className="border-l-4 border-gold bg-foam px-4 py-3 text-base leading-relaxed"
            >
              {block.text}
            </aside>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
