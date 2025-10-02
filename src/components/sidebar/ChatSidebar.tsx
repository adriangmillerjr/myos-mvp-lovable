import React, { useMemo, useState } from "react";
import { Search, MessageSquare, Plus } from "lucide-react";
export type ChatListItem = { id: string; name: string; color?: string; updatedAt?: string };
export function ChatSidebar({chats=[],onCreateChat,onSelectChat,activeId}:{chats?:ChatListItem[],onCreateChat?:()=>void,onSelectChat?:(id?:string)=>void,activeId?:string}){
  const [q,setQ]=useState('');
  const filtered=useMemo(()=>{const s=q.trim().toLowerCase();return chats.filter(c=>c.name.toLowerCase().includes(s)).sort((a,b)=>(b.updatedAt?.localeCompare(a.updatedAt||'')||0));},[q,chats]);
  return (<nav className="h-full flex flex-col bg-background" aria-label="Chat navigation">
    <div className="p-3 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-10">
      <div className="flex items-center gap-2 font-semibold"><MessageSquare className="h-5 w-5 text-primary"/><span>Chats</span></div>
      <button onClick={onCreateChat} className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded-md hover:bg-accent transition-colors" aria-label="Create new chat"><Plus className="h-4 w-4"/> New</button>
    </div>
    <div className="p-3">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <input placeholder="Search chats" value={q} onChange={e=>setQ(e.target.value)} className="w-full pl-8 pr-2 py-2 rounded-md border bg-background outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" aria-label="Search chats"/>
      </div>
    </div>
    <div className="flex-1 overflow-auto">
      <ul role="list" className="space-y-0.5 px-2 pb-2">
        {filtered.map(c=>{const active=c.id===activeId;return (<li key={c.id}>
          <button onClick={()=>onSelectChat?.(c.id)} className={'w-full text-left px-3 py-2 rounded-md border transition-colors flex items-center gap-2 '+(active?'bg-accent border-primary/40':'hover:bg-accent border-transparent')} aria-current={active?'page':undefined}>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{backgroundColor:c.color||'#8b5cf6'}}/>
            <span className="truncate">{c.name}</span>
          </button></li>);})}
        {filtered.length===0 && <li className="px-3 py-2 text-sm text-muted-foreground">No chats</li>}
      </ul>
    </div>
  </nav>);
}
