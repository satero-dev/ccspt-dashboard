import {
    createContext,
    useReducer,
    useContext,
} from "react";
import { Action } from "./actions";
import { reducer } from "./state-handler";
import { initialState, State } from "./state";
import { Authenticator } from "./authenticator";
import { executeCore } from "./core-handler";
import { Events } from "./event-handler";

type Props = {
    children?: React.ReactNode;
};

const appContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => { },
])

export const ContextProvider = ({ children }: Props) => {

    const [state, setState] = useReducer(reducer, initialState);

    const events = new Events();
    events.on("OPEN_BUILDING", (building: string) => {
        console.log("OPEN BUILDING PRE:" + building);
        setState({ type: "OPEN_BUILDING", payload: building });
        console.log("OPEN BUILDING POST: " + building);

    });

    const dispatch = (value: Action) => {
        setState(value);
        executeCore(value, events);
    };

    return (
        <appContext.Provider value={[state, dispatch]}>
            <Authenticator />
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(appContext);
};
