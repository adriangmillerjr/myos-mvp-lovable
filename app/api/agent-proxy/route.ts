import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = process.env.AGENT_WEBHOOK_URL;
  const secret = process.env.AGENT_SHARED_SECRET;

  // Debug logs
  console.log("[agent-proxy] URL:", url);
  console.log("[agent-proxy] Secret length:", secret?.length);

  if (!url || !secret) {
    console.error("[agent-proxy] Missing required env vars");
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    
    console.log("[agent-proxy] Forwarding request to:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-agent-shared-secret": secret,
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("[agent-proxy] Response status:", response.status);
    
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      return NextResponse.json({ reply: text }, { status: response.status });
    }
  } catch (e: any) {
    console.error("[agent-proxy] Proxy error:", e);
    return NextResponse.json(
      { error: "Proxy failed", detail: e?.message },
      { status: 500 }
    );
  }
}