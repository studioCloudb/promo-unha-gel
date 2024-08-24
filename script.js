// Período de cooldown em milissegundos (7 dias)
const cooldownPeriod = 7 * 24 * 60 * 60 * 1000;
const couponLimit = 2; // Limite de cupons por IP
const validCoupon = "GELSTUDIOTOTI";

// Simulando o IP do usuário (aqui deveria ser uma função real para capturar o IP)
const userIP = "user-ip";

// Carregar os dados armazenados localmente
function loadCouponData() {
    const data = JSON.parse(localStorage.getItem(userIP));
    if (data) {
        return data;
    }
    return { count: 0, lastGenerated: null, codes: [] };
}

// Salvar os dados localmente
function saveCouponData(data) {
    localStorage.setItem(userIP, JSON.stringify(data));
}

// Gerar um código único
function generateUniqueCode() {
    let code;
    do {
        code = Math.random().toString().slice(2, 9); // Gera uma sequência de 7 números
    } while (loadCouponData().codes.includes(code));
    return code;
}

// Formatar o tempo restante
function formatTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    ms %= (24 * 60 * 60 * 1000);
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= (60 * 60 * 1000);
    const minutes = Math.floor(ms / (60 * 1000));
    ms %= (60 * 1000);
    const seconds = Math.floor(ms / 1000);

    return `${days} dias - ${hours} hs - ${minutes} min - ${seconds} s`;
}

// Verificar e exibir o estado atual dos cupons
function checkCouponStatus() {
    const data = loadCouponData();
    document.getElementById("coupon-count").textContent = data.count;

    // Exibir os cupons gerados
    if (data.codes.length > 0) {
        const formattedCodes = data.codes.map(code => `STUDIO${code}`).join(" - ");
        document.getElementById("user-coupons").textContent = `Seus cupons: ${formattedCodes}`;
    }

    if (data.count >= couponLimit) {
        const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);
        if (remainingTime > 0) {
            document.getElementById("countdown").textContent = `Você atingiu o limite máximo. Aguarde até o dia: ${formatTime(remainingTime)}`;
        }
    }
}

// Evento ao clicar no botão de resgate
document.getElementById("redeem-button").addEventListener("click", function () {
    const coupon = document.getElementById("coupon").value;
    const data = loadCouponData();

    // Verificar se o IP já gerou 2 códigos
    if (data.count >= couponLimit) {
        const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);
        if (remainingTime > 0) {
            alert(`Você já usou seu desconto. Aguarde ${formatTime(remainingTime)} para gerar um novo código.`);
            return;
        }
    }

    if (coupon === validCoupon) {
        // Verificar e atualizar o número de cupons gerados
        const discountCode = generateUniqueCode();
        data.codes.push(discountCode);
        data.count += 1;
        data.lastGenerated = Date.now();
        saveCouponData(data);

        // Gerar data e hora atual formatada
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');

        // Exibir a imagem, a data/hora e o código de desconto
        document.getElementById("voucher-date").textContent = `Data e Hora: ${dateString}`;
        document.getElementById("voucher-code").textContent = `Código de Desconto: STUDIO${discountCode}`;
        document.getElementById("voucher-image").style.display = "block";

        // Atualizar o link do WhatsApp com o novo texto e o link da imagem
        const whatsappMessage = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Gerado no dia *${dateString}*. Código: *STUDIO${discountCode}*. Veja o vale: https://studiocloudb.github.io/promo-unha-gel/vale.png`;
        document.getElementById("whatsapp-link").href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;

        // Atualizar o contador de cupons gerados
        document.getElementById("coupon-count").textContent = data.count;
        document.getElementById("countdown").textContent = "";

        // Atualizar os cupons gerados
        const formattedCodes = data.codes.map(code => `STUDIO${code}`).join(" - ");
        document.getElementById("user-coupons").textContent = `Seus cupons: ${formattedCodes}`;
    } else {
        alert("Cupom inválido. Tente novamente.");
    }
});

// Atualizar o status dos cupons ao carregar a página
checkCouponStatus();
