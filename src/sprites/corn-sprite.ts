import { Sprite, Texture } from "pixi.js";

export class CornSprite extends Sprite {
    constructor() {
        const texture = Texture.from("corn");
        super(texture);
    }
}