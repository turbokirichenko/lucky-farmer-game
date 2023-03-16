import { DisplayObject } from 'pixi.js';

export interface Resources { "corn": number; "milk": number; "eggs": number; }

export interface Vector2d { x: number; y: number };

export interface Size { width: number; height: number };

export type ResourceNames = "corn" | "milk" | "eggs";

export type PointerAction = (e: any) => void;

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    // we added the resize method to the interface
    resize(screenWidth: number, screenHeight: number): void;
}

export interface IEntity {
    update(): void;
    spawnedObjectAction: PointerAction;
}

export enum ResourcesBonus {
    corn = 3,
    milk = 2,
    eggs = 1
}