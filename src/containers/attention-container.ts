import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Tween, Group, Easing } from "tweedle.js";
import { IScene, Vector2d } from "../shared/types";

export class AttentionContainer extends Container implements IScene {
    private _message: Container;
    constructor(parentWidth: number, parentHeight: number, message: string, width: 240 | 480 | 720, height: 80 | 180 | 360) {
        super();
        this.x = parentWidth/2 - width/2;
        this.y = 2*parentHeight/3 + height;
        this.width = width;
        this.height = height;
        this.alpha = 0;
        const textStyle = new TextStyle({
            fontFamily: 'PixeloidMono',
            fontSize: 24,
        });
        const text = new Text(message, textStyle);
        text.anchor.set(0.5);
        text.x = width/2;
        text.y = height/2;
        const rect = new Graphics();
        rect.beginFill(0xec2e1c, 0.5);
        rect.drawRect(0, 0, width, height);
        rect.endFill();

        this._message = new Container();
        this._message.addChild(rect, text);
        this.addChild(this._message);
        this.onLifecycle({x: parentWidth/2, y: 2*parentHeight/3});
    }

    update() {
        Group.shared.update();
    }

    resize () {

    }

    private onLifecycle(toCoord: Vector2d) {
        new Tween(this)
            .to({ y: toCoord.y, alpha: 1 }, 1000)
            .easing(Easing.Cubic.Out)
            .repeat(0)
            .start()
            .onComplete((obj) => {
                console.log('uu');
                obj.destroy();
            })
    }
}