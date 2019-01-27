function serializeForm(form){
	let result = {};
	for(let i = 0; i <4; i++){
		let entry = form[i];
		result[entry.name] = entry.value;
	}
	result.keyword=result.keyword.toUpperCase();
	return result;
}

function queryNotWorked(){
	let warn = document.createElement('div');
	warn.className = "warn";
	warn.innerText="Query hasn' t worked";
	document.getElementById('query').append(warn);
}

function prepareTable(data){
	let table="<tbody>";
	for(let x in data) {
		table+="<tr>"
		if(data[x].ID)	table+="<td>"+data[x].ID+'</td>';
		if(data[x].Imie) table+='<td>'+data[x].Imie+'</td>'
		if(data[x].Nazwisko) table+='<td>'+data[x].Nazwisko+'</td>';
		if(data[x].DataUrodzenia) table+='<td>'+data[x].DataUrodzenia+'</td>'
		if(data[x].Pesel) table+='<td>'+data[x].Pesel+'</td>'
		if(data[x].Adres) table+='<td>'+data[x].Adres+'</td>';
		table+='</tr>';
	}
	table+='</tbody>';
	return table;
}

function showTable(data){ //select
	let table = prepareTable(data);
	console.log(table);
	document.getElementById('resultantTable').innerHTML=table;
}

function repaintTable(data) { //need to query for select once again
	let ar = document.createElement('div');
	ar.className = "affected";
	ar.innerText="Affected Rows: "+data;
	document.getElementById('query').append(ar);
	$.post('/list7/executeQuery.php',{keyword:'SELECT',fields:'*',table:'osoba'})
	.done((res)=>{
		res=JSON.parse(res);
		let table = prepareTable(res);
		document.getElementById('resultantTable').innerHTML=table;
	});
}

function sendQuery(query){
	$.post('/list7/executeQuery.php',query)
	.done((res)=>{
		res=JSON.parse(res);
		if(typeof(res)!=='number'){
			showTable(res);
		} else {
			repaintTable(res);
		}
	})
	.catch(()=>{
		console.log('sth on the server went wrong');
	});;
}

function analyzeQuery(){
	let query = serializeForm(document.getElementById('query'));
	console.log(query);
	if(query.keyword!=='SELECT' &&query.keyword!=='INSERT' && query.keyword!=='UPDATE' && query.keyword!=='DELETE'){
		queryNotWorked();
		return false;
	}
	sendQuery(query);
}

