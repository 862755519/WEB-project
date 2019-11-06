function isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}


function isEmpty(str){
    if(str ==null){
      return true;
    }
    if(str == ''){
        return true;
   }
   if(str==undefined){
    return true;
   }
   return false;

}

module.exports = {
  isValidPhone,
  isEmpty
}