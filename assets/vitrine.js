/* Imanto — vitrine de ferramentas.
   Lê /produtos/produtos.json e monta os cards em todo elemento [data-vitrine].
   Funciona com 0, 1 ou vários produtos. Para testar os estados sem mexer no JSON:
   ?demo=0, ?demo=1 ou ?demo=3 na URL (dados de demonstração, nunca publicados). */
(function(){
  var alvos = document.querySelectorAll("[data-vitrine]");
  if(!alvos.length) return;

  var DEMO = {
    "0": [],
    "1": [
      {"slug":"demo-a","nome":"[Produto 1, nome a definir]","status":"disponivel",
       "para":"[para quem, em uma linha]","resolve":"[o que a ferramenta faz na rotina do time de marketing, em uma frase]",
       "formato":"[formato: agente, pacote de prompts, planilha...]","preco":"R$ [preço]","url":"#"}
    ],
    "3": [
      {"slug":"demo-a","nome":"[Produto 1, nome a definir]","status":"disponivel",
       "para":"[para quem, em uma linha]","resolve":"[o que a ferramenta faz, em uma frase]",
       "formato":"[formato]","preco":"R$ [preço]","url":"#"},
      {"slug":"demo-b","nome":"[Produto 2, nome a definir]","status":"disponivel",
       "para":"[para quem]","resolve":"[o que faz]","formato":"[formato]","preco":"R$ [preço]","url":"#"},
      {"slug":"demo-c","nome":"[Produto 3, nome a definir]","status":"em-breve",
       "para":"[para quem]","resolve":"[o que faz]","formato":"[formato]"}
    ]
  };

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}

  function card(p, destaque){
    var breve = p.status !== "disponivel";
    var cta = breve
      ? '<a class="btn btn--ghost btn--sm" href="mailto:contato@imanto.com.br?subject='+encodeURIComponent("Me avise: "+p.nome)+'">Me avise quando abrir</a>'
      : '<a class="btn btn--solid btn--sm" href="'+esc(p.url)+'">Ver a ferramenta</a>';
    return '<article class="card prod'+(destaque?' prod--destaque':'')+(breve?' prod--breve':'')+'">'+
      '<p class="k">'+(breve?'Em breve':esc(p.formato||'Ferramenta'))+'</p>'+
      '<h3>'+esc(p.nome)+'</h3>'+
      (p.resolve?'<p>'+esc(p.resolve)+'</p>':'')+
      (p.para?'<p class="prod__para">Para '+esc(p.para.replace(/^para\s+/i,''))+'</p>':'')+
      '<div class="prod__foot">'+(!breve&&p.preco?'<span class="prod__preco">'+esc(p.preco)+'</span>':'')+cta+'</div>'+
    '</article>';
  }

  function vazio(){
    return '<div class="card prod prod--vazio">'+
      '<p class="k">Primeira ferramenta</p>'+
      '<h3>A primeira ferramenta está sendo preparada.</h3>'+
      '<p>Ela sai da rotina de marketing da Aurha e chega aqui pronta para o seu time usar. Quer saber quando abrir?</p>'+
      '<div class="prod__foot"><a class="btn btn--solid btn--sm" href="mailto:contato@imanto.com.br?subject=Quero%20saber%20quando%20a%20primeira%20ferramenta%20abrir">Me avise por e-mail</a></div>'+
    '</div>';
  }

  function render(lista){
    var disp = lista.filter(function(p){return p.status==="disponivel";});
    var ordem = disp.concat(lista.filter(function(p){return p.status!=="disponivel";}));
    alvos.forEach(function(el){
      var max = parseInt(el.getAttribute("data-max")||"0",10);
      var itens = max ? ordem.slice(0,max) : ordem;
      el.setAttribute("data-qtd", String(itens.length));
      if(!itens.length){ el.innerHTML = vazio(); return; }
      el.innerHTML = itens.map(function(p,i){return card(p, itens.length===1 && i===0);}).join("");
    });
  }

  var demo = (location.search.match(/[?&]demo=(\d)/)||[])[1];
  if(demo && DEMO[demo]){ render(DEMO[demo]); return; }

  fetch("/produtos/produtos.json",{cache:"no-store"})
    .then(function(r){return r.ok?r.json():{produtos:[]};})
    .then(function(d){render((d&&d.produtos)||[]);})
    .catch(function(){render([]);});
})();
