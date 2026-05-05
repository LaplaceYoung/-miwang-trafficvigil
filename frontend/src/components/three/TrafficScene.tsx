import { useEffect, useRef } from "react";
import * as THREE from "three";

export function TrafficScene({ mode = "traffic" }: { mode?: "traffic" | "group" }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(mode === "group" ? 0x071114 : 0x081114);
    const camera = new THREE.PerspectiveCamera(58, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, mode === "group" ? 3.2 : 4.4, mode === "group" ? 9.6 : 12);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x6ee7f5, 1.3));
    const light = new THREE.PointLight(0xa7f3d0, 120);
    light.position.set(2, 5, 4);
    scene.add(light);

    const group = new THREE.Group();
    scene.add(group);

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, roughness: 0.38 }),
      new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.42 }),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.46 }),
      new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.4 })
    ];

    const nodes: THREE.Mesh[] = [];
    const count = mode === "group" ? 24 : 120;
    for (let index = 0; index < count; index += 1) {
      const geometry = new THREE.SphereGeometry(mode === "group" ? 0.16 + (index % 5) * 0.035 : 0.055 + (index % 4) * 0.018, 18, 18);
      const mesh = new THREE.Mesh(geometry, materials[index % materials.length]);
      const radius = mode === "group" ? 1.8 + (index % 6) * 0.55 : 1.2 + (index % 22) * 0.24;
      const angle = index * 2.41;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(index * 0.91) * 1.4, Math.sin(angle) * radius);
      mesh.userData = { radius, angle, speed: 0.0005 + (index % 8) * 0.00008 };
      group.add(mesh);
      nodes.push(mesh);
    }

    for (let ring = 1; ring <= 5; ring += 1) {
      const points: THREE.Vector3[] = [];
      const radius = ring * 1.25;
      for (let i = 0; i <= 180; i += 1) {
        const angle = (Math.PI * 2 * i) / 180;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
      }
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18 })
      );
      group.add(line);
    }

    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    let raf = 0;
    const animate = (time: number) => {
      group.rotation.y = Math.sin(time * 0.00018) * 0.34 + time * 0.00007;
      nodes.forEach((node) => {
        const angle = node.userData.angle + time * node.userData.speed;
        node.position.x = Math.cos(angle) * node.userData.radius;
        node.position.z = Math.sin(angle) * node.userData.radius;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    addEventListener("resize", resize);
    resize();
    animate(0);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      renderer.dispose();
      host.innerHTML = "";
    };
  }, [mode]);

  return <div className="three-panel" ref={hostRef} />;
}
