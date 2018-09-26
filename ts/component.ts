export default class Component {

    public CreatingSomeClass(): any {
        let element: any = document.createElement('div');
        element.innerHTML = 'component class';
        element.classList.add('hello');
        // Add the image to our existing div.
        return element;
    }
}
