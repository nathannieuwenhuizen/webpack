import GridElement from './GridObjects/GridObject';
import {gridElementTypes} from './GridObjects/GridObject';

export default class Grid extends Phaser.Group
{

    /* Contains all the elements */
    private _elements: GridElement[];

    private _gridBlockSize: number;
    private _blocksOnX: number;
    private _blocksOnY: number;

    /* The size of the grid blocks in pixels */
    public get gridBlockSize(): number
    {
        return this._gridBlockSize;
    }
    public set gridBlockSize(value: number)
    {
        this._gridBlockSize = value;
        this.resize();
    }

    /* How many blocks there are on the X axis */
    public get blocksOnX(): number
    {
        return this._blocksOnX;
    }
    public set blocksOnX(value: number)
    {
        this._blocksOnX = value;
        this.resize();
    }

    /* How many blocks there are on the Y axis */
    public get blocksOnY(): number
    {
        return this.blocksOnY;
    }
    public set blocksOnY(value: number)
    {
        this._blocksOnY = value;
        this.resize();
    }

    /* Get one or multiple elements with the given properties */
    public get(element?: GridElement, gridX?: number, gridY?: number, type?: gridElementTypes, args?: {property: string, value: any}[]): GridElement[] | GridElement
    {

        let foundItems: GridElement[];

        this.forEach((currentElement: GridElement) => {

            if (element && element !== currentElement) { return false; }
            if (gridX && element.gridPos.x !== gridX) { return false; }
            if (gridY && element.gridPos.y !== gridY) { return false; }
            if (type && element.gridElementType !== type) { return false; }
            for (let i: number = args.length; i--; )
            {
                if (args[i] && element[args[i].property] && element[args[i].property] !== args[i].value) { return false; }
            }

            foundItems.push(currentElement);
        });

        if (foundItems.length > 1)
        {
            return foundItems;
        }
        else if (foundItems.length === 1)
        {
            return foundItems[0];
        }

        return null;
    }

    /* Add an element to the array */
    public add(element: GridElement, forceOverwite: boolean = true): boolean
    {
        if (element.gridPos.x < this.blocksOnX || element.gridPos.y < this.blocksOnY) { return false; }

        if (forceOverwite === true && this.get(null, element.gridPos.x, element.gridPos.y) !== null)
        {
            this.destroyElement(element);
        }

        this._elements.push(element);
        this.addChild(element);

        this.resizeElement(element);

        return true;
    }

    /* Returning false in the callback will destroy the element */
    public forEach(callback: (element: GridElement, gridX?: number, gridY?: number, index?: number) => boolean): void
    {

        for (let i: number = this._elements.length; i--; )
        {
            let element: GridElement = this._elements[i];

            let shouldDestroy: boolean = callback(element, element.gridPos.x, element.gridPos.y);
            if (shouldDestroy === true) {
                this.destroyElement(element);
            }

        }

    }

    /* Resize the whole grid and all it's elements */
    public resize(): void
    {
        this.forEach((element: GridElement, gridX: number, gridY: number) => {

            this.resizeElement(element);

            return false;
        });
    }

    /* Resize a single element in the grid */
    public resizeElement(element: GridElement): void
    {
        element.x = element.gridPos.x * this.gridBlockSize;
        element.y = element.gridPos.y * this.gridBlockSize;
    }

    /* Find and destroy an element */
    public destroyElement(element: GridElement): void
    {
        this.forEach( (currentElement: GridElement, x: number, y: number, index: number) => {

            if (element === currentElement)
            {
                this.removeChild(this._elements[index]);
                this._elements[index].destroy(true);
                this._elements[index] = null;

                this._elements.splice(index, 1);
            }

            return false;
        });

    }

    /* Destroy the grid and all it's elements */
    public destroy(): void
    {
        for (let i: number = this._elements.length; i--; )
        {
            this.removeChild(this._elements[i]);
            this._elements[i].destroy(true);
            this._elements[i] = null;
        }

        this._elements = null;

    }

}
