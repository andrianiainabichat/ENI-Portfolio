import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation({
  from     = { opacity:0, y:50 },
  to       = { opacity:1, y:0 },
  start    = "top 85%",
  duration = 0.8,
  stagger  = 0,
  selector = null,
  ease     = "power3.out",
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const targets = selector ? el.querySelectorAll(selector) : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...from, ...to, duration, stagger, ease,
        scrollTrigger: { trigger:el, start, toggleActions:"play none none none" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return containerRef;
}
