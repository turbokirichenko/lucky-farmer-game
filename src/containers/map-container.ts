import { Container, IPointData } from 'pixi.js';
import { Size, IScene, Vector2d, EntitiesNames } from '../shared/types';
import { MAP_COLS, MAP_ROWS, PLACE_HEIGHT, PLACE_WIDTH } from '../shared/constants';
import { PlaceContainer } from './place-container';
import { EntityContainer } from '../prefabs/entity-container';
import { CowContainer } from './cow-container';
import { ChickContainer } from './chick-container';
import { CornContainer } from './corn-container';
import { GameObjectContainer } from '../prefabs/game-object-container';

export class MapContainer extends Container implements IScene {

    private _objectsLayer: Container<GameObjectContainer>
    private _entitiesLayer: Container<EntityContainer>;
    private _placesLayer: Container<PlaceContainer>;

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

    constructor() {
        super();
        this.sortableChildren = true;
        this._cols = MAP_COLS;
        this._rows = MAP_ROWS;
        this._placeSize = { width: PLACE_WIDTH, height: PLACE_HEIGHT };
        this._placesLayer = this.drawMap();
        this._entitiesLayer = this.drawCorns();
        this._objectsLayer = new Container<GameObjectContainer>;
        this.addChild(this._placesLayer, this._entitiesLayer, this._objectsLayer);
    }

    update(framesPassed: number, timestamp: number) {
        this._objectsLayer.children.forEach(elem => {
            elem.update(framesPassed, timestamp);
        });
        this._entitiesLayer.children.forEach(elem => {
            const spawnedElement = elem.pick(timestamp);
            if (spawnedElement) {
                this.addObject(spawnedElement);
            }
        });
    }

    resize() {
    }

    addObject(object: GameObjectContainer) {
        this._objectsLayer.addChild(object);
    }

    addEntity(entity: EntityContainer) {
        this._entitiesLayer.addChild(entity);
    }

    addEntityByName(name: EntitiesNames, position: Vector2d) {
        if (!this.isFree(position)) return;
        let entity = null;
        switch(name) {
            case "corn": entity = new CornContainer(position);
            break;
            case "chick": entity = new ChickContainer(position);
            break;
            case "cow": entity = new CowContainer(position);
            break;
        }
        if (entity) {
            console.log(position);
            this._entitiesLayer.addChild(entity);
        }
        return;
    }

    toPlacePosition(global: IPointData): Vector2d {
        const position = this.toLocal(global, undefined, undefined);
        return { 
            x: Math.floor(position.x / this._placeSize.width), 
            y: Math.floor(position.y / this._placeSize.height)
        };
    }

    isFree(placePosition: Vector2d): boolean | null {
        if (placePosition.x < 0 || placePosition.x >= this._cols - 1) return null;
        if (placePosition.x < 0 || placePosition.y >= this._rows - 1) return null;
        const len = this._entitiesLayer.children.length;
        let isFreeFlag = true;
        for (let i = 0; i < len; ++i) {
            const a = placePosition.x == this._entitiesLayer.children[i].placePosition.x;
            const b = placePosition.y == this._entitiesLayer.children[i].placePosition.y;
            if (a && b) {
                isFreeFlag = false;
            } 
        }
        return isFreeFlag;
    }
 
    private drawMap (): Container<PlaceContainer> {
        let places = new Container<PlaceContainer>();
        for (let i = -1; i <= this._rows; ++i) {
            for (let j = -1; j <= this._cols; ++j) {
                const place = new PlaceContainer({x: i, y: j});
                place.x = i*this._placeSize.width;
                place.y = j*this._placeSize.height;
                places.addChild(place);
            }
        }
        return places;
    }

    private drawCorns (): Container<EntityContainer> {
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
        let corns = new Container<EntityContainer>();
        let count = 0;
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {
                if (Math.random() > 0.9 && count < 8) {
                    ++count;
                    const corn = chooseEntity({x: i, y: j});
                    corns.addChild(corn);
                }
            }
        }
        return corns;
    }
}