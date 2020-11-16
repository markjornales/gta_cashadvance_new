const datefrom = new Cleave('#datefrom-liqui',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
const dateto = new Cleave('#dateto-liqui',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
const dateliquidation = new Cleave('#dateliquidation-form',{
    date: true,
    delimiter: '-',
    datePattern: ['m','d','Y']
});
const AmountLiquidate =new Cleave('#AmountLiquidate',{
    numeral: true,
    numeralThousandsGroupStyle: 'thousand'
});

class DataTableFiltered {
    constructor(formdata){
        this.tablnewRows = [];
        this.table_totalRows = document.querySelectorAll(`${formdata.table_id} tbody tr`);
        this.TblnextButton = document.querySelector('#next-btn');
        this.TblpreviousButton = document.querySelector('#previous-btn');
        this.TblprintPreview = document.querySelector('#printpreview');
        this.showDialog = document.querySelector('.liq-background_');
        this.dialogClose = document.querySelector('#btn-liqui-close');
        this.dateFromLiq = document.querySelector('#datefrom-liqui');
        this.dateToLiq = document.querySelector('#dateto-liqui');
        this.printPreviewBtnClose = document.querySelector('#printpreviewClose');
        this.table_id = formdata.table_id;
        this.getTable_body = document.querySelector(`${this.table_id} tbody`);
        // for page start, page end, total items , total row tables
        this.totalRows = this.table_totalRows.length;
        this.pageStart = 1;
        this.total_items = formdata.total_items;
        this.pageEnd = formdata.total_items;
        this.init();
        // for data store
        this.data_liquid = {};  
    }
    init(){
        this.getuniqueid = document.querySelector('#_uniqueid').attributes['data-target']; 
        this.filteredTable(this.pageStart, this.pageEnd);
        this.TblnextButton.addEventListener('click',()=>this.nextButton());
        this.TblpreviousButton.addEventListener('click',()=>this.previousButton());
        this.TblprintPreview.addEventListener('click',()=>this.printPreview());
        this.dialogClose.addEventListener('click',()=>this.dialogClose_function());
        this.dateToLiq.addEventListener('keyup',()=>this.dateFiltered());
        this.dateFromLiq.addEventListener('keyup',()=>this.dateFiltered());
        this.printPreviewBtnClose.addEventListener('click',()=>this.closeBtn_print())
        this.tableClick();
    }
    tableClick(){
        console.log(true)
        this.table_totalRows.forEach(tableClicks=>tableClicks
            .addEventListener('click',(event)=>this.tableClick_function(event)));
    }
    dateFiltered(){
        //dateToLiq dateFromLiq 
        if(this.dateFromLiq.value.length===10&&this.dateToLiq.value.length===10){
            const jsonData = {
                datefrom_liq: this.dateFromLiq.value, 
                dateTo_liq: this.dateToLiq.value,
                unique_id: this.getuniqueid.value
            };
            this.dateSearch_table(jsonData);
            this.tableClick();
        }else{
            const pagenation = document.querySelector('#pagination');
            pagenation.style.display = 'flex';
            this.filteredTable(this.pageStart, this.pageEnd);
        }
        
    }
    async dateSearch_table(dataSet){
        try {
            const requestDate = await reqResponse({url: '/dateSearch/data', method: 'post'}, dataSet);
            this.getTable_body.innerHTML = '';
            const pagenation = document.querySelector('#pagination'); 
            if(requestDate.length > 0){
                requestDate.forEach((values, index)=>{
                    this.getTable_body.innerHTML += `
                        <tr data-target="${dataSet.unique_id}">
                            <td>${index + 1}</td>
                            <td>${values.ca_number}</td>
                            <td>${values.date_of_ca}</td>
                            <td>${values.date_needed}</td>
                            <td>${values.ca_status}</td>
                        </tr>
                    `;
                });
              
            } else {
                this.getTable_body.innerHTML=`<tr id="tableNorecord"><td id="tableRows" colspan=5>No Record</td></tr>`;
            }
            pagenation.style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }
    async printPreview(){
        if(this.dateFromLiq.value!==''&&this.dateToLiq.value!==''){
            const jsondata = {datefrom: this.dateFromLiq.value,dateto: this.dateToLiq.value,unique_id: this.getuniqueid.value};
            const requestReport = await reqResponse({url:'/liquidate/report',method:'post'},jsondata);
            const printPreview = document.querySelector('.liq-print-preview');
            printPreview.classList.add('active-liq');
            const report = await PDFObject.embed(requestReport.url_report,'#printContenet'); 
        }else{
            alert('Please input date from and date to');
        }
    }
    closeBtn_print(){
        const printPreview = document.querySelector('.liq-print-preview');
        printPreview.classList.remove('active-liq')
    }
    filteredTable(pageStart=1, pageEnd=10, tdIndex=0){
        this.getTable_body.innerHTML = ""; 
        this.table_totalRows.forEach(setdata=>{
            const { childNodes } = setdata;
            if(childNodes[tdIndex].innerText>=pageStart&&childNodes[tdIndex].innerText<=pageEnd){
                this.getTable_body.appendChild(setdata);
            }
        });
        if(this.table_totalRows.length < 1){
            this.getTable_body.innerHTML=`<tr id="tableNorecord"><td id="tableRows" colspan=5>No Record</td></tr>`;
        }
        this.pageLabel(this.pageStart, this.pageEnd, this.totalRows);
    }

    nextButton() {
        if(this.totalRows > this.pageEnd){
            this.pageStart = this.pageStart + this.total_items; 
            this.pageEnd = this.pageEnd + this.total_items;
            this.filteredTable(this.pageStart, this.pageEnd);
        }
    }
    previousButton() {
        if(this.pageStart > 1){
            this.pageStart = this.pageStart - this.total_items;
            this.pageEnd = this.pageEnd - this.total_items;
            this.filteredTable(this.pageStart, this.pageEnd);
        }
    }
    
    pageLabel(pageStart = 1, pageEnd=10, totalCount=10) {
        const count_page = document.querySelector('.count-page');
        const total_count = document.querySelector('.totalcount');
        const pageTo = pageEnd>=totalCount?totalCount:pageEnd;
        count_page.innerHTML=` ${pageStart} - ${pageTo}`;
        total_count.innerHTML=`of ${totalCount}`; 
        pageEnd >= totalCount?this.TblnextButton.classList.add('page-disabled_'):
        this.TblnextButton.classList.remove('page-disabled_');
        pageStart <= 1 ?this.TblpreviousButton.classList.add('page-disabled_'):
        this.TblpreviousButton.classList.remove('page-disabled_');
    }
    tableClick_function(event){ 
        this.ca_number = event.path[1].childNodes[1].innerText; 
        this.unique_id = event.path[1].attributes['data-target'].value;
        this.ref_liqRefresh({ca_number: this.ca_number,unique_id: this.unique_id});
        const title_page = document.querySelector('#title_headerinput');
        title_page.innerHTML = `input liquidation <span id='headerinput_span'>CA#${this.ca_number}</span>`;
        this.showDialog.classList.add('active-liq');
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
}

class Liquidation extends DataTableFiltered {
    constructor(option){
        super(option);
        this.saveForm_liq = document.querySelector('#btnliq_form');
        this.search_ref = document.querySelector('#Searchliq_ref'); 
        this.btnliq_delete = document.querySelector('#btnliq_del')
        this.btnliq_cancel = document.querySelector('#btnliq_cancel');
        this.descript_liq = document.querySelector('#descliquidation');
        this.dateliq_liq = document.querySelector('#dateliquidation-form');
        this.amountliq_liq = document.querySelector('#AmountLiquidate');
        this.setActive_d = false;
        this.setAddUpdate = true;
        this.initial();
    }
    initial(){
        removeAddCompany();
        
        addItemMenuNav('cash advance',`/cash_advance_form/${this.getuniqueid.value}`);
        this.saveForm_liq.addEventListener('click',()=>this.dataRequest());
        this.search_ref.addEventListener('keyup',()=>this.search_refnumber());
        this.btnliq_cancel.addEventListener('click',()=>this.liqCancel());
        this.btnliq_delete.addEventListener('click',()=>this.deleteLiqdate());
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
const dataTableFiltered = new Liquidation({table_id: "#datatable",total_items: 10});