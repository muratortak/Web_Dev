 var square = (x) => {
   var result = x*x;
   return result;
 };

 console.log(square(9));
//if you have only one parameter you can take
//out the paranthesis around the x parameter
 var square2 = (x) =>(x*x);
 console.log(square2(2));

var user = {
  name: 'Murat',
  //this keyword does not work with arrow functions
  //to make the 'this' keyword work, we use the syntax in sayHiAlt function
  sayHi: ()=>{
    console.log(arguments);
    console.log(`Hi I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi I'm ${this.name}`);
  }
}

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);
