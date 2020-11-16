new Cleave('#datefrom-liqui',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
new Cleave('#dateto-liqui',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
new Cleave('#dateliquidation-form',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
new Cleave('#AmountLiquidate',{
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});
class DataTable {
    constructor(prop, data){
        this.tableid = prop.table_id;
        this.limitrows = prop.norows;
        this.tableBody = document.querySelector(`#${this.tableid} tbody`);
        this.dataStore = data;
        this.pages = {
            pageStart: 1,
            pageEnd: this.limitrows,
            pagelimit: this.limitrows
        };
        this.unique_id = document.querySelector('#_uniqueid').attributes[2].value;
        this.showDialog = document.querySelector('.liq-background_');
        this.saveForm_liq = document.querySelector('#btnliq_form');
        this.search_ref = document.querySelector('#Searchliq_ref'); 
        this.btnliq_delete = document.querySelector('#btnliq_del')
        this.btnliq_cancel = document.querySelector('#btnliq_cancel');
        this.descript_liq = document.querySelector('#descliquidation');
        this.dateliq_liq = document.querySelector('#dateliquidation-form');
        this.amountliq_liq = document.querySelector('#AmountLiquidate');
        this.dialogClose = document.querySelector('#btn-liqui-close');
        this.setActive_d = false;
        this.setAddUpdate = true;
        this.init();
    }
    init(){
       this.displayData(this.pages.pageStart, this.pages.pageEnd);
       document.querySelector('#next-btn').addEventListener('click',()=>this.nextPage());
       document.querySelector('#previous-btn').addEventListener('click',()=>this.previousPage());
       this.saveForm_liq.addEventListener('click',()=>this.dataRequest());
       this.search_ref.addEventListener('keyup',()=>this.search_refnumber());
       this.btnliq_cancel.addEventListener('click',()=>this.liqCancel());
       this.btnliq_delete.addEventListener('click',()=>this.deleteLiqdate());
       this.dialogClose.addEventListener('click',()=>this.dialogClose_function());
    }
     
    displayData(pageStart, pageEnd){
        let tr = ''; 
        if(this.dataStore.length <=0){
            tr+= '<tr id="tableNorecord"><td id="tableRows" colspan=5>No Record</td></tr>';
        }else{
            this.dataStore.forEach((dataSet, index)=>{
                  const rows = index + 1;
                 if(rows>= pageStart && rows <= pageEnd){
                    tr+=`<tr>
                            <td>${dataSet.no}</td>
                            <td>${dataSet.ca_number}</td>
                            <td>${dataSet.date_of_ca}</td>
                            <td>${dataSet.date_needed}</td>
                            <td>${dataSet.ca_status}</td>
                        </tr>`;
                 }
            });
        }
        this.tableBody.innerHTML = tr;
        this.tableClick();
        this.pagelabel();
    }
    nextPage(){
        if(this.dataStore.length > this.pages.pageEnd){
            this.pages.pageStart = this.pages.pageEnd + 1;
            this.pages.pageEnd = this.pages.pageEnd + this.pages.pagelimit; 
            this.displayData(this.pages.pageStart, this.pages.pageEnd);
        }
    }
    previousPage(){ 
        if(this.pages.pageStart > 1){
            this.pages.pageStart = this.pages.pageStart - this.pages.pagelimit;
            this.pages.pageEnd = this.pages.pageEnd - this.pages.pagelimit;
            this.displayData(this.pages.pageStart, this.pages.pageEnd);
        }
    }
    pagelabel(){
        const pageLabel = document.querySelector('#page-label');
        const nextPageBtn= document.querySelector('#next-btn');
        const previousBtn = document.querySelector('#previous-btn');
        const pageEndpage = this.pages.pageEnd>this.dataStore.length?this.dataStore.length:this.pages.pageEnd;
        pageLabel.innerText = `page ${this.pages.pageStart} - ${pageEndpage} of ${this.dataStore.length}`;
        this.pages.pageStart <= 1?previousBtn.classList.add('page-disabled_'):previousBtn.classList.remove('page-disabled_');
        this.pages.pageEnd< this.dataStore.length?nextPageBtn.classList.remove('page-disabled_'):nextPageBtn.classList.add('page-disabled_')
    }
    tableClick(){
        document.querySelectorAll(`#${this.tableid} tbody tr`).forEach(data=>{
            data.addEventListener('click',(evt)=>{
                this.ca_number = evt.path[1].cells[1].innerText;
                this.ref_liqRefresh({ca_number: this.ca_number,unique_id: this.unique_id});
                const title_page = document.querySelector('#title_headerinput');
                title_page.innerHTML = `input liquidation <span id='headerinput_span'>CA#${this.ca_number}</span>`;
                this.showDialog.classList.add('active-liq');
            })
        });
    }

    async ref_liqRefresh(jsondata){ 
        try {
            this.data_liquid={};
            const liqd_refno = await reqResponse({url: '/liquidate',method: 'post'},jsondata);
            this.displayRef = document.querySelector('#liqrefno');
            this.data_liquid = liqd_refno;
            let uniquekeys =  Math.random().toString(36).substr(2, 3);
           if(this.data_liquid.liqref!==null){
               this.displayRef.innerHTML = `LIQ-F${this.data_liquid.liqref + 1}${uniquekeys}`;
           }
           
        } catch (error) {
            console.log(error);
        }
    }

    liqCancel(){
        this.clearData_forms();
    }
    dialogClose_function(){
        this.clearData_forms();
        this.showDialog.classList.remove('active-liq');
    }
    deleteLiqdate(){
        const json_data = {ca_number: this.ca_number , refno: this.displayRef.innerText, 
            descript: this.descript_liq.value,date: this.dateliq_liq.value, amount: this.amountliq_liq.value,
            refid: this.setRef_id, unique_id: this.unique_id};
        this.process_forms(json_data,()=>{
            this.dynamic_button({url: '/liquidate/delete_input', method: 'post'},json_data,'Do you want to Delete?');
        });
    }
    async dynamic_button(options, json_data, messagedialog){
        if(confirm(messagedialog)){
            try { 
               const request_php  = await reqResponse({url: options.url ,method: options.method },json_data);
                if(request_php.mssql_error===false){
                    this.clearData_forms();
                    const datasent = {
                        ca_number: json_data.ca_number,
                        unique_id: json_data.unique_id
                    }
                    const status_update = await reqResponse({url: '/checkstat/data', method: 'post'}, datasent);
                    alert(request_php.message);
                }
            } catch (error) {
                console.log(error);
            } 
        }
    }
    async process_forms(json_data, callBack){
        const checkInputs = this.checkInputs(json_data).then(data=>data).catch(err=>err);
        const resultInput = await checkInputs;
        if(resultInput.message!=='completed'){
            alert(resultInput.message);
        } else {
            return callBack();
            
        } 
    }
     dataRequest(){
        const json_data = {ca_number: this.ca_number , refno: this.displayRef.innerText, 
            descript: this.descript_liq.value,date: this.dateliq_liq.value, amount: this.amountliq_liq.value,
            refid: this.setRef_id, unique_id: this.unique_id};
        this.process_forms(json_data,()=>{
                this.setAddUpdate?this.dynamic_button({url:'/liquidate/add_input',method: 'post'}, json_data, 'Do you want to Add?'):
                this.dynamic_button({url:'/liquidate/update_input',method: 'post'}, json_data, 'Do you want to update?');
                lastUpdate({datenow: getDateNow(), unique_id: this.unique_id});
        });
    }
    checkInputs(inputs){
         return new Promise((resolve, reject)=>{
            if(inputs.descript===''||inputs.date===''||inputs.amount===''){
                inputs.descript===''?errline('#liq-des-lbl_','set-lbl_err',true):errline('#liq-des-lbl_','set-lbl_err',false)
                inputs.date===''?errline('#liq-date-lbl_','set-lbl_err',true):errline('#liq-date-lbl_','set-lbl_err',false);
                 inputs.amount===''?errline('#liq-amount-lbl','set-lbl_err',true): errline('#liq-amount-lbl','set-lbl_err',false);
                reject({message: 'please complete all necessary info'})
            } else {
                errline('#liq-date-lbl_','set-lbl_err',false)
                errline('#liq-des-lbl_','set-lbl_err',false)
                errline('#liq-amount-lbl','set-lbl_err',false)
                resolve({message: 'completed'});
            }
         });
    }
    search_refnumber(){
       const search_value = this.search_ref.value; 
       this.liqs_sug = document.querySelector('#liqi_search');
       let setvalues = [];
        this.data_liquid.liquidation.filter(value=>{
            if(value.liqrefno.match(search_value.toUpperCase())){
                if(search_value!==''){
                    setvalues.push(value.liqrefno);
                    this.liqui_dropdown(setvalues);
                    this.liqs_sug.classList.add('set_active_')
                    this.setActive_d = true;
                }else{
                    this.liqs_sug.classList.remove('set_active_')
                }
            }else {
                this.liqui_dropdown(setvalues);
            }
        })
    }
    liqui_dropdown(data){
        const setUlvalues = document.querySelector('#ul_liqsearch');
        setUlvalues.innerHTML = '';
        data.forEach(setdata=>{
            setUlvalues.innerHTML += `<li><a id="_liqdrop">${setdata}</a></li>`; 
        })
        document.querySelectorAll('#_liqdrop').forEach(value=>{
            value.addEventListener('click',(evt)=>{
                const findValue=this.data_liquid.liquidation.find(findVal=>findVal.liqrefno===evt.target.innerText);
                this.liqRetrievedData(findValue);
                this.setRef_id = parseInt(findValue.refid);
                this.liqs_sug.classList.remove('set_active_')
                this.search_ref.value='';
            })
        })
    }
    liqRetrievedData(dataSet){
        this.descript_liq.value = dataSet.liqd_description;
        this.dateliq_liq.value = dataSet.liqd_date;
        this.amountliq_liq.value = parseFloat(dataSet.liqd_amount).toLocaleString();
        this.displayRef.innerText = dataSet.liqrefno;
        this.saveForm_liq.innerText = 'Update';
        this.btnliq_delete.classList.remove('remove_btn');
        this.btnliq_cancel.classList.remove('remove_btn'); 
        this.setAddUpdate = false;
    }
    clearData_forms(){ 
        this.descript_liq.value = '',this.dateliq_liq.value = '',this.amountliq_liq.value ='';
        this.ref_liqRefresh({ca_number: this.ca_number,unique_id: this.unique_id});
        this.saveForm_liq.innerText = 'save';
        this.btnliq_delete.classList.add('remove_btn');
        this.btnliq_cancel.classList.add('remove_btn');
        if(this.setActive_d===true){
            this.liqs_sug.classList.remove('set_active_')
        }
        this.search_ref.value='';
        this.setAddUpdate = true;
    }
}

(async function(){
    const json_data =  [];
    removeAddCompany();
    const getuniqueid = document.querySelector('#_uniqueid'); 
    const print_button = document.querySelector('#printpreview');
    const printdialog = document.querySelector('.liq-print-preview');
    const printdialog_close = document.querySelector('#btn-print-close');
    const searchCA = document.querySelector('#search-ca');
    const TblprintPreview = document.querySelector('#printPreview_select');
    const dateFromLiq = document.querySelector('#datefrom-liqui');
    const dateToLiq = document.querySelector('#dateto-liqui');
    const inCAreport = document.querySelector('#ca-report-no'); 
    addItemMenuNav('cash advance',`/cash_advance_form/${getuniqueid.attributes[2].value}`);
    const passData = {get_id : getuniqueid.attributes[2].value};
    const getData = await reqResponse({url: '/cainfor', method: 'post'},passData);
    const {cash_advances} = getData;
    json_data.push(cash_advances);
    const dataTable = new DataTable({table_id: 'datatable', norows: 10}, json_data[0]);
    print_button.addEventListener('click',()=>printdialog.classList.add('active-liq'));
    printdialog_close.addEventListener('click',()=>printdialog.classList.remove('active-liq'));
    searchCA.addEventListener('keyup',(evt)=>{
        const find_ca = json_data[0].find(data=>data.ca_number===evt.target.value);
        if(find_ca!==undefined){
            new DataTable({table_id: 'datatable', norows: 10}, [find_ca]);
        }else if(evt.target.value===''){
            new DataTable({table_id: 'datatable', norows: 10}, json_data[0]);
        }
    });
    TblprintPreview.addEventListener('click', async ()=>{
        if(dateFromLiq.value!==''&&dateToLiq.value!==''&&inCAreport.value===''){
            const jsondata = {datefrom: dateFromLiq.value, dateto: dateToLiq.value, unique_id: getuniqueid.attributes[2].value};
            const requestReport = await reqResponse({url:'/liquidate/report',method:'post'},jsondata); 
            const report = await PDFObject.embed(requestReport.url_report,'#printContenet'); 
        } if(inCAreport.value!==''){
            dateFromLiq.value='',dateToLiq.value='';
            const json_data = { ca_number: inCAreport.value,unique_id: getuniqueid.attributes[2].value };
            const requestReport = await reqResponse({url:'/perca/report',method:'post'},json_data); 
            const report = await PDFObject.embed(requestReport.url_report,'#printContenet');
        }
        else{
            alert('Please input date from and date to or per ca number');
        }
    });
})();
