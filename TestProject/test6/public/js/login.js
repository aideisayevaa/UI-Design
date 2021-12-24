var btnLogin = document.getElementById('btnLogin')
var btnSignup = document.getElementById('btnSignup')
var signupLogin = document.getElementById('signup-login')
var loginLgn = document.getElementById('loginLgn')
var mainLogin = document.getElementById('main-login')



btnSignup.addEventListener("click", function() {

    signupLogin.style.backgroundColor = '#666666'
    loginLgn.style.backgroundColor = 'white'
    mainLogin.style.backgroundColor = "#666666"

});


btnLogin.addEventListener("click", function() {

    loginLgn.style.backgroundColor = '#666666'
    signupLogin.style.backgroundColor = 'white'
    mainLogin.style.backgroundColor = "white"

});