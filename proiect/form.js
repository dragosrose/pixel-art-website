function validateForm(){
    var user_name = document.forms["form"]["name"].value;
    var email = document.forms["form"]["email"].value;
    var subject = document.forms["form"]["subject"].value;
    var message = document.forms["form"]["message"].value;

    var array = [user_name, email, subject, message];

    for(i=0;i<array.length; i++){
        if(array[i] == ""){
            alert("Toate campurile trebuie completate.");
            return false;
        }
    }

    ValidateEmail(email);
}


function ValidateEmail(mail) 
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mail.match(mailformat)){
        alert("Formularul a fost trimis cu succes.");
        return true;
    }
    else{
        alert("Ati introdus o adresa de email invalida.");
        return false;
    }
        
}

