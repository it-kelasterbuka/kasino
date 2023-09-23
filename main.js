const betAmountSelect = document.getElementById("betAmountSelect");
const rollDiceButton = document.getElementById("rollDiceButton");
const diceResultSpan = document.getElementById("diceResult");
const totalMoneySpan = document.getElementById("totalMoney");
const gameStatusSpan = document.getElementById("gameStatus");
const loading = document.getElementById("loading");

let totalMoney = 0;

function depositMoney() {
    const depositAmount = parseInt(prompt("Masukkan jumlah deposit:"));

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Jumlah deposit harus positif.");
        return;
    }

    totalMoney += depositAmount;
    totalMoneySpan.textContent = totalMoney;
}

function showLoading() {
    loading.classList.remove("hidden");
    rollDiceButton.disabled = true;
    gameStatusSpan.textContent = "Dadu sedang dikocok oleh bandar...";
}

function hideLoading() {
    loading.classList.add("hidden");
    rollDiceButton.disabled = false;
    gameStatusSpan.textContent = "";
}

betAmountSelect.addEventListener("change", () => {
    if (totalMoney <= 0) {
        const deposit = confirm("Saldo Anda kosong. Apakah Anda ingin melakukan deposit?");
        if (deposit) {
            depositMoney();
        }
        betAmountSelect.value = "1"; // Kembalikan pilihan taruhan ke nilai default
    }
});

rollDiceButton.addEventListener("click", () => {
    const betAmount = parseInt(betAmountSelect.value);
    
    if (betAmount <= 0 || betAmount > totalMoney) {
        gameStatusSpan.textContent = "Jumlah taruhan tidak valid";
        return;
    }

    const guessedNumber = parseInt(prompt("Tebak angka dadu (1-6):"));

    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 6) {
        gameStatusSpan.textContent = "Angka tebakan tidak valid";
        return;
    }

    showLoading();

    setTimeout(() => {
        const diceResult = Math.floor(Math.random() * 6) + 1;

        if (guessedNumber === diceResult) {
            totalMoney += betAmount * 2;
            gameStatusSpan.textContent = `Anda menebak dengan benar! Anda menang $${betAmount * 2}!`;
        } else {
            totalMoney -= betAmount;
            gameStatusSpan.textContent = `Anda menebak salah! Anda kalah $${betAmount}!`;
        }

        diceResultSpan.textContent = diceResult;
        totalMoneySpan.textContent = totalMoney;

        if (totalMoney <= 0) {
            const deposit = confirm("Saldo Anda kosong. Apakah Anda ingin melakukan deposit?");
            if (deposit) {
                depositMoney();
            } else {
                gameStatusSpan.textContent = "Game over! Saldo Anda habis.";
                rollDiceButton.disabled = true;
            }
        }

        hideLoading();
    }, 2000); // Simulasi pengocokan dadu selama 2 detik (ganti dengan logika yang sesungguhnya)
});

// Memulai permainan dengan saldo awal
depositMoney();