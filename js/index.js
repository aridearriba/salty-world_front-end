// Load log in custom button in navbar
$(window).on("load", () => 
{
    let user = getLoggedUser(); 
    let noIndex = '';
       
    if (!$("#index").length) noIndex = '.';

    if (user)
        $("#loginButton").html(`<a id="loginButton" class="nav-link p-0" href="${noIndex}./pages/profile.html">
                                    <i class="fas fa-user pe-2"></i>
                                    Hola, ${user.name}
                                </a>`);
    else
        $("#loginButton").html(`<a id="loginButton" class="nav-link p-0" href="${noIndex}./pages/login.html">
            <i class="fas fa-user pe-2"></i>
            Iniciar sessión
        </a>`);
});

// Get logged user from local storage
var getLoggedUser = ()  =>
{
    return JSON.parse(localStorage.getItem('user'));
}
