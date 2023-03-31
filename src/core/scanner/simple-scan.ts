import React, { useCallback, useEffect } from "react";

export class SimpleScan {

  constructor() {
    console.log("Pronto me levantaré");
    this.createScan();
  }

  private createScan() {
    const ndef = new NDEFReader();

    ndef
      .scan()
      .then(() => {
        console.log("Scan started successfully.");
        ndef.onreadingerror = (event) => {
          window.alert(
            "Error! Cannot read data from the NFC tag. Try a different one?"
          );
        };
<<<<<<< Updated upstream
        ndef.onreading = (event) => {
          window.alert("NDEF message read.");
=======
        ndef.onreading = (event: NDEFReadingEvent) => {
          console.log("NDEF message read.");
          this.onReadingData(event);
          //window.alert(event.currentTarget);
>>>>>>> Stashed changes
        };
      })
      .catch((error) => {
        window.alert(`Error! Scan failed to start: ${error}.`);
      });
<<<<<<< Updated upstream
    /*if ("NDEFReader" in window) {
      console.log("NDEFReader");
    } else {
      console.log("NOPE");
    }*/
  }
=======
  }

  private onReadingData = ({ message, serialNumber }: NDEFReadingEvent) => {

    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          alert(textDecoder.decode(record.data));
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
>>>>>>> Stashed changes
}