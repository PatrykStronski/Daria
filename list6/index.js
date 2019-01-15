function printCity(data){
	let ht = '<section class="firstPart"><img class="coatOfArms" src="'+data.herb+'"> <section class="info"> <h4>'+data.nazwa+'</h4><div class="desc">'+data.opis+'</div><div class="info"> <div class="infoItem"> Powierzchnia: '+data.powierzchnia+' </div><div class="infoItem"> Populacja: '+ data.populacja+' </div><div class="infoItem"> Prezydent: '+data.prezydent+' </div> </div></section> </section><section class="middlify"><img src='+data.obrazek+'></section>';
	document.getElementById('cityInfo').innerHTML=ht;	
}

function getCity(city){
	$.post("/list6/getCity.php",{mid:city})
	.done((data) => {
		document.getElementById('cityInfo').innerHTML="";
		printCity(JSON.parse(data));
	})
	.catch(()=>{
		console.log("cannot connect to server? mor to db");
	});
}
function showCities(wid) {
	$.post("/list6/getCities.php",{'wid':wid})
	.done((data) => {
		document.getElementById("cities").innerHTML="";
		fillTable("cities",JSON.parse(data),getCity);
	});
}


function fillTable(elemId, data, onclk) { //data is an array of elements to be inserted in JSON format
    let sel = document.createElement('select');
    document.getElementById(elemId).append(sel);
    sel.onchange = () => {
	    onclk(event.target.value);
    };
    let option1 = document.createElement('option');
    option1.disabled = true;
    option1.selected = true;
    option1.innerText = "Choose...";
    sel.appendChild(option1);
    for (let x in data) {
        let option = document.createElement('option');
	let id = data[x].Wid || data[x].Mid;
	option.value = id;
        option.innerText = data[x].Nazwa || data[x].nazwa;
        sel.appendChild(option);
    }
}


var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState===4) {
    	fillTable('voiv', JSON.parse(xhr.responseText),showCities);
    } 
}
xhr.open('POST', '/list6/getVoivs.php',true);
xhr.send();
