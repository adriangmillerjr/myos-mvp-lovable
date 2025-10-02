import React, { useMemo, useState } from "react";
import { Copy, Check, Bot, User } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { timeHM } from "@/utils/format";

export interface ChatMessageData {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
}

function parseCodeBlock(text: string) {
  const match = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return null;
  return { lang: match[1] || "text", code: match[2] };
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  const block = useMemo(() => parseCodeBlock(message.content), [message.content]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block ? block.code : message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className={"group/message flex gap-3 " + (isUser ? "flex-row-reverse" : "")} role="listitem" aria-live="polite">
      <div className={"mt-0.5 shrink-0 h-8 w-8 rounded-full border border-border overflow-hidden grid place-items-center " + (isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={"max-w-2xl " + (isUser ? "text-right" : "text-left")}>
        <div className={
          "relative rounded-2xl border border-border px-4 py-3 text-sm leading-relaxed shadow-sm transition-shadow " +
          (isUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:shadow-md")
        }>
          {block ? (
            <div className="relative overflow-hidden rounded-lg border border-border/60 bg-background/50">
              <SyntaxHighlighter language={block.lang} style={oneLight} customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}>
                {block.code}
              </SyntaxHighlighter>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1 rounded-md border bg-background/80 backdrop-blur text-muted-foreground opacity-0 group-hover/message:opacity-100 transition-opacity"
                aria-label="Copy code"
                title="Copy code"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          )}
          {!block && (
            <button
              onClick={handleCopy}
              className="absolute -top-2 -right-2 p-1 rounded-md border bg-background/80 backdrop-blur text-muted-foreground opacity-0 group-hover/message:opacity-100 transition-opacity"
              aria-label="Copy message"
              title="Copy message"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
        <div className={"mt-1 text-xs text-muted-foreground " + (isUser ? "" : "")}>
          {timeHM(message.createdAt || Date.now())}
        </div>
      </div>
    </div>
  );
}
