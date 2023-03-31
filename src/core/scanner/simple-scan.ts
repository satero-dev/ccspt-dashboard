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
        ndef.onreading = (event) => {
          window.alert(event.target);
        };
      })
      .catch((error) => {
        window.alert(`Error! Scan failed to start: ${error}.`);
      });
  }
}