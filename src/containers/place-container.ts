import { Container } from 'pixi.js';
import { PLACE_WIDTH, PLACE_HEIGHT, MAP_COLS, MAP_ROWS } from '../shared/constants';
import { IScene, Vector2d, TilePostfix  } from '../shared/types';
import { GroundSprite } from '../sprites/ground-sprite';

export class PlaceContainer extends Container implements IScene {
    constructor(placePosition: Vector2d) {
        super();
        const getNumber = (): TilePostfix => {
            const num = Math.random() * 3;
            if (num < 1) return "1";
            if (num < 2) return "2";
            if (num < 3) return "3";
            return "1";
        }

        // draw border places
        if (placePosition.x == -1 || placePosition.x == MAP_COLS || placePosition.y == -1 || placePosition.y == MAP_ROWS) {
            if (placePosition.x == -1 && placePosition.y == -1) {
                this.addChild(
                    this.createSprite("left-top", 4),
                );
            }
            else if (placePosition.x == -1 && placePosition.y == MAP_ROWS) {
                this.addChild(
                    this.createSprite("left-bottom", 2),
                );
            }
            else if (placePosition.x == MAP_COLS && placePosition.y == -1) {
                this.addChild(
                    this.createSprite("right-top", 3),
                );
            }
            else if (placePosition.x == MAP_COLS && placePosition.y == MAP_ROWS) {
                this.addChild(
                    this.createSprite("right-bottom", 1),
                );
            }
            else if (placePosition.x == -1 && (placePosition.y != -1 && placePosition.y != MAP_ROWS)) {
                this.addChild(
                    this.createSprite("left", 2),
                    this.createSprite("left", 4),
                );
            }
            else if (placePosition.x == MAP_COLS && (placePosition.y != -1 && placePosition.y != MAP_ROWS)) {
                this.addChild(
                    this.createSprite("right", 1),
                    this.createSprite("right", 3),
                );
            }
            else if (placePosition.y == -1 && (placePosition.x != -1 && placePosition.x != MAP_COLS)) {
                this.addChild(
                    this.createSprite("top", 3),
                    this.createSprite("top", 4),
                );
            }
            else if (placePosition.y == MAP_ROWS && (placePosition.x != -1 && placePosition.x != MAP_COLS)) {
                this.addChild(
                    this.createSprite("bottom", 1),
                    this.createSprite("bottom", 2),
                );
            }
        }
        else {
            // draw places from center
            this.addChild(
                this.createSprite(getNumber(), 1),
                this.createSprite(getNumber(), 2),
                this.createSprite(getNumber(), 3),
                this.createSprite(getNumber(), 4)
            );
        }
    }

    update () {

    }

    resize () {
        
    }

    private createSprite(element: TilePostfix, position: 1 | 2 | 3 | 4) {
        const sprite = new GroundSprite(element);
        sprite.anchor.set(0);
        sprite.width = PLACE_WIDTH/2;
        sprite.height = PLACE_HEIGHT/2;
        sprite.position.x = PLACE_WIDTH/2 * (position%2 ? 0 : 1);
        sprite.position.y = PLACE_HEIGHT/2 * (position > 2 ? 1 : 0);
        return sprite;
    }
}