"use client";
import React from "react";

interface LoadingAnimationProps {
  width?: number;
  height?: number;
  bgColor?: string;
}

export function LoadingAnimation({ 
  width = 160, 
  height = 180,
  bgColor = "transparent"
}: LoadingAnimationProps) {
  return (
    <div className="loading-container" style={{ backgroundColor: bgColor }}>
      <svg className="loading-logo" viewBox="-20 -20 200 220" 
        style={{ width: `${width}px`, height: `${height}px` }}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A857A7" />
            <stop offset="100%" stopColor="#2A0C40" />
          </linearGradient>
        </defs>
       
        {/* Unswapped Top and Middle Layer Positions */}
        <g className="layer-group">
          <polygon points="60,50 120,80 120,90 60,120 0,90 0,80" 
            stroke="url(#gradient)" strokeWidth="4" fill="transparent"/>
        </g>
       
        <g className="layer-group">
          <polygon points="60,10 120,40 120,50 60,80 0,50 0,40" 
            stroke="url(#gradient)" strokeWidth="4" fill="transparent"/>
        </g>
       
        {/* Bottom Layer Group */}
        <g className="layer-group">
          <polygon points="60,90 120,120 120,130 60,160 0,130 0,120" 
            stroke="url(#gradient)" strokeWidth="4" fill="transparent"/>
        </g>
      </svg>

      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .loading-logo {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          overflow: visible;
        }
        
        .layer-group {
          animation: fall-reset 3s infinite ease-in-out;
          opacity: 0;
        }
        
        .layer-group:nth-child(1) {
          animation-delay: 0s;
        }
        
        .layer-group:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .layer-group:nth-child(3) {
          animation-delay: 0.8s;
        }
        
        @keyframes fall-reset {
          0% {
            transform: translateY(-150px) scale(1);
            opacity: 0;
          }
          20% {
            transform: translateY(0) scale(1.05);
            opacity: 1;
          }
          30% {
            transform: translateY(-5px) scale(0.98);
          }
          40% {
            transform: translateY(0) scale(1);
          }
          70% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          85% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          90% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Create a fullscreen loading overlay version
export function LoadingOverlay({ bgColor = "rgba(255, 255, 255, 0.9)" }: { bgColor?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: bgColor }}>
      <LoadingAnimation />
    </div>
  );
}