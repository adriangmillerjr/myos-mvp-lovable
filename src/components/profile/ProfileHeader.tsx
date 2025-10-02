import React from "react";
export function ProfileHeader({ userName, avatarUrl }: { userName?: string; avatarUrl?: string }){
  const fallback=(userName||'User').slice(0,1).toUpperCase();
  return (<div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-full overflow-hidden border bg-muted grid place-items-center">
      {avatarUrl ? <img src={avatarUrl} alt={userName?`${userName}'s avatar`:'User avatar'} className="h-full w-full object-cover"/> : <span className="font-semibold text-muted-foreground">{fallback}</span>}
    </div>
    <div className="font-medium truncate max-w-[12rem]" title={userName||'User'}>{userName||'User'}</div>
  </div>);
}
