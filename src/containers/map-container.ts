import { Container } from 'pixi.js';
import { Size, IScene, Vector2d } from '../shared/types';
import { MAP_COLS, MAP_ROWS, PLACE_HEIGHT, PLACE_WIDTH } from '../shared/constants';
import { PlaceContainer } from './place-container';
import { EntityContainer } from '../prefabs/entity-container';
import { CowContainer } from './cow-container';
import { ChickContainer } from './chick-container';
import { CornContainer } from './corn-container';
import { GameObjectContainer } from '../prefabs/game-object-container';

export class MapContainer extends Container<IScene> implements IScene {

    private _gameEntities: EntityContainer[];
    private _gameObjects: GameObjectContainer[] = [];

    private _placeSize: Size;
    public get placeSize() {
        return this!._placeSize;
    } 

    private _cols: number;
    public get cols() {
        return this!._cols;
    }

    private _rows: number;
    public get rows() {
        return this!._rows;
    }

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this.sortableChildren = true;

        this._cols = MAP_COLS;
        this._rows = MAP_ROWS;
        this._placeSize = { width: PLACE_WIDTH, height: PLACE_HEIGHT }
        this.addChild(...this.drawMap());

        this._gameEntities = this.drawCorns();
        this.addChild(...this._gameEntities);
    }

    update(framesPassed: number) {
        this.children.forEach(elem => {
            elem.update(framesPassed);
        });
    }

    resize(parentWidth: number, parentHeight: number) {
    }

    private drawMap (): PlaceContainer[] {
        let places = [];
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {
                const place = new PlaceContainer();
                place.x = i*this._placeSize.width;
                place.y = j*this._placeSize.height;
                places.push(place);
            }
        }
        return places;
    }

    private drawCorns (): EntityContainer[] {

        const chooseEntity = (position: Vector2d): EntityContainer => {
            const numOfEntities = 3;
            const choose = Math.floor(Math.random()*numOfEntities*2);
            switch(choose) {
                case 0: 
                case 1:
                case 2: return new CornContainer(position);
                case 3:
                case 4: return new CowContainer(position);
                case 5:
                case 6: return new ChickContainer(position);
            }
            return new CornContainer(position);
        }

        let corns: EntityContainer[] = [];
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {
                if (Math.random() > 0.9 && corns.length < 9) {
                    const corn = chooseEntity({x: i+1, y: j+1});
                    corn.x = i*this._placeSize.width;
                    corn.y = j*this._placeSize.height;
                    corns.push(corn);
                }
            }
        }
        return corns;
    }

    private drawBorder (): PlaceContainer[] {
        return [];
    }
}