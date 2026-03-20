import { useEffect, useRef } from "react";

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x     = Math.random() * this.canvas.width;
    this.y     = Math.random() * this.canvas.height;
    this.vx    = (Math.random() - 0.5) * 0.35;
    this.vy    = (Math.random() - 0.5) * 0.35;
    this.r     = Math.random() * 1.4 + 0.4;
    this.alpha = Math.random() * 0.45 + 0.1;
    this.color = Math.random() > 0.6 ? "#22c55e" : "#4ade80";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height)  this.vy *= -1;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.round(this.alpha * 255).toString(16).padStart(2, "0");
    ctx.fill();
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 90; i++) particles.push(new Particle(canvas));

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,197,94,${0.1 * (1 - dist / 115)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      drawLines();
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
