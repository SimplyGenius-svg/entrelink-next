"use client";
import React from "react";

interface LoadingAnimationProps {
  width?: number;
  height?: number;
  bgColor?: string;
}

export function LoadingAnimation({ 
  width = 160, 
  height = 200,
  bgColor = "transparent"
}: LoadingAnimationProps) {
  return (
    <div className="loading-container" style={{ backgroundColor: bgColor }}>
      <svg className="loading-logo" viewBox="-20 -20 200 250" 
        style={{ width: `${width}px`, height: `${height}px` }}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A857A7" />
            <stop offset="100%" stopColor="#2A0C40" />
          </linearGradient>
        </defs>
       
        {/* Bottom Brick with Increased Thickness */}
        <g className="layer-group">
          <polygon points="60,110 120,140 120,155 60,185 0,155 0,140" stroke="url(#gradient)" strokeWidth="4" fill="white"/>
          <line x1="0" y1="140" x2="60" y2="110" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="140" x2="60" y2="110" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="0" y1="140" x2="60" y2="170" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="140" x2="60" y2="170" stroke="url(#gradient)" strokeWidth="4"/>
        </g>
       
        {/* Middle Brick with Increased Thickness */}
        <g className="layer-group">
          <polygon points="60,65 120,95 120,110 60,140 0,110 0,95" stroke="url(#gradient)" strokeWidth="4" fill="white"/>
          <line x1="0" y1="95" x2="60" y2="65" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="95" x2="60" y2="65" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="0" y1="95" x2="60" y2="125" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="95" x2="60" y2="125" stroke="url(#gradient)" strokeWidth="4"/>
        </g>
       
        {/* Top Brick with Increased Thickness */}
        <g className="layer-group">
          <polygon points="60,20 120,50 120,65 60,95 0,65 0,50" stroke="url(#gradient)" strokeWidth="4" fill="white"/>
          <line x1="0" y1="50" x2="60" y2="20" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="50" x2="60" y2="20" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="0" y1="50" x2="60" y2="80" stroke="url(#gradient)" strokeWidth="4"/>
          <line x1="120" y1="50" x2="60" y2="80" stroke="url(#gradient)" strokeWidth="4"/>
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
        
        .layer-group:nth-child(3) {
          animation-delay: 0s;
        }
        
        .layer-group:nth-child(4) {
          animation-delay: 0.3s;
        }
        
        .layer-group:nth-child(5) {
          animation-delay: 0.6s;
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