export const ActionList = [
    "LOGIN",
    "LOGOUT",
    "START_MAP",
    "REMOVE_MAP",
    "UPDATE_USER",
    "OPEN_SCAN",
    "SCAN_ASSET",
    "ADD_BUILDING",
    "OPEN_BUILDING",
    "CLOSE_BUILDING",
    "UPDATE_BUILDING",
    "DELETE_BUILDING",
    "LOAD_DATA",
    "GOTO_ASSET",
    "SET_ROLE",
    "UPLOAD_MODEL",
    "DELETE_MODEL"
] as const;


export type ActionType = typeof ActionList[number];

export interface Action {
    type: ActionType;
    payload?: any;
}