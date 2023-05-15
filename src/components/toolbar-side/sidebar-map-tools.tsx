import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ModelsIcon from "@mui/icons-material/HolidayVillage";
import SearchIcon from "@mui/icons-material/Search";
import FloorplanIcon from "@mui/icons-material/Layers";
import PropertiesIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { State } from "../../middleware/state";
import { Action } from "../../middleware/actions";
import { Tool } from "../../types";
import { Button } from "@mui/material";
import "./sidebar-map-tools.css";

import React, { useState } from "react";




export function getSidebarTools(
    state: State,
    dispatch: React.Dispatch<Action>,
    toggleMenu: () => void
): Tool[] {
    return [

        {
            name: "Buscar activos",
            active: false,
            icon: <SearchIcon />,
            action: ({ onToggleMenu }) => {
                onToggleMenu(true, "SearchAssets");
            },
        },
        {
            name: "Crear edificio",
            active: false,
            icon: <DomainAddIcon />,
            action: ({ onToggleMenu }) => {
                //onToggleMenu(true, "CreateBuilding");

                <div style={{ cursor: 'crosshair' }}>

                    <h2>Click to change mouse cursor</h2>

                </div>


                //Todavia no
                //const { user } = state;
                //dispatch({ type: "ADD_BUILDING", payload: user });

                //console.log("CreateBuilding: ");

            },
        },
        /*{
            name: "Floorplans",
            active: false,
            icon: <FloorplanIcon />,
            action: ({ onToggleMenu }) => {
                onToggleMenu(true, "Floorplans");
            },
        },
        {
            name: "Properties",
            active: false,
            icon: <PropertiesIcon />,
            action: ({ onToggleMenu }) => {
                onToggleMenu(true, "Properties");
            },
        },
        {
            name: "Map",
            active: false,
            icon: <MapIcon />,
            action: ({ dispatch }) => {
                dispatch({ type: "CLOSE_BUILDING" });
            },
        },
        {
            name: "Delete building",
            active: false,
            icon: <DeleteIcon />,
            action: ({ dispatch, state }) => {
                dispatch({ type: "DELETE_BUILDING", payload: state.building });
            },
        },*/
        {
            name: "Log out",
            active: false,
            icon: <LogoutIcon />,
            action: ({ dispatch }) => {
                dispatch({ type: "LOGOUT" });
            },
        },
    ];

}