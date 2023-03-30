import React from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";
import { Navigate } from "react-router";
import { Box } from "@mui/system";
import "./login-styles.css";

type Props = {
    children?: React.ReactNode;
};



export const LoginForm = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();

    const onLogin = () => {
        console.log("Logging in!");
        dispatch({ type: "LOGIN" })
    }


    if (state.user) {
        return <Navigate to="/map" />
    }

    return (

        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img className="landing-logo" alt="pt logo" src="pt-logo-landing.png" />

            <Button variant="contained" color="primary" onClick={onLogin}>
                Accedeix
            </Button>
        </Box>
    );
};