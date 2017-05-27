<?php
	session_start();
include 'myClasses.php';
$connection1 = new DBLink("int322_171d19");

$u_city = $_POST['city'];
$u_area = $_POST['area'];
$u_room = $_POST['num_of_room'];
$u_price = $_POST['price'];
$u_type = $_POST['sale_rent'];

$Error = "";
$dataValid = true;
if($_POST)
{
         if ($_POST['city'] == "") {
                $Error = "Error - you must fill in a first name";
                $dataValid = false;
        }
         if ($_POST['area'] == "") {
                $Error = "Error - you must fill in a password";
                $dataValid = false;
        }
}
if($_POST && $dataValid)
{
	
        $sql = "insert into `practice` (city, area, price) values('$u_city', '$u_area', '$u_price')";
        
	$result = $connection1->query($sql);
        if($result){
		echo 'Works';
	}

	  $get_result = "select *from `practice` where pid=last_insert_id()"; 
        	$result2 = $connection1->query($get_result);
        	 echo "<table width='100%' border='1'>\n";
                echo "<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
                while(($Row = mysqli_fetch_assoc($result2)) != FALSE){
		$pid = $Row['pid'];

		echo $pid;
                $sql_pic = "select link from `pic` where pid='$pid'";
		$result_pic = $connection1->query($sql_pic);
		$row_pic = mysqli_fetch_assoc($result_pic); 
		echo "<tr><td><a href='admin_stuff.php?var=$pid&var2=$u_city&var3=$u_area&var4=$u_minp&var5=$u_maxp'>{$Row['pid']}</a></td>";
		echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td>{$Row['picture']}</td>";
		}
}
	echo "<a href='admin.php'>Go Back to Admin Page</a>";
?>
<html>
<head>
<title>PHP SESSION</title>
</head>
<body>
<form method="post" action="">
       	Il:<input type="text" name=city value="Il" style="opacity:0.7;" onfocus="if(this.value=='Il') this.value='';"><?php echo $Error;?> 
        <br/>
        Ilce:<input type="text" name=area value="Ilce" style="opacity:0.7;"onfocus="if(this.value=='Ilce') this.value='';"><?php echo $Error;?>
<br/>	
	Satilik, Kiralik<br/>
	<select name="sale_rent">
		<option value="sale">Satilik</option>
		<option value="rent">Kiralik</option>
	</select>
	<br/>
	Fiyat
	<input type="text" name=price value="Max" style="opacity:0.7;" onfocus="if(this.value=='Max') this.value='';" maxlength="10">
	<br/>	
	<select name="num_of_room">
		<option value="1+1">1+1</option>
		<option value="2+1">2+1</option>
		<option value="3+1">3+1</option>
		<option value="4+1">4+1</option> 
	</select>
<br/>
<input type="submit">
</form>
	<br>
	
</body>
</html>
