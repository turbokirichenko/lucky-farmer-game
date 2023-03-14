import { Resources, ResourceNames } from "../shared/types";

export class Player {
    private constructor(){};// hide contructor

    private static _resources: Resources = {
        corn: 0,
        milk: 0,
        eggs: 0
    };

    public static get resources() {
        return this._resources;
    }

    public static modifyResource(resourceName: ResourceNames, amount: number = 1): Boolean {
        if (this._resources[resourceName] + amount < 0) return false;
        this._resources[resourceName] += amount;
        return true;
    }
}