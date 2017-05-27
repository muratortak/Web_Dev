<?php
include 'myClasses.php';

$pid_1 = $_GET['var'];
$city = $_GET['var2'];
$area=$_GET['var3'];
$minp=$_GET['var4'];
$maxp=$_GET['var5'];
$page=1;
if (isset($pid_1)){
	echo"you already logged in";
	$connection1= new DBLink("user");
	$get_info_qry="select *from `practice` where pid='$pid_1'";
	$run_qry=$connection1->query($get_info_qry);
		if($run_qry){
		echo "<table width='100%' border='1'>\n";
		echo "<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
			while(($Row=mysqli_fetch_assoc($run_qry))){
		$pid = $Row['pid'];
		$sql_pic="select link from `pic` where pid='$pid'";
		$result_pic =$connection1->query($sql_pic);
		$row_pic = mysqli_fetch_assoc($result_pic);
		echo "<tr><td>{$Row['pid']}</td>";
                echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td><img src='"."{$row_pic['link']}"."'/></td>";
			
			}
		}
echo"<p><a href='login2.php?var=$city&var2=$area&var3=$minp&var4=$maxp&var5=$page'>Go Back</a></p>";
}else{
}
?>
