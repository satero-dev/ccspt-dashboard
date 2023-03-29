import { mapHandler } from "../core/map/map-handler";
import { userAuth } from "../core/user/user-auth";
import { Action } from "./actions";

export const executeCore = async (action: Action) => {
    if (action.type === "LOGIN") {
        return userAuth.login(action);
    }

    if (action.type === "LOGOUT") {
        return userAuth.logout(action);
    }

    if (action.type === "START_MAP") {
        const { container, user } = action.payload;
        return mapHandler.start(container);
    }

    if (action.type === "REMOVE_MAP") {
        return mapHandler.remove();
    }


}