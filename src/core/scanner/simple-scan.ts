import React, { useCallback, useEffect } from "react";
import { lnglat } from "../map/map-scene";

export class SimpleScan {

  constructor() {
    console.log("latitud en scan: " + lnglat);
    //this.createScan();
    //this.sendLocation();    


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

    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          window.alert(textDecoder.decode(record.data));
          this.sendLocation();

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

  private sendLocation = () => {

  }
}