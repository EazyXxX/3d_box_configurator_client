import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useBoxStore } from "../store";

export function Box() {
  const boxData = useBoxStore((state) => state.boxData);
  const dimensions = useBoxStore((state) => state.dimensions);
  const isDarkMode = useBoxStore((state) => state.isDarkMode);

  const geometry = useMemo(() => {
    if (!boxData) return null;

    const geometry = new THREE.BufferGeometry();

    // Create vertices array from triangles
    const vertices =
      boxData.triangles
        .map((triangle) => [
          triangle.v1.x,
          triangle.v1.y,
          triangle.v1.z,
          triangle.v2.x,
          triangle.v2.y,
          triangle.v2.z,
          triangle.v3.x,
          triangle.v3.y,
          triangle.v3.z,
        ])
        .flat() || [];

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }, [boxData]);

  useEffect(() => {
    fetch("/.netlify/functions/box-geometry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dimensions }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => useBoxStore.getState().setBoxData(data))
      .catch(console.error);
  }, [dimensions]);

  useEffect(() => {
    return () => {
      geometry?.dispose();
    };
  }, [geometry]);

  if (!geometry) return null;

  return (
    <group>
      {/* Main box mesh */}
      <mesh geometry={geometry}>
        <meshPhongMaterial
          color={"#4a9eff"}
          side={THREE.DoubleSide}
          shininess={100}
          specular={new THREE.Color(0x111111)}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial
          color={isDarkMode ? "#ffffff" : "#000000"}
          transparent
          opacity={0.3}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}
