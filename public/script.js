const games = {

    "❌ Tic Tac Toe": "/tictactoe",
    "🐍 Snake": "/snake",

    "♟️ Chess (Coming Soon)": null,
    "🎱 Carrom (Coming Soon)": null,
    "🔢 Sudoku (Coming Soon)": null,
    "🏏 Cricket (Coming Soon)": null

};

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", () => {

        const game = card.innerText.trim();

        if (games[game]) {

            window.location.href = games[game];

        } else {

            alert("🚧 Coming Soon!");

        }

    });

});