import { AnimatedSprite, Container, Sprite } from "pixi.js";
import { PLACE_HEIGHT, PLACE_WIDTH } from "../shared/constants";
import { Vector2d, ResourceNames, ResourcesBonus, IEntity, IScene } from "../shared/types";
import { GameObjectContainer } from "./game-object-container";

export class EntityContainer extends Container implements IEntity, IScene {
    private _timestamp: number;

    public get timestamp() {
        return this._timestamp;
    }

    public set timestamp(value: number) {
        this._timestamp = value;
    }

    private _timer?: number;

    public get timer(): number | undefined {
        return this._timer;
    }

    public set timer(value: number | undefined) {
        this._timer = value;
    }

    private _bonus: number = 10;

    public get bonus() {
        return this._bonus;
    }

    public set bonus(value: number) {
        this._bonus = value;
    }

    private _resourceName: ResourceNames;

    public get resourceName() {
        return this._resourceName!;
    }

    public set resourceName(value: ResourceNames) {
        this._resourceName = value;
    }

    private _Prefab: typeof Sprite; // constructor of Sprite class

    private _placePosition: Vector2d;

    public get placePosition() {
        return this._placePosition;
    }

    constructor(
        position: Vector2d, 
        child: Sprite | AnimatedSprite, 
        Prefab: typeof Sprite,
        name: ResourceNames,
    ) {
        super();
        child.anchor.set(0);
        this.addChild(child);
        this._placePosition = position;
        this._timestamp = Date.now();
        this._Prefab = Prefab;
        this._resourceName = name;
        this._bonus = ResourcesBonus[name];
    }

    update() {
        if (!this._timer) return;
        const diff = Date.now() - this._timestamp;
        if (diff >= this._timer) {
            this._timestamp = Date.now();
            this.spawn(this.spawnedObjectAction, this);
        }
    }

    resize () {

    }

    spawn(objectPoinerAction: (e: any) => void, context: EntityContainer) {
        const res = new this._Prefab();
        const objectPosition = {
            x : this.position.x + PLACE_WIDTH/2,
            y: this.position.y + PLACE_HEIGHT/2 
        };
        const objectContainer = GameObjectContainer.fromSprite(
            res, 
            objectPosition, 
            objectPoinerAction.bind(context)
        );
        this.parent.addChild(objectContainer);
    }

    spawnedObjectAction (e: any) {
        e = null;
    }
}