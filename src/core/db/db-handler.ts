import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { Action } from "../../middleware/actions"
import { Events } from "../../middleware/event-handler";
import { Building, Model } from "../../types";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";


export const dataBaseHandler = {
    login: (action: Action) => {
        const auth = getAuth();
        //let user = action.payload.user;
        //let pass = action.payload.pass;

        let user = "satero@tauli.cat";
        let pass = "T0t0r0!!";
        //let pass = "B14nd3ng3";

        signInWithEmailAndPassword(auth, user, pass)
            .then((userCredential) => {
                // Signed in
                console.log("Signed in!");
                //const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log("Error");
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        /*const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);*/
    },

    logout: (action: Action) => {
        const auth = getAuth();
        signOut(auth);
    },

    deleteBuilding: async (building: Building, events: Events) => {

        console.log("CORE: deleteBuidling: " + building.autoID);
        const dbInstance = getFirestore(getApp());
        await deleteDoc(doc(dbInstance, "buildings", building.autoID));
        console.log("CORE: deleteBuidling 2");
        events.trigger({ type: "CLOSE_BUILDING" });
    },

    updateBuilding: async (building: Building) => {

        console.log("DB-HANDLER: UpdateBuilding");

        const dbInstance = getFirestore(getApp());
        await updateDoc(doc(dbInstance, "buildings", building.autoID), {
            ...building,
        })
    },

    uploadModel: async (model: Model, file: File, building: Building, events: Events) => {

        console.log("DB-HANDLER: uploadModel");
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        await uploadBytes(fileRef, file);
        events.trigger({ type: "UPDATE_BUILDING", payload: building });
    },

    deleteModel: async (model: Model, building: Building, events: Events) => {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        await deleteObject(fileRef);
        events.trigger({ type: "UPDATE_BUILDING", payload: building });

    }
};
