import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "entities",
            assets: {
            }
        },
        {
            name: "objects",
            assets: {
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