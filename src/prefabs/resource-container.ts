import { Sprite, Container, Graphics, TextStyle, Text } from "pixi.js";
import { IScene } from "../shared/types";

export class ResourceContainer extends Container implements IScene {

    private _slotSprite: Sprite;
    private _slotText: Text;
    private _value: number;
    private _currentValue: number;
    private _borderFrame: Graphics;
    private _slot: Container;

    private _slotWidth: number;
    private _slotHeight: number;

    constructor(slotSprite: Sprite, slotWidth: number, slotHeight: number, data: number) {
        super();
        this._slotWidth = slotWidth;
        this._slotHeight = slotHeight;
        this._value = data;
        this._currentValue = data;
        this._borderFrame= new Graphics();
        const lineWidth = 4;
        const lineColor = 0x000000;
        const lineOpacity = 1;
        this._borderFrame.lineStyle(lineWidth, lineColor, lineOpacity);
        const framePosX = 0;
        const framePosY = 0;
        this._borderFrame.beginFill(0xc0d470, 1);
        this._borderFrame.drawRect(framePosX, framePosY, slotWidth, slotHeight);
        this._borderFrame.endFill();
        this._slot = new Container()
        this._slotSprite = slotSprite;
        this._slotSprite.anchor.set(0.5);
        this._slotSprite.x = slotWidth / 4;
        this._slotSprite.y = slotHeight / 2;
        const textStyle = new TextStyle({
            fontFamily: 'PixeloidMono',
            fontSize: 24,
            fill: [0xffffff]
        })
        this._slotText = new Text(data.toString(), textStyle);
        this._slotText.x = (3 * slotWidth) / 4;
        this._slotText.y = slotHeight / 2;
        this._slotText.anchor.set(0.5);
        this._slot.addChild(this._borderFrame, this._slotSprite, this._slotText);
        this.addChild(this._slot);
    }

    updateValue(data: number) {
        this._value = data;
    }

    update(framesPassed: number) {
        const increaseColor = 0x1cb613;
        const decreaseColor = 0xec2e1c;
        const defaultColor = 0xffffff;
        this._slotText.text = Math.ceil(this._currentValue).toString();
        if (Math.ceil(this._currentValue) === this._value) {
            this._currentValue = this._value;
            this._slotText.style.fill = defaultColor;
            return;
        }
        const diffValue = 0.2;
        if (this._value > this._currentValue) {
            this._currentValue = this._currentValue + diffValue*framesPassed;
            this._slotText.style.fill = increaseColor;
        }
        else if (this._value < this._currentValue) {
            this._currentValue = this._currentValue - diffValue*framesPassed;
            this._slotText.style.fill = decreaseColor;
        }
    }

    resize() {

    }
}