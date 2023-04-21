import { User } from "firebase/auth";
import { Asset } from "../../types";
import { MapScene } from "./map-scene";
import { Events } from "../../middleware/event-handler";

export const mapHandler = {

    viewer: null as MapScene | null,

    async start(container: HTMLDivElement, user: User, events: Events) {
        if (!this.viewer) {


            console.log("Map started!");
            console.log("MAPA START: " + user);
            this.viewer = new MapScene(container, events);
            await this.viewer.getAllBuildings(user);
            await this.viewer.getAllAssets(user);

        }

    },

    async loadData(data: string) {
        if (this.viewer) {
            console.log("MAP-HANDLER LOAD DATA: " + data);
            await this.viewer.updateData(data);

            //data = "cordiales";

            //await console.log("MAPA LOAD DATA: " + data);
            //await this.viewer.getAllAssets(user);
        }
    },

    remove() {
        if (this.viewer) {
            console.log("Map removed!")
            this.viewer.dispose();
            this.viewer = null;
        }
    },

    addBuilding(user: User) {
        if (this.viewer) {
            console.log("map-handler alert");
            this.viewer.addBuilding(user);
            //this.viewer.userLocation(user);
        }
    },

    scanAsset(user: User) {
        if (this.viewer) {
            console.log("map-handler scan");
            this.viewer.addAsset(user);
        }
    },

    gotoAsset(asset: Asset) {
        if (this.viewer) {
            //console.log("map-handler scan");
            this.viewer.gotoAsset(asset);
        }
    },
}