//Este fichero define el State (estado) que controla la interfaz de usuario

import { Action } from "./actions";
import { State } from "./state";


export const reducer = (state: State, action: Action) => {
    if (action.type === "UPDATE_USER") {
        return { ...state, user: action.payload }
    }

    return { ...state };
}