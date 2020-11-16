function checkSpecialChar(char){
    const regex = /^[A-Za-z0-9 ]+$/;
    const isValid = regex.test(char);
    return (!isValid? true: false)
}



module.exports = checkSpecialChar;