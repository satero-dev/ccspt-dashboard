import { SimpleScan } from "../core/scanner/simple-scan";
import { mapHandler } from "../core/map/map-handler";
import { dataBaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { scanHandler } from "../core/scanner/scan-handler";
import { Events } from "./event-handler";

export const executeCore = async (action: Action, events: Events) => {
    if (action.type === "LOGIN") {
        return dataBaseHandler.login(action);
    }

    if (action.type === "LOGOUT") {
        return dataBaseHandler.logout(action);
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

    if (action.type === "DELETE_BUILDING") {
        dataBaseHandler.deleteBuilding(action.payload, events);
    }


    if (action.type === "UPDATE_BUILDING") {
        dataBaseHandler.updateBuilding(action.payload);
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