// exports.myDateTime = function () {
//     return Date();
//   };

const myDateTime = () => {
  return Date() + "--DATE";
}

module.exports = {
  mod_dt: myDateTime,
}