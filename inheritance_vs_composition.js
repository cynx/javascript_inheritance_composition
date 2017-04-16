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
var wheelBot = new RobotAccessories('wheely','wheelbot',true,false);
wheelBot.printAccessories();