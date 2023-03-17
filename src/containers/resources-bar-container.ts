import { Container } from 'pixi.js';
import { IScene } from '../shared/types';
import { Player } from '../entities/player';
import { CornBucketSprite } from '../sprites/corn-bucket-sprite';
import { EggSprite } from '../sprites/egg-sprite';
import { MilkSprite } from '../sprites/milk-sprite';
import { ResourceContainer } from './resource-container';

export class ResourcesBarContainer extends Container<IScene> implements IScene {
    
    private _slots: ResourceContainer[];

    constructor(barWidth: number, barHeight: number) {
        super();
        this._slots = this.drawSlot(barWidth, barHeight);
        this.addChild(...this._slots);
    }

    update(framesPassed: number) {
        const playerData = [
            Player.resources.corn,
            Player.resources.eggs,
            Player.resources.milk
        ];
        this._slots.forEach((elem, i) => {
            elem.updateValue(playerData[i]);
            elem.update(framesPassed);
        });
    }

    resize() {

    }

    private drawSlot(barWidth: number, barHeight: number): ResourceContainer[] {
        const numSlots = 3;
        const sprites = [
            new CornBucketSprite(),
            new EggSprite(),
            new MilkSprite(),
        ];
        const playerData = [
            Player.resources.corn,
            Player.resources.eggs,
            Player.resources.milk
        ];
        let slots = [];
        const gap = 0;
        const slotWidth = (barWidth - gap*(numSlots - 1))/numSlots;
        const slotHeight = barHeight;
        for (let i = 0; i < numSlots; ++i) {
            const slot = new ResourceContainer(sprites[i], slotWidth, slotHeight, playerData[i]);
            slot.x = i*(slotWidth + gap);
            slot.y = 0;
            slots.push(slot);
        }
        return slots;
    }
}