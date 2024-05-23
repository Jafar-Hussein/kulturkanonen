const forbiddenWords = [
    "Bög", "Fitta", "Kuk", "Fuck", "Bitch", "Shit", "Whore", "Hora",
    "Dick", "Pussy", "Nigga", "Röv", "Skit", "Helvete", "Jävla", "Knulla",
    "Pung", "Idiot", "Mongo", "Djävla", "Damp", "Cunt", "Wanker", "Neger",
    "Dachri", "Horunge", "Kuksugare", "Gahba", "Kahba", "Kahbe", "Nigger",
    "Jävel"
];

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const adminUser = document.querySelector('#inputUsername').value;
    const adminPassword = document.querySelector('#inputPassword').value;
    const errorMsg = document.querySelector('#error');

    const username = 'Marielle';
    const password = 'GenZMarielle';

    // kollar om den har ord som är i array
    const hasForbiddenWords = forbiddenWords.some(word => 
        adminUser.toLowerCase().includes(word.toLowerCase()) || 
        adminPassword.toLowerCase().includes(word.toLowerCase())
    );

    if (hasForbiddenWords) {
        errorMsg.textContent = 'Användarnamn eller lösenord innehåller olämpliga ord.';
    } 
    // kollar om  användarnamnet och lösenordet matchar
    else if (adminUser.toLowerCase() === username.toLowerCase() && adminPassword === password) {
        window.location.href = 'list.html';
    } 
    // om det inte matchar så skrivs det ut ett felmeddelande
    else {
        errorMsg.textContent = 'Fel användarnamn eller lösenord.';
    }
});
