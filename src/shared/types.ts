import { DisplayObject, FederatedPointerEvent } from 'pixi.js';

export interface Resources { "corn": number; "milk": number; "eggs": number; }

export interface PriceList { "corn": number, "cow": number, "chick": number; }

export interface Vector2d { x: number; y: number };

export interface Size { width: number; height: number };

export type ResourceNames = "corn" | "milk" | "eggs";

export type EntitiesNames = "corn" | "cow" | "chick";

export type PointerAction = (e: any) => void;

export interface IScene extends DisplayObject {
    update(framesPassed: number, timestamp?: number): void;
    // we added the resize method to the interface
    resize(screenWidth: number, screenHeight: number): void;
}

export interface IDraggable extends DisplayObject {
    onDragStart(): void;
    onDragEnd(): void;
    onDragMove(event: FederatedPointerEvent): void;
}

export interface IEntity {
    pick(newTimestamp: number): DisplayObject | null;
    spawnedObjectAction(context: any): void;
}

export enum ResourcesBonus {
    corn = 3,
    milk = 2,
    eggs = 1
}