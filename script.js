document.addEventListener("DOMContentLoaded", function () {
    const redeemButton = document.getElementById("redeem-button");
    const couponInput = document.getElementById("coupon");
    const voucherImage = document.getElementById("voucher-image");
    const voucherDate = document.getElementById("voucher-date");
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
            voucherDate.style.position = "absolute";
            voucherDate.style.bottom = "10px";
            voucherDate.style.right = "10px";
            voucherDate.style.fontSize = "15px";
            voucherDate.style.fontWeight = "bold";
            voucherDate.style.color = "#333";
        } else {
            alert("Código do cupom incorreto. Por favor, tente novamente.");
        }
    });
});
