const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[name="query"]');

const modal = document.getElementById('myModal');
const closeModalButton = document.getElementById('closeModal');


function showModal(message) {
    const modalBody = modal.querySelector('.modal-body p');
    modalBody.textContent = message;
    modal.style.display = 'block';
}


closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});


searchForm.addEventListener('submit', function(event) {
    const inputValue = searchInput.value.trim();

   
    if (inputValue === '') {
        event.preventDefault(); 
        showModal('Ошибка! Пожалуйста, введите запрос для поиска.');
        return;
    }

    
    const hasOnlySpecialChars = /^[^a-zA-Zа-яА-ЯЁё0-9]+$/.test(inputValue);
    if (hasOnlySpecialChars) {
        event.preventDefault(); 
        showModal('Ошибка! Пожалуйста, введите корректные данные.');
        return;
    }

    
    const hasOnlyNumbers = /^[0-9]+$/.test(inputValue);
    if (hasOnlyNumbers) {
        event.preventDefault(); 
        showModal('Ошибка! Пожалуйста, введите корректные данные.');
        return;
    }
});


const loginModal = document.getElementById('loginModal');
const openLoginButton = document.querySelector('button#loginButton');
const closeLoginButton = document.getElementById('closeLoginModal');


openLoginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
});


closeLoginButton.addEventListener('click', function() {
    loginModal.style.display = 'none';
});


const registerModal = document.getElementById('registerModal');
const registerButton = document.getElementById('registerButton');
const closeRegisterModalButton = document.getElementById('closeRegisterModal');


registerButton.addEventListener('click', () => {
    registerModal.style.display = 'block';
});


closeRegisterModalButton.addEventListener('click', () => {
    registerModal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

const usersDatabase = [];


async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


async function registerUser(username, email, password) {
    const hashedPassword = await hashPassword(password); 
    const newUser = {
        username: username,
        email: email,
        password: hashedPassword 
    };
    usersDatabase.push(newUser);
    console.log('Пользователь зарегистрирован с хэшированным паролем:', usersDatabase);
}


function usernameExists(username) {
    return usersDatabase.some(user => user.username === username);
}

function emailExists(email) {
    return usersDatabase.some(user => user.email === email);
}


document.getElementById('registerSubmitButton').addEventListener('click', async function(event) {
    event.preventDefault(); 
    console.log('Клик по кнопке регистрации сработал');

    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validateForm(username, email, password)) {
        console.log('Форма прошла валидацию успешно');
        
        
        if (!usernameExists(username) && !emailExists(email)) {
            await registerUser(username, email, password); 
            console.log('Пользователь зарегистрирован');
            
            
            registerModal.style.display = 'none';
            showModal('Вы успешно зарегистрировались!');
        } else {
            if (usernameExists(username)) {
                console.log('Имя пользователя уже существует');
                showModal('Такое имя пользователя уже существует');
            }
            if (emailExists(email)) {
                console.log('Адрес электронной почты уже существует');
                showModal('Такой адрес электронной почты уже существует');
            }
        }
    } else {
        console.log('Ошибка валидации формы');
    }
});


function validateForm(username, email, password) {
    console.log('Валидация форма регистрации +');
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (username.trim() === '') {
        console.log('Форма регистрации. Ошибка: имя пользователя не должно быть пустым');
        showModal('Ошибка: имя пользователя не должно быть пустым');
        return false;
    }
    if (email.trim() === '') {
        console.log('Форма регистрации. Ошибка: email не должен быть пустым');
        showModal('Ошибка: Поле email не может быть пустым');
        return false;
    }
    if (password.trim() === '') {
        console.log('Форма регистрации. Ошибка: пароль не должен быть пустым');
        showModal('Ошибка: Поле Пароль не может быть пустым');
        return false;
    }

    if (username.length < 3 || !/[a-zA-Zа-яА-ЯёЁ]/.test(username)) {
        console.log('Форма регистрации. Ошибка в имени пользователя');
        showModal('Ошибка: Поле Имя пользователя не может быть меньше 4 символов');
        return false;
    }

    if (!emailRegex.test(email)) {
        console.log('Форма регистрации. Ошибка в email');
        showModal('Ошибка: Введите корректный адрес email');
        return false;
    }

    if (password.length < 6) {
        console.log('Форма регистрации. Ошибка в пароле');
        showModal('Ошибка: Пароль должен содержать 6 и более символов');
        return false;
    }

    return true;
}


document.getElementById('loginSubmitButton').addEventListener('click', async function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username.trim() === '' || password.trim() === '') {
        console.log('Форма входа. Ошибка пустые поля');
        showModal('Ошибка: Все поля должны быть заполнены.');
        return;
    }

    
    const user = usersDatabase.find(user => user.username === username);
    if (user) {
        const hashedPassword = await hashPassword(password);
        if (user.password === hashedPassword) {
            loginModal.style.display = 'none';
            showModal('Вы успешно вошли в систему!');
            console.log('Форма входа. Успешный вход');
        } else {
            showModal('Ошибка! Неверное имя пользователя или пароль.');
            console.log('Форма входа. Неверное имя пользователя или пароль.');
        }
    } else {
        showModal('Ошибка! Неверное имя пользователя или пароль.');
    }
});
