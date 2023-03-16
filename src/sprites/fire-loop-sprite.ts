import { AnimatedSprite, Assets } from "pixi.js";

export class FireLoopSprite extends AnimatedSprite {
    constructor() {
        const textures = Assets.get("fire-loop").textures;
        const sheet = Object.values(textures);
        super(sheet);
        this.animationSpeed = 0.1;
        this.anchor.set(0.5);
    }
}