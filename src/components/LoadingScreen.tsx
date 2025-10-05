import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface FilmReel {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const filmReelsRef = useRef<FilmReel[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize film reels
    const numReels = 25;
    filmReelsRef.current = Array.from({ length: numReels }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const drawFilmReel = (x: number, y: number, rotation: number, size: number = 30) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Outer circle
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.stroke();

      // Inner details (film holes)
      const holes = 8;
      for (let i = 0; i < holes; i++) {
        const angle = (i / holes) * Math.PI * 2;
        const holeX = Math.cos(angle) * (size * 0.7);
        const holeY = Math.sin(angle) * (size * 0.7);
        ctx.fillStyle = "#38BDF8";
        ctx.beginPath();
        ctx.arc(holeX, holeY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      filmReelsRef.current.forEach((reel) => {
        // Physics: mouse repulsion
        const dx = reel.x - mouseRef.current.x;
        const dy = reel.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 100;

        if (distance < minDistance) {
          const force = (minDistance - distance) / minDistance;
          reel.vx += (dx / distance) * force * 2;
          reel.vy += (dy / distance) * force * 2;
        }

        // Update position
        reel.x += reel.vx;
        reel.y += reel.vy;
        reel.rotation += reel.rotationSpeed;

        // Damping
        reel.vx *= 0.98;
        reel.vy *= 0.98;

        // Boundaries with bounce
        if (reel.x < 0 || reel.x > canvas.width) {
          reel.vx *= -0.8;
          reel.x = Math.max(0, Math.min(canvas.width, reel.x));
        }
        if (reel.y < 0 || reel.y > canvas.height) {
          reel.vy *= -0.8;
          reel.y = Math.max(0, Math.min(canvas.height, reel.y));
        }

        drawFilmReel(reel.x, reel.y, reel.rotation);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />
      <div className="relative z-10 w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-satoshi font-bold mb-2 text-glow">Loading</h2>
          <p className="text-muted-foreground">Preparing your experience...</p>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-center mt-4 text-sm text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
};
