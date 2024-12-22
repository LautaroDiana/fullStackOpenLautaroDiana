// Variables

const x = 1
let y = 5
console.log(x, y) // 1, 5
y += 10
console.log(x, y) // 1, 15
y = 'sometext'
console.log(x, y) // 1, sometext
// x = 4 // Error

// Arrays

const t = [1, -1, 3]

t.push(5) // [1, -1, 3, 5]

console.log(t.length) // 4
console.log(t[1]) // -1

t.forEach(value => {
    console.log(value) // prints 1, -1, 3, 5 in different lines
})

// Concat

// A menudo, React emplea elementos del paradigma de programacion 
// funcional, que tienen por caracteristica la inmutabilidad de las
// estructuras de datos. En ese caso, vamos a preferir usar el metodo
// .concat() antes que .push(), que va a crear un array igual con el 
// a concatenar.

const t1 = [1, -1, 3]
const t2 = t1.concat(5)

console.log(t1) // [1, -1, 3]
console.log(t2) // [1, -1, 3, 5]

// Map

// Crea un nuevo array al que le aplica una funcion a cada
// elemento de un array existente

const numbs = [1, 2, 3]
const multipliedBy2 = numbs.map(value => value * 2)
console.log(multipliedBy2) // [2, 4, 6]

const listArray = numbs.map(value => `<li>${value}</li>`)
console.log(listArray) //[ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]

// Asignacion de desestructuracion

const arrayEx = [1, 2, 3, 4, 5]
const [first, second, ...rest] = arrayEx
console.log(first)
console.log(second)
console.log(rest)

// Objetos literales

const object1 = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD"
}
const object2 = {
    name: "Full Stack web application development",
    level: "intermediate studies",
    size: 5
}
const object3 = {
    name: {
        first: "Dan",
        last: "Abramov"
    },
    grades: [2, 3, 5, 3],
    department: "Stanford University"
}

// Notacion de punto
console.log(object1.name) // Arto Hellas

// Notacion de corchetes
console.log(object1["age"]) // 35

// Agregar propiedades a un objeto luego de declaracion
object1.address = "Helsinki"
object1["secret number"] = 12341 // Si el nombre de la propiedad tiene
                                // un espacio en el medio, hay que 
                                //utilizar notacion de corchetes

// Funciones

// Funciones flecha
const sum = (p1, p2) => {
    return p1 + p2
}

const result = sum(1, 5)
console.log(result) // 6

// Si hay un solo parametro, se pueden excluir los parentesis
const square = p => {
    console.log(p)
    return p * p
}

// Si la funcion contiene una sola expresion, se pueden obviar
// las llaves

const square2 = p => p * p

// Esta forma es util para los metodos de manipulacion de arrays (como 
// .map())

const anArray = [1, 2, 3]
const squaredArray = anArray.map(p => p * p)
console.log(squaredArray) // [1, 4, 9]

// Declaracion de funcion (con palabra clave function)

function product(a, b) {
    return a * b
}

// Declaracion mediante expresion de funcion (asignando la 
// funcion declarada a una variable)

const average = function(a, b) {
    return (a + b) / 2
}

// Objetos y metodos

const arto = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD",
    greet: function() {
        console.log("Hello, my name is " + this.name)
    }
}

arto.greet()

// Los metodos se pueden definir despues de declarar el objeto
arto.growOlder = function() {
    this.age += 1
}

console.log(arto.age) // 35
arto.growOlder()
console.log(arto.age) // 36

// Contexto de un metodo.

// Podemos tener un metodo que acepte argumentos por fuera del metodo
// pero no tendra acceso a los atributos internos. Por ejemplo

arto.doAddition = function(a, b) {
    console.log(a + b)
}

// Puedo usar una variable referenciando a dicho metodo
const referenceToAddition = arto.doAddition
referenceToAddition(10, 15) // 25

// Pero no puedo hacer esto con los metodos que hacen llamadas a los
// atributos del objeto, como el metodo .greet() que llama al atributo
// .name

const referenceToGreet = arto.greet
referenceToGreet() // Hello, my name is undefined 

// Uno de los casos donde puede ocurrir esto es usando setTimeout
setTimeout(arto.greet, 1000) // Hello, my name is undefined 

// Una manera de solucionarlo es utilizar el metodo bind, que crea una 
// nueva funcion this obligada a llamar al objeto Arto
setTimeout(arto.greet.bind(arto), 1000)

// Clases

// JavaScript no tiene un mecanismo de clase como los de los lenguajes 
// orientados a objetos. Sin embargo, puede simular clases.

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`)
    }
}

const adam = new Person("Adam Ondra", 29)
adam.greet()