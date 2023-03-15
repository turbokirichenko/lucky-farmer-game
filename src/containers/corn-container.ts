import { Vector2d } from "../shared/types";
import { CORN_SPAWN_TIME } from "../shared/constants";
import { CornSprite } from "../sprites/corn-sprite";
import { CornBucketSprite } from "../sprites/corn-bucket-sprite";
import { EntityContainer } from "./entity-container";

export class CornContainer extends EntityContainer {
    constructor(position: Vector2d) {
        super(position, new CornSprite(), CornBucketSprite, CORN_SPAWN_TIME);
    }
}