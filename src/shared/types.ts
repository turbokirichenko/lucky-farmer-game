import { AnimatedSprite, Container, Sprite } from 'pixi.js';

export interface Resources { "corn": number; "milk": number; "eggs": number; }

export interface Vector2d { x: number; y: number };

export interface Size { width: number; height: number };

export type ResourceNames = "corn" | "milk" | "eggs";

export interface IEntity extends Container {
    updateTrigger(): void;
    spawnResource(): Sprite | AnimatedSprite;
}