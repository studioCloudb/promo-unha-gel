<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2549">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Times; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Times; -webkit-text-stroke: #000000; min-height: 14.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">// Simulação de banco de dados em memória (substitua por backend real em produção)</span></p>
<p class="p1"><span class="s1">const cooldownPeriod = 7 * 24 * 60 * 60 * 1000; // 7 dias em milissegundos</span></p>
<p class="p1"><span class="s1">const couponLimit = 2; // Limite de cupons por IP</span></p>
<p class="p1"><span class="s1">const validCoupon = "GELSTUDIOTOTI";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para obter o IP (substitua por uma implementação real em produção)</span></p>
<p class="p1"><span class="s1">const userIP = "user-ip"; // Aqui estamos simulando, em produção você precisa pegar o IP real</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para carregar os dados armazenados localmente</span></p>
<p class="p1"><span class="s1">function loadCouponData() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const data = JSON.parse(localStorage.getItem(userIP));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (data) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>return data;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return { count: 0, lastGenerated: null, codes: [] };</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para salvar os dados localmente</span></p>
<p class="p1"><span class="s1">function saveCouponData(data) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>localStorage.setItem(userIP, JSON.stringify(data));</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para gerar um código único</span></p>
<p class="p1"><span class="s1">function generateUniqueCode() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>let code;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>do {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>code = Math.random().toString().slice(2, 9); // Gera uma sequência de 7 números</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} while (loadCouponData().codes.includes(code));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return code;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para formatar o tempo restante</span></p>
<p class="p1"><span class="s1">function formatTime(ms) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const days = Math.floor(ms / (24 * 60 * 60 * 1000));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ms %= (24 * 60 * 60 * 1000);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const hours = Math.floor(ms / (60 * 60 * 1000));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ms %= (60 * 60 * 1000);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const minutes = Math.floor(ms / (60 * 1000));</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>ms %= (60 * 1000);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const seconds = Math.floor(ms / 1000);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return `${days} dias - ${hours} hs - ${minutes} min - ${seconds} s`;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Função para verificar e exibir o estado atual dos cupons</span></p>
<p class="p1"><span class="s1">function checkCouponStatus() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const data = loadCouponData();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>document.getElementById("coupon-count").textContent = data.count;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (data.count &gt;= couponLimit) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (remainingTime &gt; 0) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>document.getElementById("countdown").textContent = `Você atingiu o limite máximo. Aguarde até o dia: ${formatTime(remainingTime)}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (data.codes.length &gt; 0) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("user-coupons").style.display = "block";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("generated-coupons").textContent = data.codes.join(" - ");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Evento ao clicar no botão de resgate</span></p>
<p class="p1"><span class="s1">document.getElementById("redeem-button").addEventListener("click", function () {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const coupon = document.getElementById("coupon").value;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const data = loadCouponData();</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Verificar se o IP já gerou 2 códigos</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (data.count &gt;= couponLimit) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const remainingTime = cooldownPeriod - (Date.now() - data.lastGenerated);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (remainingTime &gt; 0) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>alert(`Você já usou seu desconto. Aguarde ${formatTime(remainingTime)} para gerar um novo código.`);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>return;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (coupon === validCoupon) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Verificar e atualizar o número de cupons gerados</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const discountCode = generateUniqueCode();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>data.codes.push(discountCode);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>data.count += 1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>data.lastGenerated = Date.now();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>saveCouponData(data);</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Gerar data e hora atual formatada</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const now = new Date();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR');</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Exibir a imagem, a data/hora e o código de desconto</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("voucher-date").textContent = `Data e Hora: ${dateString}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("voucher-code").textContent = `Código de Desconto: Studio${discountCode}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("voucher-image").style.display = "block";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Atualizar o link do WhatsApp com o novo texto e o link da imagem</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const whatsappMessage = `Estou entrando em contato para agendar o serviço usando o cupom promocional: *GELSTUDIOTOTI*. Gerado no dia *${dateString}*. Código: *Studio${discountCode}*. Veja o vale: https://studiocloudb.github.io/promo-unha-gel/vale.png`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("whatsapp-link").href = `https://wa.me/5527992021861?text=${encodeURIComponent(whatsappMessage)}`;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Atualizar o contador de cupons gerados</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("coupon-count").textContent = data.count;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("countdown").textContent = "";</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Atualizar a exibição dos cupons gerados</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("user-coupons").style.display = "block";</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>document.getElementById("generated-coupons").textContent = data.codes.join(" - ");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>alert("Cupom inválido. Tente novamente.");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1">});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Atualizar o status dos cupons ao carregar a página</span></p>
<p class="p1"><span class="s1">checkCouponStatus();</span></p>
</body>
</html>
