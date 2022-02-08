import { useMemo, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

const Stars = ({ count = 5000 }) => {
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const r = 4000;
      const theta = 8 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000);
      const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000);
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000);
      positions.push(x);
      positions.push(y);
      positions.push(z);
    }
    return new Float32Array(positions);
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={12.5} sizeAttenuation color="white" fog={false} />
    </points>
  );
};

const Universe = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
    <Suspense fallback={null}>
      <Stars />
    </Suspense>
  </Canvas>
);

export default Universe;
