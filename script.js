document.addEventListener("DOMContentLoaded", function () {
    const termsContainer = document.getElementById("terms");
    const searchBar = document.getElementById("searchBar");

    fetch("terms.json")
        .then(response => response.json())
        .then(terms => {
            // Sort terms alphabetically by term name
            terms.sort((a, b) => a.term.localeCompare(b.term));
            displayTerms(terms);

            // Filter terms based on the search input (only by term name)
            searchBar.addEventListener("input", () => {
                const filteredTerms = terms.filter(term =>
                    term.term.toLowerCase().includes(searchBar.value.toLowerCase())
                );
                displayTerms(filteredTerms);
            });
        })
        .catch(error => console.error("Error loading terms:", error));

    function displayTerms(terms) {
        termsContainer.innerHTML = ""; // Clear previous results
        terms.forEach(term => {
            const termElement = document.createElement("div");
            termElement.classList.add("term-item");
            termElement.innerHTML = `
                <h2>${term.term}</h2>
                <p>${term.description}</p>
            `;
            termsContainer.appendChild(termElement);
        });
    }
});
