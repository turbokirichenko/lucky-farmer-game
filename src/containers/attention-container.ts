import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Tween, Group, Easing } from "tweedle.js";
import { IScene, Size, SizeNames, Vector2d } from "../shared/types";
import { FONTS_COMMON_SIZES, MESSAGE_COMMON_SIZES, FONTS_COLOR } from "../shared/constants";

export class AttentionContainer extends Container implements IScene {
    private _message: Container | null;
    private _currentDimention: SizeNames;
    private _parentSize: Size;

    constructor(parentWidth: number, parentHeight: number, size: SizeNames) {
        super();
        this._currentDimention = size;
        this._parentSize = {width: parentWidth, height: parentHeight};
        this.x = parentWidth/2;
        this.y = 2*parentHeight/3;
        this._message = null;
    }

    update() {
        Group.shared.update();
    }

    resize (parentWidth: number, parentHeight: number) {
        this._parentSize.width = parentWidth;
        this._parentSize.height = parentHeight;
        this.x = parentWidth/2;
        this.y = 2*parentHeight/3;
    }

    display (text: string) {
        const message = this.makeMessage(text);
        if (this._message) {
            this.removeChild(this._message);
            this._message = null;
        }
        this._message = message;
        this.addChild(this._message);

        const toCoord: Vector2d = {
            x: 0, 
            y: -this._parentSize.height/4 
        }
        this.onLifecycle(toCoord);
    }

    private makeMessage(title: string): Container {
        const mySize = MESSAGE_COMMON_SIZES[this._currentDimention];
        const message = new Container();
        message.alpha = 0.1;
        message.x = -mySize.width/2;
        message.y = -mySize.height/2;

        const textStyle = new TextStyle({
            fontFamily: 'PixeloidMono',
            fontSize: FONTS_COMMON_SIZES[this._currentDimention].fontSize,
            fill: FONTS_COLOR,
        });
        const text = new Text(title, textStyle);
        text.anchor.set(0.5);
        text.x = mySize.width/2;
        text.y = mySize.height/2;

        const rect = new Graphics();
        rect.beginFill(0xec2e1c, 0.5);
        rect.drawRect(0, 0, mySize.width, mySize.height);
        rect.endFill();

        message.addChild(rect, text);
        return message;
    }

    private onLifecycle(toCoord: Vector2d) {
        if(!this._message) return;

        new Tween(this._message!)
            .to({ y: toCoord.y, alpha: 1 }, 1000)
            .easing(Easing.Cubic.Out)
            .repeat(0)
            .start()
            .onComplete((obj) => {
                obj.destroy();
            })
    }
}