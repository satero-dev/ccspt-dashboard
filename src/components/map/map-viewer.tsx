import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../middleware/context-provider";
import "./map-viewer.css";
import "./scanner.css";

type Props = {
    children?: React.ReactNode;
};


export const MapViewer = ({ children }: Props) => {


    const [state, dispatch] = useAppContext();  //Recuperamos el estado del usuario    
    const containerRef = useRef(null);  //Lugar donde se muestra la información

    const { user } = state;

    const [isCreatingBuilding, setIsCreatingBuilding] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    //Función para controlar si se está creando un edificio o no
    const onToggleCreate = () => {
        console.log("Cierra la ventana");
        setIsCreatingBuilding(!isCreatingBuilding);
    }

    //Función que se ejecuta mientras se crea un edificio
    const onCreateBuilding = () => {
        if (isCreatingBuilding) {
            dispatch({ type: "ADD_BUILDING", payload: user });
            setIsCreatingBuilding(false);
        }
    }

    const onScanClose = () => {

        console.log("CIERRA SCAN");
        setIsScanning(false);
    }


    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
    };


    const onScan = () => {

        setIsScanning(true);

        console.log("Pulsamos botón Scan");
        //dispatch({ type: "OPEN_SCAN" });
        dispatch({ type: "SCAN_ASSET" });



    }

    useEffect(() => {
        const container = containerRef.current;
        if (container && user) {
            dispatch({ type: "START_MAP", payload: { container, user } });
        }

        return () => {
            dispatch({ type: "REMOVE_MAP" });
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <div
                className="full-screen"
                onContextMenu={onCreateBuilding}
                ref={containerRef}
            />

            {isScanning && (

                <>
                    <div className="overlay">
                        <div className="scanner">
                            <p className="scanner-exit" onClick={onScanClose}>X</p>
                            <div className="scanner-container">
                                <img src="spinner.gif" alt="spinning log" className="scanner-image" />
                                <p className="scanner-text">
                                    Escaneando...
                                </p>
                            </div>
                        </div>
                    </div>
                </>

            )}

            {isCreatingBuilding && (

                <>
                    <div className="overlay">
                        <p>Right click to create a new Building or </p>
                        <Button variant="contained" onClick={onToggleCreate}>cancel</Button>
                    </div>
                </>

            )}

            <Button variant="contained" onClick={onLogout}>Log out</Button>
            <Button variant="contained" onClick={onToggleCreate}>Create building</Button>
            <Button variant="contained" onClick={onScan}>Scan</Button>

        </>
    );
};


/*
<div className="overlay">
                    <div className="scanner">
                        <p className="scanner-exit" onClick={onScanClose}>X</p>
                        <div className="scanner-container">
                            <img src="spinner.gif" alt="spinning log" className="scanner-image" />
                            <p className="scanner-text">
                                Scanning...
                            </p>
                        </div>
                    </div>
                </div>
*/