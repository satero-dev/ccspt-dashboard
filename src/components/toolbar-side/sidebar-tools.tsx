import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import ModelsIcon from "@mui/icons-material/HolidayVillage";
import SearchIcon from "@mui/icons-material/Search";
import FloorplanIcon from "@mui/icons-material/Layers";
import PropertiesIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { State } from "../../middleware/state";
import { Action } from "../../middleware/actions";
import { Tool } from "../../types";

export function getSidebarTools(
    state: State,
    dispatch: React.Dispatch<Action>,
    toggleMenu: () => void
): Tool[] {
    return [
        {
            name: "Buscar",
            active: false,
            icon: <SearchIcon />,
            action: ({ onToggleMenu }) => {
                onToggleMenu(true, "BuildingInfo");
            },
        },
        {
            name: "Models",
            active: false,
            icon: <ModelsIcon />,
            action: ({ onToggleMenu }) => {
                onToggleMenu(true, "ModelList");
            },
        },
        {
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
        },
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