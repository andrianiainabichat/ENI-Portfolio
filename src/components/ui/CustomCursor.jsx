import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e) => { mx = e.clientX; my = e.clientY; dot.style.left=`${mx}px`; dot.style.top=`${my}px`; };
    const loop = () => { rx += (mx-rx)*.12; ry += (my-ry)*.12; ring.style.left=`${rx}px`; ring.style.top=`${ry}px`; requestAnimationFrame(loop); };

    document.addEventListener("mousemove", move);
    loop();
    const enter = () => ring.classList.add("hovering");
    const leave = () => ring.classList.remove("hovering");
    const els = document.querySelectorAll("a,button,[data-hover]");
    els.forEach(el => { el.addEventListener("mouseenter",enter); el.addEventListener("mouseleave",leave); });
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
}
