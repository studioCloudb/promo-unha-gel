document.addEventListener("DOMContentLoaded", function () {
    const redeemButton = document.getElementById("redeem-button");
    const couponInput = document.getElementById("coupon");
    const voucherImage = document.getElementById("voucher-image");
    const voucherDate = document.getElementById("voucher-date");
    const whatsappLink = document.getElementById("whatsapp-link");
    const correctCoupon = "GELSTUDIOTOTI";

    redeemButton.addEventListener("click", function () {
        const enteredCoupon = couponInput.value.trim();
        if (enteredCoupon === correctCoupon) {
            // Exibir imagem do vale e data
            voucherImage.style.display = "block";

            // Configurar a data no voucher
            const now = new Date();
            const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            voucherDate.textContent = `Data: ${dateString}`;

            // Estilizando a data para aparecer no canto inferior direito da imagem
            voucherDate.style.position = "absolute";
            voucherDate.style.bottom = "10px";
            voucherDate.style.right = "10px";
            voucherDate.style.fontSize = "15px";
            voucherDate.style.fontWeight = "bold";
            voucherDate.style.color = "#333";

            // Atualizar o link do botão de WhatsApp com a data e hora na mensagem
            const whatsappMessage = `Olá, estou entrando em contato para agendar o serviço usando o cupom promocional. Data do resgate: ${dateString}. Você pode visualizar o vale neste link: https://wmnjunior.github.io/promo-unha-gel/vale.png`;
            whatsappLink.href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;

        } else {
            alert("Código do cupom incorreto. Por favor, tente novamente.");
        }
    });
});
