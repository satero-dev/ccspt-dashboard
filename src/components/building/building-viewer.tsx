import { Box, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./side-menus/building-topbar";
import { BuildingDrawer } from "./side-menus/building-drawer";

type Props = {
    children?: React.ReactNode;
};


export const BuildingViewer = ({ children }: Props) => {

    const [sideOpen, setSideOpen] = useState(false);
    const [frontOpen, setFrontOpen] = useState(false);
    const [width] = useState(240);

    const [{ user, building }] = useAppContext();  //Recuperamos el estado del usuario

    if (!building) {
        return <Navigate to={"/map"} />
    }

    const toggleDrawer = (active: boolean) => {
        setSideOpen(active);
    }

    const toggleFrontMenu = (active: boolean) => {
        setFrontOpen(active);
    }

    return (
        <>
            <Box sx={{ display: "flex" }}></Box>
            <BuildingTopBar
                width={width}
                open={sideOpen}
                onOpen={() => toggleDrawer(true)}
            />

            <BuildingDrawer
                width={width}
                open={sideOpen}
                onClose={() => toggleDrawer(false)}
                onToggleMenu={() => toggleFrontMenu(true)}
            />
        </>
    );

};

/*
const onCloseBuilding = () => {

    dispatch({ type: "CLOSE_BUILDING" });
}

<Button variant="contained" onClick={onCloseBuilding}>Tancar edifici</Button>*/