import { useRef } from 'react';
// import { ThreeEvent } from 'react-three-fiber';
import { Mesh } from 'three';
import { colors } from '../../utils/colors';

/*
interface IPointerEvent extends ThreeEvent<PointerEvent> {
  offsetX: number;
  offsetY: number;
}
*/

const getMarkerPositions = (x: number, y: number) => {
  const phi = x * (Math.PI / 180);
  const theta = (y + 180) * (Math.PI / 180);

  return {
    markerPosX: -(Math.cos(phi) * Math.cos(theta)),
    markerPosY: Math.cos(phi) * Math.sin(theta),
    markerPosZ: Math.sin(phi),
  };
};

type Props = {
  name: string;
  initialPosX: number;
  initialPosY: number;
  total: number;
  onOver: ({ x, y }: any) => void;
  onOut: () => void;
};

const GlobeMarkers = ({ initialPosX, initialPosY, onOver, onOut }: Props) => {
  const markerRef = useRef<Mesh>(null);
  const { markerPosX, markerPosY, markerPosZ } = getMarkerPositions(initialPosX, initialPosY);

  return (
    <mesh
      ref={markerRef}
      position={[markerPosX, markerPosY, markerPosZ]}
      onPointerOver={(event: any) =>
        onOver({ x: Math.round(event.offsetX), y: Math.round(event.offsetY) })
      }
      onPointerOut={onOut}
    >
      <sphereBufferGeometry attach="geometry" args={[0.03, 10, 10]} />
      <meshBasicMaterial attach="material" color={colors.pink} />
    </mesh>
  );
};
export default GlobeMarkers;
