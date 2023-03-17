import '@pixi/gif';
import { Container, Assets } from "pixi.js";
import { IScene } from '../shared/types';

export class BackgroundContainer extends Container implements IScene {
    constructor(parentWidth: number, parentHeight: number) {
        super();
        const bgImage = Assets.get("sky-background");
        this.addChild(bgImage);
        this.width = parentWidth;
        this.height = parentHeight;
    }

    update() {

    }

    resize(parentWidth: number, parentHeight: number) {
        this.width = parentWidth;
        this.height = parentHeight;
        this.width = parentHeight*1.5;
        this.x = parentWidth/2 - this.width/2;
        this.y = parentHeight/2 - this.height/2;
    }
}