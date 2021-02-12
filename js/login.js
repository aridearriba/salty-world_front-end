// Global variables
var url = 'https://saltyworld.herokuapp.com/users';

// Submit form
var submitForm = async (e) => 
{
    e.preventDefault();

    // Remove any alert if exists
    let alert = $('.alert');
    if(!alert.val()) alert.remove();

    // Validate form 
    if (!validateForm()) return;

    let user = (await findUserByEmail($('#inputEmail').val()))[0];
    
    // Create user if does not exist
    if(user) 
    {
        if (validatePassword(user.password, $('#inputPassword').val()))
            loginUser(user);
        else 
            showAlertMessage("Contraseña incorrecta.", true);
    }
    else 
        showAlertMessage("Este email no está registrado.", true);
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

// Find user in JSON server by its email (primary key)
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

// Validate passwords
var validatePassword = (correctPassword, inputPassword) => 
{
    let encryptedPassword = CryptoJS.SHA256(inputPassword);
    return correctPassword === encryptedPassword.toString();
}

// Show alert message
var showAlertMessage = (msg, error) =>
{
    if (error)  $('.form-group:nth-child(3)').before(`<div class="alert alert-danger p-2 my-2" role="alert">${msg}</div>`);
    else        $('.form-group:nth-child(3)').before(`<div class="alert alert-success p-2 my-2" role="alert">${msg}</div>`);
}

// Log in user to local storage
var loginUser = (user) =>
{
    localStorage.setItem('user', JSON.stringify(user));
    window.location.replace("../pages/profile.html");
}
