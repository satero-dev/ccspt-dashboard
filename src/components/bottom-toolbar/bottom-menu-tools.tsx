import { Action } from "../../middleware/actions";
import { State } from "../../middleware/state";
import { Tool } from "../../types";

import LogoutIcon from "@mui/icons-material/Logout";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

export function getBottomMenuTools(): Tool[] {
    const tools = [
        {
            name: "Clipping planes",
            icon: <LogoutIcon />,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Clipping planes");
                deactivateAllTools(dispatch, "Clipping planes");
                tool.active = !tool.active;
                dispatch({ type: "LOGOUT" });
                //dispatch({ type: "TOGGLE_CLIPPER", payload: tool.active });
            },
        },
        {
            name: "Dimensions",
            icon: <DomainAddIcon />,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Dimensions");
                deactivateAllTools(dispatch, "Dimensions");
                tool.active = !tool.active;
                //dispatch({ type: "SCAN_ASSET" });
            },
        },
        {
            name: "Explosion",
            icon: <DocumentScannerIcon />,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Explosion");
                deactivateAllTools(dispatch, "Explosion");
                tool.active = !tool.active;
                dispatch({ type: "SCAN_ASSET" });
            },
        },
    ];

    const findTool = (name: string) => {
        const tool = tools.find((tool) => tool.name === name);
        if (!tool) throw new Error("Tool not found!");
        return tool;
    };

    const deactivateAllTools = (dispatch: any, name: string) => {
        for (const tool of tools) {
            if (tool.active && tool.name !== name) {
                tool.action(dispatch);
            }
        }
    };

    return tools;
}
