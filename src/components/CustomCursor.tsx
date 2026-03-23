import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const springX = useSpring(0, { stiffness: 300, damping: 28 });
  const springY = useSpring(0, { stiffness: 300, damping: 28 });

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
        className="absolute rounded-full border-2"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "hsl(var(--accent))",
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 20 : 32,
          height: isHovering ? 48 : isClicking ? 20 : 32,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: position.x,
          top: position.y,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovering
            ? "linear-gradient(135deg, hsl(142, 70%, 50%), hsl(170, 80%, 45%))"
            : "linear-gradient(135deg, hsl(142, 70%, 50%), hsl(100, 60%, 55%))",
        }}
        animate={{
          width: isClicking ? 12 : isHovering ? 8 : 6,
          height: isClicking ? 12 : isHovering ? 8 : 6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </div>
  );
};

export default CustomCursor;
