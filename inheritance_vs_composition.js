// # pseudo classical inheritance
//----------------------------------
function Robot(name, type){
    this.name = name;
    this.type = type;
    this.private_hello = function(){
        console.log(`${name} is of type ${type}`);
    }
}

Robot.prototype.public_hello = function(){
    console.log(`${this.name} is of type ${this.type}`);
};

function RobotAccessories(name,type,wheels,wireless){
    Robot.call(this,name,type);
    this.wheels = wheels;
    this.wireless = wireless;
}

RobotAccessories.prototype.printAccessories = function(){
    console.log(`${this.name} has Wheels:${this.wheels?'Yes':'No'} and Wireless:${this.wireless?'Yes':'No'}`);
};

//using setPrototypeOf keeps the existing properties on child prototype retained.
//using Object.create replaces child's prototype object
//older way to Object.create is using new Keyword. which points _proto_ of child.prototype to Parent.prototype.
Object.setPrototypeOf(RobotAccessories.prototype,Robot.prototype);
//RobotAccessories.prototype = Object.create(Robot.prototype);
//or can also use RobotAccessories.prototype = new Robot();

//demonstrating public vs private properties
var speechBot = new Robot('talkie','speech');
speechBot.name = 'hijacked';
speechBot.private_hello();
speechBot.public_hello();

//demostrating psuedo classical inheritance
//the 'new' keyword sets wheelBot's _proto_ to RobotAccessories's Prototype.
var wheelBot = new RobotAccessories('wheely','wheelbot',true,false);
wheelBot.printAccessories();

// # prototypal inheritance
//----------------------------------
//different ways to initialize object variables

//using init method
var Employee = {
    init:function(firstName,lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    },
    printName: function(){
        return this.firstName + ' ' + this.lastName;
    }
};

//Ron _proto_ is set to Employee obj.
var Ron = Object.create(Employee);
Ron.init('Ron','Elloit');
console.log(Ron.printName());


//using Object.create 2nd param.
var Employee2 = {
    printName: function(){
        return this.firstName + ' ' + this.lastName;
    }
};

var Roy = Object.create(Employee2,{
    firstName:{
        value:'Roy'
    },
    lastName:{
        value:'Roxie'
    }
});
console.log(Roy.printName());

//using factory functions
var Employee3 = {
    printName: function(){
        return this.firstName + ' ' + this.lastName;
    }
};

function EmployeeFactory(firstName,lastName){
    var lee = Object.create(Employee3);
    lee.firstName = firstName;
    lee.lastName = lastName;
    return lee;
}

var lee = EmployeeFactory('lee','hanx');
console.log(lee.printName());

//demostrate prototype chain of 3 objects
var ParentObj = {
    initParent:function(name){
        this.parentName = name;
    }
};

var ChildObj = Object.create(ParentObj,{
    initChild:{
        value:function(name){
            this.childName = name;
        }
    }
});

var GrandchildObj = Object.create(ChildObj,{
    initGranChild:{
        value:function(name){
            this.grandChildName = name;
        }
    },
    printFullName:{
        value:function(){
            return `${this.grandChildName} ${this.childName} ${this.parentName}`;
        }
    }
});

GrandchildObj.initParent('VII');
GrandchildObj.initChild('the King');
GrandchildObj.initGranChild('Henry');

console.log(GrandchildObj.printFullName());



// # ES6 Classes - extends
//----------------------------------
//typeof ParentClass - 'function'
class ParentClass{
    constructor(parentName){
        this.parentName = parentName;
    }
    printSurname(){
        return this.parentName;
    }
}

class ChildClass extends ParentClass{
    constructor(parentName,childName){
        super(parentName);
        this.childName = childName;
    }
    printFullName(){
        return this.childName + ' ' + this.parentName;
    }
}

//ronny _proto_ is ChildCLass. ChildClass _proto_ is ParentClass
var ronny = new ChildClass('Sax','Ash');
console.log(ronny.printFullName());
console.log(ronny.printSurname());


// # Composition
//----------------------------------
// Inheritance - design around 'what they are' . Composition - design around 'what they do'.
//https://medium.com/humans-create-software/composition-over-inheritance-cb6f88070205
const label = (state) => ({
    print: () => console.log(`${state.id}: This task is ${state.lb}`)
});

const sum = (state) => ({
    generate: () => state.nums.reduce((a,b)=>a+b)
});

const mul = (state) => ({
    generate: () => state.nums.reduce((a,b)=>a*b)
});

//usage
const sumGenerator = (lb,nums) => {
  let state = {
      id:1,
      lb,
      nums
  };

  return Object.assign({},label(state),sum(state));
};

const summy = sumGenerator('adder',[1,2,3,4]);
summy.print();
console.log(summy.generate());

const mulGenerator = (lb,nums) => {
    let state = {
        id:2,
        lb,
        nums
    };

    return Object.assign({},label(state),mul(state));
};

const mully = mulGenerator('multiplier',[1,2,3,4]);
mully.print();
console.log(mully.generate());