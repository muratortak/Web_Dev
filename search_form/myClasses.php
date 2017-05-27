<?php
 class DBLink {
  private $link;
  public function __construct ($database_name) {
   $link = mysqli_connect ("host", "user", 
"password");
   mysqli_select_db ($link, $database_name);
   $this -> link = $link;
   }
  function query ($sql_query) {
   $result = mysqli_query ($this -> link, $sql_query);
   return $result;
   }
  function __destruct() {
   mysqli_close ($this -> link);
   }
  }
 ?>
