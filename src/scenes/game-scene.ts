import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/types';
import { MapContainer } from '../containers/map-container';
import { ResourcesBarContainer } from '../containers/resources-bar-container';
import { EntitiesBarContainer } from '../containers/entities-bar-container';
import { MAP_COLS, PLACE_HEIGHT, PLACE_WIDTH } from '../shared/constants';

export class GameScene extends Container implements IScene {
    private _gameMap: MapContainer;
    private _userResourcesBar: ResourcesBarContainer;
    private _userEnitiesBar: EntitiesBarContainer;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this._gameMap = new MapContainer(parentWidth, parentHeight);
        const resourceBarWidth = PLACE_WIDTH*MAP_COLS;
        const resourceBarHeight = PLACE_HEIGHT;
        this._userResourcesBar = new ResourcesBarContainer(resourceBarWidth, resourceBarHeight);
        this._userResourcesBar.x = (parentWidth - this._gameMap.width)/2;
        this._userResourcesBar.y = 10;
        this.addChild(this._userResourcesBar);
        this._userEnitiesBar = new EntitiesBarContainer();
        this._gameMap.scale = {x: 1, y: 1};
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = (parentHeight - this._gameMap.height)/2;
        this.addChild(this._gameMap);   
    }

    update(framesPassed: number): void {
        this._gameMap.update(framesPassed);
        this._userResourcesBar.update(framesPassed);
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = (parentHeight - this._gameMap.height)/2;
    }
}