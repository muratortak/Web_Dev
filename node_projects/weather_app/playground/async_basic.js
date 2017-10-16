console.log('Starting app...');

setTimeout(()=>{
  console.log('Inside of callback');
}, 2000);

setTimeout(()=>{
  console.log('zero second');
}, 0);

setTimeout(function(){
  console.log('Third one');
}, 2000);

console.log('Finishing up...');
