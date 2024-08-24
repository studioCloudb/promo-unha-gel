const cooldownPeriod = 7 * 24 * 60 * 60 * 1000;
const couponLimit = 2;
const validCoupon = "GELSTUDIOTOTI";
const userIP = "user-ip"; // Substitua isso com uma função para capturar o IP real

// Carregar e salvar dados do usuário
function loadCouponData() {
    const data = JSON.parse(localStorage.getItem(userIP));
    return data || { count: 0, lastGenerated: null, codes: [] };
}

function saveCouponData(data) {
    localStorage.setItem(userIP, JSON.stringify(data));
}

// Gerar código único
function generateUniqueCode() {
    let code;
    const data = loadCouponData();
    do {
        code = Math.random().toString().slice(2, 9); // Gera uma sequência de 7 números
    } while (data.codes.includes(code));
    return code;
}

// Formatar o tempo restante
function formatTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    return days > 0
        ? `${days} dias - ${hours} hs - ${minutes} min - ${seconds} s`
        : `${hours} hs - ${minutes} min - ${seconds} s`;
}

// Atualizar o status dos cupons
function checkCouponStatus() {
    const data = loadCouponData();
    document.getElementById("coupon-count").textContent = data.count;
    document.getElementById("user-coupons").textContent = data.codes.length > 0
        ? `Seus cupons: STUDIO${data.codes.join(" - STUDIO")}`
        : "";

    if (data.count >= couponLimit) {
        const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);
        if (remainingTime > 0) {
            document.getElementById("countdown").textContent = `Você atingiu o limite máximo. Aguarde até o dia: ${formatTime(remainingTime)}`;
        }
    }
}

// Lógica de resgate de cupom
document.getElementById("redeem-button").addEventListener("click", function () {
    const coupon = document.getElementById("coupon").value.trim();
    const data = loadCouponData();

    if (data.count >= couponLimit) {
        const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);
        if (remainingTime > 0) {
            alert(`Você já usou seu desconto. Aguarde ${formatTime(remainingTime)} para gerar um novo código.`);
            return;
        }
    }

    if (coupon === validCoupon) {
        const discountCode = generateUniqueCode();
        data.codes.push(discountCode);
        data.count += 1;
        data.lastGenerated = Date.now();
        saveCouponData(data);

        const now = new Date();
        const dateString = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;

        document.getElementById("voucher-date").textContent = `Data e Hora: ${dateString}`;
        document.getElementById("voucher-code").textContent = `Código de Desconto: STUDIO${discountCode}`;
        document.getElementById("voucher-image").style.display = "block";

        const whatsappMessage = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Gerado no dia *${dateString}*. Código: *STUDIO${discountCode}*. Veja o vale: https://studiocloudb.github.io/promo-unha-gel/vale.png`;
        document.getElementById("whatsapp-link").href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;

        document.getElementById("coupon-count").textContent = data.count;
        document.getElementById("countdown").textContent = "";
        document.getElementById("user-coupons").textContent = `Seus cupons: STUDIO${data.codes.join(" - STUDIO")}`;
    } else {
        alert("Cupom inválido. Tente novamente.");
    }
});

checkCouponStatus();
