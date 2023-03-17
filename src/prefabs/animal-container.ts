import { AnimatedSprite, Sprite } from "pixi.js";
import { ResourceNames, Vector2d } from "../shared/types";
import { Player } from "../entities/player";
import { FireLoopSprite } from "../sprites/fire-loop-sprite";
import { LightEffectSprite } from "../sprites/light-effect-sprite";
import { EntityContainer } from "./entity-container";
import { GameObjectContainer } from "./game-object-container";

export class AnimalContainer extends EntityContainer {
    private _active = false; // when 'true', that may spawn objects
    private _activeEffect: AnimatedSprite | null;

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
        this._activeEffect = null;
        this.interactive = true;
        this.on("pointertap", () => {
            this.tapToAnimal();
        });
    }

    feed() {
        this._hungryTimestamp = Date.now();
        this._active = true;
        if (!this._activeEffect) {
            this._activeEffect = new FireLoopSprite();
            this._activeEffect.x = this.width/2;
            this._activeEffect.y = this.height/4;
            this._activeEffect.play();
            this.addChild(this._activeEffect);
        } 
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

    pick(timestamp: number): GameObjectContainer | null {
        if (!this.timer) return null;
        if (!this.resourceName) return null;
        if (!this._active) return null;
        if (!this._hungryTimer) return null;
        const now = timestamp;
        const diff = now - this.timestamp;
        const hungryDiff = now - this._hungryTimestamp;
        if (diff >= this.timer) {
            this.timestamp = now;
            return this.spawn(this.spawnedObjectAction, this);
        }
        if (hungryDiff >= this._hungryTimer) {
            this._active = false;
            this._hungryTimestamp = this.timestamp = now;
            if (this._activeEffect) {
                this.removeChild(this._activeEffect);
                this._activeEffect.destroy();
                this._activeEffect = null;
            }
        }
        return null;
    }

    spawnedObjectAction () {
        Player.modifyResource(this.resourceName, this.bonus);
    }

    tapToAnimal() {
        const resourceName = "corn";
        const price = 4;
        if(price <= Player.resources[resourceName]) {
            Player.modifyResource(resourceName, -1*price)
            this.feed();
        }
    }
}