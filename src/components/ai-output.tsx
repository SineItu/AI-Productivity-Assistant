import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AiOutput({ text }: { text: string }) {
  return (
    <div className="text-sm text-foreground/80 leading-relaxed space-y-4 [&_h2]:text-xs [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:text-muted-foreground [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_strong]:text-foreground [&_table]:w-full [&_table]:text-xs [&_th]:text-left [&_th]:font-semibold [&_th]:text-muted-foreground [&_th]:py-2 [&_th]:pr-4 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_tr]:border-b [&_tr]:border-border [&_code]:text-xs">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}
