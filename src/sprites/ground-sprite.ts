import { Sprite, Texture } from "pixi.js";
import { TilePostfix } from "../shared/types";

export class GroundSprite extends Sprite {
    constructor(element: TilePostfix) {
        const texture = Texture.from(`tile-${element}`);
        super(texture);
    }
}