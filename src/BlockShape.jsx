import * as THREE from "three";
import { useMemo } from "react";

export function BlockShape({ points, height }) {


        const geometry = useMemo(() => {
            if (!points || points.length < 3) return null;

            const first = points[0];
            const shape = new THREE.Shape();

            shape.moveTo(0, 0);
            for (let i = 1; i < points.length; i++) {
                const p = points[i];
                const lx = p.x - first.x;
                const lz = p.z - first.z;
                shape.lineTo(lx, -lz);
            }
            shape.lineTo(0, 0); 

            const extrudeSettings = {
                steps: 1,
                depth: height,
                bevelEnabled: false,
            };
            const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            geo.rotateX(-Math.PI / 2);
            geo.translate(first.x, 0, first.z);

            return geo;
        }, [points, height]);

        if (!geometry) return null;

        return (
          <mesh geometry={geometry}>
            <meshStandardMaterial color="skyblue" opacity={0.6} transparent />
          </mesh>
        );
        }
