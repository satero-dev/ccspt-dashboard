import * as MAPBOX from "mapbox-gl";
import React, { useCallback, useEffect } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { lnglat } from "../map/map-scene";

export class SimpleScan {

  constructor() {
    console.log("latitud en scan: " + lnglat);
    this.createScan();


  }

  private createScan() {
    const ndef = new NDEFReader();

    //console.log(MAPBOX.getCenter().lat);

    ndef
      .scan()
      .then(() => {
        console.log("Scan started successfully.");
        ndef.onreadingerror = (event) => {
          window.alert(
            "Error! Cannot read data from the NFC tag. Try a different one?"
          );
        };
        ndef.onreading = (event: NDEFReadingEvent) => {
          console.log("NDEF message read.");
          this.onReadingData(event);
          //window.alert(event.currentTarget);
        };
      })
      .catch((error) => {
        window.alert(`Error! Scan failed to start: ${error}.`);
      });
  }

  private onReadingData = ({ message }: NDEFReadingEvent) => {

    const [state, dispatch] = useAppContext();  //Recuperamos el estado del usuario
    const { user } = state;

    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          window.alert(textDecoder.decode(record.data));

          dispatch({ type: "SCAN_ASSET", payload: user });
          //setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };
}