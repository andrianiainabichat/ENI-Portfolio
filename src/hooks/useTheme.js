import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("eni-theme") ||
      (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("eni-theme", theme);
  }, [theme]);

  return { theme, toggleTheme:() => setTheme(t => t==="dark"?"light":"dark"), isDark:theme==="dark" };
}
