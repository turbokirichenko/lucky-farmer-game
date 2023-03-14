import { Container, Sprite } from 'pixi.js';
import { IScene } from '../shared/scene-manager';
import { Player } from '../entities/player';
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
    }

    update(framesPassed: number): void {
        
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
    }
}