import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function MarsRover() {
   return (
    <div className="absolute bottom-[20vh] md:bottom-[25vh] right-[2vw] md:right-[8vw] w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 z-20 opacity-90 transition-opacity duration-1000">
      <Canvas camera={{ position: [5, 4, 6], fov: 35 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffb78c" castShadow />
        <directionalLight position={[-10, 5, -10]} intensity={0.2} color="#ffffff" />
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
            <group scale={0.6} rotation={[0, -Math.PI / 3, 0]}>
                <mesh position={[0, 0.6, 0]}>
                    <boxGeometry args={[2.2, 0.8, 3.2]} />
                    <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.4} />
                </mesh>
                
                <mesh position={[0, 1.8, 1.2]}>
                    <cylinderGeometry args={[0.08, 0.08, 1.6]} />
                    <meshStandardMaterial color="#cccccc" metalness={0.8} />
                </mesh>
                <mesh position={[0, 2.6, 1.2]}>
                    <boxGeometry args={[0.6, 0.3, 0.3]} />
                    <meshStandardMaterial color="#aaaaaa" />
                </mesh>
                <mesh position={[0, 2.6, 1.35]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.9} />
                </mesh>

                <mesh position={[0, 0.9, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.8]} />
                    <meshStandardMaterial color="#444444" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.9, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.1]} />
                    <meshStandardMaterial color="#cc4422" emissive="#551100" />
                </mesh>

                {[
                  [-1.3, 0.3, 1.4], [1.3, 0.3, 1.4], 
                  [-1.4, 0.3, 0], [1.4, 0.3, 0], 
                  [-1.3, 0.3, -1.4], [1.3, 0.3, -1.4]
                ].map((pos, i) => (
                    <group key={i} position={pos}>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
                            <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.2, 0.2, 0.27, 8]} />
                            <meshStandardMaterial color="#555555" metalness={0.8} />
                        </mesh>
                    </group>
                ))}
            </group>
        </Float>
      </Canvas>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-mars-500 uppercase tracking-widest whitespace-nowrap bg-black/60 px-2 py-0.5 rounded border border-mars-500/30">
        Perseverance Unit
      </div>
    </div>
   );
}
