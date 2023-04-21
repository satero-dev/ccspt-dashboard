import { SimpleScan } from "../core/scanner/simple-scan";
import { mapHandler } from "../core/map/map-handler";
import { userAuth } from "../core/user/user-auth";
import { Action } from "./actions";
import { scanHandler } from "../core/scanner/scan-handler";
import { Events } from "./event-handler";

export const executeCore = async (action: Action, events: Events) => {
    if (action.type === "LOGIN") {
        return userAuth.login(action);
    }

    if (action.type === "LOGOUT") {
        return userAuth.logout(action);
    }

    if (action.type === "START_MAP") {
        const { container, user } = action.payload;
        return mapHandler.start(container, user, events);
    }

    if (action.type === "REMOVE_MAP") {
        return mapHandler.remove();
    }

    if (action.type === "OPEN_SCAN") {

        console.log("scan core-handler");
        scanHandler.open();
    }

    if (action.type === "SCAN_ASSET") {
        mapHandler.scanAsset(action.payload);
    }

    if (action.type === "ADD_BUILDING") {
        mapHandler.addBuilding(action.payload);
    }

    if (action.type === "LOAD_DATA") {
        let { data } = action.payload;
        console.log("CORE-HANDLER DATA: " + data);
        return mapHandler.loadData(data);

        //console.log("LOAD DATA SEARCH: " + action.payload);        
    }

    if (action.type === "GOTO_ASSET") {

        mapHandler.gotoAsset(action.payload);

        console.log("GOTO SEARCH: " + action.payload);
    }



}