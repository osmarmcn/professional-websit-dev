
import { useEffect } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   useThreeBackground
   Hook responsável por toda a lógica Three.js da Hero:
     • Cria renderer, cena e câmera
     • Gera nuvem de partículas e linhas de conexão
     • Aplica parallax com o movimento do mouse
     • Faz cleanup completo ao desmontar ou trocar tema

   @param {React.RefObject} canvasRef  — ref do <canvas>
   @param {boolean}         isDark     — tema atual
───────────────────────────────────────────────────────── */
export function useThreeBackground(canvasRef, isDark) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    /* ── Cena e câmera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 30;

    /* ── Partículas ── */
    const COUNT     = 380;
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      size:           0.22,
      sizeAttenuation: true,
      color:          isDark ? 0x00e8f0 : 0xab400a,
      transparent:    true,
      opacity:        isDark ? 0.50 : 0.35,
    });

    const points = new THREE.Points(particleGeo, particleMat);
    scene.add(points);

    /* ── Linhas de conexão ── */
    const LINE_COUNT   = 60;
    const linePositions = [];

    for (let i = 0; i < LINE_COUNT; i++) {
      const a = Math.floor(Math.random() * COUNT);
      const b = Math.floor(Math.random() * COUNT);
      linePositions.push(
        positions[a * 3],     positions[a * 3 + 1], positions[a * 3 + 2],
        positions[b * 3],     positions[b * 3 + 1], positions[b * 3 + 2],
      );
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    const lineMat = new THREE.LineBasicMaterial({
      color:       isDark ? 0x460e64 : 0xc77630,
      transparent: true,
      opacity:     isDark ? 0.15 : 0.08,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    /* ── Mouse parallax ── */
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Resize ── */
    const handleResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    /* ── Loop de animação ── */
    let frameId;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.004;
      points.rotation.y = t * 0.06 + mouseX * 0.08;
      points.rotation.x = mouseY * 0.05;
      lines.rotation.y  = t * 0.03 + mouseX * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, [isDark]);
}