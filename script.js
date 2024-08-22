function redeemCoupon() {
    const couponInput = document.getElementById("couponInput").value;
    const validCoupon = "GELSTUDIOTOTI";

    if (couponInput === validCoupon) {
        // Exibe a imagem do vale com a data e hora
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.classList.remove("hidden");

        // Obtém a data e hora atuais
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();

        // Insere a data e hora na imagem do vale
        const timestamp = document.getElementById("timestamp");
        timestamp.textContent = `${formattedDate} ${formattedTime}`;
    } else {
        alert("Cupom inválido! Tente novamente.");
    }
}
