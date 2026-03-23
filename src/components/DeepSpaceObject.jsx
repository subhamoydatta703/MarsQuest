import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Asteroid = () => {
  const groupRef = useRef();
  
  // High detail rocky texture from three.js official examples
  const [rockTexture] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
  ]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.04;
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main Asteroid Mass */}
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[2.5, 6]} />
          <MeshDistortMaterial 
            map={rockTexture}
            bumpMap={rockTexture}
            bumpScale={0.05}
            color="#999999"
            roughness={1} 
            metalness={0.1}
            distort={0.25}
            speed={0} 
          />
        </mesh>
        
        {/* Sub-boulder 1 */}
        <mesh position={[1.5, 1.2, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 3]} />
          <MeshDistortMaterial 
            map={rockTexture}
            bumpMap={rockTexture}
            bumpScale={0.05}
            color="#8a8a8a"
            roughness={1} 
            metalness={0.15}
            distort={0.4}
            speed={0} 
          />
        </mesh>
        
        {/* Sub-boulder 2 */}
        <mesh position={[-1.2, -1.0, 1.5]} castShadow receiveShadow>
          <icosahedronGeometry args={[1.4, 3]} />
          <MeshDistortMaterial 
            map={rockTexture}
            bumpMap={rockTexture}
            bumpScale={0.05}
            color="#7a7a7a"
            roughness={1} 
            metalness={0.05}
            distort={0.35}
            speed={0} 
          />
        </mesh>

        {/* Sub-boulder 3 */}
        <mesh position={[0.5, -1.8, -1.2]} castShadow receiveShadow>
          <icosahedronGeometry args={[1.0, 3]} />
          <MeshDistortMaterial 
            map={rockTexture}
            bumpMap={rockTexture}
            bumpScale={0.05}
            color="#6a6a6a"
            roughness={1} 
            metalness={0.2}
            distort={0.5}
            speed={0} 
          />
        </mesh>
      </group>
    </Float>
  );
};

const Satellite = () => {
    // A low-poly satellite
    const satRef = useRef();
    useFrame((state, delta) => {
        if(satRef.current) {
            satRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
            <group ref={satRef} scale={0.8}>
                {/* Body */}
                <mesh>
                    <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
                    <meshStandardMaterial color="#eeeeee" metalness={0.8} roughness={0.2} flatShading />
                </mesh>
                {/* Solar Panel Left */}
                <mesh position={[-2, 0, 0]}>
                    <boxGeometry args={[3, 0.1, 1]} />
                    <meshStandardMaterial color="#1a2a4a" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Solar Panel Right */}
                <mesh position={[2, 0, 0]}>
                    <boxGeometry args={[3, 0.1, 1]} />
                    <meshStandardMaterial color="#1a2a4a" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Dish */}
                <mesh position={[0, 1, 0.5]} rotation={[Math.PI / 4, 0, 0]}>
                    <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
                </mesh>
            </group>
        </Float>
    );
};


export default function DeepSpaceObject({ type = 'asteroid' }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 11], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={0.2} color="#0055ff" />
        
        <Suspense fallback={null}>
          {type === 'asteroid' ? <Asteroid /> : <Satellite />}
        </Suspense>
        
        {/* Adds ambient stars slightly moving */}
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
