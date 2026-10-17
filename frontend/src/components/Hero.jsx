import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Hero.css';

function CedarTree3D() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    /* Perfectly proportioned cedar tree scale */
    <group ref={groupRef} position={[0, -1.4, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.38, 2.2, 12]} />
        <meshStandardMaterial color="#2E5B3F" roughness={0.8} />
      </mesh>

      {/* Tiers of Cedar Foliage */}
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[1.6, 1.2, 8]} />
        <meshStandardMaterial color="#1B3D2A" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[1.3, 1.1, 8]} />
        <meshStandardMaterial color="#2E5B3F" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.3, 0]}>
        <coneGeometry args={[1.0, 1.0, 8]} />
        <meshStandardMaterial color="#4F7A5B" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <coneGeometry args={[0.7, 0.8, 8]} />
        <meshStandardMaterial color="#A7BFA6" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>Software Engineering & Digital Agency</span>
          </div>
          <h1>We turn ideas into <span>digital solutions</span>.</h1>
          <p>
            ARZICode.lb architects high-performance websites, custom web & mobile applications, and resilient business management systems engineered for enduring impact.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let's Talk</a>
            <a href="#services" className="btn-secondary">Explore Our Work</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="canvas-wrapper">
            <Canvas 
              camera={{ position: [0, 1.2, 5.2], fov: 45 }}
              gl={{ alpha: true }}
            >
              <ambientLight intensity={0.9} />
              <directionalLight position={[5, 8, 5]} intensity={1.6} />
              <pointLight position={[-5, -2, -5]} intensity={0.4} />
              <CedarTree3D />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 3} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}