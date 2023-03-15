import { Vector2d } from "../shared/types";
import { CORN_SPAWN_TIME } from "../shared/constants";
import { Player } from "../entities/player";
import { CornSprite } from "../sprites/corn-sprite";
import { CornBucketSprite } from "../sprites/corn-bucket-sprite";
import { EntityContainer } from "../prefabs/entity-container";

export class CornContainer extends EntityContainer {
    constructor(position: Vector2d) {
        super(position, new CornSprite(), CornBucketSprite);
        this.timer = CORN_SPAWN_TIME;
        this.resourceName = "corn";
        this.bonus = 20;
    }

    spawnedObjectAction(e: any): void {
        e = null;
        Player.modifyResource(this.resourceName, this.bonus);
        this.destroy();
    }
}