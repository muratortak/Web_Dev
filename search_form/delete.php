<?php
	include 'myClasses.php';
	$pid = $_GET['var'];
	$con = new DBLink("int322_171d19");
	echo "Delete page for the ads";
	
	$sql = "delete  from `practice` where pid=$pid";
	$result = $con->query($sql);
	$sql_pic = "delete from `pic` where pid=$pid";
	$result_pic = $con->query($sql_pic);
	
	if($result&&$result_pic){
		echo "Deletion is successful\n";
		echo "<a href='admin.php'>Go Back</a>";
	}
?>
