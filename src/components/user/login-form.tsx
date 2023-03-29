import React from "react";
import { useAppContext } from "../../middleware/context-provider";

type Props = {
    children?: React.ReactNode;
};



export const LoginForm = ({ children }: Props) => {

    const [state, dispatch] = useAppContext();

    const onLogin = () => {
        console.log("Logging in!");
        dispatch({ type: "LOGIN" })
    }

    return (

        <h1>
            {state.user ? (
                <p>{state.user.displayName}</p>
            ) : (
                <button onClick={onLogin}>Login</button>
            )}
        </h1>
    );
};