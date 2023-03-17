import { Container, FederatedPointerEvent } from "pixi.js";
import { IDraggable } from "../shared/types";

export class DraggableContainer extends Container implements IDraggable {
    private _draggable: boolean = false;

    public get draggable() {
        return this._draggable;
    }

    public set draggable(value: boolean) {
        this._draggable = value;
    }

    private _targetData: DraggableContainer | null;

    public onStart: () => void;
    public onMove: () => void;
    public onEnd: () => void;

    constructor() {
        super();
        this.interactive = true;
        this._targetData = null;
        this.onStart = this.onMove = this.onEnd = () => {};
        this.on("pointerdown", this.onDragStart);
        this.on("pointerup", this.onDragEnd);
        this.on("pointerupoutside", this.onDragEnd);
    }

    onDragStart(): void {
        if (this.draggable) {
            this._targetData = this;
            this.alpha = 0.8;
            this.on("globalpointermove", this.onDragMove);
            this.onStart();
        }
    }

    onDragEnd(): void {
        if (this._targetData) {
            this.off("globalpointermove", this.onDragMove);
            this._targetData.alpha = 1;
            this._targetData = null;
            this.onEnd();
        }
    }

    onDragMove(event: FederatedPointerEvent): void {
        if (this._targetData) {
            this._targetData.parent.toLocal(event.global, undefined, this.position);
            this.onMove();
        }
    }
} 