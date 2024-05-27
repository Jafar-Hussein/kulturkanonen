document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.querySelector('.clearBtn');

    //rensar localstorage och laddar om sidan
    clearBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    // Skapar variabler för att hämta element från HTML
    const suggestionList = document.getElementById('suggestionList');
    const pagination = document.getElementById('pagination');
    const sortDescBtn = document.getElementById('sortDesc');
    const sortAscBtn = document.getElementById('sortAsc');

    // Hämtar data från localStorage och om det inte finns någon data så sätts suggestions till en tom array
    const suggestions = JSON.parse(localStorage.getItem('kanonItems')) || [];

    // Räknar antalet förslag och sparar i en variabel
    let suggestionCount = suggestions.reduce((acc, suggestion) => {
        acc[suggestion] = (acc[suggestion] || 0) + 1;
        return acc;
    }, {});

    // Sätter antalet rader per sida
    const rowsPerPage = 5;

    // Räknar ut totala antalet sidor
    const totalPages = Math.ceil(Object.keys(suggestionCount).length / rowsPerPage);

    // Sätter start sidan till 1
    let currentPage = 1;

    // Funktion för att rendera tabellen
    function renderTablePage(page) {
        // Tömmer tabellen
        suggestionList.innerHTML = '';

        // Räknar ut vilka rader som ska visas
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        // Hämtar rader från suggestionCount och skapar en array
        const entries = Object.entries(suggestionCount).slice(start, end);

        // Loopar igenom arrayen och skapar en rad för varje förslag
        for (const [suggestion, count] of entries) {
            // Skapar element för att skapa en rad
            const tr = document.createElement('tr');
            // Skapar element för att skapa en cell för förslaget
            const tdSuggestion = document.createElement('td');
            // Skapar element för att skapa en cell för antalet
            const tdCount = document.createElement('td');
            // Sätter texten i cellerna
            tdSuggestion.textContent = suggestion;
            tdCount.textContent = count;
            // Lägger till cellerna i raden
            tr.appendChild(tdSuggestion);
            tr.appendChild(tdCount);
            suggestionList.appendChild(tr);
        }
    }

    // Funktion för att rendera pagination
    function renderPagination(totalPages) {
        pagination.innerHTML = '';
        // Skapar en funktion för att skapa en sida
        const createPageItem = (page, label = page) => {
            // Skapar en li element
            const li = document.createElement('li');
            // Sätter klassen för li elementet
            li.className = `page-item${page === currentPage ? ' active' : ''}`;
            // Om sidan är mindre än 1 eller större än totala antalet sidor så sätts klassen till disabled
            if (page < 1 || page > totalPages) {
                li.classList.add('disabled');
            } else {
                // Skapar en a element och sätter klassen
                li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
                // Lägger till en eventlistener för att byta sida
                li.addEventListener('click', (e) => {
                    // Förhindrar att sidan laddas om
                    e.preventDefault();
                    // Om sidan inte är samma som den nuvarande sidan så byts sidan
                    if (page !== currentPage) {
                        // Sätter den nya sidan som den nuvarande sidan
                        currentPage = page;
                        // Renderar tabellen och pagination
                        renderTablePage(currentPage);
                        // Renderar pagination
                        renderPagination(totalPages);
                    }
                });
            }
            return li;
        };

        // Skapar en förgående knapp och lägger till den i pagination
        const prevLi = createPageItem(currentPage - 1, 'Föregående');
        pagination.appendChild(prevLi);

        // Skapar hur många sidor som ska visas
        for (let i = 1; i <= totalPages; i++) {
            pagination.appendChild(createPageItem(i));
        }

        // Skapar en nästa knapp och lägger till den i pagination
        const nextLi = createPageItem(currentPage + 1, 'Nästa');
        pagination.appendChild(nextLi);
    }

    // Sorteringsfunktioner
    function sortSuggestions(order) {
        suggestionCount = Object.entries(suggestionCount)
            .sort((a, b) => order === 'desc' ? b[1] - a[1] : a[1] - b[1])
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        renderTablePage(currentPage);
        renderPagination(totalPages);
    }

    // Event Listeners för sortering
    sortDescBtn.addEventListener('click', () => sortSuggestions('desc'));
    sortAscBtn.addEventListener('click', () => sortSuggestions('asc'));

    // Renderar tabellen och pagination
    renderTablePage(currentPage);
    renderPagination(totalPages);
});
