import { Sprite, Texture } from "pixi.js";

export class MilkSprite extends Sprite {
    constructor() {
        const texture = Texture.from("milk");
        super(texture);
        this.anchor.set(0.5);
    }
}