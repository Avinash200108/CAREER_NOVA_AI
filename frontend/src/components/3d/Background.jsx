"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";

function ParticleField(props) {
  const ref = useRef();
  
  const positions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * 1.5;
        const sinPhi = Math.sin(phi);
        pos[i * 3] = r * sinPhi * Math.cos(theta);
        pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);
  
  useFrame((state, delta) => {
    if(ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustrateCulled={false} {...props}>
        <PointMaterial transparent color="#00ccff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0f]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
