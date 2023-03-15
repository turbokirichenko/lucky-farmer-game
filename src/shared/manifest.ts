import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "entities",
            assets: {
                "chick": "assets/chick.json",
                "cow": "assets/cow.json",
                "corn": "assets/corn.png",
            }
        },
        {
            name: "objects",
            assets: {
                "corn-bucket": "assets/corn-bucket.png",
                "egg": "assets/egg.png",
                "milk": "assets/milk.png",
            }
        }, 
        {
            name: "tiles",
            assets: {
                "tile-1": "assets/tile-1.png",
                "tile-2": "assets/tile-2.png",
                "tile-3": "assets/tile-3.png",
            }
        },
        {
            name: "sound",
            assets: {
                "forklift-effect": "sound/forklift-effect.wav"
            }
        }
    ]
}