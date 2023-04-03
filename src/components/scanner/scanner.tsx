import React, { useContext } from 'react';
import { useAppContext } from '../../middleware/context-provider';
import './scanner.css'
/*import Spinner from './spinner.gif';*/
//import { ActionsContext } from '../../contexts/context';


type Props = {
  children?: React.ReactNode;
};


export const Scanner = ({ children }: Props) => {

  const [state, dispatch] = useAppContext();


  const onScanExit = () => {
    //dispatch({ type: "EXIT_SCAN" });
  }

  return (
    <div className="scanner">
      <p className="scanner-exit" onClick={onScanExit}>X</p>
      <div className="scanner-container">
        <img src="spinner.gif" alt="spinning log" className="scanner-image" />
        <p className="scanner-text">
          Scanning...
        </p>
      </div>
    </div>
  );
};
