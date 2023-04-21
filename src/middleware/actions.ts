export type ActionType =
    "LOGIN" |
    "LOGOUT" |
    "START_MAP" |
    "REMOVE_MAP" |
    "UPDATE_USER" |
    "OPEN_SCAN" |
    "SCAN_ASSET" |
    "ADD_BUILDING" |
    "OPEN_BUILDING" |
    "CLOSE_BUILDING" |
    "LOAD_DATA" |
    "GOTO_ASSET"

export interface Action {
    type: ActionType;
    payload?: any;
}