// pole se slovy
let words = [];

// načtení slov ze slovníku
async function loadWords(language) {
    const filePath = `wordlists/${language}.txt`;
    const response = await fetch(filePath);
    const text = await response.text();

    words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);

    console.log(words);
}

// změna jazyka pro funkci načtení slov 
document.getElementById("language").addEventListener("change", function() {
    const selectedLanguage = this.value;
    loadWords(selectedLanguage); 
});

// výchozí jazyk
loadWords("czech");