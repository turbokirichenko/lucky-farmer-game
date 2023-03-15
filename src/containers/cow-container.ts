import { CowSprite } from "../sprites/cow-sprite";
import { MilkSprite } from "../sprites/milk-sprite";
import { AnimalContainer } from "../prefabs/animal-container";
import { Vector2d } from "../shared/types";
import { COW_HUNGER_TIME, COW_SPAWN_TIME } from "../shared/constants";

export class CowContainer extends AnimalContainer {
    constructor(position: Vector2d) {
        super(position, new CowSprite(), MilkSprite);
        this.timer = COW_SPAWN_TIME;
        this.hungryTimer = COW_HUNGER_TIME;
        this.resourceName = "milk";
        this.bonus = 30;
        this.interactive = true;
        this.on("pointertap", () => {
            this.feed();
        })
    }
}