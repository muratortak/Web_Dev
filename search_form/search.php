<?php
	session_start();
include 'myClasses.php';
$connection1 = new DBLink("user");
$from = 0;
$from = $_GET['var5'];


if($_POST){
	$from = 0;
}

if($from != 1 || $from ==0){
$u_city = $_POST['city'];
$u_area = $_POST['area'];
$u_room = $_POST['num_of_room'];
$u_minp = $_POST['price_min'];
$u_maxp = $_POST['price_max'];
$u_type = $_POST['sale_rent'];
}else{
$u_city = $_GET['var'];
$u_area = $_GET['var2'];
$u_minp = $_GET['var3'];
$u_maxp = $_GET['var4'];
$from = 0;
	 $sql = "select *from `practice` where upper(city)=upper('$u_city') and upper(area)=upper('$u_area') and price between '$u_minp' and '$u_maxp'";
	$result = $connection1->query($sql);

	 echo "<table width='100%' border='1'>\n";
                echo "<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
                while(($Row = mysqli_fetch_assoc($result)) != FALSE){
                
		$pid = $Row['pid'];
                echo "<tr><td><a href='protectedstuff.php?var=$pid&var2=$u_city&var3=$u_area&var4=$u_minp&var5=$u_maxp'>{$Row['pid']}</a></td>";
                echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td>{$Row['picture']}</td>";

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
if($_POST && $dataValid && $from!=1)
{
	
	
	
        $sql = "select *from `practice` where upper(city)=upper('$u_city') and upper(area)=upper('$u_area') and price between '$u_minp' and '$u_maxp'";
        
	$result = $connection1->query($sql);
        if($result){
		echo 'Works';
	}
	$count = mysqli_num_rows($result);
	echo $count;

	
        if($count > 0)
        {
         	 
        	   echo "<table width='100%' border='1'>\n";
                echo "<tr><th>ID</th><th>City</th><th>Area</th><th>Price</th><th>Picture</th>\n";
                while(($Row = mysqli_fetch_assoc($result)) != FALSE){
		$pid = $Row['pid'];

		echo $pid;
                $sql_pic = "select link from `pic` where pid='$pid'";
		$result_pic = $connection1->query($sql_pic);
		$row_pic = mysqli_fetch_assoc($result_pic); 
		echo "<tr><td><a href='ad_detail.php?var=$pid&var2=$u_city&var3=$u_area&var4=$u_minp&var5=$u_maxp'>{$Row['pid']}</a></td>";
		echo "<td>{$Row['city']}</td>";
                echo "<td>{$Row['area']}</td>";
                echo "<td>{$Row['price']}</td>";
                echo "<td>{$Row['picture']}</td>";
       	
		}         


	}else{
                echo "wrong password and username";
        }
}

	$from = 0;
?>
<html>
<head>
<title>PHP SESSION</title>
</head>
<body>
<form method="post" action="">
       	City:<input type="text" name=city value="Il" style="opacity:0.7;" onfocus="if(this.value=='City') this.value='';"><?php echo $Error;?> 
        <br/>
        Area:<input type="text" name=area value="Ilce" style="opacity:0.7;"onfocus="if(this.value=='Area') this.value='';"><?php echo $Error;?>
<br/>	
	Sale, Rent<br/>
	<select name="sale_rent">
		<option value="sale">Sale</option>
		<option value="rent">Rent</option>
	</select>
	<br/>
	Price Range
	<br/>
	<input type="text" name=price_min value="Min" style="opacity:0.7;" onfocus="if(this.value=='Min') this.value='';">
	<input type="text" name=price_max value="Max" style="opacity:0.7;" onfocus="if(this.value=='Max') this.value='';" maxlength="10">
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
