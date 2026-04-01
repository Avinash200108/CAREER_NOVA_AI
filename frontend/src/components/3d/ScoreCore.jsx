"use client";
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';

function CoreShape({ score }) {
  const meshRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  
  // Rotate continuous
  useFrame((state, delta) => {
    if(meshRef.current) {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
    }
    if(ring1.current) {
        ring1.current.rotation.x -= delta * 0.5;
        ring1.current.rotation.y += delta * 0.1;
    }
    if(ring2.current) {
        ring2.current.rotation.y -= delta * 0.3;
        ring2.current.rotation.z += delta * 0.4;
    }
  });

  // Color mapping based on score
  const color = score >= 80 ? '#00ffa3' : score >= 60 ? '#ffb300' : '#ff4d4d';
  const emissiveColor = score >= 80 ? '#00ccff' : score >= 60 ? '#ff8800' : '#ff0000';
  
  const distortAmount = score >= 80 ? 0.3 : 0.6;
  const speed = score >= 80 ? 2 : 5;

  return (
    <group>
      <group ref={meshRef}>
          <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1.5, 64, 64]} scale={1}>
              <MeshDistortMaterial 
                color={color} 
                attach="material" 
                distort={distortAmount} 
                speed={speed} 
                roughness={0.1} 
                metalness={0.9} 
                emissive={emissiveColor} 
                emissiveIntensity={1.2} 
                wireframe={false} 
              />
            </Sphere>
          </Float>
      </group>
      
      {/* Outer rotating rings representing technical analysis streams */}
      <group ref={ring1}>
          <Torus args={[2.8, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={2} />
          </Torus>
      </group>
      
      <group ref={ring2}>
          <Torus args={[3.2, 0.015, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" transparent opacity={0.6} />
          </Torus>
      </group>
    </group>
  );
}

export default function ScoreCore({ score }) {
  return (
    <div className="absolute inset-0 z-0 mix-blend-screen opacity-50 pointer-events-none overflow-hidden flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} className="w-full h-full transform translate-x-1/4 scale-150">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ccff" />
        <CoreShape score={score} />
      </Canvas>
    </div>
  );
}
