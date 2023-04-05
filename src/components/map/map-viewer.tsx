import { Button, TextField, Autocomplete, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../middleware/context-provider";
import LogoutIcon from "@mui/icons-material/Logout";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import "./map-viewer.css";
import "./scanner.css";
import { Asset, LngLat } from "../../types";


import { MapDataBase } from "../../core/map/map-database";
import { Event } from "openbim-components";
import { FieldValue } from "firebase/firestore";
import { BottomMenu } from "../bottom-toolbar/bottom-menu";
import { SearchMenu } from "../search-toolbar/search-menu";


type Props = {
    children?: React.ReactNode;
};

export const MapViewer = ({ children }: Props) => {


    const [state, dispatch] = useAppContext();  //Recuperamos el estado del usuario    
    const containerRef = useRef(null);  //Lugar donde se muestra la información

    const { user } = state;


    const [isCreatingBuilding, setIsCreatingBuilding] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    const [datos, setDatos] = React.useState<any[]>([]);

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
            //dispatch({ type: "LOAD_DATA", payload: { data } });
            //console.log("MENSAJE 2: " + data);

            let database = new MapDataBase();

            const fetchData = async () => {

                const allDatabases = await Promise.all([database.getAssets(user), database.getBuildings(user)])

                const assetsDatabase = await allDatabases[0];
                const buildingsDatabase = await allDatabases[1];

                console.log("DATABASE ASSETS: " + assetsDatabase[0].autoID);

                //Unimos arrays de diferentes objetos
                Array.prototype.push.apply(assetsDatabase, buildingsDatabase);

                setDatos(assetsDatabase);
            };
            fetchData();



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

            {isScanning && false && (

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

            <BottomMenu />
            <SearchMenu datos={datos} />

        </>
    );
};


/*

<div className="bottom-toolbar">
                <Button variant="contained" startIcon={<DocumentScannerIcon />} onClick={onScan}></Button>
                <Button variant="contained" startIcon={<DomainAddIcon />} onClick={onToggleCreate}></Button>
                <Button variant="contained" startIcon={<LogoutIcon />} onClick={onLogout}></Button>
            </div>


*/