//import { getAppBar } from "./mui-utils";
import React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./building-styles.css";


type Props = {
    children?: React.ReactNode;
    open: boolean;
    onOpen: () => void;
    width: number;
};

export const BuildingTopBar = ({ children, open, onOpen, width }: Props) => {

    //const {open, onOpen, width} = chidren;

    /*const Appbar = getAppBar(width);

    return <Appbar position="fixed" open={open}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onOpen}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(open && { display: "none" })
                }}
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
                <img className="landing-logo" alt="pt logo" src="pt-logo-topbar-bn.png" width={140} />
            </Typography>
        </Toolbar>
    </Appbar>;*/



};
