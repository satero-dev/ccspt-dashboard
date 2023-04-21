import { Action, ActionType } from "./actions";

export class Events {
    private list: { [type: string]: Function[] } = {};

    on(type: ActionType, callback: Function) {
        if (!this.list[type]) {
            this.list[type] = [];
        }
        this.list[type].push(callback);
    }

    trigger(action: Action) {

        //Si el evento no existe, salimos
        if (!this.list[action.type]) {
            return;
        }

        //Si existe, le pasamos un payload
        for (const event of this.list[action.type]) {
            event(action.payload);
        }
    }
}