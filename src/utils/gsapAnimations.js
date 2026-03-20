import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateHeroEntrance(container) {
  return gsap.context(() => {
    const tl = gsap.timeline({ defaults:{ ease:"power4.out" } });
    tl.from(".h-badge",  { opacity:0, y:-22, duration:.7, delay:.2 })
      .from(".h-logo",   { opacity:0, scale:.7, duration:.9, ease:"back.out(1.7)" }, "-=.5")
      .from(".h-title",  { opacity:0, y:65, duration:1 }, "-=.5")
      .from(".h-sub",    { opacity:0, y:38, duration:.8 }, "-=.5")
      .from(".h-cta",    { opacity:0, scale:.85, duration:.7, ease:"back.out(1.7)" }, "-=.4")
      .from(".h-stat",   { opacity:0, y:28, duration:.6, stagger:.12 }, "-=.4");
  }, container);
}

export function animateCardsOnScroll(selector, trigger) {
  return gsap.context(() => {
    gsap.from(selector, {
      opacity:0, y:48, duration:.7, stagger:.09, ease:"power3.out",
      scrollTrigger:{ trigger, start:"top 80%", toggleActions:"play none none none" },
    });
  }, trigger);
}

export function parallaxElement(el, speed = 0.3) {
  return ScrollTrigger.create({
    trigger:el, start:"top bottom", end:"bottom top",
    onUpdate:(self) => gsap.set(el, { y:self.progress * 100 * speed }),
  });
}

export function killAll() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}
