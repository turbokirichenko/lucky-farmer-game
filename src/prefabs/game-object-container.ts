import { Container, Sprite } from 'pixi.js';
import { IScene, PointerAction, Vector2d } from '../shared/types';

export class GameObjectContainer extends Container implements IScene {
    private _sprite: Sprite;

    constructor(element: Sprite) {
        super();
        this._sprite = element;
        this.addChild(this._sprite);
        this.interactive = true;
    }
    
    update() {

    }

    resize() {

    }

    static fromSprite(resource: Sprite, position: Vector2d, onPointerTap: PointerAction): GameObjectContainer {
        const obj = new GameObjectContainer(resource);
        obj.x = position.x;
        obj.y = position.y;
        obj.on("pointertap", onPointerTap.bind(obj));
        return obj;
    }
}