document.getElementById("redeem-button").addEventListener("click", function () {
    const coupon = document.getElementById("coupon").value;
    const validCoupon = "GELSTUDIOTOTI";

    if (coupon === validCoupon) {
        const voucherImage = document.getElementById("voucher-image");
        const voucherDate = document.getElementById("voucher-date");

        // Gerar data e hora atual formatada
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');

        // Exibir a imagem e a data/hora no canto inferior direito
        voucherDate.textContent = dateString;
        voucherImage.style.display = "block";
    } else {
        alert("Cupom inválido. Tente novamente.");
    }
});
