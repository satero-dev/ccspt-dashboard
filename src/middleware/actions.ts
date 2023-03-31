export type ActionType = "LOGIN" | "LOGOUT" | "START_MAP" | "REMOVE_MAP" | "UPDATE_USER" | "SCAN" | "EXIT_SCAN" | "ADD_BUILDING";

export interface Action {
    type: ActionType;
    payload?: any;
}