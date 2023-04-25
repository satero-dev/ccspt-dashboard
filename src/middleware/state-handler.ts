//Este fichero define el State (estado) que controla la interfaz de usuario

import { Action } from "./actions";
import { State } from "./state";


export const reducer = (state: State, action: Action) => {
    if (action.type === "UPDATE_USER") {
        return { ...state, user: action.payload }
    }

    if (action.type === "OPEN_BUILDING" || action.type === "UPDATE_BUILDING") {
        console.log("OPEN BUILDING FORM STATE-HANDLER");
        return { ...state, building: action.payload }
    }

    if (action.type === "CLOSE_BUILDING") {
        return { ...state, building: null }
    }

    return { ...state };
}