# Anotações do projeto — Site Inovattive Home

Última atualização: 24/07/2026 — **SITE PUBLICADO DE VERDADE em inovattivehome.com.br** (migração
concluída com sucesso, ver "Publicação na HostGator" abaixo). O WordPress antigo virou backup,
não está mais no ar.

## Estrutura do projeto

A pasta raiz (`inovattivehome-novo/`) é o site pronto. Estrutura atual:

- `index.html` — home
- `css/style.css`, `js/script.js`
- `img/` — logo, hero, fotos de experiência e portfólio, logos de marcas, favicons, `img/team/` (fotos do fundador)
- `sobre/`, `rti/`, `unifi/`, `aat/`, `controlart/`, `fibaro/`, `sonos/`, `lutron/`, `denon/`, `yamaha/` — páginas de marca
- `materiais-brutos/` — arquivos de apoio (fotos originais, zips, imagens que o Cleverson vai mandando pra eu aplicar no site). Sempre que ele disser "coloquei na pasta materiais brutos", procurar ali. Tem subpastas por marca/pessoa (ex: `Controlart/`, `Cleverson/`).
- `Resumos_Marcas_InovattiveHome.docx` — resumos de cada marca (já todo incorporado nas páginas)
- `.htaccess` — redirects 301 (herdados do site WordPress antigo)
- `ANOTACOES-PROJETO.md` — este arquivo

## GitHub e Netlify (deploy automático)

- Repositório: `CleversonCVZ/inovattivehome-site` (branch `main`).
- **Fluxo de git**: a pasta do projeto está em Documents sincronizado com iCloud, montada via
  FUSE no sandbox Linux — operações git diretas ali são instáveis (erros de deadlock). Por isso
  todo commit/push é feito num clone separado em `/tmp/repo-sync` (fora do iCloud): eu copio os
  arquivos alterados pra lá, faço `git add/commit/push`. Não uso a MCP do Netlify pra deploy
  (bloqueada pelo proxy do sandbox) — o deploy é automático via GitHub.
- Netlify: site `inovattivehome` (renomeado do nome aleatório original), linkado ao GitHub —
  **todo `git push` na branch `main` dispara deploy automático**. Não preciso fazer nada manual
  no Netlify depois de um push.
- Site publicado em: inovattivehome.netlify.app — mas isso agora é só ambiente de **preview/teste**.
  A produção de verdade é a HostGator (ver seção "Publicação na HostGator" abaixo). Continuo
  fazendo push pro GitHub a cada mudança (assim o Netlify preview também atualiza), mas pra
  qualquer mudança valer no site real, precisa também repetir os passos de upload na HostGator —
  **não é automático como era com o Netlify**.
- Tentei ativar GitHub Pages como espelho gratuito adicional (alternativa ao Netlify quando os
  créditos free dele acabaram) — **bloqueado**: `api.github.com` está fora do allowlist do proxy
  do sandbox (mesma limitação que já existia com a API do Netlify). `github.com` (usado pelo git
  CLI) funciona normalmente, só a API é que não. Se precisar ativar Pages, tem que ser o Cleverson
  clicando em Settings → Pages → branch main → Save, direto no navegador dele.
- **Cache-busting é crítico**: todo `.html` referencia `css/style.css?vN` e `js/script.js?vN`.
  Toda vez que eu mudo `style.css` ou `script.js`, preciso bumpar esse número em TODAS as 12
  páginas, senão o celular do Cleverson serve a versão antiga do cache e ele vê bugs visuais que
  já foram corrigidos (aconteceu pelo menos duas vezes nesta sessão). Versões atuais no fim desta
  sessão: `style.css?v=11`, `script.js?v=5`.

## Padrão visual

