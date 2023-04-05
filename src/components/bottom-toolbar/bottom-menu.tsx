import { Card, IconButton } from "@mui/material"
import { useAppContext } from "../../middleware/context-provider";
import { getBottomMenuTools } from "./bottom-menu-tools";
import "./bottom-menu.css"

type Props = {
    children?: React.ReactNode;
};

const tools = getBottomMenuTools();

export const BottomMenu = ({ children }: Props) => {

    const dispatch = useAppContext()[1];

    return (
        <Card className="bottom-menu">
            {tools.map((tool) => {
                return (
                    <IconButton
                        color={tool.active ? "primary" : "default"}
                        onClick={() => tool.action(dispatch)}
                        key={tool.name}
                    >
                        {tool.icon}
                    </IconButton>
                );
            })}
        </Card>
    );
};