const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let generator = function () {
  let conf = "";
  for (let i = 0; i < 6; i++) {
     let pos = Math.floor(Math.random() * givenSet.length);
     conf += givenSet[pos];
  }
  return conf;
}

export default generator;