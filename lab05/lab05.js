function validateForm() {
    clearError();
    return validFirstName() && validLastName() && validPassword() && validRpassword() && validatePhone() && check();
    
}



function validFirstName() {
    var passAlpha = false;
    var alphaString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-'";
    var elem = document.querySelector("#Fname");
    var inputValue = elem.value.trim();
    
    if (inputValue.length === 0) {
        document.querySelector("#error").innerHTML = "<p>No input! Please enter a meaningful First name with at least one Alphabet letter</p>";
        elem.focus();
        return false;
    }
    for (var i = 0; i < inputValue.length; i++){
        if(alphaString.indexOf(inputValue.substr(i,1)) >= 0) 
        passAlpha = true;
    }
    
    if(!passAlpha){
        
        document.querySelector("#error").innerHTML="<p>No input! Please enter a meaningful First name with at least one Alphabet letter</p>";
        elem.focus();
        return false;
    } 
   
    return true;
}


function validLastName(){
    var passAlpha = false;
    var alp = true;
    var alphaString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var elem = document.querySelector("#Lname");
    var inputValue = elem.value.trim();
    

    if(inputValue.length == 0){
        document.querySelector("#error2").innerHTML="<p>No input! Please enter a meaningful Last name with at least one Alphabet letter</p>";
        elem.focus();
        return false;
    }
    for(var i = 0; i < inputValue.length; i++){
        if(alphaString.indexOf(inputValue.substr(i,1)) >= 0) 
        passAlpha = true;

    }
    
    if(!passAlpha){
        document.querySelector("#error2").innerHTML="<p>No input! Please enter a meaningful Last name with at least one Alphabet letter</p>";
        elem.focus();
        return false;
    } 
    return true;
}

function validPassword() {
    var ps = true;
    var ps1 = false;
    var pwd1 = document.querySelector("#password");
    var pwd = pwd1.value.trim();
    var len = pwd.length;
    var alphaString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   if(len < 8) {
        document.querySelector("#error3").innerHTML="<p>Must be more than 8</p>";
        pwd1.focus();
        return false;
    }
    
      
        
   for(var i = 0; i < len; i++){
    
        if(parseInt(pwd[i]) != pwd[i]){
            ps = false;
        }else{
            ps = true;
        }
   }
        
        if(!ps){
            document.querySelector("#error3").innerHTML="<p>Has to be at least 1 number</p>";
           pwd1.focus();
            return false;
        }
    return true;
}

function validRpassword(){
    var psr = true;
    var psr1 = false;
    var pwdr1 = document.querySelector("#Rpassword");
    var pwdr = pwdr1.value.trim();
    var lenr = pwdr.length;
    var alphaString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
   if(lenr < 8) {
        document.querySelector("#error4").innerHTML="<p>Must be more than 8</p>";
        pwdr1.focus();
        return false;
    }
    
      
        
   for(var i = 0; i < lenr; i++){
    
        if(parseInt(pwdr[i]) != pwdr[i]){
            psr = false;
        }else{
            psr = true;
        }
   }
        
        if(!psr){
            document.querySelector("#error4").innerHTML="<p>Has to be at least 1 number</p>";
           pwdr1.focus();
            return false;
        }
     
    
    if(signup.password.value != signup.Rpassword.value){
        document.querySelector("#error4").innerHTML="<p>NOT EQUAL</p>";
        return false;
    }
    
    return true;
    
}

function validatePhone(){
    var str = document.querySelector("#Pnumber").value;
    str = str.trim();
    var len = str.length;
    
    if(len == 0){
        document.querySelector("#error5").innerHTML = "<p>Can't be empty</p>";7
        str.focus();
        return false;
    }
    
    if(str.charAt(3) != '-' || str.charAt(7) != '-' || len !== 12){
        document.querySelector("#error5").innerHTML = "<p>Phone number is in wrong format</p>";
        return false;
    }else{
        var i, pho = true; arr = str.split('-');
        for (i = 0; i < 3; i++){
            if(parseInt(arr[i]) != arr[i]){
                pho = false;
                break;
            }else if(parseInt(arr[i]) == 0){
                document.querySelector("#error5").innerHTML = "<p>Phone number can't be all zero</p>";
                str.focus();
                return false;
            }
        }
        if(!pho){
            document.querySelector("#error5").innerHTML = "<p>Phone number is in wrong format</p>";
            str.focus();
            return false;
        }
    }
    return true;
}

function check(){
    var radio = document.signup.education_type.length;
    var onechecked = false;
    
    for(var i = 0;  i < radio; i++){
        if(document.signup.education_type[i].checked == true){
            onechecked = true;
        }
    }
    
    if(!onechecked){
        document.querySelector("#error6").innerHTML = "<p>None checked</p>";
        return false;
    }
    
    return true;
}
    



function clearError(){
    document.querySelector("#error").innerHTML = "";
    document.querySelector("#error2").innerHTML = "";
    document.querySelector("#error3").innerHTML = "";
    document.querySelector("#error4").innerHTML = "";
    document.querySelector("#error5").innerHTML = "";
    document.querySelector("#error6").innerHTML = "";
}

