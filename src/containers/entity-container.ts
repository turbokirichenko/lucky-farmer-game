import { AnimatedSprite, Container, Sprite } from "pixi.js";
import { PLACE_HEIGHT, PLACE_WIDTH } from "../shared/constants";
import { Vector2d } from "../shared/types";
import { GameObjectContainer } from "./game-object-container";

export class EntityContainer extends Container {
    private _timestamp: number;

    public get timestamp() {
        return this._timestamp;
    }

    public set timestamp(value: number) {
        this._timestamp = value;
    }

    private _timer: number;

    private _prefab: any;

    private _placePosition: Vector2d;

    public get placePosition() {
        return this._placePosition;
    }

    constructor(
        position: Vector2d, 
        child: Sprite | AnimatedSprite, 
        prefab: any,
        timer: number
    ) {
        super();
        child.anchor.set(0);
        this.addChild(child);
        this._placePosition = position;
        this._timestamp = Date.now();
        this._prefab = prefab;
        this._timer = timer;
    }

    update() {
        const diff = Date.now() - this._timestamp;
        if (diff >= this._timer) {
            this._timestamp = Date.now();
            this.spawn();
        }
    }

    spawn() {
        const res = new this._prefab();
        const objectContainer = EntityContainer.createGameObject(res, this.position);
        this.parent.addChild(objectContainer);
    }

    static createGameObject(resource: Sprite, position: Vector2d): GameObjectContainer {
        const obj = new GameObjectContainer(resource);
        const xRange = PLACE_WIDTH/4 + Math.random()*PLACE_WIDTH/2;
        const yRange = PLACE_HEIGHT - PLACE_HEIGHT/4;
        obj.x = position.x + xRange;
        obj.y = position.y + yRange;
        return obj;
    }
}