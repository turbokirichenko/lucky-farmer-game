import { AnimatedSprite, Sprite } from "pixi.js";
import { IEntity, ResourceNames, Vector2d } from "../shared/types";
import { Player } from "../entities/player";
import { FireLoopSprite } from "../sprites/fire-loop-sprite";
import { LightEffectSprite } from "../sprites/light-effect-sprite";
import { EntityContainer } from "./entity-container";

export class AnimalContainer extends EntityContainer implements IEntity {
    private _active = false; // when 'true', that may spawn objects
    private _activeEffect: AnimatedSprite;

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
        name: ResourceNames,
    ) {
        super(position, sprite, Prefab, name);
        this._hungryTimestamp = this.timestamp;
        this.interactive = true;
        this._activeEffect = new FireLoopSprite();
        this._activeEffect.x = this.width/2;
        this._activeEffect.y = this.height/4;
        this._activeEffect.play();
        this._activeEffect.alpha = 0;
        this.addChild(this._activeEffect);
        this.on("pointertap", () => {
            this.tapToAnimal();
        });
    }

    feed() {
        this._active = true;
        this._activeEffect.alpha = 1;
        this._hungryTimestamp = Date.now();
        const lightEffect = new LightEffectSprite();
        lightEffect.x = this.width/2;
        lightEffect.y = this.height/2;
        this.addChild(lightEffect);
        lightEffect.play();
        lightEffect.onComplete = () => {
            this.removeChild(lightEffect);
            lightEffect.destroy();
        }
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
            this.spawn(this.spawnedObjectAction, this);
        }
        if (hungryDiff >= this._hungryTimer) {
            this._active = false;
            this._activeEffect.alpha = 0;
            this._hungryTimestamp = this.timestamp = now;
        }
    }

    spawnedObjectAction (e: any) {
        e = null;
        Player.modifyResource(this.resourceName, this.bonus);
    }

    tapToAnimal() {
        const price = 4;
        if(price < Player.resources["corn"]) {
            Player.modifyResource("corn", -1*price)
            this.feed();
        }
    }
}