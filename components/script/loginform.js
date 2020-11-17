function errline(lblcon, newclass, condition){ 
    const hightLightLabel = document.querySelector(lblcon);
    if(condition){
        hightLightLabel.classList.add(newclass) 
    } else { 
        hightLightLabel.classList.remove(newclass) 
    }
}
async function request(type={},jSondata={}){
    const request = await fetch(type.url,{
        method: type.method, 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jSondata)
    });
    return request.json();
}
class login_button {
    constructor(properties){
        this.username = document.querySelector(`#${properties.username}`);
        this.password = document.querySelector(`#${properties.password}`);
        this.login_button = document.querySelector(`#${properties.button}`);
        this.init();
    }
    init(){
        this.username.addEventListener('keyup', (evt)=> {if(evt.keyCode ===13) this.login_form()});
        this.password.addEventListener('keyup', (evt)=>{if(evt.keyCode===13) this.login_form()});
        this.login_button.addEventListener('click', ()=>this.login_form());
    }
    async login_form(){
        if(this.username.value&&this.password.value){
           const jsondata = {username: this.username.value, password: this.password.value};
           const loading = document.querySelector('#loading');
           this.username.blur();
           this.password.blur();
           loading.classList.remove('hideContent');
           const req_login = await request({url: '/login/cashadvance', method: 'post'},jsondata);
           if(req_login.error==false){
               alert(req_login.message);
                location = req_login.redirect;
           }else{
               loading.classList.add('hideContent');
               alert(req_login.message);
               this.username.value='',this.password.value='';
               errline('#usertxt-lbl','set-lbl_err',false);
               errline('#passtxt-lbl','set-lbl_err',false);
           }
        }else{
            alert('Please Input username and password');
            !this.username.value?errline('#usertxt-lbl','set-lbl_err',true):errline('#usertxt-lbl','set-lbl_err',false);
            !this.password.value?errline('#passtxt-lbl','set-lbl_err',true):errline('#passtxt-lbl','set-lbl_err',false);
        }
    }
}

new login_button({
    username: 'username',
    password: 'password', 
    button: 'loginbutton'
});