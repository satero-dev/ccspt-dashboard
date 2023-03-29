import React, { createContext, useContext, useReducer } from "react";
import { Action } from "./actions";
import { Authenticator } from "./authenticator";
import { executeCore } from "./core-handler";
import { initialState, State } from "./state";
import { reducer } from "./state-handler";

type Props = {
    children?: React.ReactNode;
};

const appContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => { },
])

export const ContextProvider = ({ children }: Props) => {

    const [state, setState] = useReducer(reducer, initialState);

    const dispatch = (value: Action) => {
        setState(value);
        executeCore(value);
    }

    return (
        <appContext.Provider value={[state, dispatch]}>
            <Authenticator />
            {children}
        </appContext.Provider>
    )

};

export const useAppContext = () => {
    return useContext(appContext);
}
