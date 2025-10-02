import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatSidebar } from "@/components/sidebar/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Plus, Trash2 } from "lucide-react";
import type { ChatListItem } from "@/components/sidebar/ChatSidebar";
export interface Message { id: string; role: "user"|"assistant"|"system"; content: string; createdAt: string; }
export interface ChatInterfaceProps { userName?: string; onNewChat?:()=>void; onClearChat?:()=>void; onSend?:(content:string)=>Promise<Message|void>; initialMessages?: Message[]; chats?: ChatListItem[]; onSelectChat?:(id?:string)=>void; activeChatId?: string; }
export function ChatInterface({userName,onNewChat,onClearChat,onSend,initialMessages=[],chats=[],onSelectChat,activeChatId}:ChatInterfaceProps){
  const [messages,setMessages]=useState<Message[]>(initialMessages);
  const [input,setInput]=useState(''); const [isSending,setIsSending]=useState(false); const scrollerRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=scrollerRef.current;if(el) el.scrollTo({top:el.scrollHeight,behavior:'smooth'});},[messages,isSending]);
  async function handleSend(){ if(!input.trim()||isSending) return; const userMsg:Message={id:String(Date.now()),role:'user',content:input.trim(),createdAt:new Date().toISOString()}; setMessages(p=>[...p,userMsg]); setInput(''); setIsSending(true);
    try{ if(onSend){ const res=await onSend(userMsg.content); if(res) setMessages(p=>[...p,res]); } else { const demo:Message={id:String(Date.now()+1),role:'assistant',content:"Here is a code example:\n\n```ts\nconsole.log('Hello from MyOS MVP');\n```",createdAt:new Date().toISOString()}; await new Promise(r=>setTimeout(r,600)); setMessages(p=>[...p,demo]); } } finally{ setIsSending(false);} }
  function key(e:React.KeyboardEvent<HTMLInputElement>){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); handleSend(); }}
  return (<div className="flex h-full min-h-[100vh] w-full bg-background text-foreground">
    <aside className="hidden md:block w-72 border-r border-border"><ChatSidebar chats={chats} onCreateChat={onNewChat} onSelectChat={onSelectChat} activeId={activeChatId}/></aside>
    <main className="flex-1 flex flex-col">
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/><span className="font-medium">Chat</span></div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClearChat} aria-label="Clear chat"><Trash2 className="h-4 w-4 mr-1"/> Clear</Button>
            <Button variant="default" size="sm" onClick={onNewChat} aria-label="New chat"><Plus className="h-4 w-4 mr-1"/> New</Button>
          </div>
        </div>
      </div>
      <div className="flex-1"><ScrollArea className="h-full">
        <div ref={scrollerRef} className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length===0 && (<div className="text-center py-16 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-sm"><Sparkles className="h-8 w-8 text-primary"/></div>
            <h2 className="text-xl font-semibold mb-1">How can we help, {userName||'friend'}?</h2>
            <p className="text-sm text-muted-foreground">Ask anything. Enter to send • Shift+Enter for newline.</p>
          </div>)}
          {messages.map(m=>(<div key={m.id} className="animate-in fade-in slide-in-from-bottom-1 duration-200"><ChatMessage message={m}/></div>))}
          {isSending && (<div className="flex gap-3"><div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mt-1"><Sparkles className="h-4 w-4 text-primary animate-pulse"/></div>
            <div className="rounded-lg px-4 py-3 bg-muted border border-border"><div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200"></span>
            </div></div></div>)}
        </div></ScrollArea></div>
      <div className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={key} placeholder="Message MyOS..." className="min-h-[44px]" aria-label="Chat input"/>
            <Button onClick={handleSend} disabled={isSending||!input.trim()} aria-label="Send message" className="w-12"><Send className="h-4 w-4"/></Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Enter to send • Shift+Enter for newline</div>
        </div>
      </div>
    </main></div>);
}
