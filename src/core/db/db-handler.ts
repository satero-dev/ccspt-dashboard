import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { Action } from "../../middleware/actions"
import { Events } from "../../middleware/event-handler";
import { Building } from "../../types";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

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

        const dbInstance = getFirestore(getApp());
        await deleteDoc(doc(dbInstance, "buildings", building.uid));
        events.trigger({ type: "CLOSE_BUILDING" });
    },

    updateBuilding: async (building: Building) => {
        const dbInstance = getFirestore(getApp());
        await updateDoc(doc(dbInstance, "buildings", building.uid), {
            ...building,
        })
    },
};
