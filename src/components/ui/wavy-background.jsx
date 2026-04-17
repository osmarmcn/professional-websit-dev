
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow": return 0.001;
      case "fast": return 0.002;
      default: return 0.001;
    }
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = (ctx.canvas.width = window.innerWidth);
    const h = (ctx.canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    const waveColors = colors ?? [
      "#ab400a",
      "#c77630",
      "#852121",
      "#460e64",
      "#00e8f0",
    ];

    const drawWave = (n) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          var y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let animationId;
    const render = () => {
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
        ctx.fillStyle = bgColor || "#0c0c0c";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    // Simulação simplificada de noise para o efeito
    const noise = (x, y, z) => {
      return Math.sin(x * 10 + z) * Math.cos(y * 10 + z);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  };

  useEffect(() => {
    initCanvas();
    window.onresize = () => initCanvas();
  }, [backgroundFill]);

  return (
    <Container className={containerClassName}>
      <Canvas ref={canvasRef} id="canvas" />
      <div style={{ position: "relative", zIndex: 10 }} className={className}>
        {children}
      </div>
    </Container>
  );
};