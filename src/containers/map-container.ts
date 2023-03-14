import { Container, Sprite } from 'pixi.js';
import { MAP_COLS, MAP_ROWS } from '../shared/constants';
import { IScene } from '../shared/scene-manager';
import { GameObjectContainer } from './game-object-container';
import { EntityContainer } from './entity-container';
import { PlaceContainer } from './place-container';

export class MapContainer extends Container implements IScene {
    private _places: PlaceContainer[] = [];
    private _entities: EntityContainer[] = [];
    private _gameobjects: GameObjectContainer[] = [];

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

        this._cols = MAP_COLS;
        this._rows = MAP_ROWS;
    }

    update() {

    }

    resize() {

    }

    private drawMap () {
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {

            }
        }
    }
}