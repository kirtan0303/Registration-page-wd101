document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidDob(dob)) {
        alert("Date of Birth must be for people between ages 18 and 55.");
        return;
    }

    const user = { name, email, password, dob, terms };
    saveUser(user);
    addUserToTable(user);
    clearForm();
});

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function isValidDob(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function addUserToTable(user) {
    const tableBody = document.getElementById('userTableBody');
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = user.name;
    row.insertCell(1).textContent = user.email;
    row.insertCell(2).textContent = user.password;
    row.insertCell(3).textContent = user.dob;
    row.insertCell(4).textContent = user.terms ? "true" : "false";
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
}

function clearForm() {
    document.getElementById('registrationForm').reset();
}

window.onload = loadUsers;
