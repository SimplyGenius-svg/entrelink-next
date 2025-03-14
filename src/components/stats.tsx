"use client";
import { useState, useEffect, useRef } from "react";

type CountUpProps = {
  end: number;
  duration: number;
  suffix?: string;
  isVisible: boolean;
  prefix?: string;
};

// Component for animating individual numbers
const CountUp = ({ end, duration, suffix = "", isVisible, prefix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    
    // Reset when becoming visible
    countRef.current = 0;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentCount = Math.round(easedProgress * end);
      setCount(currentCount);
      countRef.current = currentCount;
      
      if (progress < 1) {
        frameIdRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      startTimeRef.current = null;
    };
  }, [isVisible, end, duration]);

  // Format number for better display
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <span>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we don't need to observe anymore
          if (statsRef.current) {
            observer.unobserve(statsRef.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    // Observe the stats container
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    // Cleanup
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div ref={statsRef} className="container px-4 mx-auto">
      <div className="grid gap-8 md:grid-cols-3">
        {/* First card with the shortest delay */}
        <div 
          className={`rounded-lg border bg-card p-8 text-center shadow-lg transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <CountUp end={500} duration={2000} suffix="K+" isVisible={isVisible} />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Active Investors</div>
        </div>
        
        {/* Second card with medium delay */}
        <div 
          className={`rounded-lg border bg-card p-8 text-center shadow-lg transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <CountUp end={50} duration={2000} suffix="B+" isVisible={isVisible} prefix="$" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Capital Available</div>
        </div>
        
        {/* Third card with longest delay */}
        <div 
          className={`rounded-lg border bg-card p-8 text-center shadow-lg transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <CountUp end={10} duration={2000} suffix="K+" isVisible={isVisible} />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">Successful Matches</div>
        </div>
      </div>
    </div>
  );
}

