require('dotenv').config();
const express = require('express'); 
const session = require('express-session');
const bcrypt = require('bcrypt');
const charValidation = require('./modules/validation');
const php_req = require('./modules/requestphp');
const app = express();

app.set('view engine', 'pug');
app.set('views', './pages')
app.use(express.static('./components'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ 
    secret: process.env.SECRET_SESSIONS,
    resave: false,
    saveUninitialized: false
}));

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
app.get('/login/cashadvance',checkIfallReadyLogin, (req, res)=>{
    res.render('loginform');
});


app.get('/',  check_login , async function homePage(req, res){
    try {
        const resphp =  await php_req.php_fetch('http://localhost:8080/PHP_Server/datapass?companynames=get');
        res.render('createCompany',{List_items: resphp});
   } catch (error){
       res.status(404).send(error)
   }
});
app.post ('/cainfor',async (req, res)=>{
    try {
        const data = req.body;
        const reqdata =  await php_req({
            url: 'http://localhost:8080/PHP_Server/datapass?cashadvance=getData',
            method:'post'},
            data
        ); 
        res.send(reqdata);
    } catch (error) {
        res.send(error)
    }
});
app.get('/cash_advance/:id', check_login, async (req, res)=>{
    try {
        const datapass = {
            get_id : req.params.id
        }; 
        const reqfetch = await php_req({
            url: 'http://localhost:8080/PHP_Server/datapass?cashadvance=getData',
            method:'post'},
            datapass
        );   
        res.render('liquidation',{ca_data: reqfetch});

    } catch (error) {
        res.status(400).send(error);
    }
});
app.get('/cash_advance_form/:id', check_login, (req, res)=>{ 
    res.render('cashadvance',{unique_id: req.params.id});
});
app.post('/logout/cashadvance',check_login,(req, res)=>{
        req.session.username = '';
        req.session.password = '';
        res.send({
            redirect: '/login/cashadvance'
        });
})
app.post('/login/cashadvance',checkIfallReadyLogin, async(req, res)=>{
    try { 
        const selectdata = await php_req({url:'http://localhost:8080/php_server/datapass?logingtc', method:'post'}, req.body);
        const username = req.body.username===selectdata.username;
        const password = bcrypt.compareSync(req.body.password, selectdata.password);
        if(password && username){
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            res.send({
                error: false,
                message: 'success login',
                redirect: '/'
            })
        }else{
            res.send({
                error: true,
                message: 'please check your username and password'
            })
        } 
    } catch (error) {
       res.send(error)
    }
});
app.post('/cash_advance_/getca', async (req, res)=>{
    try {
        const request_data = await php_req({url: 'http://localhost:8080/php_server/datapass?getca=info',
        method: 'post'},req.body);
        res.send(request_data);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/ca_form/add',async (req, res)=>{
    try {
        const request_data = await php_req({url: 'http://localhost:8080/php_server/datapass?addform_ca=addca',
         method: 'post'},
        req.body);
        res.send(request_data);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/ca_form/update',async (req, res) => {
    try {
        const request_data = await php_req({url: 'http://localhost:8080/php_server/datapass?updateform_ca=updateca',
        method: 'post'},req.body);
        res.send(request_data); 
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/request' , async (req, res) => { 
    try {
        const specialChar = charValidation(req.body.company_name);
        if(specialChar===true){
            res.send({
                status: 'error',
                error: 'Invalid input please Remove Special Characters'
            })
        } else {
            if(req.body.editOrAdd){
                const response_php = await php_req({
                    url:'http://localhost:8080/PHP_Server/datapass?passdata=true',
                    method: 'post'},req.body)
                res.send(response_php);
            } else {
                const response_edit = await php_req({
                    url: 'http://localhost:8080/PHP_Server/datapass?editData=true',
                    method: 'post'
                },req.body)
                res.send(response_edit); 
            }
        }
    }
    catch(error){
           res.status(400).send(error);
    }
});

app.post('/liquidate', async (req, res) => {
    try { 
        const liquidate = await php_req({
            url: 'http://localhost:8080/PHP_server/datapass?liqdate=getliq',
            method: 'post'}, 
            req.body
        ); 
        res.send(liquidate);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/liquidate/add_input', async (req, res) => {
    try {
        const send_data = await php_req({
            url: 'http://localhost:8080/php_server/datapass?liq_add=setliq', 
            method: 'post'} , 
            req.body
        );
        res.send(send_data);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/liquidate/update_input',async (req, res)=>{
    try {
        const send_data = await php_req({url: 'http://localhost:8080/php_server/datapass?liq_update=setupdate',
        method: 'post'},req.body);
        res.send(send_data);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/liquidate/delete_input',async (req, res) => {
    try { 
        const send_deleteData = await php_req({url: 'http://localhost:8080/php_server/datapass?liq_delete=deleted',
        method: 'post'},req.body);
        res.send(send_deleteData);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/liquidate/report',async (req, res)=>{
    try { 
       const requestreport = await php_req({url: 'http://localhost:8080/php_server/report?genreport',method: 'post'},req.body); 
        res.send(requestreport);
    } catch (error) {
        res.status(404).send(error);
    }
});
app.post('/perca/report',async(req, res)=>{
    try {
        const reqreport  = await php_req({url: 'http://localhost:8080/php_server/report?perca_report', method: 'post'}, req.body);
        res.send(reqreport);
    } catch (error) {
        res.status(404).send(error);
    }
})
app.post('/update/data', async (req, res)=>{
    try {
        const sendrequest = await php_req({url: 'http://localhost:8080/php_server/datapass?lastupdate=lastupdate', method: 'post'}, req.body);
        res.send(sendrequest);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post('/dateSearch/data',async (req, res)=>{
    try {
        const requestDate = await php_req({url: 'http://localhost:8080/php_server/datapass?datesearch',method: 'post'},req.body);
        res.send(requestDate);
    } catch (error) {
        res.status(404).send(error);
    }
});
app.post('/checkstat/data', async (req, res)=>{
    try {
        const req_stat = await php_req({url: 'http://localhost:8080/php_server/datapass?updatestat',method: 'post'}, req.body);
        res.send(req_stat);
    } catch (error) {
        res.status(404).send(error);
    }
});


app.listen(process.env.PORT||3000,()=>console.log(`Starting port..`));