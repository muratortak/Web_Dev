<?php
	session_start();
include 'myClasses.php';
$connection1 = new DBLink("int322_171d19");

$pid = $_GET['var'];
$count = 0;

if($_POST){
	$count = 1;
}

if($count == 1){
$u_city = $_POST['city'];
$u_area = $_POST['area'];
$u_room = $_POST['num_of_room'];
$u_price = $_POST['price'];
$u_type = $_POST['sale_rent'];
}
//$u_city = $_GET['var'];
	 //$sql = "select *from `practice` where upper(city)=upper('$u_city') and upper(area)=upper('$u_area') and price between '$u_minp' and '$u_maxp'";
	if($count == 0){
	$sql = "select *from `practice` where pid=$pid";
	$result = $connection1->query($sql);

                while(($Row = mysqli_fetch_assoc($result)) != FALSE){
                
		$city = $Row['city'];
		$area = $Row['area'];
		$price = $Row['price'];
                

		}
	}

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
if($_POST && $dataValid && $count == 1)
{
	
        //$sql = "select *from `practice` where upper(city)=upper('$u_city') and upper(area)=upper('$u_area') and price between '$u_minp' and '$u_maxp'";
        
	//$sql = "insert into `practice` (city, area, price) values('$u_city','$u_area','$u_price')";
	$sql = "update `practice` set city='$u_city', area='$u_area', price='$u_price' where pid='$pid'";
	$result = $connection1->query($sql);
        if($result){
		echo 'Works';
	}	
         	$sql2="select *from `practice` where pid='$pid'";
		$result1=$connection1->query($sql2); 
        	echo "<table width='100%' border='1'>\n";
                echo "<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
                while(($Row = mysqli_fetch_assoc($result1)) != FALSE){
	 
		echo "<tr><td><a href='admin_stuff.php?var=$pid&var2=$u_city&var3=$u_area&var4=$u_minp&var5=$u_maxp'>{$Row['pid']}</a></td>";
		echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td>{$Row['picture']}</td>";
		}
       	$count = 1;		
}
	
	echo "<a href='admin.php'>Go Back to Admin Page</a>";	
?>
<html>
<head>
<title>PHP SESSION</title>
</head>
<body>
<form method="post" action="">
       	Il:<input type="text" name=city value="<?php if($count==0){echo $city;}else{echo $u_city;} ?>" style="opacity:0.7;" onfocus="if(this.value=='Il') this.value='';"><?php echo $Error;?> 
        <br/>
        Ilce:<input type="text" name=area value="<?php if($count==0){echo $area;}else{echo $u_area;} ?>" style="opacity:0.7;"onfocus="if(this.value=='Ilce') this.value='';"><?php echo $Error;?>
<br/>	
	Satilik, Kiralik<br/>
	<select name="sale_rent">
		<option value="sale">Satilik</option>
		<option value="rent">Kiralik</option>
	</select>
	<br/>
	Fiyat
	<input type="text" name=price value="<?php if($count==0){echo $price;}else{echo $u_price;} ?>" style="opacity:0.7;" onfocus="if(this.value=='Max') this.value='';" maxlength="10">
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
	Forgot your password?
	<?php 
	echo '<a href=forgot.php?var='.$u_name.'>Click Here</a>';
	?>

</body>
</html>
