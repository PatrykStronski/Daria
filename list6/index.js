function insertCities(cities){
	console.log(cities);
}

function showCities(wid) {
	let cxhr = new XMLHttpRequest();
    	if (cxhr.status === 200 && cxhr.readyState===4) {
		insertCities(JSON.parse(cxhr.responseText));
	}
	cxhr.open('POST', '/list6/getCities.php',true);
	//cxhr.setRequestHeader("Content-type","appication/x-www-form-urlencoded");
	cxhr.send("wid=1");
}


function fillTable(elemId, data) { //data is an array of elements to be inserted in JSON format
    for (let x in data) {
        let li = document.createElement('li');
        li.onclick = () => {
            showCities(data[x].Wid);
        }
        li.innerText = data[x].Nazwa;
        document.getElementById(elemId).append(li);
    }
}


var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState===4) {
    	fillTable('voiv', JSON.parse(xhr.responseText));
    } 
}
xhr.open('POST', '/list6/getVoivs.php',true);
xhr.send();
