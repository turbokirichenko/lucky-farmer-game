import { Container } from 'pixi.js';
import { PLACE_WIDTH, PLACE_HEIGHT } from '../shared/constants';
import { GroundSprite } from '../sprites/ground-sprite';

export class PlaceContainer extends Container {

    constructor() {
        super();
        const getNumber = (): 1 | 2 | 3 => {
            const num = Math.random() * 3;
            if (num < 1) return 1;
            if (num < 2) return 2;
            if (num < 3) return 3;
            return 1;
        }
        this.addChild(
            this.createSprite(getNumber(), 1),
            this.createSprite(getNumber(), 2),
            this.createSprite(getNumber(), 3),
            this.createSprite(getNumber(), 4)
        );
    }

    private createSprite(element: 1 | 2 | 3, position: 1 | 2 | 3 | 4) {
        const sprite = new GroundSprite(element);
        sprite.anchor.set(0);
        sprite.width = PLACE_WIDTH/2;
        sprite.height = PLACE_HEIGHT/2;
        sprite.position.x = PLACE_WIDTH/2 * (position%2 ? 1 : 0);
        sprite.position.y = PLACE_HEIGHT/2 * (position > 2 ? 0 : 1);
        return sprite;
    }
}