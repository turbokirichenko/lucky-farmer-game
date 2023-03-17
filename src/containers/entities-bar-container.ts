import { Container, Sprite } from 'pixi.js';
import { EntitiesNames, IScene } from '../shared/types';
import { ChickSprite } from '../sprites/chick-sprite';
import { CornSprite } from '../sprites/corn-sprite';
import { CowSprite } from '../sprites/cow-sprite';
import { EntitySlotContainer } from './entity-slot-container';

export class EntitiesBarContainer extends Container implements IScene {
    private _slots: EntitySlotContainer[] = [];

    constructor(barWidth: number, barHeight: number) {
        super();
        this._slots = this.drawSlots(barWidth, barHeight);
        this.addChild(...this._slots);
    }

    update() {

    }

    resize() {

    }

    private drawSlots(barWidth: number, barHeight: number): EntitySlotContainer[] {
        const slotsLength = 3;
        const slotSprites: Sprite[] = [
            new CornSprite(),
            new CowSprite(),
            new ChickSprite()
        ];
        const slotMetadata: EntitiesNames[] = [
            "corn",
            "cow",
            "chick"
        ];
        let slots: EntitySlotContainer[] = [];
        const slotWidth = barHeight/1.5;
        const slotHeight = barHeight;
        for (let i = 0; i < slotsLength; ++i) {
            const slot = new EntitySlotContainer(slotSprites[i], slotMetadata[i], slotWidth, slotHeight);
            slot.x = i*(barWidth/slotsLength);
            slot.y = 0;
            slots.push(slot);
        }
        return slots;
    }
}