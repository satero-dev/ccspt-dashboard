export type ActionType = "LOGIN" | "LOGOUT" | "START_MAP" | "REMOVE_MAP" | "UPDATE_USER" | "SCAN" | "EXIT_SCAN";

export interface Action {
    type: ActionType;
    payload?: any;
}