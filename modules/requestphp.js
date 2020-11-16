const fetch = require('node-fetch')
async function php_req(type={},request){
    const response = await fetch(type.url,{
			method: type.method,	
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(request)
		});
    return response.json()
}
async function php_fetching(url){
    const response = await fetch(url);
    return response.json();
}
module.exports = php_req;
module.exports.php_fetch = php_fetching;