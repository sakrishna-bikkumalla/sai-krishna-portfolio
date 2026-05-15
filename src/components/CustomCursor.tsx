import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const springX = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.3 });
  const springY = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.3 });

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      trailId++;
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: trailId },
      ]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [springX, springY]);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() =>
            setTrail((prev) => prev.filter((p) => p.id !== point.id))
          }
          className="absolute rounded-full"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
            background: `hsl(${142 + i * 8}, 70%, ${50 + i * 2}%)`,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "hsl(var(--accent))",
          boxShadow: isClicking
            ? "0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent))"
            : "none",
        }}
        animate={{
          width: isHovering ? 28 : isClicking ? 14 : 20,
          height: isHovering ? 28 : isClicking ? 14 : 20,
          opacity: isClicking ? 1 : isHovering ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: position.x,
          top: position.y,
          translateX: "-50%",
          translateY: "-50%",
          background: isClicking
            ? "radial-gradient(circle, hsl(60, 100%, 75%), hsl(142, 100%, 60%))"
            : isHovering
            ? "linear-gradient(135deg, hsl(142, 80%, 55%), hsl(170, 85%, 50%))"
            : "linear-gradient(135deg, hsl(142, 70%, 50%), hsl(100, 60%, 55%))",
          boxShadow: isClicking
            ? "0 0 16px hsl(142, 100%, 60%), 0 0 32px hsl(60, 100%, 70%)"
            : "0 0 6px hsl(var(--accent) / 0.6)",
        }}
        animate={{
          width: isClicking ? 8 : isHovering ? 5 : 4,
          height: isClicking ? 8 : isHovering ? 5 : 4,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 30 }}
      />
    </div>
  );
};

export default CustomCursor;
