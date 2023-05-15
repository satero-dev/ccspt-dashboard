import { SimpleScan } from "../core/scanner/simple-scan";
import { mapHandler } from "../core/map/map-handler";
import { dataBaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { scanHandler } from "../core/scanner/scan-handler";
import { Events } from "./event-handler";
import { buildingHandler } from "../core/building/building-handler";

export const executeCore = async (action: Action, events: Events) => {
    if (action.type === "LOGIN") {
        return dataBaseHandler.login(action);
    }

    if (action.type === "LOGOUT") {
        return dataBaseHandler.logout(action);
    }

    if (action.type === "START_MAP") {
        const { container, user } = action.payload;
        console.log("START_MAP: " + user.uid);
        return mapHandler.start(container, user, events);
    }

    if (action.type === "REMOVE_MAP" || action.type === "OPEN_BUILDING") {
        return mapHandler.remove();
    }

    if (action.type === "OPEN_SCAN") {

        return scanHandler.open();
    }

    if (action.type === "SCAN_ASSET") {
        return mapHandler.scanAsset(action.payload);
    }

    if (action.type === "ADD_BUILDING") {
        /*const { user } = action.payload;
        console.log("ADD_BUILDING core-handler: " + user.uid);*/
        return mapHandler.addBuilding(action.payload);
    }

    if (action.type === "DELETE_BUILDING") {
        return dataBaseHandler.deleteBuilding(action.payload, events);
    }


    if (action.type === "UPDATE_BUILDING") {
        return dataBaseHandler.updateBuilding(action.payload);
    }

    if (action.type === "START_BUILDING") {
        const { container, building } = action.payload;
        return buildingHandler.start(container, building, events);
    }
    if (action.type === "CLOSE_BUILDING") {
        return buildingHandler.remove();
    }

    if (action.type === "UPLOAD_MODEL") {
        const { model, file, building } = action.payload;
        const zipFile = await buildingHandler.convertIfcToFragments(file);
        return dataBaseHandler.uploadModel(model, zipFile, building, events);
    }

    if (action.type === "DELETE_MODEL") {
        const { model, building } = action.payload;
        return dataBaseHandler.deleteModel(model, building, events);
    }


    if (action.type === "LOAD_DATA") {
        let { data } = action.payload;
        return mapHandler.loadData(data);

        //console.log("LOAD DATA SEARCH: " + action.payload);        
    }

    if (action.type === "GOTO_ASSET") {

        return mapHandler.gotoAsset(action.payload);

    }

    /*if (action.type === "SET_ROLE") {
        console.log("SET ROLE");
    }*/



}