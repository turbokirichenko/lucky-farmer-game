import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { IScene, Vector2d, EntitiesNames } from "../shared/types";
import { Player } from "../entities/player";
import { DraggableContainer } from "../prefabs/draggable-container";
import { CornBucketSprite } from "../sprites/corn-bucket-sprite";

export class EntitySlotContainer extends Container implements IScene {

    private _entityFab: Sprite;
    private _entityName: EntitiesNames;
    private _draggableContainer: DraggableContainer;
    private _defaultPosition: Vector2d;
    private _activeSlot: Container;
    private _priceSlot: Container;

    constructor(entityFab: Sprite, entityName: EntitiesNames, slotWidth: number, slotHeight: number){
        super();
        this._entityName = entityName;
        this._entityFab = entityFab;
        this._entityFab.scale.set(0.8, 0.8);
        this._entityFab.anchor.set(0.5);
        this._entityFab.interactive = true;

        this._defaultPosition = { x: slotWidth/2, y: slotHeight/3};
        this._draggableContainer = new DraggableContainer();
        this._draggableContainer.position = this._defaultPosition;
        this._draggableContainer.onStart = this.onDragStart.bind(this);
        this._draggableContainer.onEnd = this.onEndDrag.bind(this);
        this._draggableContainer.addChild(this._entityFab);

        this._activeSlot = this.createActiveSlot(slotWidth, slotHeight);

        const price = Player.pricelist[this._entityName];
        this._priceSlot = this.createPriceSlot(slotWidth, slotHeight, price);

        this.addChild(this._activeSlot, this._priceSlot, this._draggableContainer);
        this.interactive = true;
        this._draggableContainer.draggable = true;
        //this.on("pointerup", this.onDiscard);
    }

    update() {

    }

    resize() {

    }

    private createActiveSlot(slotWidth: number, slotHeight: number): Container {
        const width = slotWidth;
        const height = 2*slotHeight/3;
        const slot = new Container();
        const rect = new Graphics();
        rect.lineStyle(4, 0x000000, 1);
        rect.beginFill(0xc0d470, 1);
        rect.drawRect(0, 0, width, height);
        rect.endFill();
        slot.addChild(rect);
        return slot;
    }

    private createPriceSlot(slotWidth: number, slotHeight: number, price: number): Container {
        const width = slotWidth;
        const height = slotHeight/3;
        const slot = new Container();
        const rect = new Graphics();
        rect.lineStyle(4, 0x000000, 1);
        rect.beginFill(0xc0d470, 1);
        rect.drawRect(0, 0, width, height);
        rect.endFill();
        const icon = new CornBucketSprite();
        icon.width = width/4;
        icon.height = width/4;
        icon.anchor.set(0.5);
        icon.x = width/4;
        icon.y = height/2;
        const priceString = price > 999 ? "999+" : price.toString();
        const textStyle = new TextStyle({
            fontFamily: 'PixeloidMono',
            fontSize: 12,
            fill: 0xffffff,
        });
        const text = new Text(priceString, textStyle);
        text.anchor.set(0.5);
        text.x = 3*width/4
        text.y = height/2;
        slot.y = 2*slotHeight/3;
        slot.addChild(rect, icon, text);
        return slot;
    }

    // pick information about draggable object
    private onDragStart() {
        if (Player.spawnedName) {
            Player.stopDragging();
        }
        Player.startDragging(this._entityName);
    }

    private onEndDrag() {
        this._draggableContainer.position = this._defaultPosition;
    }
}