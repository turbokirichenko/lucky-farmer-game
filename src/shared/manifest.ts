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
            name: "images",
            assets: {
                "sky-background": "assets/farm-background.gif",
                "start": "assets/start.png"
            }
        },
        {
            name: "tiles",
            assets: {
                "tile-1": "assets/tile-1.png",
                "tile-2": "assets/tile-2.png",
                "tile-3": "assets/tile-3.png",
                "tile-left": "assets/tile-left.png",
                "tile-left-top": "assets/tile-left-top.png",
                "tile-left-bottom": "assets/tile-left-bottom.png",
                "tile-right": "assets/tile-right.png",
                "tile-right-top": "assets/tile-right-top.png",
                "tile-right-bottom": "assets/tile-right-bottom.png",
                "tile-center": "assets/tile-center.png",
                "tile-top": "assets/tile-top.png",
                "tile-bottom": "assets/tile-bottom.png",
            }
        },
        {
            name: "effects",
            assets: {
                "light-effect": "assets/light-effect.json",
                "fire-loop": "assets/fire-effect.json"
            }
        },
        {
            name: "sound",
            assets: {
                "forklift-effect": "sound/forklift-effect.wav"
            }
        },
        {
            name: "fonts",
            assets: {
                "PixeloidMono": "fonts/PixeloidMono.ttf"
            }
        }
    ]
}