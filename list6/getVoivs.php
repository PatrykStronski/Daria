<?php
    $dbhost = "127.0.0.1:3306";
    $dbuser = "root";
    $con = mysqli_connect($dbhost, $dbuser);
    mysqli_set_charset($con,"utf8");
    if($con) {
        $db = mysqli_select_db($con,'fedokredo');
        $res = mysqli_query($con,'SELECT * FROM wojewodztwa;');
        $arr = array();
        while($r = mysqli_fetch_assoc($res)){
            $arr[]=$r;
        }
        echo json_encode($arr);
        mysqli_free_result($res);
    } else {
        die(400);
    }
?>
