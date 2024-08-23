<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promoção Unha de Gel</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Estilo para exibir a versão */
        #version {
            position: fixed;
            bottom: 10px;
            left: 10px;
            font-size: 14px;
            color: #8E2D6D;
        }
        /* Estilo para o texto dos cupons gerados pelo usuário */
        #user-coupons {
            font-size: 18px;
            color: #8E2D6D;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="logo.png" alt="Logo do Studio" class="logo">
        <h1>CUPOM PROMOCIONAL UNHA DE GEL 💅</h1>
        <p id="info-text">OBS: VOCE SÓ PODE GERAR 2 VEZES ESSE CUPOM A CADA 7 DIAS</p>
        <p id="coupon-status">Cupons Gerados: <span id="coupon-count">0</span></p>
        <p id="countdown"></p>
        <h2>Insira o CUPOM abaixo:</h2>
        <input type="text" id="coupon" placeholder="Digite seu cupom">
        <button id="redeem-button">Receber Desconto</button>
        <div id="voucher-image" style="display: none;">
            <img src="https://studiocloudb.github.io/promo-unha-gel/vale.png" alt="Vale" id="voucher-img">
            <div id="voucher-date"></div>
            <div id="voucher-code"></div>
            <a id="whatsapp-link" href="http://wa.me/5527992021861" class="btn-agendar">
                <i class="fab fa-whatsapp"></i> Receber Desconto
            </a>
        </div>

        <!-- Elemento para exibir os cupons gerados pelo usuário -->
        <div id="user-coupons" style="display: none;">Seus cupons: <span id="generated-coupons"></span></div>
    </div>

    <!-- Adicionando o elemento para mostrar a versão -->
    <div id="version">ver. 3.3</div>

    <script>
        // Simulação de armazenamento local para cupons gerados
        const generatedCoupons = JSON.parse(localStorage.getItem('generatedCoupons')) || [];

        // Atualiza o texto "Cupons Gerados" e exibe os cupons gerados pelo usuário
        function updateCouponStatus() {
            document.getElementById('coupon-count').textContent = generatedCoupons.length;
            if (generatedCoupons.length > 0) {
                document.getElementById('user-coupons').style.display = 'block';
                document.getElementById('generated-coupons').textContent = generatedCoupons.join(' - ');
            }
        }

        // Função para gerar o cupom
        document.getElementById('redeem-button').addEventListener('click', function() {
            const inputCoupon = document.getElementById('coupon').value.trim();
            const validCoupon = "GELSTUDIOTOTI"; // Exemplo de cupom válido
            if (inputCoupon === validCoupon && generatedCoupons.length < 2) {
                const generatedCode = "GEL-" + Math.floor(Math.random() * 10000);
                generatedCoupons.push(generatedCode);
                localStorage.setItem('generatedCoupons', JSON.stringify(generatedCoupons));
                alert("Cupom gerado com sucesso: " + generatedCode);
                updateCouponStatus();
            } else if (generatedCoupons.length >= 2) {
                alert("Você já gerou o número máximo de cupons.");
            } else {
                alert("Cupom inválido.");
            }
        });

        // Atualiza o status dos cupons ao carregar a página
        updateCouponStatus();
    </script>
</body>
</html>
