document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submissionForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const viewListButton = document.getElementById("viewListButton");

    const forbiddenWords = [
        "bög", "fitta", "kuk", "fuck", "bitch", "shit", "whore", "hora", "dick", "pussy", 
        "nigga", "röv", "skit", "helvete", "jävla", "knulla", "pung", "idiot", "mongo", 
        "djävla", "damp", "cunt", "wanker", "neger", "dachri", "horunge", 
        "kuksugare", "gahba", "kahba", "kahbe", "nigger", "jävel"
    ];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const item = document.getElementById("item").value.trim();

        if (item === "") {
            confirmationMessage.textContent = "Fältet kan inte vara tomt!";
            confirmationMessage.style.color = "red";
            confirmationMessage.style.display = "block";
            setTimeout(() => {
                confirmationMessage.textContent = "";
                confirmationMessage.style.display = "none";
            }, 3000);
            return;
        }

        const containsForbiddenWord = forbiddenWords.some(word => 
            new RegExp(`\\b${word}\\b`, 'i').test(item)
        );

        if (containsForbiddenWord) {
            confirmationMessage.textContent = "Ditt förslag innehåller olämpligt språk!";
            confirmationMessage.style.color = "red";
            confirmationMessage.style.display = "block";
            setTimeout(() => {
                confirmationMessage.textContent = "";
                confirmationMessage.style.display = "none";
            }, 3000);
            return;
        }

        let items = JSON.parse(localStorage.getItem("kanonItems")) || [];
        items.push(item);
        localStorage.setItem("kanonItems", JSON.stringify(items));

        confirmationMessage.textContent = "Ditt förslag har skickats in!";
        confirmationMessage.style.color = "green";
        confirmationMessage.style.display = "block";
        form.reset();

        setTimeout(() => {
            confirmationMessage.textContent = "";
            confirmationMessage.style.display = "none";
        }, 3000);
    });

    viewListButton.addEventListener("click", () => {
        window.location.href = "login.html"; /* osäker om det ska vara login.html eller list.html här <-- */
    });
});
