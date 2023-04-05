import { Action } from "../../middleware/actions";
import { State } from "../../middleware/state";
import { Tool } from "../../types";

import LogoutIcon from "@mui/icons-material/Logout";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PersonIcon from '@mui/icons-material/Person';

export function getBottomMenuUser(): Tool[] {
    const tools = [
        {
            name: "Usuario",
            icon: <PersonIcon />,
            active: false,
            action: (dispatch: any) => {
                const tool = findTool("Clipping planes");
                deactivateAllTools(dispatch, "Clipping planes");
                tool.active = !tool.active;
                dispatch({ type: "LOGOUT" });
                //dispatch({ type: "TOGGLE_CLIPPER", payload: tool.active });
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
