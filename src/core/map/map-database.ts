import { getApp } from "firebase/app";
import { User } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { Asset, Building } from "../../types";

export class MapDataBase {
    private readonly buildings = "buildings";
    private readonly assets = "assets";

    async addBuilding(building: Building) {
        const dbInstance = getFirestore(getApp());
        const { id, tipo, lat, lng, userID } = building;
        const result = await addDoc(collection(dbInstance, this.buildings), {
            id,
            tipo,
            lat,
            lng,
            userID,
        });
        return result.id;
    }

    async getBuildings(user: User) {

        const dbInstance = getFirestore(getApp());
        const q = query(
            collection(dbInstance, this.buildings),
            where("userID", "==", user.uid)
        );



        return new Promise<Building[]>((resolve) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const result: Building[] = [];

                snapshot.docs.forEach((doc) => {
                    result.push({ ...(doc.data() as Building), autoID: doc.id });

                });
                unsubscribe();
                resolve(result);
            });
        });


    }

    async addAsset(asset: Asset) {
        const dbInstance = getFirestore(getApp());
        const { tipo, lat, lng, id } = asset;
        const result = await addDoc(collection(dbInstance, this.assets), {
            lat,
            lng,
            id,
            tipo,
        });
        return result.id;
    }

    async getAssets(user: User) {
        const dbInstance = getFirestore(getApp());
        const q = query(
            collection(dbInstance, this.assets)
            //where("userID", "==", user.uid)
        );

        return new Promise<Asset[]>((resolve) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const result: Asset[] = [];
                snapshot.docs.forEach((doc) => {
                    result.push({ ...(doc.data() as Asset), autoID: doc.id });
                });
                unsubscribe();
                resolve(result);
            });
        });
    }
}