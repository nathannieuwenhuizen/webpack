export default class component {
    constructor(){
    }
    
    public CreatingSomeClass(): any {
        var element: any = document.createElement('div');
        element.innerHTML = 'component class';
        element.classList.add('hello');
        // Add the image to our existing div.
        return element;
    } 
}
