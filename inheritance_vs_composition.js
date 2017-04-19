// # pseudo classical inheritance (pre-ES6, prototypal inheritance)
//----------------------------------
function Robot(name,type){
    this.name = name;
    this.type = type;
    this.private_hello = function(){
        console.log(`${name} is of type ${type}`);
    }
}

Robot.prototype.public_hello = function(){
    console.log(`${this.name} is of type ${this.type}`);
};

function EnhancedRobot(name,type,wheels,wireless){
    Robot.call(this,name,type);
    this.wheels = wheels;
    this.wireless = wireless;
}

EnhancedRobot.prototype.printAccessories = function(){
    console.log(`${this.name} has Wheels:${this.wheels?'Yes':'No'} and Wireless:${this.wireless?'Yes':'No'}`);
};

//using setPrototypeOf (ES6) keeps the existing properties on child prototype retained.
Object.setPrototypeOf(EnhancedRobot.prototype,Robot.prototype);

//using Object.create (ES5.1) replaces child's prototype object.
//requires fixing contructor reference.
//EnhancedRobot.prototype = Object.create(Robot.prototype);
//EnhancedRobot.prototype.constructor = EnhancedRobot;

//older way to Object.create is using new keyword which also creates a new object with
//_proto_ of child prototype pointing to parent prototype but has constructor side effects.
//also requires fixing contructor reference.
//EnhancedRobot.prototype = new Robot();
//EnhancedRobot.prototype.constructor = EnhancedRobot;

//demonstrating public vs private properties
var speechBot = new Robot('talkie','speech');
speechBot.name = 'hijacked';
speechBot.private_hello();
speechBot.public_hello();

//demostrating psuedo classical inheritance
//the 'new' keyword sets wheelBot's _proto_ to EnhancedRobot's prototype.
var wheelBot = new EnhancedRobot('wheely','wheelbot',true,false);
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



// # pseudo classical inheritance (ES6, prototypal inheritance)
//----------------------------------
//typeof ParentClass - 'function'
class ParentClass{
    constructor(parentName){
        this.parentName = parentName;
    }
    getSurname(){
        return this.parentName;
    }
}

class ChildClass extends ParentClass{
    constructor(parentName,childName){
        super(parentName);
        this.childName = childName;
    }
    getFullName(){
        return this.childName + ' ' + this.parentName;
    }
}

//ronny _proto_ is ChildCLass.prototype.
//ChildClass.prototype _proto_ is ParentClass.prototype.
//ChildClass _proto_ is ParentClass (statics).
var ronny = new ChildClass('Sax','Ash');
console.log(ronny.getFullName());
console.log(ronny.getSurname());


// # Composition
//----------------------------------
// Composition is a 'has a' relationship instead of an 'is a' with inheritance.
// Compositional Inheritance is an interface implemented around a composed object
// which alows for polymorphism with the parent instance.

function Robot(name,type){
    this.name = name;
    this.type = type;
    this.accessories = new RobotAccessories(name,true,false);
}

Robot.prototype.public_hello = function(){
    console.log(`${this.name} is of type ${this.type}`);
};

function RobotAccessories(name,wheels,wireless){
    this.name = name;
    this.wheels = wheels;
    this.wireless = wireless;
}

RobotAccessories.prototype.printAccessories = function(){
    console.log(`${this.name} has Wheels:${this.wheels?'Yes':'No'} and Wireless:${this.wireless?'Yes':'No'}`);
};

var speechBot = new Robot('talkie','speech');
speechBot.public_hello();
speechBot.accessories.printAccessories();

function EnhancedRobot(name,type,wheels,wireless){
    this.name = name;
    this.type = type;
    this.accessories = new RobotAccessories(name,wheels,wireless);
}

EnhancedRobot.prototype.public_hello = function(){
    console.log(`${this.name} is of type ${this.type}`);
};

EnhancedRobot.prototype.printAccessories = function(){
    return this.accessories.printAccessories();
};

function RobotAccessories(name,wheels,wireless){
    this.name = name;
    this.wheels = wheels;
    this.wireless = wireless;
}

RobotAccessories.prototype.printAccessories = function(){
    console.log(`${this.name} has Wheels:${this.wheels?'Yes':'No'} and Wireless:${this.wireless?'Yes':'No'}`);
};

var speechBot2 = new EnhancedRobot('talkie2','speech',false,true);
speechBot2.public_hello();
speechBot2.printAccessories();
