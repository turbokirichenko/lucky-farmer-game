import { Sprite, Texture } from "pixi.js";

export class GroundSprite extends Sprite {
    constructor(element: 1 | 2 | 3) {
        const texture = Texture.from(`tile-${element}`);
        super(texture);
    }
}