Site dark/premium: fundo quase preto (#0B0C0E), acentos dourado/latão (#B08D57 / #D4A64A).
**Fontes: Montserrat (títulos) + Open Sans (corpo) + IBM Plex Mono (labels/eyebrows)** — trocado
de Fraunces+Manrope nesta sessão, aprovado como definitivo pelo Cleverson. Tudo controlado por
CSS custom properties (`--font-display`, `--font-body`) em `style.css`, então trocar fonte de
novo no futuro é mexer só ali.

Texto em dourado usando `<em>` **não é mais itálico** — só cor (`em { font-style: normal; }`),
por pedido do Cleverson, aplicado globalmente.

### Card "em destaque" (produto com imagem)
Classe `.service-card-featured` — imagem + texto lado a lado, span de linha inteira. Variantes
de `.service-card-img-wrap`:
- **(sem modificador)** — fundo branco/estúdio, pra fotos de produto tipo catálogo.
- **`.photo`** — fundo escuro, `object-fit:cover` (preenche/corta), pra fotos reais de
  ambiente/instalação.
- **`.photo.contain`** — fundo escuro, `object-fit:contain` (mostra a imagem inteira sem
  cortar), usado quando o crop do `.photo` ficava ruim.
- **`.product-carousel`** — variante com várias imagens e setas de navegação (prev/next),
  ocupando o mesmo espaço visual de um card normal. JS genérico em `script.js` lê o atributo
  `data-images` (JSON) do elemento com essa classe e troca o `src` da `<img>` dentro dele ao
  clicar nas setas — **reutilizável em qualquer lugar do site**, não só em cards de produto (foi
  reaproveitado no avatar do fundador na página Sobre, ver abaixo).

Esse padrão é reutilizável em qualquer página de marca daqui pra frente.

## Status por página de marca

**RTI** (`rti/index.html`) — grid completo, todos com imagem real:
- ✅ Controles Remotos Premiados, Processadores de Controle, Painéis Touch, Integration Designer
- ✅ Hospitality & Corporativo (imagem do touchpanel + texto traduzido do inglês)
- Card "Distribuição Multi-Room AV" foi **removido** (pedido do Cleverson)

**ControlArt** (`controlart/index.html`) — grid com 5 produtos reais (era 6 placeholders):
- ✅ Módulo Cabeado Relé (imagem `Ecossistema-Cabeado-v2.png`, variante `.photo.contain`)
- ✅ Módulo Cabeado Dimmer (imagem `mODULO diMMER.png`, PNG transparente, `.photo.contain`)
- ✅ IR Blaster 360 (imagem `Banner-gateway_`)
- ✅ Keypads IVOLV (imagem `Ecossistema-IVOLV`)
- ✅ Quadros de Automação — **carrossel** com 3 fotos reais de instalação (setas prev/next)
- Card "Design Elegante" foi **removido** (pedido do Cleverson)

**UniFi** (`unifi/index.html`) — grid de 6 cards, 3 já com imagem:
- ⬜ Wi-Fi de Alta Capacidade — só texto
- ✅ Rede Cabeada Estruturada (foto cabeamento na parede, variante foto)
- ✅ Gerenciamento Centralizado (render oficial rack UDM Pro, fundo branco)
- ⬜ Segurança de Rede — só texto
- ✅ Escalável (foto rack instalado em armário, variante foto)
- ⬜ Suporte Técnico — só texto

**Outras marcas** (AAT, Fibaro, Sonos, Lutron, Denon, Yamaha) — ainda só com texto, nenhuma
imagem de produto aplicada ainda.

## Página Sobre (`sobre/index.html`)
- Avatar do fundador: era um círculo com as iniciais "CZ", virou um **carrossel de fotos reais**
  (2 fotos, pasta `materiais-brutos/Cleverson/`), reaproveitando o mesmo componente
  `.product-carousel`/JS dos cards de produto. Círculo aumentado de 72px pra 140px pra dar pra
  reconhecer o rosto. Fotos processadas/cropadas e salvas em `img/team/cleverson-1.jpg` e
  `cleverson-2.jpg`.
- Texto de história corrigido pra primeira pessoa ("Percebi", "meus clientes" — antes estava em
  terceira pessoa "Percebeu"/"seus clientes" por engano).

## Depoimentos (home, seção "Depoimentos")
Os 3 cards já têm depoimentos reais (não são mais placeholder):
1. Rafael Kanayama — "Serviço impecável, com pós venda muito atencioso e profissional! Recomendo!"
2. Carlos Eduardo Mendes — título "A instalação do home theater superou a expectativa"
3. Juliana Ferreira Costa — título "Eu não sabia o que era automação residencial!"

Todos os 3 têm o selo "Avaliação no Google" (logo colorida) + 5 estrelas douradas no topo.

## Contato e conversão (WhatsApp / redes sociais)
- Seção de contato (home, `#contato`): lista WhatsApp / Telefone / Localização e, logo abaixo,
  **Instagram / Facebook / YouTube** (ícone + link), no mesmo padrão visual dos itens acima.
  Links reais: instagram.com/inovattivehome, facebook.com/inovativehome, youtube.com/channel/UCbEOoF0XL7lhBxxzGGqCXdQ.
  (Não estão mais no rodapé — foram movidos pra cá a pedido do Cleverson; o rodapé das outras 10
  páginas de marca ainda mantém os ícones sociais, já que elas não têm essa seção de contato.)
- Texto do item WhatsApp: "Resposta rápida e atendimento humanizado".
- **CTAs de WhatsApp entre seções, só no mobile** (`.mobile-whatsapp-cta`, `@media max-width:860px`):
  3 banners com texto "Fale agora com um especialista." + botão "Chamar no WhatsApp", posicionados
  depois de Serviços, depois de Portfólio e depois de Depoimentos. Sem ícone (removido a pedido).
- Botão flutuante do WhatsApp (`.whatsapp-float`): ajustado pra respeitar
  `env(safe-area-inset-bottom)` — evita ficar colado/escondido atrás da barra do navegador no
  mobile ao rolar a página.

## Outras edições feitas na home
- Hero stats: "+230 Projetos entregues" / "10 Anos de atuação" (removido o card de "100%")
- Eyebrow do hero: só "Curitiba" (removido "& Balneário Camboriú" — mas continua em
  meta description, og/twitter description e schema.org areaServed, por pedido do Cleverson)
- Texto do hero: "...projetado, instalado e configurado por uma equipe especializada..."
- Título da seção Serviços: "O rigor de uma engenharia que se sente em cada ambiente."
- Card Iluminação: "...horário, luminosidade e função do ambiente..."
- Frase trocada: "Trabalhamos apenas com o que há de melhor no mundo" → "Trabalhamos com
  excelentes marcas nacionais e importadas"

## Questionário dinâmico de contato (home, `#contato`, substitui o formulário antigo)
Formulário virou um "quiz" estilo Typeform — uma pergunta por vez, com barra de progresso e
"Passo X de Y" dinâmico (calculado em JS, não fixo, porque o caminho muda de tamanho conforme a
resposta). Código em `js/script.js` (bloco `// Questionário dinâmico de contato`) + HTML em
`index.html` dentro de `<form id="contact-form" class="quiz-form">`.

**Fluxo atual (definido junto com o Cleverson, passou por 2 rodadas de ajuste):**
1. "Você está construindo ou reformando?" (Sim/Não) — pergunta raiz que decide todo o resto:
   - **Sim** → "Em que fase da obra você está?" (5 opções) → "Tipo de projeto" (Casa/Apto/
     Cobertura/Escritório) → Detalhes → Nome → WhatsApp. (Pula a pergunta de automação existente
     — não faz sentido perguntar isso pra quem tá construindo.)
   - **Não** → vai direto pra "Você já tem algum sistema de automação instalado?" → Detalhes →
     Nome → WhatsApp. (Pula fase da obra E tipo de projeto — só existem no caminho Sim.)
2. O texto da pergunta "Detalhes" muda dinamicamente pra "...pro seu escritório" só se a pessoa
   escolheu "Escritório / Corporativo" no Tipo de projeto — e **precisa resetar esse texto pro
   padrão genérico se a pessoa voltar e trocar pra "Não"** (bug já corrigido: o texto ficava preso
   em "escritório" mesmo depois de mudar de caminho, porque eu só atualizava o label ao clicar em
   "tipo", nunca ao clicar em "obra"/Não).
3. Ao final, monta uma mensagem de texto com todas as respostas e abre `wa.me` com o número da
   Inovattive — mesma lógica de sempre, só que agora com mais campos (obra, fase, tipo, existente,
   mensagem, nome, telefone — os que não foram perguntados no caminho escolhido saem vazios/somem
   da mensagem).

**Lição de CSS aprendida construindo isso**: regras genéricas antigas tipo `.contact-form button`
e `.contact-form label` (classe + elemento = mais específicas que uma classe só) atropelavam meus
estilos novos (`.quiz-option`, `.quiz-question`, `.quiz-back`) mesmo vindo depois no arquivo. Tive
que aumentar a especificidade dos seletores novos (ex: `.quiz-options .quiz-option` em vez de só
`.quiz-option`) pra vencer. Se for mexer nesse form de novo, prestar atenção nisso.

## Página de Política de Privacidade (LGPD)
Nova página `privacidade/index.html` (com `<meta name="robots" content="noindex, follow">` —
proposital, página de utilidade não precisa competir no Google). Link "Política de Privacidade"
adicionado no `.footer-note` de todas as 12 páginas. Cobre: quais dados o formulário coleta (nome,
telefone, respostas do quiz), que os dados vão direto pro WhatsApp sem passar por banco de dados
próprio, menção a cookies/Analytics futuros, direitos do titular (LGPD) e contato via WhatsApp
pra exercer esses direitos. CSS novo: `.legal-content` em `style.css`.

## SEO / técnico
- Auditoria feita comparando com o site antigo (inovattivehome.com.br, WordPress, será
  desativado). Aplicado: favicons completos (favicon.ico + PNGs + apple-touch-icon, gerados a
  partir do ícone "IH" da logo) em todas as páginas; 2 redirects 301 que faltavam no
  `.htaccess` (`/home-b/` e `/sample-page/` → home); robots.txt e sitemap.xml já existiam e estão
  ok (sitemap não inclui `/privacidade/` de propósito, por causa do noindex).
- **Pendente**: Google Analytics (GA4), Google Tag Manager e/ou Google Ads — preciso dos IDs do
  Cleverson pra instalar. Ele ainda não passou. Perguntar de novo quando for relevante.

## Pendências técnicas
- Marcas sem imagem de produto real ainda: AAT, Fibaro, Sonos, Lutron, Denon, Yamaha (só texto).
- UniFi: 3 dos 6 cards ainda só com texto (Wi-Fi de Alta Capacidade, Segurança de Rede,
  Suporte Técnico).
- Há fotos de referência do ControlArt em `materiais-brutos/Controlart/` ainda não usadas no
  site (variações de cor do keypad IVOLV, módulo CANBUS, IR Blaster amplificado, algumas fotos
  de instalação real) — sem instrução ainda de onde/se usar.
- GitHub PAT que o Cleverson colou em texto puro no chat em algum momento desta sessão —
  recomendado (mas não confirmado) que ele revogue/gere um novo por segurança. Ele pediu
  explicitamente pra "deixar quieto por enquanto" — não insistir nisso sem ele trazer o assunto.
- ~~Imagem grande não otimizada (`rack-gerenciamento.png`)~~ — **resolvido nesta sessão**:
  1,7 MB → 424 KB (resize pra 800px, mesma qualidade, RGBA preservado).

## Publicação na HostGator (feita em 24/07/2026 — MIGRAÇÃO CONCLUÍDA)
O site novo está publicado de verdade em inovattivehome.com.br, hospedado na HostGator (cPanel,
conta `ino59204`). Passo a passo que seguimos (guiado por prints, o Cleverson mexendo no cPanel
enquanto eu orientava — não tenho nem devo ter as credenciais do cPanel/FTP dele):

1. Backup completo no cPanel (Backup Wizard — arquivos + banco MySQL) feito antes de tudo.
2. Em vez de renomear, ele **copiou** a `public_html` inteira (WordPress) pra uma pasta
   `public_html_backup` — conferimos que os tamanhos de arquivo batiam entre as duas (inclusive
   o `wp-content/uploads`, que tinha um `2024.zip` de 337 MB — bateu certinho).
3. Esvaziou a `public_html` original (Selecionar tudo + Excluir — foi pra lixeira do cPanel, não
   apagou de vez).
4. Baixou o zip do site direto do GitHub (`https://github.com/CleversonCVZ/inovattivehome-site/archive/refs/heads/main.zip`)
   no próprio Mac, subiu na `public_html` vazia via "Carregar", e extraiu.
5. **Pegadinha que rolou**: o Gerenciador de Arquivos do cPanel esconde arquivos ocultos por
   padrão, então "Selecionar tudo" na pasta extraída não pegava `.htaccess` nem `.gitignore` —
   precisou ativar "mostrar arquivos ocultos" nas Configurações e mover esses dois separadamente.
   Se for orientar isso de novo (em outra conta HostGator, por exemplo), já avisar esse detalhe
   de cara.
6. Também descobriu (depois de mostrar os ocultos) que a `public_html` já tinha uns arquivos
   soltos de versões antigas do `.htaccess` do WordPress (`.htaccess.nfd-backup`,
   `.htaccess.phpupgrader.*`, `.user.ini`) que a exclusão do passo 3 não pegou (mesma razão:
   estavam ocultos). Apagamos — não fazem falta pro site estático.
7. Apagou a pasta vazia da extração, o zip, e o `ANOTACOES-PROJETO.md` (esse arquivo não deve
   ficar público no servidor — só existe aqui no repositório/pasta do projeto).
8. Manteve a pasta `.well-known` intocada (importante pra renovação do certificado SSL).
9. Testou pelo domínio real — carregou perfeito, com a fonte, hero, menu, WhatsApp float etc.

**Fluxo de manutenção daqui pra frente (mudou! ler com atenção):**
Como a produção agora é a HostGator (não é mais deploy automático via Netlify), qualquer alteração
pontual no site precisa de DOIS passos: (1) eu edito o arquivo localmente e faço push pro GitHub
como sempre (isso atualiza o preview no Netlify e mantém o histórico), e (2) o Cleverson (ou eu
orientando) precisa subir manualmente só o(s) arquivo(s) que mudaram pro `public_html` da
HostGator via cPanel File Manager — **não precisa refazer o processo todo de zip/extração**, só
sobrescrever o arquivo específico que mudou (ex: se só mudei `css/style.css`, é só fazer upload
desse arquivo dentro da pasta `css/` do `public_html`, substituindo o antigo). Se mudar vários
arquivos de uma vez, aí sim vale considerar zipar de novo.

## Bugs corrigidos
- **Menu sumia no mobile**: adicionado botão hambúrguer (`.nav-toggle`) em todas as 11 páginas +
  CSS/JS de abrir-fechar.
- **index.html da raiz não abria o site**: corrigido reorganizando a estrutura de pastas (sem
  mais duplicação).
- **Botão do WhatsApp/menu "grudava" no fim da página ao rolar**: corrigido removendo `transform`
  da transição de fade entre páginas, mantendo só `opacity`.
- **Botão do WhatsApp ficava colado na barra do navegador no mobile**: corrigido com
  `env(safe-area-inset-bottom)`.

## Preferências do Cleverson (importante lembrar)
- Prefere respostas curtas e diretas, sem enrolação.
- Costuma mandar imagens/textos aos poucos, um card por vez — sempre aplicar o padrão
  `.service-card-featured` quando ele mandar imagem de produto pra alguma marca.
- Pede pra eu avisar quando uma imagem sugerida tiver problema (marca de terceiros visível,
  marca d'água, equipamento errado, foto cortada estranho) em vez de simplesmente usar — já
  aconteceu várias vezes (UniFi, ControlArt) e a resposta certa é recortar/trocar e mostrar de
  novo, iterando até ele aprovar.
- Depois de qualquer mudança visual, ele confere direto no site publicado (netlify.app) pelo
  celular — então sempre fazer commit+push logo depois de editar, sem esperar ele pedir.
- Decisões de escopo/frequência de UI (ex: quantos CTAs, onde colocar algo) — vale perguntar
  com opções antes de implementar, em vez de assumir a versão mais agressiva.
