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


    // Create user if does not exist
    if((await findUserByEmail($('#inputEmail').val()))) 
        showAlertMessage("Este email ya está registrado.", true);
    else 
        createUser();
}

// Validate form fields
var validateForm = () => 
{
    let validForm =  true;

    let email = $('#inputEmail');
    let password = $('#inputPassword');
    let name = $('#inputName');
    let surname = $('#inputSurname');

    let alertMsg = `<div class="alert alert-danger p-0 my-2" role="alert">Por favor, rellena este campo.</div>`;

    if(!name.val()) 
    {
        name.after(alertMsg);
        validForm = false;
    }
    if(!surname.val()) 
    {
        surname.after(alertMsg);
        validForm = false;
    }  
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
        return response.data.length;
    } catch (error) 
    {
        console.log(error);
    }
}

// Create new user
var createUser = async (e) => 
{
    // Get user fields
    let user = 
    {
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val(),
        name: $('#inputName').val(),
        surname: $('#inputSurname').val()
    };

    // Create user
    let response;
    try 
    {    
        response = await axios.post(`${url}`, user);
    } catch (error) 
    {
        console.log(error);
    }

    // Info message
    if (response.status === 201) showAlertMessage("Usuario registrado con éxito", false);
    else                         showAlertMessage("No se ha podido registrar el usuario", true);
}

// Show alert message
var showAlertMessage = (msg, error) =>
{
    if (error)  $('#signinButton').before(`<div class="alert alert-danger p-2 my-2" role="alert">${msg}</div>`);
    else        $('#signinButton').before(`<div class="alert alert-success p-2 my-2" role="alert">${msg}</div>`);
}
