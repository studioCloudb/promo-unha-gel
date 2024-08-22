document.getElementById("redeem-button").addEventListener("click", function () {
    const coupon = document.getElementById("coupon").value;
    const validCoupon = "GELSTUDIOTOTI";

    if (coupon === validCoupon) {
        const voucherImage = document.getElementById("voucher-image");
        const voucherDate = document.getElementById("voucher-date");
        const whatsappLink = document.getElementById("whatsapp-link");

        // Gerar data e hora atual formatada
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');

        // Exibir a imagem e a data/hora no canto inferior direito
        voucherDate.textContent = dateString;
        voucherImage.style.display = "block";

        // Atualizar o link do WhatsApp com o novo texto e o link da imagem
        const whatsappMessage = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Veja o vale: https://encr.pw/VALESTUDIOTOTI`;
        whatsappLink.href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;
    } else {
        alert("Cupom inválido. Tente novamente.");
    }
});
