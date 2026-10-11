/* Imanto — reveal on scroll (respeita prefers-reduced-motion) */
(function(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("in");});
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal").forEach(function(el,i){
    el.style.transitionDelay=(Math.min(i,6)*55)+"ms";io.observe(el);
  });
})();

/* Imanto — formulário do processo seletivo (envia para form.imanto.com.br, que avisa no Telegram e por e-mail) */
(function(){
  var f=document.getElementById("form-aplicar");
  if(!f)return;
  var t0=Date.now(), box=f.closest(".form"), msg=box.querySelector(".form__msg"), btn=f.querySelector("button[type=submit]");
  function erro(txt){msg.className="form__msg err";msg.innerHTML=txt;}
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var bad=null;
    f.querySelectorAll("[required]").forEach(function(el){
      var ok=el.type==="checkbox"?el.checked:el.value.trim()!=="" && (el.type!=="email"||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
      var w=el.closest(".field"); if(w)w.classList.toggle("invalid",!ok);
      if(!ok&&!bad)bad=el;
    });
    if(bad){erro("Faltou preencher algum campo obrigatório.");bad.focus();return;}
    var d={}; new FormData(f).forEach(function(v,k){d[k]=v;});
    d._t=t0; d.consentimento=f.consentimento.checked?"sim":"";
    btn.disabled=true; btn.textContent="Enviando…"; msg.className="form__msg";
    fetch(f.action,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
      .then(function(r){return r.json().catch(function(){return{ok:false};});})
      .then(function(j){
        if(!j.ok)throw new Error("falhou");
        box.classList.add("sent");
        if(window.fbq)window.fbq("track","Lead");
        if(window.gtag)window.gtag("event","generate_lead");
      })
      .catch(function(){
        btn.disabled=false; btn.textContent="Enviar aplicação";
        erro('Não conseguimos enviar agora. Tente de novo em instantes ou escreva para <a href="mailto:contato@imanto.com.br?subject=Processo%20seletivo" style="color:#fff;text-decoration:underline">contato@imanto.com.br</a>.');
      });
  });
})();
