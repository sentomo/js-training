function outputObjectList(object) {
  console.log("======property======");
  for(let key in object) {
    console.log(key);
  }
  
  console.log("======value======");
  for(let value in object) {
    console.log(object[value]);
  }

}

let object = {a:0, b:1, c:2, d:3};
outputObjectList(object);