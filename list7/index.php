<?php
require('core.php');
?>
<!DOCTYPE html>
<html>
<head>
<title>Tworzenie tabeli</title>
<link href="/list7/index.css" type="text/css" rel="stylesheet">
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

<script src="/list7/index.js"></script>
</head>

<body>

Dane tej tabeli:
<table border="1" id="resultantTable">
<?php
    try 
    {
		
      $db=new Database();
      $result=$db->query( "select * from osoba" );
      while ( $row=$result->fetch() )
      {
        echo "<tr>";
        foreach ( $row as $col ) echo "<td>$col</td>";
        echo "</tr>";      
      }
      $db=null;
    }
    catch ( Exception $e )
    {
        echo $e->getMessage();
    }
?> 
</table>

<h4>Wpisz swoje zapytanie tutaj</h4>
<form onsubmit="analyzeQuery();event.preventDefault();" id="query">
<label for="keyword"> Keyword</label>
<input name="keyword" type="text" placeholder="select/update/delete" required>
<label for="fields" type="text"> Fileds from the table  </label>
<input name="fields" type="text" placeholder="fields">
<label for="table" type="text"> Table name  </label>
<input name="table" type="text" placeholder="table" required>
<label for="where" type="text"> WHERE clause  </label>
<input name="where" type="text" placeholder="condition">


<input type="submit" value="GO">
</form>

<!---<hr><h2> Zrodlo pliku </h2>
<?php 
show_source(__FILE__);
?>-->

</body>
</html>
