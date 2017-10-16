var getUser = (id, testing) => {
  var user = {
    id: id,
    name: 'Vikram'
  };


  testing(user);
  setTimeout (()=>{
    console.log();
  })
};


getUser(31, (userObject) => {
  console.log(userObject);
});
