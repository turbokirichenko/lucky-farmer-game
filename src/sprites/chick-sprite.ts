import { AnimatedSprite, Assets, FrameObject } from "pixi.js";

export class ChickSprite extends AnimatedSprite {
    constructor() {
        const sheet: FrameObject[] = Object.values(Assets.get("chick").textures);
        super(sheet);
        this.animationSpeed = 0.1;
        this.anchor.set(0.5);
        this.play();
    }
}