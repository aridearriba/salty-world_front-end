// Global variables
var url = 'https://saltyworld.herokuapp.com/users';

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


// Submit form
var submitForm = async (e) => 
{
    e.preventDefault();

    // Remove any alert if exists
    let alert = $('.alert');
    if(!alert.val()) alert.remove();

    // Validate form 
    if (!validateForm()) return;

    let user = (await findUserByEmail($('#inputEmail').val()));

    // Create user if does not exist
    if(user.length) 
    {
        if (validatePassword(user[0].password, $('#inputPassword').val()))
            //showAlertMessage("Sessión iniciada", false);
            saveToLocalStorage(user[0].email, user[0].password);
        else 
            showAlertMessage("Contraseña incorrecta.", true);
    }
    else 
        showAlertMessage("Este email no está registrado.", true);
}

// Validate passwords
var validatePassword = (correctPassword, inputPassword) => 
{
    return correctPassword === inputPassword;
}

// Validate form fields
var validateForm = () => 
{
    let validForm =  true;

    let email = $('#inputEmail');
    let password = $('#inputPassword');

    let alertMsg = `<div class="alert alert-danger p-0 my-2" role="alert">Por favor, rellena este campo.</div>`;

    if(!email.val()) 
    {
        email.after(alertMsg);
        validForm = false;;
    }
    if(!password.val()) 
    {
        password.after(alertMsg);
        validForm = false;;
    }
    return validForm;
}


// Show alert message
var showAlertMessage = (msg, error) =>
{
    if (error)  $('.form-group:nth-child(3)').before(`<div class="alert alert-danger p-2 my-2" role="alert">${msg}</div>`);
    else        $('.form-group:nth-child(3)').before(`<div class="alert alert-success p-2 my-2" role="alert">${msg}</div>`);
}


var saveToLocalStorage = (email, password) =>
{
    localStorage.setItem('email', email);
}

var getLoggedUser = () =>
{
    return localStorage.getItem('email');
}
