import { Container, FederatedPointerEvent } from 'pixi.js';
import { EntitiesNames, IScene } from '../shared/types';
import { Player } from '../entities/player';
import { MapContainer } from '../containers/map-container';
import { ResourcesBarContainer } from '../containers/resources-bar-container';
import { EntitiesBarContainer } from '../containers/entities-bar-container';
import { AttentionContainer } from '../containers/attention-container';
import { MAP_COLS, MAP_ROWS, PLACE_HEIGHT, PLACE_WIDTH } from '../shared/constants';

export class GameScene extends Container implements IScene {
    private _userAttention: AttentionContainer | null;
    private _gameMap: MapContainer;
    private _userResourcesBar: ResourcesBarContainer;
    private _userEntitiesBar: EntitiesBarContainer;

    constructor(parentWidth: number, parentHeight: number) {
        super();
        this._userAttention = null;
        // draw game map in center
        this._gameMap = new MapContainer(parentWidth, parentHeight);
        this._gameMap.scale = {x: 1, y: 1};
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = PLACE_HEIGHT*1.5;
        this.addChild(this._gameMap);  
        // draw resource bar on header
        const resourceBarWidth = PLACE_WIDTH*MAP_COLS/2;
        const resourceBarHeight = PLACE_HEIGHT/1.5;
        this._userResourcesBar = new ResourcesBarContainer(resourceBarWidth, resourceBarHeight);
        this._userResourcesBar.x = (parentWidth - resourceBarWidth)/2;
        this._userResourcesBar.y = 10;
        this.addChild(this._userResourcesBar);
        // draw entities bar on bottom
        const entitiesBarWidth = PLACE_HEIGHT*MAP_COLS/2;
        const entitiesBarHeight = PLACE_HEIGHT*2;
        this._userEntitiesBar = new EntitiesBarContainer(entitiesBarWidth, entitiesBarHeight);
        this._userEntitiesBar.x = (parentWidth - entitiesBarWidth)/2;
        this._userEntitiesBar.y = PLACE_HEIGHT*MAP_ROWS + PLACE_HEIGHT*2 + 10;
        this.addChild(this._userEntitiesBar); 

        this.interactive = true;
        this.on("pointerup", (event: FederatedPointerEvent) => {
            this.onSpawnFromMap(event, parentWidth, parentHeight);
        });
        this.on("pointerupoutside", (event: FederatedPointerEvent) => {
            this.onSpawnFromMap(event, parentWidth, parentHeight);
        });
    }

    update(framesPassed: number): void {
        const timestamp = Date.now();
        this._gameMap.update(framesPassed, timestamp);
        this._userResourcesBar.update(framesPassed, timestamp);
        if (this._userAttention) {
            this._userAttention.update();
        }
    }

    resize(parentWidth: number, parentHeight: number): void {
        //
        this._gameMap.x = (parentWidth - this._gameMap.width)/2;
        this._gameMap.y = (parentHeight - this._gameMap.height)/2;
    }

    private onSpawnFromMap(event: FederatedPointerEvent, parentWidth: number, parentHeight: number) {
        const resourceName = "corn";
        const entityName = Player.spawnedName;
        Player.stopDragging();
        if (entityName) {
            const placePosition = this._gameMap.toPlacePosition(event.global);
            if (this._gameMap.isFree(placePosition)) {
                const price = this.payable(entityName);
                if (price) {
                    Player.modifyResource(resourceName, -price);
                    this._gameMap.addEntityByName(entityName, placePosition);
                } else {
                    this.payAttention('No Money!',  parentWidth, parentHeight);
                }
            } else {
                this.payAttention('Place is Busy!', parentWidth, parentHeight);
            }
        }
    }

    private payAttention(text: string, parentWidth: number, parentHeight: number) {
        const messageWidth = 240;
        const messageHeight = 80;
        if (this._userAttention) {
            this.removeChild(this._userAttention);
            this._userAttention = null;
        }
        this._userAttention = new AttentionContainer(parentWidth, parentHeight, text, messageWidth, messageHeight);
        this.addChild(this._userAttention);
    }

    private payable(entityName: EntitiesNames): number | null {
        const currentAssets = Player.resources.corn;
        const price = Player.pricelist[entityName];
        return (currentAssets >= price) ? price : null;
    }
}