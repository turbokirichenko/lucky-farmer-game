import { ChickSprite } from "../sprites/chick-sprite";
import { EggSprite } from "../sprites/egg-sprite";
import { AnimalContainer } from "../prefabs/animal-container";
import { Vector2d } from "../shared/types";
import { CHICK_HUNGER_TIME, CHICK_SPAWN_TIME } from "../shared/constants";

export class ChickContainer extends AnimalContainer {
    constructor(position: Vector2d) {
        super(position, new ChickSprite(), EggSprite);
        this.timer = CHICK_SPAWN_TIME;
        this.hungryTimer = CHICK_HUNGER_TIME;
        this.resourceName = "eggs";
        this.bonus = 10;
        this.interactive = true;
        this.on("pointertap", () => {
            this.feed();
        });
    }
}