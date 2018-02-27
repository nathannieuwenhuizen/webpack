import component from './component';

let comp: component = new component();
document.body.appendChild(comp.CreatingSomeClass());

function hello(name: string) {
    return "hello " + name;
}

console.log(hello("Matt"));
