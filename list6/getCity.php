<?php
$mid = $_POST["mid"];
$dbhost = "127.0.0.1:3306";
$dbuser = "root";
$con = mysqli_connect($dbhost,$dbuser);
mysqli_select_db($con,"fedokredo");
$data = mysqli_query($con,"SELECT * FROM miasta WHERE Mid=$mid");
while($r = mysqli_fetch_assoc($data)){
	echo json_encode($r);
}
?>
