import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import {mapURL} from "./mapConfig";
import { Plane } from "./Plane";
import { useState } from "react";
import { BlockShape } from "./BlockShape";


export default function App(){

    const[points, setPoints] = useState([]);
    const[isDrawing, setIsDrawing] = useState(false);
    const[isClosed, setIsClosed] = useState(false);
    const[height, setHeight] = useState(2);
    const[show3D, setShow3D] = useState(false);

    const handleMapClick = (point) => {
        if(!isDrawing) return;

        if(points.length >= 3){
            const first = points[0];

            const dx = point.x - first.x;
            const dz = point.z - first.z;
            const distance = Math.sqrt(dx*dx+dz*dz);

            const threshold = 0.1;

            if(distance < threshold){
                console.log("Closing poly");
                setIsClosed(true);
                setIsDrawing(false);
                return;
            }
        }

        setPoints((prev) => [...prev, point]);

    };

    const handleToggleDrawing = () => {
        setIsDrawing((prev) => !prev);
    };

    const handleReset = () => {
        setPoints([]);
        setIsDrawing(false);
        setIsClosed(false);
    };

    const linePoints = points.map((p) => [p.x, p.y + 0.01, p.z]);

    return(

        <>
        <div
            style = {{
                position: "absolute",
                top: 20,
                left: 20,
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
        <button
            onClick={handleToggleDrawing}
            style={{
                padding: "8px 14px",
                background: isDrawing ? "#ff4d4d" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
    
        {isDrawing ? "Stop Drawing" : "Start Drawing"}
        </button>

        <button
          onClick={handleReset}
            style={{
            padding: "8px 14px",
            background: "#555",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>

        </div>

        {isClosed && (
        <div
            style={{
            position: "absolute",
            top: 100,
            left: 20,
            zIndex: 10,
            background: "rgba(0,0,0,0.6)",
            padding: "10px 15px",
            borderRadius: "8px",
            color: "white",
            }}
        >
            <label>
            Building height:&nbsp;
            <input
                type="number"
                min="0"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                style={{
                width: "60px",
                textAlign: "center",
                marginRight: "10px",
                borderRadius: "4px",
                border: "none",
                padding: "4px",
                }}
            />
            <button
                onClick={() => setShow3D(true)}
                style={{
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                }}
            >
                Bulding height
            </button>
            </label>
        </div>
        )}

        
        <Canvas
            camera = {{
                position: [0,10,15], 
                fov: 45
            }}

            style = {{
                width:"100vw",
                height: "100vh"
            }}
        >
        <ambientLight intensity = {0.5} />
        <directionalLight position = {[5,10,5]} intensity = {1} /> 

        <gridHelper args = {[20,20]} position = {[0, 0.001,0]} />
        <axesHelper args = {[5]} position = {[0, 0.01, 0]} />


        <Plane imageURL = { mapURL } onMapClick = {handleMapClick} />
      
        {points.map((p, i) => (
            <mesh key={i} position={[p.x, p.y + 0.01, p.z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={i === 0 ? "orange" : "red"} />
            </mesh>
        ))}

        {points.length >1 && (
            <Line
                points = {isClosed && points.length > 2
                    ? [...linePoints, linePoints[0]]
                    : linePoints
                }
                color = "yellow"
                lineWidth = {2}
                dashed = {false}
            />
        )}

        {isClosed && show3D && points.length > 2 && (
            <BlockShape 
                points={points} 
                height={height} 
            />
        )}

        <OrbitControls
            enablePan = {true}
            enableZoom = {true}
            enableRotate = {true}
            target = {[0,0,0]}
        />
        </Canvas>
        </>
    )
}