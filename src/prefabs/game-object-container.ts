import { Container, Sprite } from 'pixi.js';
import { Tween, Group, Easing } from 'tweedle.js';
import { IScene, PointerAction, Vector2d } from '../shared/types';
import { MAP_COLS, PLACE_HEIGHT, PLACE_WIDTH } from '../shared/constants';

export class GameObjectContainer extends Container implements IScene {
    private _sprite: Sprite;

    private _pointerAction: PointerAction;

    constructor(element: Sprite, pointerAction: PointerAction) {
        super();
        this._sprite = element;
        this.addChild(this._sprite);
        this._pointerAction = pointerAction 
        this.on("added", () => {
            this.fadeIn();
        });
        this.interactive = true;
        this.on("pointertap", () => {
            this.interactive = false;
            this.fadeOut();
        });
    }
    
    update() {
        Group.shared.update()
    }

    resize() {

    }

    private fadeOut() {
        this.zIndex = 3;
        new Tween(this)
            .to({x: PLACE_WIDTH*MAP_COLS/2, y: - PLACE_HEIGHT/2}, 1000)
            .easing(Easing.Cubic.In)
            .repeat(0)
            .start()
            .onComplete((obj) => { 
                this._pointerAction(obj);
                obj.destroy();
            });
    }

    private fadeIn() {
        const xRange = Math.random()*PLACE_WIDTH/2 - PLACE_WIDTH/4;
        const yRange = PLACE_HEIGHT/4;
        const vec = { x: this.x + xRange, y: this.y + yRange };
        new Tween(this)
            .to(vec, 1000)
            .easing(Easing.Bounce.Out)
            .repeat(0)
            .start();
    }

    static fromSprite(resource: Sprite, position: Vector2d, onPointerAction: PointerAction): GameObjectContainer {
        const obj = new GameObjectContainer(resource, onPointerAction);
        obj.x = position.x;
        obj.y = position.y;
        return obj;
    }
}