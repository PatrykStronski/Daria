<?php
require('core.php');
$db = new Database();

function processSelectQuery(){
	$output = $_POST['keyword'].' '.$_POST['fields'].' FROM '.$_POST['table'];
	if($_POST['where']){
		$output.=' WHERE '.$_POST['where'];
	} 
	$output.=';';
	return $output;
}

function processExecuteQuery(){
	$output=$_POST['keyword'];
	if($_POST['keyword']=='UPDATE'){
		$output.=' '.$_POST['table'].' SET '.$_POST['fields'];
		if($_POST['where']){
			$output.=' WHERE '.$_POST['where'];
		}
		$output.=';';
	} else	{
	       	if ($_POST['keyword']=='DELETE') {
			$output.=' FROM '.$_POST['table'].' WHERE '.$_POST['where'].';';
		} else {
			if ($_POST['keyword']=='INSERT'){
				$output.=' INTO '.$_POST['table'].' VALUES '.$_POST['fields'].';';
			}
		}
	}
	return $output;
}

if($_POST['keyword']=='SELECT'){
	$query =  processSelectQuery();
	$result = $db->query($query);
	$ress = array();
	while($res = $result->fetch()){
		$ress[] = $res;
	}
	echo json_encode($ress);
} else {
	$query =  processExecuteQuery();
	$result = $db->execute($query);
	echo $result;
}
$db=NULL;
?>
