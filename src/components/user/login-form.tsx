import React from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";
import { Navigate } from "react-router";

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

        <h1>

            <Button variant="contained" onClick={onLogin}>Login</Button>

        </h1>
    );
};