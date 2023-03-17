import { Sprite, Container, Graphics, TextStyle, Text } from "pixi.js";
import { IScene } from "../shared/types";
import { FONTS_DECREASE_COLOR, FONTS_COLOR, FONTS_INCREASE_COLOR, FONTS_COMMON_SIZES, PLACE_FILL_COLOR, LINE_COLOR } from "../shared/constants";

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
        const lineOpacity = 1;
        this._borderFrame.lineStyle(lineWidth, LINE_COLOR, lineOpacity);
        const framePosX = 0;
        const framePosY = 0;
        this._borderFrame.beginFill(PLACE_FILL_COLOR, 1);
        this._borderFrame.drawRect(framePosX, framePosY, this._slotWidth, this._slotHeight);
        this._borderFrame.endFill();
        this._slot = new Container()
        this._slotSprite = slotSprite;
        this._slotSprite.scale.set(0.8, 0.8);
        this._slotSprite.anchor.set(0.5);
        this._slotSprite.x = slotWidth / 4;
        this._slotSprite.y = slotHeight / 2;
        const textStyle = new TextStyle({
            fontFamily: 'PixeloidMono',
            fontSize: FONTS_COMMON_SIZES["Small"].fontSize,
            fill: FONTS_COLOR
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
        this._slotText.text = Math.ceil(this._currentValue).toString();
        if (Math.ceil(this._currentValue) === this._value) {
            this._currentValue = this._value;
            this._slotText.style.fill = FONTS_COLOR;
            return;
        }
        const diffValue = 0.2;
        if (this._value > this._currentValue) {
            this._currentValue = this._currentValue + diffValue*framesPassed;
            this._slotText.style.fill = FONTS_INCREASE_COLOR;
        }
        else if (this._value < this._currentValue) {
            this._currentValue = this._currentValue - diffValue*framesPassed;
            this._slotText.style.fill = FONTS_DECREASE_COLOR;
        }
    }

    resize() {

    }
}