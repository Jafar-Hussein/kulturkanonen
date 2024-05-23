document.addEventListener('DOMContentLoaded', () => {
    // skapar variabler för att hämta element från html
    const suggestionList = document.getElementById('suggestionList');
    const pagination = document.getElementById('pagination');
    // hämtar data från localstorage och om det inte finns någon data så sätts suggestions till en tom array
    const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    // räknar antalet förslag och sparar i en variabel
    const suggestionCount = suggestions.reduce((acc, suggestion) => {
        acc[suggestion] = (acc[suggestion] || 0) + 1;
        return acc;
    }, {});
    // sätter antalet rader per sida
    const rowsPerPage = 5;
    // räknar ut totala antalet sidor
    const totalPages = Math.ceil(Object.keys(suggestionCount).length / rowsPerPage);
    // sätter start sidan till 1
    let currentPage = 1;
    // funktion för att rendera tabellen
    function renderTablePage(page) {
        // tömmer tabellen
        suggestionList.innerHTML = '';
        // räknar ut vilka rader som ska visas
        const start = (page - 1) * rowsPerPage;
        // räknar ut vilka rader som ska visas
        const end = start + rowsPerPage;
        // hämtar rader från suggestionCount och skapar en array
        const entries = Object.entries(suggestionCount).slice(start, end);
        // loopar igenom arrayen och skapar en rad för varje förslag
        for (const [suggestion, count] of entries) {
            // skapar element för att skapa en rad
            const tr = document.createElement('tr');
            // skapar element för att skapa en cell för förslaget
            const tdSuggestion = document.createElement('td');
            // skapar element för att skapa en cell för antalet
            const tdCount = document.createElement('td');
            // sätter texten i cellerna
            tdSuggestion.textContent = suggestion;
            tdCount.textContent = count;
            // lägger till cellerna i raden
            tr.appendChild(tdSuggestion);
            tr.appendChild(tdCount);
            suggestionList.appendChild(tr);
        }
    }
    // funktion för att rendera pagination
    function renderPagination(totalPages) {
        pagination.innerHTML = '';
        // Skapar en funktion för att skapa en sida
        const createPageItem = (page, label = page) => {
            // skapar en li element
            const li = document.createElement('li');
            // sätter klassen för li elementet
            li.className = `page-item${page === currentPage ? ' active' : ''}`;
            // om sidan är mindre än 1 eller större än totala antalet sidor så sätts klassen till disabled
            if (page < 1 || page > totalPages) {
                li.classList.add('disabled');
            } else {
                // skapar en a element och sätter klassen
                li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
                // lägger till en eventlistener för att byta sida
                li.addEventListener('click', (e) => {
                    // förhindrar att sidan laddas om
                    e.preventDefault();
                    // om sidan inte är samma som den nuvarande sidan så byts sidan
                    if (page !== currentPage) {
                        // sätter den nya sidan som den nuvarande sidan
                        currentPage = page;
                        // renderar tabellen och pagination
                        renderTablePage(currentPage);
                        // renderar pagination
                        renderPagination(totalPages);
                    }
                });
            }
            return li;
        };

        // skapar en förgående knapp och lägger till den i pagination
        const prevLi = createPageItem(currentPage - 1, 'Föregående');
        pagination.appendChild(prevLi);

        // skapar hur många sidor som ska visas
        for (let i = 1; i <= totalPages; i++) {
            pagination.appendChild(createPageItem(i));
        }

        // skapar en nästa knapp och lägger till den i pagination
        const nextLi = createPageItem(currentPage + 1, 'Nästa');
        pagination.appendChild(nextLi);
    }
    // renderar tabellen och pagination
    renderTablePage(currentPage);
    renderPagination(totalPages);
});
