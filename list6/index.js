function printCity(data){
	let ht = '<img class="coatOfArms" src="'+data.obrazek+'"> <section class="info"> <h4>'+data.nazwa+'</h4><div class="desc">'+data.opis+'</div><div class="info"> <div class="infoItem"> Powierzchnia: '+data.powierzchnia+' </div><div class="infoItem"> Populacja: '+ data.populacja+' </div><div class="infoItem"> Prezydent: '+data.prezydent+' </div><div class="infoItem"> Papież: Jego ekscelencja magnificencja Jan Paweł II </div> </div> </section>'
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
    for (let x in data) {
        let li = document.createElement('li');
	let id = data[x].Wid || data[x].Mid;
        li.onclick = () => {
		onclk(id);
        }
        li.innerText = data[x].Nazwa || data[x].nazwa;
        document.getElementById(elemId).append(li);
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
