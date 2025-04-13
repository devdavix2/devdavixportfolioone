"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function TechSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (sphereRef.current && clock) {
      try {
        sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2
        sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3
      } catch (error) {
        console.error("Error in animation frame:", error)
      }
    }
  })

  return (
    <Sphere ref={sphereRef} args={[2, 64, 64]}>
      <MeshDistortMaterial color="#4b00c4" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
    </Sphere>
  )
}
