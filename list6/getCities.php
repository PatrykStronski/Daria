<?php
$dbhost = "127.0.0.1:3306";
$dbuser = "root";
$wid = $_POST['wid'];
$con = mysqli_connect($dbhost,$dbuser);
if($con){
	mysqli_select_db($con,'fedokredo');
	$ret = mysqli_query($con,"SELECT Mid,nazwa FROM miasta WHERE Wid=$wid;");
	$arr = array();
	while($r = mysqli_fetch_assoc($ret)){
		$arr[] = $r;
	}
	echo json_encode($arr);
	mysqli_free_result($ret);
} else {
	die(400);
}
?>
