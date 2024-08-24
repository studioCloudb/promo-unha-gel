document.getElementById('redeem-button').addEventListener('click', function () {
    const couponInput = document.getElementById('coupon').value.trim();
    const correctCoupon = "GELSTUDIOTOTI";

    if (couponInput.toUpperCase() === correctCoupon) {
        const date = new Date().toLocaleString('pt-BR');
        const couponCode = `STUDIO${Math.floor(Math.random() * 100000)}`;

        // Exibe o cupom gerado na página
        const userCouponsElement = document.getElementById('user-coupons');
        userCouponsElement.innerHTML += `<p>STUDIO${couponCode} - Gerado em: ${date}</p>`;

        // Atualiza a imagem do vale com a data e código
        document.getElementById('voucher-date').textContent = `Data: ${date}`;
        document.getElementById('voucher-code').textContent = `Código: ${couponCode}`;
        document.getElementById('voucher-image').style.display = 'block';

        // Atualiza o link do WhatsApp com o cupom STUDIO + código
        const whatsappLink = document.getElementById('whatsapp-link');
        whatsappLink.href = `http://wa.me/5527992021861?text=STUDIO${couponCode}`;

        // Atualiza a contagem de cupons gerados
        const couponCountElement = document.getElementById('coupon-count');
        let couponCount = parseInt(couponCountElement.textContent);
        couponCount += 1;
        couponCountElement.textContent = couponCount;
    } else {
        alert('Cupom inválido. Tente novamente.');
    }
});
