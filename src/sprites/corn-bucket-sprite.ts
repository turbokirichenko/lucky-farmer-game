import { Sprite, Texture } from "pixi.js";

export class CornBucketSprite extends Sprite {
    constructor() {
        const texture = Texture.from("corn-bucket");
        super(texture);
        this.anchor.set(0.5);
    }
}