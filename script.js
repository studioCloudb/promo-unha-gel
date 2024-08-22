// Simulação de banco de dados em memória (substitua por backend real em produção)
const usedCodes = new Set(); // Armazena códigos usados
const ipUsage = new Map(); // Armazena o uso por IP
const couponLimit = 2; // Limite de cupons por IP
const cooldownPeriod = 7 * 24 * 60 * 60 * 1000; // 7 dias em milissegundos
const userIP = "user-ip"; // Substitua por um método real para obter o IP do usuário

document.getElementById("redeem-button").addEventListener("click", function () {
    const coupon = document.getElementById("coupon").value;
    const validCoupon = "GELSTUDIOTOTI";

    // Verificar se o IP já gerou 2 códigos
    const lastUsage = ipUsage.get(userIP)?.timestamp;
    if (lastUsage && Date.now() - lastUsage < cooldownPeriod) {
        const remainingTime = cooldownPeriod - (Date.now() - lastUsage);
        const countdown = formatTime(remainingTime);
        document.getElementById("countdown").textContent = `Você atingiu o limite máximo. Aguarde até o dia: ${countdown}`;
        return;
    }

    if (coupon === validCoupon) {
        // Verificar e atualizar o número de cupons gerados
        const couponCount = ipUsage.get(userIP)?.count || 0;
        if (couponCount >= couponLimit) {
            alert("Você já usou seu desconto. Aguarde 7 dias para gerar um novo código.");
            return;
        }

        // Gerar código de desconto único
        const discountCode = generateUniqueCode();
        usedCodes.add(discountCode);

        // Atualizar IP usage
        ipUsage.set(userIP, {
            count: couponCount + 1,
            timestamp: Date.now()
        });

        // Gerar data e hora atual formatada
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');

        // Exibir a imagem, a data/hora e o código de desconto
        document.getElementById("voucher-date").textContent = `Data e Hora: ${dateString}`;
        document.getElementById("voucher-code").textContent = `Código de Desconto: Studio${discountCode}`;
        document.getElementById("voucher-image").style.display = "block";

        // Atualizar o link do WhatsApp com o novo texto e o link da imagem
        const whatsappMessage = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Gerado no dia *${dateString}*. Veja o vale: https://studiocloudb.github.io/promo-unha-gel/vale.png`;
        document.getElementById("whatsapp-link").href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;

        // Atualizar o contador de cupons gerados
        document.getElementById("coupon-count").textContent = couponCount + 1;
        document.getElementById("countdown").textContent = "";

    } else {
        alert("Cupom inválido. Tente novamente.");
    }
});

function generateUniqueCode() {
    let code;
    do {
        code = Math.random().toString().slice(2, 9); // Gera uma sequência de 7 números
    } while (usedCodes.has(code));
    return code;
}

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
