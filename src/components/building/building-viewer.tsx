import { Button } from "@mui/material";
import React from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
};


export const BuildingViewer = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();  //Recuperamos el estado del usuario
    const { building } = state;

    const onCloseBuilding = () => {

        dispatch({ type: "CLOSE_BUILDING" });
    }

    if (!building) {
        return <Navigate to={"/map"} />
    }

    return (

        <>
            <h1>Bienvenidos a {building}</h1>
            <Button onClick={onCloseBuilding}>Close building</Button>
        </>
    );
};