(function () {
  /* ─── CSS ─────────────────────────────────────────────── */
  var css = `
    :root{--cb-red:#C41E3A;--cb-gold:#C9A84C;--cb-black:#111111;--cb-dark:#1a1a1a;--cb-white:#ffffff}
    #cb-launcher{
      position:fixed!important;bottom:28px!important;right:24px!important;left:auto!important;z-index:9998;
      width:58px;height:58px;border-radius:50%;
      background:var(--cb-red);border:none;cursor:pointer;
      box-shadow:0 4px 20px rgba(196,30,58,0.5);
      display:flex;align-items:center;justify-content:center;
      transition:transform 0.25s,box-shadow 0.25s;
    }
    #cb-launcher:hover{transform:scale(1.1);box-shadow:0 8px 28px rgba(196,30,58,0.6)}
    #cb-launcher svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:2;transition:opacity 0.2s}
    #cb-launcher .cb-icon-close{display:none}
    #cb-launcher.cb-open .cb-icon-chat{display:none}
    #cb-launcher.cb-open .cb-icon-close{display:block}
    #cb-badge{
      position:absolute;top:-3px;right:-3px;
      width:18px;height:18px;border-radius:50%;
      background:var(--cb-gold);border:2px solid #fff;
      font-size:10px;font-weight:700;color:var(--cb-black);
      display:flex;align-items:center;justify-content:center;
      font-family:'Oswald',sans-serif;
      animation:cb-pulse 2s ease-in-out infinite;
    }
    #cb-badge.cb-hidden{display:none}
    @keyframes cb-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
    #cb-window{
      position:fixed!important;bottom:100px!important;right:24px!important;left:auto!important;z-index:9997;
      width:360px;height:530px;border-radius:16px;
      background:#fff;box-shadow:0 20px 60px rgba(0,0,0,0.22);
      display:flex;flex-direction:column;overflow:hidden;
      transform:scale(0.85) translateY(20px);opacity:0;
      pointer-events:none;
      transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),opacity 0.25s ease;
      transform-origin:bottom right;
      font-family:'Inter',sans-serif;
    }
    #cb-window.cb-visible{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
    /* HEADER */
    .cb-header{
      background:var(--cb-black);padding:14px 16px;
      display:flex;align-items:center;gap:12px;flex-shrink:0;
    }
    .cb-avatar{
      width:40px;height:40px;border-radius:50%;
      background:var(--cb-red);display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .cb-avatar svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2}
    .cb-header-info{flex:1}
    .cb-header-name{font-family:'Oswald',sans-serif;font-size:15px;font-weight:700;color:#fff;letter-spacing:0.5px}
    .cb-header-status{font-size:11px;color:rgba(255,255,255,0.55);display:flex;align-items:center;gap:5px;margin-top:2px}
    .cb-status-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;flex-shrink:0}
    /* MESSAGES */
    .cb-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
    .cb-messages::-webkit-scrollbar{width:4px}
    .cb-messages::-webkit-scrollbar-track{background:transparent}
    .cb-messages::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px}
    /* BOT MSG */
    .cb-bot-row{display:flex;align-items:flex-end;gap:8px}
    .cb-bot-dot{width:28px;height:28px;border-radius:50%;background:var(--cb-red);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-bottom:2px}
    .cb-bot-dot svg{width:13px;height:13px;stroke:#fff;fill:none;stroke-width:2.5}
    .cb-bubble{max-width:240px;padding:10px 13px;border-radius:14px 14px 14px 2px;background:#f3f4f6;font-size:13.5px;line-height:1.6;color:#222}
    .cb-bubble strong{color:var(--cb-black);display:block;margin-bottom:3px}
    .cb-bubble ul{margin:6px 0 0 4px;padding:0;list-style:none}
    .cb-bubble ul li{padding:2px 0;color:#444;font-size:13px}
    .cb-bubble ul li::before{content:'✓ ';color:var(--cb-red);font-weight:700}
    /* USER MSG */
    .cb-user-row{display:flex;justify-content:flex-end}
    .cb-user-bubble{max-width:220px;padding:10px 13px;border-radius:14px 14px 2px 14px;background:var(--cb-red);font-size:13.5px;line-height:1.6;color:#fff}
    /* TYPING */
    .cb-typing-row{display:flex;align-items:flex-end;gap:8px}
    .cb-typing{display:flex;align-items:center;gap:5px;padding:12px 16px;background:#f3f4f6;border-radius:14px 14px 14px 2px}
    .cb-typing span{width:7px;height:7px;border-radius:50%;background:#aaa;display:inline-block;animation:cb-bounce 1.2s ease-in-out infinite}
    .cb-typing span:nth-child(1){animation-delay:0s}
    .cb-typing span:nth-child(2){animation-delay:0.18s}
    .cb-typing span:nth-child(3){animation-delay:0.36s}
    @keyframes cb-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}
    /* QUICK REPLIES */
    .cb-quick-replies{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;padding-left:36px}
    .cb-qr{
      padding:6px 12px;border-radius:20px;border:1.5px solid var(--cb-red);
      font-size:12.5px;font-family:'Oswald',sans-serif;font-weight:600;
      letter-spacing:0.3px;color:var(--cb-red);background:#fff;cursor:pointer;
      transition:background 0.2s,color 0.2s;white-space:nowrap;
    }
    .cb-qr:hover{background:var(--cb-red);color:#fff}
    /* ACTION BUTTONS */
    .cb-actions{display:flex;flex-direction:column;gap:6px;margin-top:6px;padding-left:36px}
    .cb-action{
      display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;
      font-size:13px;font-family:'Oswald',sans-serif;font-weight:700;
      letter-spacing:0.5px;text-transform:uppercase;text-decoration:none;
      cursor:pointer;border:none;transition:filter 0.2s;
    }
    .cb-action:hover{filter:brightness(1.1)}
    .cb-action svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2.5;flex-shrink:0}
    .cb-action-call{background:var(--cb-red);color:#fff}
    .cb-action-wa{background:#25D366;color:#fff}
    .cb-action-estimate{background:var(--cb-gold);color:var(--cb-black)}
    .cb-action-portfolio{background:#f3f4f6;color:var(--cb-black)}
    /* INPUT */
    .cb-input-row{
      padding:10px 12px;border-top:1px solid #f0f0f0;
      display:flex;align-items:center;gap:8px;flex-shrink:0;background:#fff;
    }
    .cb-input{
      flex:1;border:1.5px solid #e5e7eb;border-radius:22px;
      padding:8px 14px;font-size:13.5px;font-family:'Inter',sans-serif;
      outline:none;transition:border-color 0.2s;resize:none;max-height:80px;
    }
    .cb-input:focus{border-color:var(--cb-red)}
    .cb-send{
      width:36px;height:36px;border-radius:50%;border:none;
      background:var(--cb-red);cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:background 0.2s;flex-shrink:0;
    }
    .cb-send:hover{background:#960018}
    .cb-send svg{width:15px;height:15px;stroke:#fff;fill:none;stroke-width:2.5}
    /* POWERED */
    .cb-footer{padding:6px;text-align:center;font-size:10px;color:#bbb;flex-shrink:0}
    /* MOBILE */
    @media(max-width:480px){
      #cb-window{left:0!important;right:0!important;bottom:0!important;width:100%;height:75vh;border-radius:20px 20px 0 0;transform-origin:bottom center}
      #cb-launcher{right:16px!important;left:auto!important;bottom:24px!important}
    }
  `;
  var s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  /* ─── HTML ────────────────────────────────────────────── */
  var html = `
  <button id="cb-launcher" aria-label="Open chat" onclick="cbToggle()">
    <svg class="cb-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    <svg class="cb-icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <span id="cb-badge">1</span>
  </button>
  <div id="cb-window" role="dialog" aria-label="Chat assistant">
    <div class="cb-header">
      <div class="cb-avatar"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div>
      <div class="cb-header-info">
        <div class="cb-header-name">Caballero Construction</div>
        <div class="cb-header-status"><span class="cb-status-dot"></span>Online — Riverside, CA</div>
      </div>
    </div>
    <div class="cb-messages" id="cb-messages"></div>
    <div class="cb-input-row">
      <input class="cb-input" id="cb-input" type="text" placeholder="Ask a question…" autocomplete="off" onkeydown="if(event.key==='Enter')cbSend()" />
      <button class="cb-send" onclick="cbSend()" aria-label="Send">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
      </button>
    </div>
    <div class="cb-footer">Caballero Construction Inc · (562) 394-6813</div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);

  /* ─── DATA ────────────────────────────────────────────── */
  var BASE = (function(){
    var p = window.location.pathname;
    if(p.includes('/blog/') || p.includes('/services/')) return '../';
    return '';
  })();

  var PHONE = 'tel:5623946813';
  var WA = 'https://wa.me/15623946813?text=Hi!%20I%27d%20like%20more%20information%20about%20Caballero%20Construction.';
  var ESTIMATE = BASE + 'index.html#contact';
  var PORTFOLIO = BASE + 'portafolio.html';

  var ACTIONS = [
    { type:'call', label:'Call (562) 394-6813', cls:'cb-action-call', href:PHONE, icon:'<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.7 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>' },
    { type:'wa',   label:'WhatsApp Us', cls:'cb-action-wa', href:WA, target:'_blank', icon:'<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>' },
    { type:'est',  label:'Calcular Estimado Gratis', cls:'cb-action-estimate', onclick:'openEstimator', icon:'<path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3"/><path d="M9 15h3l8.5-8.5a1.5 1.5 0 00-3-3L9 12v3z"/>' }
  ];

  var FAQS = [
    {
      id:'services',
      keywords:['service','offer','do you do','what do','trabajo','servicios','trabajo','specialist'],
      question:'What services do you offer?',
      response:'We offer <strong>10 home improvement services</strong> across Riverside &amp; the Inland Empire:',
      list:['Kitchen Remodeling','Bathroom Remodeling','Flooring','Drywall &amp; Framing','Painting','Roofing','Plumbing','Electrical Work','Doors &amp; Windows','Concrete &amp; Masonry'],
      follow:[{id:'kitchen',label:'🍳 Kitchen'},{id:'bathroom',label:'🚿 Bathroom'},{id:'roofing',label:'🏠 Roofing'},{id:'pricing',label:'💰 Pricing'}],
      actions:true
    },
    {
      id:'kitchen',
      keywords:['kitchen','cocina','cabinet','counter','remodel kitchen','renovate kitchen'],
      question:'Kitchen remodeling',
      response:'<strong>Kitchen Remodeling</strong> is one of our specialties! We handle everything:',
      list:['Cabinet installation &amp; painting','Quartz, granite &amp; marble countertops','Tile backsplash','New flooring','Plumbing &amp; electrical updates'],
      extra:'💰 Typical range: <strong>$8,000 – $100,000+</strong> depending on scope. ROI of up to 80% at resale.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'timeline',label:'⏱ Timeline'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'bathroom',
      keywords:['bathroom','baño','shower','tub','vanity','toilet','bath'],
      question:'Bathroom remodeling',
      response:'<strong>Bathroom Remodeling</strong> is a top investment for Inland Empire homes:',
      list:['Walk-in tile showers &amp; frameless glass','Custom vanities with quartz tops','Heated floors &amp; recessed lighting','Full gut-and-rebuild or cosmetic updates','Water-efficient fixtures (CalGreen)'],
      extra:'💰 Range: <strong>$2,500 – $65,000+</strong>. Master baths return 60–70% at resale.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'timeline',label:'⏱ Timeline'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'flooring',
      keywords:['floor','flooring','tile','hardwood','vinyl','lvp','carpet','piso'],
      question:'Flooring installation',
      response:'<strong>Flooring</strong> — we install all major types in IE homes:',
      list:['Luxury Vinyl Plank (LVP) — #1 choice for IE heat','Porcelain &amp; ceramic tile','Engineered hardwood','Carpet for bedrooms'],
      extra:'💰 Installed cost: <strong>$7–$19/sq ft</strong> depending on material. Free measurement included.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'areas',label:'📍 Areas'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'roofing',
      keywords:['roof','roofing','leak','shingle','techo','ceiling','water damage'],
      question:'Roofing services',
      response:'<strong>Roofing</strong> — we handle repairs and full replacements:',
      list:['Missing/damaged shingle repair','Full roof replacement','Flat roof systems','Flashing &amp; sealant repair','Free roof inspection included'],
      extra:'💰 Repairs: <strong>$300 – $1,200</strong>. Full replacement: <strong>$8,000 – $28,000</strong>.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'timeline',label:'⏱ Timeline'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'painting',
      keywords:['paint','painting','color','interior','exterior','walls','pintura'],
      question:'Interior & exterior painting',
      response:'<strong>Painting</strong> — interior &amp; exterior done right:',
      list:['Full interior walls &amp; ceilings','Exterior siding &amp; trim','Cabinet painting &amp; refinishing','Popcorn ceiling texture removal','Color consultation included'],
      extra:'We use premium paints, do full surface prep, and leave zero mess behind.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'areas',label:'📍 Areas'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'plumbing',
      keywords:['plumb','pipe','sink','faucet','toilet','water heater','disposal','drain','garbage','plomeria'],
      question:'Plumbing services',
      response:'<strong>Plumbing</strong> — from a leaky faucet to full rough-ins:',
      list:['Garbage disposal installation','Faucet &amp; fixture replacement','Water heater installation','Toilet repair &amp; replacement','Pipe repair &amp; leak detection'],
      extra:'Same-day and next-day availability. We\'ve fixed 500+ plumbing jobs in Riverside County.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'areas',label:'📍 Areas'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'electrical',
      keywords:['electric','electrical','outlet','panel','light','wiring','circuit','switch','electricidad'],
      question:'Electrical work',
      response:'<strong>Electrical Work</strong> — safe, code-compliant installations:',
      list:['Outlet &amp; switch installation','Light fixture &amp; ceiling fan install','Exit signs &amp; emergency lighting','TV &amp; monitor mounting','Panel upgrades (with licensed electrician)'],
      extra:'All electrical work is done to Riverside County code and inspected.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'areas',label:'📍 Areas'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'pricing',
      keywords:['price','cost','how much','quote','estimate','rate','charge','expensive','cheap','cuesta','precio','presupuesto'],
      question:'Pricing & estimates',
      response:'Here are typical price ranges for our most-requested services in Riverside, CA:',
      list:['Kitchen Remodel: <strong>$8,000 – $100,000+</strong>','Bathroom Remodel: <strong>$2,500 – $65,000+</strong>','Flooring: <strong>$7 – $19 / sq ft installed</strong>','Roofing: <strong>$300 – $28,000</strong>','Painting: custom quote by scope'],
      extra:'📌 Every project is unique. The best price comes from a <strong>free in-person estimate</strong> — we come to you, measure, and give you a written quote. No obligation.',
      follow:[{id:'kitchen',label:'🍳 Kitchen'},{id:'bathroom',label:'🚿 Bathroom'},{id:'roofing',label:'🏠 Roofing'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'areas',
      keywords:['area','where','city','location','serve','cover','riverside','corona','moreno','fontana','jurupa','norco','inland empire','san bernardino'],
      question:'Service areas',
      response:'We serve <strong>Riverside County and surrounding Inland Empire cities</strong>:',
      list:['Riverside','Corona','Moreno Valley','Jurupa Valley','Fontana','Norco &amp; surrounding areas'],
      extra:'📍 Not sure if we cover your city? Call or message us — if we can get there, we will.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'timeline',
      keywords:['how long','timeline','time','days','weeks','when','schedule','start','finish','duration'],
      question:'Project timeline',
      response:'<strong>Realistic timelines</strong> for common projects:',
      list:['Bathroom update: <strong>1–2 weeks</strong>','Full bathroom remodel: <strong>3–6 weeks</strong>','Kitchen remodel: <strong>8–14 weeks</strong>','Flooring (whole home): <strong>3–7 days</strong>','Painting (interior): <strong>2–5 days</strong>','Roofing replacement: <strong>2–5 days</strong>'],
      extra:'⏱ Timeline starts after materials arrive. We keep you updated throughout the project.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'license',
      keywords:['licens','insur','certif','legal','permit','bond','cslb','trust','safe','legit','qualified'],
      question:'License & insurance',
      response:'<strong>Yes, fully licensed &amp; insured:</strong>',
      list:['CSLB Licensed General Contractor (CA)','General Liability Insurance','Workers\' Compensation Insurance','We pull all required permits','20+ years serving Riverside County'],
      extra:'You can verify our license number at cslb.ca.gov at any time. We provide our license # and insurance certificates with every quote.',
      follow:[{id:'reviews',label:'⭐ Reviews'},{id:'pricing',label:'💰 Pricing'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'reviews',
      keywords:['review','rating','star','google','testimonial','opinion','feedback','good','recommend'],
      question:'Reviews & reputation',
      response:'We have a <strong>5.0 ★ Google rating</strong> across our reviews from Inland Empire homeowners:',
      list:['"Enrique is the best! Very detailed and his work shows it." — Livi D.','\"Came out same day, awesome price, perfection!\" — Ahmad A.','\"Better than expected\" — Cynthia B. (master bathroom)','\"Quick, efficient, professional\" — Jesse V.','500+ completed projects since 2004'],
      extra:'Read all reviews on our <a href="'+PORTFOLIO+'" style="color:var(--cb-red)">portfolio page</a>.',
      follow:[{id:'pricing',label:'💰 Pricing'},{id:'contact',label:'📞 Contact'}],
      actions:true
    },
    {
      id:'contact',
      keywords:['contact','call','phone','number','reach','whatsapp','message','talk','speak','hello','hi'],
      question:'Contact us',
      response:'Ready to get started? Here\'s how to reach our team directly:',
      extra:'We respond to WhatsApp messages within minutes during business hours (Mon–Sat, 7am–7pm).',
      follow:[],
      actions:true,
      actionsOnly:true
    }
  ];

  /* ─── STATE ───────────────────────────────────────────── */
  var isOpen = false;
  var msgBox = null;
  var typingEl = null;

  /* ─── HELPERS ─────────────────────────────────────────── */
  function scrollDown(){
    if(!msgBox) return;
    setTimeout(function(){msgBox.scrollTop=msgBox.scrollHeight},50);
  }

  function addBotRow(content){
    var row = document.createElement('div');
    row.className = 'cb-bot-row';
    row.innerHTML = '<div class="cb-bot-dot"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div>' + content;
    msgBox.appendChild(row);
    scrollDown();
    return row;
  }

  function addUserBubble(text){
    var row = document.createElement('div');
    row.className = 'cb-user-row';
    row.innerHTML = '<div class="cb-user-bubble">'+esc(text)+'</div>';
    msgBox.appendChild(row);
    scrollDown();
  }

  function showTyping(){
    if(typingEl) return;
    var row = document.createElement('div');
    row.className = 'cb-typing-row';
    row.innerHTML = '<div class="cb-bot-dot"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div><div class="cb-typing"><span></span><span></span><span></span></div>';
    msgBox.appendChild(row);
    typingEl = row;
    scrollDown();
  }

  function hideTyping(){
    if(typingEl){ typingEl.remove(); typingEl=null; }
  }

  function removeQuickReplies(){
    msgBox.querySelectorAll('.cb-quick-replies,.cb-actions').forEach(function(el){el.remove()});
  }

  function renderActions(){
    var div = document.createElement('div');
    div.className = 'cb-actions';
    ACTIONS.forEach(function(a){
      var el;
      if(a.onclick){
        el = document.createElement('button');
        el.className = 'cb-action '+a.cls;
        el.style.width='100%';
        el.onclick = function(){ if(window[a.onclick]) window[a.onclick](); };
      } else {
        el = document.createElement('a');
        el.className = 'cb-action '+a.cls;
        el.href = a.href;
        if(a.target) el.target = a.target;
      }
      el.innerHTML = '<svg viewBox="0 0 24 24">'+a.icon+'</svg>'+a.label;
      div.appendChild(el);
    });
    msgBox.appendChild(div);
    scrollDown();
  }

  function renderQuickReplies(replies, includeMenu){
    var div = document.createElement('div');
    div.className = 'cb-quick-replies';
    replies.forEach(function(r){
      var btn = document.createElement('button');
      btn.className = 'cb-qr';
      btn.textContent = r.label;
      btn.onclick = function(){cbHandleQR(r.id, r.label)};
      div.appendChild(btn);
    });
    if(includeMenu !== false){
      var menu = document.createElement('button');
      menu.className = 'cb-qr';
      menu.textContent = '🏠 Main Menu';
      menu.onclick = function(){cbHandleQR('__menu','🏠 Main Menu')};
      div.appendChild(menu);
    }
    msgBox.appendChild(div);
    scrollDown();
  }

  function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

  function buildBubbleHTML(faq){
    var h = '<div class="cb-bubble">';
    if(faq.response) h += faq.response + '<br>';
    if(faq.list){
      h += '<ul>';
      faq.list.forEach(function(li){ h += '<li>'+li+'</li>'; });
      h += '</ul>';
    }
    if(faq.extra) h += '<span style="font-size:12.5px;color:#555;display:block;margin-top:8px">'+faq.extra+'</span>';
    h += '</div>';
    return h;
  }

  function showFAQ(faq, userLabel){
    removeQuickReplies();
    addUserBubble(userLabel);
    showTyping();
    setTimeout(function(){
      hideTyping();
      if(!faq.actionsOnly) addBotRow(buildBubbleHTML(faq));
      else addBotRow('<div class="cb-bubble">'+faq.response+'<br><span style="font-size:12.5px;color:#555;display:block;margin-top:4px">'+faq.extra+'</span></div>');
      if(faq.actions) renderActions();
      if(faq.follow && faq.follow.length) renderQuickReplies(faq.follow);
      else renderQuickReplies([],false);
    }, 700 + Math.random()*400);
  }

  function findFAQ(id){
    return FAQS.find(function(f){return f.id===id});
  }

  function matchKeywords(text){
    var t = text.toLowerCase();
    for(var i=0;i<FAQS.length;i++){
      for(var j=0;j<FAQS[i].keywords.length;j++){
        if(t.indexOf(FAQS[i].keywords[j])>-1) return FAQS[i];
      }
    }
    return null;
  }

  /* ─── MAIN MENU ───────────────────────────────────────── */
  function showMenu(){
    removeQuickReplies();
    addBotRow('<div class="cb-bubble">What would you like to know? Choose a topic or type your question below.</div>');
    renderQuickReplies([
      {id:'services',label:'🔨 Services'},
      {id:'pricing',label:'💰 Pricing'},
      {id:'areas',label:'📍 Service Areas'},
      {id:'timeline',label:'⏱ Timeline'},
      {id:'license',label:'✅ License & Insurance'},
      {id:'reviews',label:'⭐ Reviews'},
      {id:'contact',label:'📞 Contact Us'}
    ], false);
  }

  /* ─── WELCOME ─────────────────────────────────────────── */
  function showWelcome(){
    addBotRow('<div class="cb-bubble"><strong>Hi there! 👋</strong>I\'m the Caballero Construction assistant. I can answer questions about our services, pricing, and project timelines in Riverside &amp; the Inland Empire.<br><br>How can I help you today?</div>');
    renderQuickReplies([
      {id:'services',label:'🔨 Services'},
      {id:'pricing',label:'💰 Pricing'},
      {id:'areas',label:'📍 Areas Served'},
      {id:'timeline',label:'⏱ Timeline'},
      {id:'license',label:'✅ Licensed?'},
      {id:'contact',label:'📞 Contact'}
    ], false);
  }

  /* ─── HANDLERS ────────────────────────────────────────── */
  window.cbHandleQR = function(id, label){
    if(id === '__menu'){ removeQuickReplies(); addUserBubble(label); showMenu(); return; }
    var faq = findFAQ(id);
    if(faq) showFAQ(faq, label);
  };

  window.cbSend = function(){
    var input = document.getElementById('cb-input');
    var text = (input.value || '').trim();
    if(!text) return;
    input.value = '';
    removeQuickReplies();
    var faq = matchKeywords(text);
    if(faq){
      showFAQ(faq, text);
    } else {
      addUserBubble(text);
      showTyping();
      setTimeout(function(){
        hideTyping();
        addBotRow('<div class="cb-bubble">I\'m not sure about that specific question, but our team can answer it directly — usually within minutes on WhatsApp!</div>');
        renderActions();
        renderQuickReplies([{id:'services',label:'🔨 Services'},{id:'pricing',label:'💰 Pricing'}]);
      }, 900);
    }
  };

  window.cbToggle = function(){
    isOpen = !isOpen;
    var win = document.getElementById('cb-window');
    var btn = document.getElementById('cb-launcher');
    var badge = document.getElementById('cb-badge');
    if(isOpen){
      win.classList.add('cb-visible');
      btn.classList.add('cb-open');
      badge.classList.add('cb-hidden');
      if(!msgBox){ msgBox = document.getElementById('cb-messages'); showWelcome(); }
    } else {
      win.classList.remove('cb-visible');
      btn.classList.remove('cb-open');
    }
  };

  /* ─── INIT ────────────────────────────────────────────── */
  setTimeout(function(){
    var badge = document.getElementById('cb-badge');
    if(badge) badge.classList.remove('cb-hidden');
  }, 2500);

})();
