import { AnimatedSprite, Assets, FrameObject } from "pixi.js";

export class LightEffectSprite extends AnimatedSprite {
    constructor() {
        const textures = Assets.get("light-effect").textures;
        const sheet: FrameObject[] = Object.values(textures);
        super(sheet);
        this.anchor.set(0.5);
        this.loop = false;
    }
}