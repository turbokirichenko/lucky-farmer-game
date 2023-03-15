import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/scene-manager';
import { Player } from '../entities/player';

export class GameObjectContainer extends Container implements IScene {
    private _sprite: Sprite;

    constructor(element: Sprite) {
        super();
        this._sprite = element;
        this.addChild(this._sprite);
        this.interactive = true;
        this.on("pointertap", () => {
            Player.modifyResource("corn", 1);
            this._sprite.destroy();
            this.destroy();
        });
    }
    
    update() {

    }

    resize() {

    }
}