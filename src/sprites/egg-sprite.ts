import { Sprite, Texture } from "pixi.js";

export class EggSprite extends Sprite {
    constructor() {
        const texture = Texture.from("egg");
        super(texture);
        this.anchor.set(0.5);
    }
}