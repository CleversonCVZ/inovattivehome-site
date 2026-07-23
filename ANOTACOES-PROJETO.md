# Anotações do projeto — Site Inovattive Home

Última atualização: 22/07/2026

## Estrutura do projeto

A pasta raiz (`inovattivehome-novo/`) É o site pronto — antes havia uma pasta duplicada
aninhada, foi corrigido. Estrutura atual:

- `index.html` — home
- `css/style.css`, `js/script.js`
- `img/` — logo, hero, fotos de experiência e portfólio, logos de marcas
- `sobre/`, `rti/`, `unifi/`, `aat/`, `controlart/`, `fibaro/`, `sonos/`, `lutron/`, `denon/`, `yamaha/` — páginas de marca
- `materiais-brutos/` — arquivos de apoio (fotos originais, zips, imagens que o Cleverson vai mandando pra eu aplicar no site). Sempre que ele disser "coloquei na pasta materiais brutos", procurar ali.
- `Resumos_Marcas_InovattiveHome.docx` — resumos de cada marca (já todo incorporado nas páginas)
- `ANOTACOES-PROJETO.md` — este arquivo

## Padrão visual

Site dark/premium: fundo quase preto (#0B0C0E), acentos dourado/latão (#B08D57),
fontes Fraunces (títulos) + Manrope (corpo) + IBM Plex Mono (labels).

### Card "em destaque" (produto com imagem)
Criamos a classe `.service-card-featured` (CSS em `style.css`) pra qualquer card do
grid de "Principais Produtos"/"Destaques" ganhar imagem + texto lado a lado, span de
linha inteira. Duas variantes:
- **Produto em fundo branco/estúdio**: usa `.service-card-img-wrap` puro (moldura com
  gradiente branco, linha dourada no topo) — pra fotos de produto tipo catálogo.
- **Foto real de ambiente/instalação**: usa `.service-card-img-wrap.photo` (sem o
  fundo branco, imagem preenche o quadro com object-fit:cover) — pra fotos de
  instalação real ou screenshots de software.

Esse padrão é reutilizável em qualquer página de marca daqui pra frente.

## Status por página de marca

**RTI** (`rti/index.html`) — grid de 6 cards, 4 já com imagem:
- ✅ Controles Remotos Premiados (foto do controle, fundo branco)
- ✅ Processadores de Controle (foto XP-6s, fundo branco)
- ✅ Painéis Touch (foto IST-10, fundo branco)
- ✅ Integration Designer (screenshot System Manager, variante foto)
- ⬜ Distribuição Multi-Room AV — só texto ainda
- ⬜ Hospitality & Corporativo — só texto ainda

**UniFi** (`unifi/index.html`) — grid de 6 cards, 3 já com imagem:
- ⬜ Wi-Fi de Alta Capacidade — só texto
- ✅ Rede Cabeada Estruturada (foto cabeamento na parede, variante foto)
- ✅ Gerenciamento Centralizado (render oficial rack UDM Pro, fundo branco)
- ⬜ Segurança de Rede — só texto
- ✅ Escalável (foto rack instalado em armário, variante foto)
- ⬜ Suporte Técnico — só texto

**Outras marcas** (AAT, ControlArt, Fibaro, Sonos, Lutron, Denon, Yamaha) — ainda só
com texto, nenhuma imagem de produto aplicada ainda.

## Depoimentos (home, seção "Depoimentos")
Os 3 cards já têm depoimentos reais (não são mais placeholder):
1. Rafael Kanayama — "Serviço impecável, com pós venda muito atencioso e profissional! Recomendo!"
2. Carlos Eduardo Mendes — título "A instalação do home theater superou a expectativa"
3. Juliana Ferreira Costa — título "Eu não sabia o que era automação residencial!"

Todos os 3 têm o selo "Avaliação no Google" (logo colorida) + 5 estrelas douradas no topo.

## Outras edições feitas na home
- Hero stats: "+230 Projetos entregues" / "10 Anos de atuação" (removido o card de "100%")
- Eyebrow do hero: só "Curitiba" (removido "& Balneário Camboriú" — mas continua em
  meta description, og/twitter description e schema.org areaServed, por pedido do Cleverson)
- Texto do hero: "...projetado, instalado e configurado por uma equipe especializada..."
- Título da seção Serviços: "O rigor de uma engenharia que se sente em cada ambiente."
- Card Iluminação: "...horário, luminosidade e função do ambiente..."

## Pendências técnicas
- **Imagem grande não otimizada**: `img/brands/ubiquiti-produtos/rack-gerenciamento.png`
  (1,7 MB) ainda não foi comprimida — travou com erro de sincronização iCloud
  ("Resource deadlock avoided") toda vez que tento ler o arquivo pelo terminal.
  Pedi pro Cleverson abrir a pasta no Finder e clicar na imagem pra forçar o
  download do iCloud. Se ele confirmar que já abriu, tentar comprimir de novo
  (mesmo processo usado no `aat.png`, que já foi de 1,9 MB pra 124 KB).
- Página "Sobre" ainda não foi revisada/atualizada nesta sessão.

## Bugs corrigidos
- **Menu sumia no mobile**: o CSS só tinha `display:none` pro `.main-nav` em telas
  estreitas, sem nenhum botão pra abrir. Adicionado botão hambúrguer (`.nav-toggle`)
  em todas as 11 páginas + CSS/JS de abrir-fechar em `style.css`/`script.js`.
- **index.html da raiz não abria o site**: era uma versão antiga com paths quebrados.
  Corrigido reorganizando a estrutura de pastas (sem mais duplicação).
- **Botão do WhatsApp/menu "grudava" no fim da página ao rolar**: a animação de
  fade entre páginas usava `transform` no `<body>`, o que quebra `position:fixed`
  dos elementos filhos. Corrigido removendo o `transform`, mantendo só `opacity`
  na transição.

## Preferências do Cleverson (importante lembrar)
- Prefere respostas curtas e diretas, sem enrolação.
- Costuma mandar imagens/textos aos poucos, um card por vez — sempre aplicar o
  padrão `.service-card-featured` quando ele mandar imagem de produto pra
  alguma marca.
- Pede pra eu avisar quando uma imagem sugerida tiver problema (marca de
  terceiros visível, marca d'água, equipamento errado) em vez de simplesmente
  usar — já aconteceu na página UniFi (3 das 6 fotos foram descartadas por isso).
