import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/scene-manager';
import { MapContainer } from '../containers/map-container';
import { ResourcesBarContainer } from '../containers/resources-bar-container';
import { EntitiesBarContainer } from '../containers/entities-bar-container';

export class GameScene extends Container implements IScene {
    private _gameMap: MapContainer;
    private _userResourcesBar: ResourcesBarContainer;
    private _userEnitiesBar: EntitiesBarContainer;

    constructor(parentWidth: number, parentHeight: number) {
        super();

        this._gameMap = new MapContainer(parentWidth, parentHeight);
        this._userResourcesBar = new ResourcesBarContainer();
        this._userEnitiesBar = new EntitiesBarContainer();

        this._gameMap.scale = {x: 1, y: 1};
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = (parentHeight - this._gameMap.height)/2;
        this.addChild(this._gameMap);   
    }

    update(framesPassed: number): void {
        this._gameMap.update(framesPassed);
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = (parentHeight - this._gameMap.height)/2;
    }
}