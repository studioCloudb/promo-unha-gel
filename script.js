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

function copyToClipboardAndOpenWhatsApp() {
    // Texto a ser copiado
    const message = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Veja o vale: https://wmnjunior.github.io/promo-unha-gel/vale.png`;

    // Copiar o texto para a área de transferência
    navigator.clipboard.writeText(message).then(function () {
        // Abrir o WhatsApp com o link
        const whatsappLink = `https://wa.me/5527992021861?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }, function (err) {
        console.error('Erro ao copiar a mensagem: ', err);
    });
}
