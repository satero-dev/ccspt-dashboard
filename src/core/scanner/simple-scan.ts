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
          console.log(
            "Error! Cannot read data from the NFC tag. Try a different one?"
          );
        };
        ndef.onreading = (event) => {
          console.log("NDEF message read.");
        };
      })
      .catch((error) => {
        console.log(`Error! Scan failed to start: ${error}.`);
      });
    /*if ("NDEFReader" in window) {
      console.log("NDEFReader");
    } else {
      console.log("NOPE");
    }*/
  }
}