var email_field = "";

function showMail(e) {
    $("#reset_div").show();
    $("#password_div").hide();
    return false;
}

function hideMail() {
    $("#reset_div").hide();
    $("#password_div").show();
    return false;
}

function submit_reset() {
    var email = $("#emailInput").val();

    $.post("reset", {email: email}, function(data) {
        var res = JSON.parse(data);
        if(res.status === 'success') {
            email_field = email;
            hideMail();
        }
        else
            $("#error1").text(res.message);
    });
    return false;
}

function submit_password() {
    var password = $("#passwordInput").val();
    var confirm = $("#confirmInput").val();

    if(password == confirm)
    {
        $.post("reset/password", {password: password, confirm: confirm, email: email_field}, function(data) {
        var res = JSON.parse(data);
        if(res.status === 'success') {
            window.location = "/login";
        }
        else
            $("#error2").text(res.message);
        });    
    }
    else {
        $("#error2").text("Passwords do not match");
    }
    return false;
}

function clear_error() {
    $("#error1").text("");
    $("#error2").text("");
}

function showOrHidePassword() {
    const password = document.getElementById('passwordInput');
    const confirm = document.getElementById('confirmInput');

    if (password.type === 'password') {
        password.type = 'text';
        confirm.type = 'text';
    }
    else {
        password.type = 'password';
        confirm.type = 'password';
    }
}