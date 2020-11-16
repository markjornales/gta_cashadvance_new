const quantity = new Cleave('#qty-ca', {
    numeral:true
});
const totalamount = new Cleave('#totalamount',{
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
const unitprice = new Cleave('#Unitprice',{
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
const caamount =new Cleave('#ca-amount',{
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
const dateneeded = new Cleave('#dateneeded',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
const dateofca = new Cleave('#dateofca',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});

class CashAdvanceForm {
    constructor(){
        this.inCar_parts = document.querySelector('#carparts');
        this.inFreight = document.querySelector('#freight');
        this.inQuantity = document.querySelector('#qty-ca');
        this.inDescription = document.querySelector('#desc');
        this.inPlateno = document.querySelector('#plateno');
        this.inUnitPrice = document.querySelector('#Unitprice');
        this.inTotalAmount = document.querySelector('#totalamount');
        this.inRequestByDep = document.querySelector('#reqdept');
        this.inName = document.querySelector('#name');
        this.inPurpose = document.querySelector('#purpose');
        this.inCAAmount = document.querySelector('#ca-amount');
        this.inDateneeded = document.querySelector('#dateneeded');
        this.inDateOfCa = document.querySelector('#dateofca');
        this.inSearchCA = document.querySelector('#search_ca');
        this.btnBack = document.querySelector('#caBtn-back');
        this.btnSaveUpdate = document.querySelector('#caBtn-SaveUpdate');
        this.btnCancel = document.querySelector('#caBtn-cancel');
        this.dataForms = document.querySelector('#form_data');
        this.gen_caNumber = document.querySelector('#generate_ca');
        this.formDropDown = document.querySelector('#contentSearchForm');
        this.dropDown_s = document.querySelector('#dropDown_S');
        this.unique_number = this.dataForms.attributes['data-target'].value;
        this.dataStore = {};
        this.set_func = true;
        this.init();
    }
    init() {
        removeAddCompany();
        this.btnCancel.classList.add('remove_btn');
        this.btnSaveUpdate.addEventListener('click',()=>this.action_buttons());
        this.btnBack.addEventListener('click',()=>location=`/cash_advance/${this.unique_number}`);
        this.inSearchCA.addEventListener('keyup',()=>this.caSearch_keyPress());
        this.btnCancel.addEventListener('click',()=>this.clearForms());
        this.inUnitPrice.addEventListener('keyup',()=>this.computeTotal());
        this.inQuantity.addEventListener('keyup',()=>this.computeTotal());
        this.getCa_number();
     
    }
    computeTotal(){
        const quantity = this.inQuantity.value?parseFloat((this.inQuantity.value).replace(',','')):0;
        const totalUnitPrice = this.inUnitPrice.value?parseFloat((this.inUnitPrice.value).replace(',','')):0;
        this.inTotalAmount.value = quantity&&totalUnitPrice?parseFloat(quantity*totalUnitPrice).toLocaleString():'';
    }
    caSearch_keyPress(){
        const search_values = this.inSearchCA.value;
        let setDataValues = [];
        this.dataStore.ca_info.filter(fvalues=>{
            if(fvalues.ca_number.match(search_values)){
                if(search_values!==''){
                    setDataValues.push(fvalues.ca_number);
                    this.ca_showDropdown(setDataValues);
                    this.formDropDown.classList.remove('hideContent');
                }else{
                    this.formDropDown.classList.add('hideContent');
                }
            }
        });
    }
    ca_showDropdown(jsondata){
        const setUlValues = this.dropDown_s;
        setUlValues.innerHTML = '';
        jsondata.forEach(getData=>{
            setUlValues.innerHTML +=`<li><a id="_caListnumber">${getData}</a></li>`;
        });
        document.querySelectorAll('#_caListnumber').forEach(value=>{
            value.addEventListener('click',(evt)=>{
                const findValues = this.dataStore.ca_info.find(findValues=>findValues.ca_number===evt.target.innerText);
                this.form_loads(findValues);
                this.refid = parseInt(findValues.refid);
                this.formDropDown.classList.add('hideContent');
                this.inSearchCA.value = '';
            })
        });
    }
    form_loads(jsonData){
        this.gen_caNumber.innerText = jsonData.ca_number;
        this.inCar_parts.value = jsonData.car_parts;
        this.inFreight.value = jsonData.freight;
        this.inQuantity.value = parseFloat(jsonData.quantity)!==0?parseInt(jsonData.quantity):'';
        this.inDescription.value = jsonData.description_ca;
        this.inPlateno.value = jsonData.plateno;
        this.inUnitPrice.value = parseFloat(jsonData.unitPrice)!==0?parseFloat(jsonData.unitPrice).toLocaleString():'';
        this.inTotalAmount.value = parseFloat(jsonData.totalAmount)!==0?parseFloat(jsonData.totalAmount).toLocaleString():'';
        this.inRequestByDep.value = jsonData.requestByDep;
        this.inName.value = jsonData.name;
        this.inPurpose.value = jsonData.purpose;
        this.inCAAmount.value = parseFloat(jsonData.ca_amount)!==0?parseFloat(jsonData.ca_amount).toLocaleString():'';
        this.inDateneeded.value = jsonData.date_needed;
        this.inDateOfCa.value = jsonData.date_of_ca;
        this.btnCancel.classList.remove('remove_btn');
        this.btnSaveUpdate.innerText = 'update';
        this.set_func=false;
    }

    action_buttons(){
        const jsondata = {
            refid: this.refid,
            ca_number: this.gen_caNumber.innerText,
            unique_id: this.unique_number,
            car_parts : this.inCar_parts.value,
            freight: this.inFreight.value,
            quantity: this.inQuantity.value,
            descriptions: this.inDescription.value,
            plate_no: this.inPlateno.value,
            unit_price: this.inUnitPrice.value,
            total_mount: this.inTotalAmount.value,
            requestByDept: this.inRequestByDep.value,
            name: this.inName.value,
            purpose: this.inPurpose.value,
            ca_amount: this.inCAAmount.value,
            dateneeded: this.inDateneeded.value,
            dateofca: this.inDateOfCa.value, 
        }
        this.requstResponse_buttons(jsondata,()=>{
            this.set_func?this.add_update(jsondata,{url: '/ca_form/add', method: 'post'}, 'do you want to save?'):
                this.add_update(jsondata,{url: '/ca_form/update', method: 'post'}, 'do you want to update?');
                
        });
        
    }
    inputValidations(inputs){
        return new Promise((resolve, reject)=>{
            if(inputs.dateneeded===''||inputs.dateofca===''){
                inputs.dateneeded===''?errline('#ca_dneedlbl','set-lbl_err',true):errline('#ca_dneedlbl','set-lbl_err',false);
                inputs.dateofca===''?errline('#ca_dateofcalbl','set-lbl_err',true):errline('#ca_dateofcalbl','set-lbl_err',false);
                reject({desc: 'reject',message: 'Please input Date CA and Date of needed'});
            } else {
                resolve({desc: 'resolve', message: ''});
            }
        })
    }
    async add_update(jsonData ,properties, message){
        try {
            if(confirm(message)){
                const response = await reqResponse({ url: properties.url, method: properties.method}, jsonData);
                if(response.mssql_error === false){
                    this.clearForms();
                    lastUpdate({datenow: getDateNow(), unique_id: jsonData.unique_id});
                    alert(response.message);
                }
            }
        } catch (error) {
            console.log(error);
        }    
    }
    async requstResponse_buttons(jsonData , callBack){
       const validation = await this.inputValidations(jsonData).then(res=>res).catch(err=>err);
       if(validation.desc==='resolve'){
           return callBack();

       }else{
           alert(validation.message);
       }
    }
    generateCaNumber(numberInput){ 
        const getYearEnd = new Date();
        const firstSeries = getYearEnd.getFullYear().toString().substr(2, 3);
        const fourNumberFormat = (inputs)=>{
            switch(inputs.length){
                case 1: return `0000${inputs}`;break;
                case 2: return `000${inputs}`;break;
                case 3: return `00${inputs}`;break;
                case 4: return `0${inputs}`;break;
                case 5: return inputs;break;
                default: return inputs;break;
            }
        };
       return `${firstSeries}-${fourNumberFormat(numberInput)}`;
    }
    async getCa_number(){
        const jsondata = {unique_id: this.unique_number};
        const ca_response = await reqResponse({url: '/cash_advance_/getca', method: 'post'},jsondata);
        this.gen_caNumber.innerText = this.generateCaNumber(ca_response.ca_number);
        this.dataStore = ca_response; 
    }
    clearForms(){
        this.inCar_parts.value='',this.inFreight.value='',this.inQuantity.value='',
        this.inDescription.value='',this.inPlateno.value='',this.inUnitPrice.value='',
        this.inTotalAmount.value='',this.inRequestByDep.value='',this.inName.value='',
        this.inPurpose.value='',this.inCAAmount.value='',this.inDateneeded.value='',
        this.inDateOfCa.value='';
        this.getCa_number();
        this.btnCancel.classList.add('remove_btn');
        this.btnSaveUpdate.innerText = 'save';
        this.set_func=true;
        errline('#ca_dneedlbl','set-lbl_err',false);
        errline('#ca_dateofcalbl','set-lbl_err',false)
    }
}
const cash_advance = new CashAdvanceForm;


 