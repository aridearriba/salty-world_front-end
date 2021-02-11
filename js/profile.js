// View user info on load page
$(window).on("load",  async () => 
{
    let user = getLoggedUser();

    $('#name').append(`<p class="col">${user.name}</p>`);
    $('#surname').append(`<p class="col">${user.surname}</p>`);
    $('#email').append(`<p class="col">${user.email}</p>`);
});

// Get logged user
var getLoggedUser = () =>
{
    return JSON.parse(localStorage.getItem('user'));
}

// Log out user (remove from local storage)
var logOutUser = (event) =>
{
    event.preventDefault();
    localStorage.clear();
    window.location.replace("../index.html");
}