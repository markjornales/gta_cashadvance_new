function removeAddCompany(){
    const disable_addcompany = document.querySelector('.addcompany-list-active');
    disable_addcompany.style.display = 'none'; 
}
function addItemMenuNav(ItemName, linkRoute){
    const returnvalue = document.querySelectorAll('.add-items li');
    const additems = document.querySelector('.add-items');
    additems.innerHTML = `<li><a href="${linkRoute}">${ItemName}</a></li>`;
    returnvalue.forEach(keyvalue=>{
        additems.append(keyvalue)
    })
}
function errline(lblcon, newclass, condition){ 
    const hightLightLabel = document.querySelector(lblcon);
    if(condition){
        hightLightLabel.classList.add(newclass) 
    } else { 
        hightLightLabel.classList.remove(newclass) 
    }
}
function getDateNow(){
    const dates = new Date();
    const days = dates.getDate();
    const months = dates.getMonth();
    const Fullyear = dates.getFullYear(); 
    const PM_AM = dates.getHours()>=1&&dates.getHours()<=12?'AM':'PM';
    const STANDARD_TIME_HOURS = dates.getHours()>=12&&dates.getHours()<=24?dates.getHours()-12:dates.getHours();
    const STANDARD_TIME_MINUTES = dates.getMinutes();
    const format_hours = STANDARD_TIME_HOURS<10?`0${STANDARD_TIME_HOURS}`:STANDARD_TIME_HOURS;
    const format_minutes = STANDARD_TIME_MINUTES<10?`0${STANDARD_TIME_MINUTES}`:STANDARD_TIME_MINUTES;
    const STARDARD_TIME = `${format_hours}:${format_minutes} ${PM_AM}`;
    const format_days = days<10?`0${days}`:days;
    const MONTHS_STR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${MONTHS_STR[months]} ${format_days}, ${Fullyear} ${STARDARD_TIME}`;
} 
async function reqResponse(type={},jSondata={}){
    const request = await fetch(type.url,{
        method: type.method, 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jSondata)
    });
    return request.json();
}

async function lastUpdate(data){
    try {
        const request = await reqResponse({url: '/update/data', method: 'post'}, data);
    } catch (error) {
        console.log(error);
    }
}
const dropDownClick = document.querySelector("#drop-downmenu");
const targetClass = document.querySelector('.menu-btn-logo, .dropdown-list-control ul li a');
const logout = document.querySelector('#logout-btn');
dropDownClick.addEventListener('click',()=>{
        document.querySelector('.dropdown-list-control').classList.toggle('openmenu');
});
window.addEventListener('click',(event)=>{
    if(!(event.target===targetClass)){
        document.querySelector('.dropdown-list-control').classList.remove('openmenu');
    } 
});
logout.addEventListener('click',async ()=>{
    if(confirm('do you want to logout?')){
        const logout = await fetch('/logout/cashadvance',{
            method: 'post',
            headers: {'Content-Type': 'application/json'}
        });
        const logoutLocation = await logout.json();
        location = logoutLocation.redirect;
    }
});