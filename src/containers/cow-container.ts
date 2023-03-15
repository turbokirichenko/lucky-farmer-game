import { Vector2d } from "../shared/types";
import { COW_SPAWN_TIME, COW_HUNGER_TIME } from "../shared/constants";
import { CowSprite } from "../sprites/cow-sprite";
import { MilkSprite } from "../sprites/milk-sprite";
import { EntityContainer } from "./entity-container";

export class CowContainer extends EntityContainer {
    private _active = false;
    public get active() {
        return this._active;
    }

    private _hungryTimestamp: number;
    
    constructor(position: Vector2d) {
        super(position, new CowSprite(), MilkSprite, COW_SPAWN_TIME);

        this.interactive = true;
        this._hungryTimestamp = this.timestamp;
        this.on("pointertap", () => this.feed());
    }

    feed() {
        this._active = true;
        this._hungryTimestamp = this.timestamp = Date.now();
    }

    update() {
        if (!this._active) return;
        const now = Date.now();
        const diff = now - this.timestamp;
        const hungryDiff = now - this._hungryTimestamp;
        if (diff >= COW_SPAWN_TIME) {
            this.timestamp = now;
            this.spawn();
        }
        if (hungryDiff >= COW_HUNGER_TIME) {
            this._active = false;
            this._hungryTimestamp = this.timestamp = now;
        }
    }
}