import React, { useCallback, useContext, useEffect, useState } from "react";
import { Scanner } from "../../components/scanner/scanner";
import { useAppContext } from "../../middleware/context-provider";
//import { SumArgs, Window } from "./myModule";

export const ScanRFID = () => {
  console.log("Scan started successfully.");

  const [message, setMessage] = useState();
  const [serialNumber, setSerialNumber] = useState();

  const [actions, setActions] = useAppContext();

  /*const scan = useCallback(async () => {
    console.log("ESCAN")
    if ("NDEFReader" in Window) {
      console.log("HOLA")
    }
  }, [setActions]);

  useEffect(() => {
    console.log("ESCAN")
    scan();
  }, [scan]);*/
};

/*
  const [message, setMessage] = useState();
  const [serialNumber, setSerialNumber] = useState();

  const [actions, setActions] = useAppContext();

  const scan = useCallback(async () => {
    if ("NDEFReader" in Window) {
      try {
        const ndef = new Window.NDEFReader();
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event: NDEFReadingEvent) => {
          console.log("NDEF message read.");
          onReading(event);
          setActions({
            scan: "scanned",
            write: null,
          });
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }, [setActions]);

  const onReading = ({ message, serialNumber }: NDEFReadingEvent) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
          // TODO: Handle other records with record data.
          break;
      }
    }
  };

  useEffect(() => {
    scan();
  }, [scan]);

  /*return {
    <>
  };
};*/
