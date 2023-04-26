import { User } from "firebase/auth";
import { Building } from "../types";
import { Role } from "../roles";

export interface State {
    user: User | null;
    building: Building | null;
    role: Role | null;
}

export const initialState: State = {
    user: null,
    building: null,
    role: null,
};