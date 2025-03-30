// knihovny 
require("dotenv").config();
const { Pool } = require("pg");

// připojení k databázi
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// otázky
const questions = [
    {
        orderNumber: 1,
        question: "Otázka 1",
        options: JSON.stringify(["Odpověd 1", "Odpověd 2", "Odpověd 3", "Odpověd 4"]),
        correctAnswer: "Odpověd 1",
    },
    {
        orderNumber: 2, 
        question: "Otázka 2",
        options: JSON.stringify(["Odpověd 1", "Odpověd 2", "Odpověd 3", "Odpověd 4"]),
        correctAnswer: "Odpověd 2",
    },
    {
        orderNumber: 3, 
        question: "Toto je velmi dlouhá otázka, která má za cíl otestovat, jak dobře systém zvládá zpracování delších textů. Otázka může obsahovat různé detaily, jako například popis situace, kontext nebo další informace, které jsou důležité pro pochopení otázky. Jaký je správný postup v této situaci?",
        options: JSON.stringify(["Možnost 1: Udělat první krok", "Možnost 2: Udělat druhý krok", "Možnost 3: Udělat třetí krok", "Možnost 4: Udělat čtvrtý krok"]),
        correctAnswer: "Možnost 2: Udělat druhý krok",
    },
];

// vytvoření table a vložení otázek
async function seedDatabase() {
    try {
        // smaž celou table s otazkami pokud již existuje
        await pool.query("DROP TABLE IF EXISTS questions");

        // vytvoř table
        await pool.query(`
            CREATE TABLE questions (
                id SERIAL PRIMARY KEY,
                orderNumber INTEGER NOT NULL,
                question TEXT NOT NULL,
                options JSONB NOT NULL,
                correctAnswer TEXT NOT NULL
            )`
        );
        console.log("Table vytvořena");

        // vložit otázky do table
        for (const question of questions) {
            await pool.query(
                "INSERT INTO questions (orderNumber, question, options, correctAnswer) VALUES ($1, $2, $3, $4)",
                [question.orderNumber, question.question, question.options, question.correctAnswer]
            );
        }
        console.log("Otázky vloženy do databáze");

    } catch (error) {

        console.error("Problém s vytvořením table a vložením otázek do databáze", error);

    } finally {

        pool.end();
    }
}

seedDatabase();