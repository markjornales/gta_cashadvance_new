function checkSpecialChar(char){
    const regex = /^[A-Za-z0-9 ]+$/;
    const isValid = regex.test(char);
    return (!isValid? true: false)
}

function curDate(){
    const dateToday = new Date();
    const dateMonth = dateToday.getMonth() + 1;
    const dates = dateToday.getDate();
    const year = dateToday.getFullYear();
    return `${year}-${dateMonth}-${dates}`;
}

function check_login(req, res, next){
    if(req.session.username&&req.session.password){
         next();
    }else{
      res.redirect('/login/cashadvance');
    }
} 
function checkIfallReadyLogin(req, res, next){
    if(req.session.username&&req.session.password){ 
        res.redirect('/');
    }else{ 
        next();
    }
}
module.exports.check_login = check_login;
module.exports.checkIfallReadyLogin = checkIfallReadyLogin;
module.exports.charValidation = checkSpecialChar;
module.exports.curDate = curDate;