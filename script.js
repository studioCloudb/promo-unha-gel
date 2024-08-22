document.addEventListener("DOMContentLoaded", function () {
    const redeemButton = document.getElementById("redeem-button");
    const couponInput = document.getElementById("coupon");
    const voucherImage = document.getElementById("voucher-image");
    const voucherDate = document.getElementById("voucher-date");
    const correctCoupon = "GELSTUDIOTOTI";

    redeemButton.addEventListener("click", function () {
        const enteredCoupon = couponInput.value.trim();
        if (enteredCoupon === correctCoupon) {
            // Show voucher image and date
            voucherImage.style.display = "block";

            // Set date on voucher image
            const now = new Date();
            const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            voucherDate.textContent = `Data: ${dateString}`;
        } else {
            alert("Código do cupom incorreto. Por favor, tente novamente.");
        }
    });
});
