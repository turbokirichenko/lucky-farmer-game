import { AnimatedSprite, Sprite } from "pixi.js";
import { IEntity, Vector2d } from "../shared/types";
import { Player } from "../entities/player";
import { EntityContainer } from "./entity-container";

export class AnimalContainer extends EntityContainer implements IEntity {
    private _active = false; // when 'true', that may spawn objects
    public get active() {
        return this._active;
    }

    private _hungryTimestamp: number;

    private _hungryTimer?: number; // time when active will be disabled

    public set hungryTimer (value: number) {
        this._hungryTimer = value;
    }
    
    constructor(
        position: Vector2d, 
        sprite: AnimatedSprite | Sprite,
        Prefab: typeof Sprite,
    ) {
        super(position, sprite, Prefab);
        this._hungryTimestamp = this.timestamp;
    }

    feed() {
        this._active = true;
        this._hungryTimestamp = this.timestamp = Date.now();
    }

    update() {
        if (!this.timer) return;
        if (!this.resourceName) return;
        if (!this._active) return;
        if (!this._hungryTimer) return;
        const now = Date.now();
        const diff = now - this.timestamp;
        const hungryDiff = now - this._hungryTimestamp;
        if (diff >= this.timer) {
            this.timestamp = now;
            this.spawn(this.spawnedObjectAction);
        }
        if (hungryDiff >= this._hungryTimer) {
            this._active = false;
            this._hungryTimestamp = this.timestamp = now;
        }
    }

    spawnedObjectAction (e: any) {
        e = null;
        Player.modifyResource(this.resourceName!, this.bonus);
        this.destroy();
    }
}