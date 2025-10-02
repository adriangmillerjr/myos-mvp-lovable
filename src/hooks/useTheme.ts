import { useEffect, useMemo, useState } from "react";
export type Theme = "light" | "dark" | "system";
function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export function useTheme() {
  const [preference, setPreference] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme-preference") as Theme) || "system";
  });
  const resolved = useMemo<"light" | "dark">(() => preference === "system" ? getSystemTheme() : preference, [preference]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.classList.toggle("dark", resolved === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme-preference", preference);
  }, [resolved, preference]);
  useEffect(() => {
    if (preference !== "system" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const html = document.documentElement;
      html.classList.toggle("dark", mq.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [preference]);
  const setTheme = (t: Theme) => setPreference(t);
  const toggleTheme = () => {
    setPreference(prev => prev === "system" ? (getSystemTheme() === "dark" ? "light" : "dark") : (prev === "dark" ? "light" : "dark"));
  };
  return { theme: preference, resolvedTheme: resolved, setTheme, toggleTheme };
}
