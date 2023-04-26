import { Button, TextField, Box } from "@mui/material";
import { FC } from "react";
import React, { useState } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";



export const CreateBuilding: FC<{

    onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {

    const [state, dispatch] = useAppContext();
    const { user } = state;

    let r: any;

    const [isCreatingBuilding, setIsCreatingBuilding] = useState(true);

    console.log("COLOCANDO BUILDING: " + isCreatingBuilding);

    //Función para controlar si se está creando un edificio o no
    const onToggleCreate = () => {
        console.log("Cierra la ventana: " + isCreatingBuilding);
        setIsCreatingBuilding(!isCreatingBuilding);
        onToggleMenu(false);
    }

    //Función que se ejecuta mientras se crea un edificio
    const onCreateBuilding = () => {

        console.log("CREANDO EDIFICIO");

        /*if (isCreatingBuilding) {

            dispatch({ type: "ADD_BUILDING", payload: user });
            setIsCreatingBuilding(false);
        }

        onToggleMenu(false);*/
    }

    const setRef = (containerRef: any) => {
        r = { containerRef }
    }

    return (
        <>
            <div
                className="full-screen"
                onContextMenu={onCreateBuilding}

            />

            {isCreatingBuilding && (

                <div className="overlay">
                    <p>Right click to create a new Building or </p>
                    <Button variant="contained" onClick={onToggleCreate}>cancel</Button>

                    <Button variant="contained" onClick={onCreateBuilding}>Algore</Button>
                </div>
            )}
        </>
    );

}