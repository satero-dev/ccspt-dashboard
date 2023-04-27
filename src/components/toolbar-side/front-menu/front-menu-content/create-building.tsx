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


    const [isCreatingBuilding, setIsCreatingBuilding] = useState(true);

    console.log("COLOCANDO BUILDING: " + isCreatingBuilding);

    //Función para controlar si se está creando un edificio o no
    const onToggleCreate = () => {
        console.log("Cierra la ventana: " + isCreatingBuilding);
        setIsCreatingBuilding(!isCreatingBuilding);
        onToggleMenu(false);
    }


    return (
        <>

            {isCreatingBuilding && (

                <div className="overlay">
                    <p>Right click to create a new Building or </p>
                    <Button variant="contained" onClick={onToggleCreate}>cancel</Button>
                </div>
            )}
        </>
    );

}