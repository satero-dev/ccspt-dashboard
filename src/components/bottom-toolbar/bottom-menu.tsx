import React from "react";
import { Card, IconButton, Grid } from "@mui/material"
import { useAppContext } from "../../middleware/context-provider";
import { getBottomMenuTools, getBottomMenuUsers } from "./bottom-menu-tools";
import "./bottom-menu.css"

type Props = {
    children?: React.ReactNode;
};

const tools = getBottomMenuTools();
const users = getBottomMenuUsers();

//Todos los hijos de la lista han de tener una key única https://www.youtube.com/watch?v=edGbVnus5JU

export const BottomMenu = ({ children }: Props) => {

    const dispatch = useAppContext()[1];

    return (
        <>
            <Grid className="bottom-menu" gap={2}>

                <Card>
                    {users.map((user) => {
                        return (
                            <React.Fragment key={user.name}>
                                <IconButton
                                    color={user.active ? "primary" : "default"}
                                    onClick={() => user.action(dispatch)}
                                    key={user.name}
                                >
                                    {user.icon}
                                </IconButton>
                            </React.Fragment>

                        );
                    })}
                </Card>

                <Card className="bottom-menu-content">
                    {tools.map((tool) => {
                        return (
                            <React.Fragment key={tool.name}>
                                <IconButton
                                    color={tool.active ? "primary" : "default"}
                                    onClick={() => tool.action(dispatch)}
                                    key={tool.name}
                                >
                                    {tool.icon}
                                </IconButton>
                            </React.Fragment>

                        );
                    })}
                </Card>
            </Grid>
        </>
    );
};


