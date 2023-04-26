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
import { MapDrawer } from "../toolbar-side/map-drawer-general";

import { FrontMenuMode } from "../toolbar-side/front-menu/types";
import { BuildingFrontMenu } from "../toolbar-side/front-menu/map-front-menu";

type Props = {
    children?: React.ReactNode;
};

export const MapViewer = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();  //Recuperamos el estado del usuario    
    const containerRef = useRef(null);  //Lugar donde se muestra la información

    const { user, building } = state;

    //Parámetros de menu lateral
    const [frontOpen, setFrontOpen] = useState(false);
    const [frontMenu, setFrontMenu] = useState<FrontMenuMode>("BuildingInfo");

    //Parámetros de control de escaneo
    const [isScanning, setIsScanning] = useState(false);

    const [datos, setDatos] = React.useState<any[]>([]);

    const [isCreatingBuilding, setIsCreatingBuilding] = useState(true);

    const onScanClose = () => {

        console.log("CIERRA SCAN");
        setIsScanning(false);
    }

    const onScan = () => {

        setIsScanning(true);
        console.log("Pulsamos botón Scan");
        //dispatch({ type: "OPEN_SCAN" });
        dispatch({ type: "SCAN_ASSET" });

    }

    const onCreate = () => {
        if (isCreatingBuilding) {
            dispatch({ type: "ADD_BUILDING", payload: user });
            setIsCreatingBuilding(false);
        }
    };


    useEffect(() => {
        const container = containerRef.current;
        if (container && user) {
            dispatch({ type: "START_MAP", payload: { container, user } });

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

    //console.log("BUILDING: " + building);

    if (building) {
        const url = `/building?id=${building.autoID}`;
        return <Navigate to={url} />
    }

    const toggleFrontMenu = (active = !frontOpen, mode?: FrontMenuMode) => {
        if (mode) {
            setFrontMenu(mode);
        }
        setFrontOpen(active);
    };

    return (
        <>

            <MapDrawer
                width={240}
                onToggleMenu={toggleFrontMenu}
            />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                <BuildingFrontMenu
                    onToggleMenu={toggleFrontMenu}
                    open={frontOpen}
                    mode={frontMenu}
                />
            </Box>

            <div
                className="full-screen"
                onContextMenu={onCreate}
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


            <BottomMenu />
            <SearchMenu datos={datos} />

        </>
    );
};


/*

<div className="button-container">
                <Button onClick={onLogout}>Log out</Button>
                <Button variant="contained" onClick={onToggleCreate}>
                    Create building
                </Button>

            </div>

<div
                className="full-screen"
                onContextMenu={onCreateBuilding}
                ref={containerRef}
            />

<div className="bottom-toolbar">
                <Button variant="contained" startIcon={<DocumentScannerIcon />} onClick={onScan}></Button>
                <Button variant="contained" startIcon={<DomainAddIcon />} onClick={onToggleCreate}></Button>
                <Button variant="contained" startIcon={<LogoutIcon />} onClick={onLogout}></Button>
            </div>


*/