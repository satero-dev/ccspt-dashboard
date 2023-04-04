import { Button, TextField, Autocomplete, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../middleware/context-provider";
import LogoutIcon from "@mui/icons-material/Logout";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import "./map-viewer.css";
import "./scanner.css";
import { Asset } from "../../types";


import { MapDataBase } from "../../core/map/map-database";


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

    const onChangeSearch = () => {
        console.log("cambio");
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



            <div className="gis-button-container">
                <div className="container-background">
                    <Autocomplete
                        disablePortal
                        id="country-select-demo"
                        options={datos}
                        onChange={onChangeSearch}
                        autoHighlight
                        blurOnSelect
                        getOptionLabel={(datos) => datos.id}
                        renderOption={(props, data) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`./${data.tipo}.png`}
                                    alt=""
                                />
                                {data.id}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Buscar"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />

                    <Button variant="contained" startIcon={<DocumentScannerIcon />} onClick={onScan}>Escanear</Button>
                    <Button variant="contained" startIcon={<DomainAddIcon />} onClick={onToggleCreate}>Edificio</Button>
                    <Button variant="contained" startIcon={<LogoutIcon />} onClick={onLogout}>Logout</Button>
                </div>

            </div>

        </>
    );
};


/*

<img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                />

                                
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