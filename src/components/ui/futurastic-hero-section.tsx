"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { ActionSearchBar } from "./action-search-bar";
import * as THREE from "three";

const COLORS_TOP = ["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"];

function BlueParticles() {
  const meshRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const points = React.useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 150;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 150;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    return temp;
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#2563EB"
        transparent
        opacity={0.7}
        sizeAttenuation
        alphaTest={0.1}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
}

interface AuroraHeroProps {
  finstoneAgentsAndDepartments: any[];
}

export const AuroraHero = ({ finstoneAgentsAndDepartments }: AuroraHeroProps) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, transparent 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-800"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          How can I help?
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed text-gray-700 md:text-lg md:leading-relaxed">
          Discover, deploy, and manage intelligent AI agents that automate your business processes.
        </p>
        <div className="w-full max-w-2xl">
          <ActionSearchBar actions={finstoneAgentsAndDepartments} />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <BlueParticles />
        </Canvas>
        {/* Subtle animated background dots */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-200 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        </div>
      </div>
    </motion.section>
  );
};
