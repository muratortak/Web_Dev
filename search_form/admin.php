<?php
include 'myClasses.php';

$con = new DBLink("int322_171d19");	

$sql="select *from `practice` order by pid asc";
$result=$con->query($sql);

echo "<a href='add.php'>Add New Ads</a>";

echo "<table width='100%' border='1'>\n";
                echo 
"<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
while(($Row = mysqli_fetch_assoc($result)) != FALSE){
                $pid = $Row['pid'];
                
                $sql_pic = "select link from `pic` where pid='$pid'";
                $result_pic = $con->query($sql_pic);
                $row_pic = mysqli_fetch_assoc($result_pic); 
                echo "<tr><td><a href='admin_stuff.php?var=$pid&var2=$u_city&var3=$u_area&var4=$u_minp&var5=$u_maxp'>{$Row['pid']}</a></td>";
                echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td>{$Row['picture']}</td>";
		echo "<td><a href='change.php?var=$pid'>Change</a></td>";
		echo "<td><a href='delete.php?var=$pid'>Delete</a></td>";
                }    



?>
