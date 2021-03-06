<?php
class Resource
{
    private $resource;
    
    function __construct( $res )
    {
        $this->resource=$res;
    }
    
    function fetch()
    {
//    return pg_fetch_assoc( $this->resource );

    return mysqli_fetch_assoc( $this->resource );
    }
    
    function __destruct()
    {
//    pg_free_result( $this->resource );

    mysqli_free_result( $this->resource );
    }
}

class Database
{
    private $connection;
    
    public function __construct( $configfile='database_config.php' )
    {
        if ( !file_exists( $configfile ) ) throw new Exception( "Brak pliku konfiguracyjnego" );
        require_once( $configfile );
//          $this->connection = pg_connect( "host=$server dbname=$database user=$user password=$password" );
//          if ( !is_resource( $this->connection ) ) throw new Exception( pg_last_error( $this->connection ) ); 

          $this->connection = mysqli_connect( $server, $user, $password, $database );
          if ( !is_object( $this->connection ) ) throw new Exception( mysqli_error( $this->connection ) );
        
	  /* change character set to utf8 */
        //printf("Initial character set: %s\n", mysqli_character_set_name($this->connection));

        if (!mysqli_set_charset($this->connection, "utf8")) {
            printf("Error loading character set utf8: %s\n", mysqli_error($this->connection));
            exit();
        } else {
            //printf("Current character set: %s\n", mysqli_character_set_name($this->connection));
        }
    }

    function query( $query )
    {
//          $res=pg_query( $this->connection, $query );
//          if ( !is_resource( $res ) ) throw new Exception( pg_last_error( $this->connection ) );
	//if(stripos($query, 'select')>=0 && !strpos($query, 'update') && !strpos($query, 'insert') && !strpos($query, 'delete')){
        	$res=mysqli_query( $this->connection, $query );
          	if ( !is_object( $res ) ) throw new Exception( mysqli_error( $this->connection ) );
		return new Resource( $res );
	//} else {
	//	return execute($query);
	//}
    }

    function execute($query){
		$res=mysqli_query($this->connection, $query);
		return mysqli_affected_rows($this->connection);
    }

    function __destruct()
    {
//    pg_close( $this->connection );

    mysqli_close( $this->connection );
    }
}
?>
