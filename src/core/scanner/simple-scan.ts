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
        ndef.onreading = (event: NDEFReadingEvent) => {
          console.log("NDEF message read.");
          window.alert(event.currentTarget);
          this.onReadingData(event);
          //
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
          //alert("ALERTA COBRA");
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