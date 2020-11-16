const arrayEditAdd = [];
function EditOrAdd(editOrAdd, dataTarget=0){
    this.values = {
        add: ['add company','save', true],
        edit: ['update company','update', false, dataTarget]
    };
    this.editOrAdd = this.values[editOrAdd];
}
async function sendRequest(datainput){
    try {
        if(confirm(datainput.dialogMessage)){
            const response = await reqResponse({url:'/request', method: 'post'},datainput.jsondata);
            response.status==='error'?addLabel_text(response.error):addLabel_text('', false)
            if(response.mssqlStatus===true){
                datainput.inputCompany.value='';
                alert(response.message)
            }
        }
    } catch(err){
        console.log(err)
    }
}
function addLabel_text(message, condition){
    const subtext_alert=document.querySelector('.subcontent-txt label');
    const hightLightLabel = document.querySelector('.company-lbl');
    if(condition){
        hightLightLabel.classList.add('company-err')
        subtext_alert.innerHTML=message;
    } else {
        hightLightLabel.classList.remove('company-err')
        subtext_alert.innerHTML=message;
    }
}
async function requestCreate(){
    const inputCompany = document.querySelector("#input-companyname");
    const unique_id = `_${Math.random().toString(36).substr(2, 7)}`;
    const jsondata = {
        unique_id: unique_id,
        company_name: inputCompany.value,
        dateCreated: getDateNow(),
        editOrAdd: arrayEditAdd[0][2],
        dataTarget: arrayEditAdd[0][3]
    };
    if(inputCompany.value!==''){
        if(arrayEditAdd[0][2]){
            sendRequest({
                dialogMessage: 'Do you want to add?',
                inputCompany: inputCompany,
                jsondata: jsondata
            });
        } else {
            sendRequest({
                dialogMessage: 'Do you want to Update?',
                inputCompany: inputCompany,
                jsondata: jsondata
            });
        }
    } else {
        alert('Please Input Company Name');
    }  
}
const titleDialog = document.querySelector('.title-dialog'); 
const btnAddCompany = document.querySelector('#addCompany-btn');
const addCompany = document.querySelector('#addcompany');
const editCompany = document.querySelectorAll('.btn-icon-items_');
const closeAddCompany = document.querySelector('#btnclose-dialog');
const createCompDialog =  document.querySelector('.create-company-dialog');
addCompany.addEventListener('click',()=>{
    createCompDialog.classList.add('active');
    arrayEditAdd.push(new EditOrAdd('add').editOrAdd);
    titleDialog.innerText = arrayEditAdd[0][0];
    btnAddCompany.innerText = arrayEditAdd[0][1];
});
editCompany.forEach(btnValues=>{
    btnValues.addEventListener('click',(event)=>{
        createCompDialog.classList.add('active');
        arrayEditAdd.push(new EditOrAdd('edit',event.target.attributes[2].value).editOrAdd);
        titleDialog.innerText = arrayEditAdd[0][0];
        btnAddCompany.innerText = arrayEditAdd[0][1]; 
    }); 
});
closeAddCompany.addEventListener('click',()=>{
    createCompDialog.classList.remove('active');
    location = '/';
});
btnAddCompany.addEventListener('click', requestCreate);
