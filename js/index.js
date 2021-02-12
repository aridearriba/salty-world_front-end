// Load log in custom button in navbar
$(window).on("load", () => 
{
    let user = getLoggedUser();
    if (user)
        $("#loginButton").html(`<a id="loginButton" class="nav-link p-0" href="../pages/profile.html">
                                    <i class="fas fa-user pe-2"></i>
                                    Hola, ${user.name}
                                </a>`);
    else
        $("#loginButton").html(`<a id="loginButton" class="nav-link p-0" href="../pages/login.html">
            <i class="fas fa-user pe-2"></i>
            Iniciar sessión
        </a>`);
});

// Get logged user from local storage
var getLoggedUser = ()  =>
{
    return JSON.parse(localStorage.getItem('user'));
}
