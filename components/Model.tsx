import React, { useMemo, useRef, useState } from "react";
import { Leva, useControls } from "leva";
import { fragment, vertex } from "../Shader";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useAspect, useCursor } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const image = useRef<THREE.Mesh>(null);
  const texture1 = useTexture("/images/fairy-tale.jpeg");
  const texture2 = useTexture("/images/flag-sand.png");

  const { width, height } = texture2.image;
  const scale = useAspect(width, height, 0.7);

  const { amplitude, waveLength, guildName } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 5, min: 0, max: 20, step: 0.5 },
    guildName: { value: "MaLongYes", label: "Fairy Tale" },
  });

  // Create the canvas texture with the flag name
  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 324;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    // Draw background
    if (context !== null) {
      // Null check for context
      // Draw background
      context.fillStyle = "transparent";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the text
      context.font = "bold 20px Poppins";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(guildName, canvas.width / 2, canvas.height / 2);

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    } else {
      // Handle the case where context is null
      console.error("Canvas context is null");
      return new THREE.Texture(); // Return a default empty texture
    }
  }, [guildName]);

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uTexture1: { value: texture1 },
    uTexture2: { value: texture2 },
    uTextTexture: { value: textTexture }, // Use the canvas texture
  });

  useFrame(() => {
    if (image.current) {
      const material = image.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += 0.04;
      // material.uniforms.uAmplitude.value = amplitude;
      material.uniforms.uAmplitude.value = hovered ? amplitude : 0;
      material.uniforms.uWaveLength.value = waveLength;
    }
  });

  return (
    // <group scale={scale}>
    //   <mesh
    //     ref={image}
    //     onPointerOver={() => setHovered(true)}
    //     onPointerOut={() => setHovered(false)}
    //   >
    //     <planeGeometry args={[1, 1, 15, 15]} />
    //     <Leva hidden />
    //     <shaderMaterial
    //       wireframe={false}
    //       fragmentShader={fragment}
    //       vertexShader={vertex}
    //       uniforms={uniforms.current}
    //     />
    //   </mesh>
    //   <Text
    //     position={[0, -0.55, 0.05]}  // Adjust the position of the text as needed
    //     fontSize={0.1}  // Set the font size
    //     color="white"  // Set the text color
    //     anchorX="center"  // Align the text horizontally
    //     anchorY="middle"  // Align the text vertically
    //   >
    //     Flag Name
    //   </Text>
    // </group>
    <mesh
      ref={image}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 15, 15]} />
      <Leva hidden />
      <shaderMaterial
        wireframe={false}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
