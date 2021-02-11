// Global variables
var url = 'https://saltyworld.herokuapp.com/users';

// View user info on load page
$(window).on("load",  async () => 
{
    let user = (await findUserByEmail(getLoggedUser()))[0];
    console.log(user);
    console.log($('.profile:first-child:nth-child(2)'));
    $('#name').append(`<p class="col">${user.name}</p>`);
    $('#surname').append(`<p class="col">${user.surname}</p>`);
    $('#email').append(`<p class="col">${user.email}</p>`);
});

// Create new user
var findUserByEmail = async (email) => 
{
    try 
    {    
        response = await axios.get(`${url}?email=${email}`);
        return response.data;
    } catch (error) 
    {
        console.log(error);
    }
}

// Show alert message
var showAlertMessage = (msg, error) =>
{
    if (error)  $('.form-group:nth-child(3)').before(`<div class="alert alert-danger p-2 my-2" role="alert">${msg}</div>`);
    else        $('.form-group:nth-child(3)').before(`<div class="alert alert-success p-2 my-2" role="alert">${msg}</div>`);
}


var removeFromLocalStorage = (email, password) =>
{
    localStorage.setItem('email', email);
}

var getLoggedUser = () =>
{
    return localStorage.getItem('email');
}
