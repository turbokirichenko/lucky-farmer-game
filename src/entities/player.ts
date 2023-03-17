import { Resources, ResourceNames, PriceList, EntitiesNames } from "../shared/types";

export class Player {
    private constructor(){};// hide contructor

    private static _resources: Resources = {
        corn: 0,
        milk: 0,
        eggs: 0
    };

    public static get resources() {
        return this._resources;
    };

    private static _pricelist: PriceList = {
        corn: 10,
        cow: 16,
        chick: 8
    };

    public static get pricelist() {
        return this._pricelist;
    }

    private static _spawnedName: EntitiesNames | null = null;

    public static get spawnedName() {
        return this._spawnedName;
    }

    public static modifyResource(resourceName: ResourceNames, amount: number = 1): Boolean {
        if (this._resources[resourceName] + amount < 0) return false;
        if (resourceName in this._resources) this._resources[resourceName] += amount;
        return true;
    }

    public static startDragging(entityName: EntitiesNames): void {
        if (!this._spawnedName) {
            this._spawnedName = entityName;
        }
    }

    public static stopDragging(): void {
        this._spawnedName = null;
    }
}