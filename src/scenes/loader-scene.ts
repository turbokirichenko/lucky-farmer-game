import { Container, Assets, Sprite } from 'pixi.js'
import { MESSAGE_COMMON_SIZES } from '../shared/constants';
import { LoadingBarContainer } from '../containers/loading-bar-container';
import { SceneManager } from '../entities/scene-manager';
import { IScene } from '../shared/types';
import { GameScene } from './game-scene';
import { manifest } from '../shared/manifest';
import { sound } from "@pixi/sound";

export class LoaderScene extends Container implements IScene {
    private _loadingBar: LoadingBarContainer;
    private _pressStart: Container | null;

    constructor() {
        super();

        const loaderBarWidth = 240;
        this._loadingBar = new LoadingBarContainer(loaderBarWidth);
        this._loadingBar.x = (SceneManager.width - this._loadingBar.width)/2;
        this._loadingBar.y = (SceneManager.height)/2;
        this.addChild(this._loadingBar);

        this._pressStart = null;

        this.initLoader()
            .then(() => {
                this._loadingBar.alpha = 0;
                this._pressStart = this.drawButton();
                this._pressStart.x = SceneManager.width/2;
                this._pressStart.y = SceneManager.height/2;
                this._pressStart.interactive = true;
                this._pressStart.on("pointertap", () => {
                    this.loaded();
                });
                this.addChild(this._pressStart);
            })
    }

    async initLoader(): Promise<void> {
        await Assets.init({manifest: manifest});
        const bundlesIds = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this._loadingBar.scaleProgress(progressRatio);
    }

    private loaded(): void {
        sound.play("forklift-effect");
        SceneManager.changeScene(new GameScene(SceneManager.width, SceneManager.height))
    }

    private drawButton(): Container {
        const container = new Container();
        const image = Sprite.from('start');
        image.anchor.set(0.5);
        image.x = 0;
        image.y = 0;
        image.width = MESSAGE_COMMON_SIZES["Small"].width;
        image.height = image.width/4;
        container.addChild(image);
        return container;
    }

    update(): void {
        //...
    }

    resize(parentWidth: number, parentHeight: number): void {
        this._loadingBar.x = (parentWidth - this._loadingBar.width)/2;
        this._loadingBar.y = (parentHeight)/2;

        if (this._pressStart) {
            this._pressStart.x = parentWidth/2;
            this._pressStart.y = parentHeight/2;
        }
    }
}