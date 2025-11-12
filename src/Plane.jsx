import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Plane({ imageURL, onMapClick }){
    const texture = useLoader(THREE.TextureLoader, imageURL);

    const width = 10;
    const height = 10;

    const handleClick = (event) => {
        const { x, y, z } = event.point;
        // console.log("Clicked point: ", x,y,z);

        if(onMapClick){
            onMapClick({ x, y, z });
         }
        //  else{
        //     console.warn("onMapClick prop not passed to plane!")
        // }
    };

    return (
        <mesh 
        rotation = {[-Math.PI/2,0,0]} 
        position = {[0,0,0]}
        onClick = {handleClick}
        >
            <planeGeometry args = {[width, height]} />
            <meshBasicMaterial map = {texture} />
        </mesh>
    );
}