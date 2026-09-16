(function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────── */
  var css = `
    #est-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity 0.3s}
    #est-overlay.est-open{opacity:1;pointer-events:all}
    #est-modal{background:white;border-radius:16px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;transform:translateY(32px) scale(0.95);transition:transform 0.38s cubic-bezier(0.34,1.56,0.64,1);position:relative;font-family:'Inter',sans-serif}
    #est-overlay.est-open #est-modal{transform:translateY(0) scale(1)}
    .est-header{background:#111;padding:18px 22px;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between}
    .est-header-left{}
    .est-header-title{font-family:'Oswald',sans-serif;font-size:17px;font-weight:700;color:white;letter-spacing:1px;text-transform:uppercase}
    .est-header-sub{font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px}
    .est-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.45);font-size:26px;line-height:1;padding:0 2px;transition:color 0.2s;font-family:sans-serif}
    .est-close:hover{color:white}
    .est-progress-bar{display:flex;gap:6px;padding:14px 22px 0}
    .est-dot{flex:1;height:4px;border-radius:2px;background:#e5e7eb;transition:background 0.35s}
    .est-dot.done{background:#C9A84C}
    .est-dot.active{background:#C41E3A}
    .est-body{padding:22px 22px 4px}
    .est-step-title{font-family:'Oswald',sans-serif;font-size:21px;font-weight:700;color:#111;text-transform:uppercase;margin-bottom:4px;line-height:1.15}
    .est-step-sub{font-size:13px;color:#888;margin-bottom:20px;line-height:1.5}
    /* Service grid */
    .est-svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
    .est-svc-btn{display:flex;align-items:center;gap:10px;padding:11px 13px;border-radius:8px;border:2px solid #e8e8e8;background:#fafafa;cursor:pointer;text-align:left;transition:all 0.18s;width:100%}
    .est-svc-btn:hover,.est-svc-btn.sel{border-color:#C41E3A;background:#fff3f3}
    .est-svc-icon{font-size:20px;flex-shrink:0;line-height:1}
    .est-svc-name{font-family:'Oswald',sans-serif;font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;color:#111;line-height:1.3}
    /* Questions */
    .est-qlabel{font-family:'Oswald',sans-serif;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#333;margin-bottom:10px;display:block}
    .est-opts{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
    .est-opt{display:flex;align-items:flex-start;gap:11px;padding:11px 13px;border-radius:8px;border:1.5px solid #e8e8e8;background:#fafafa;cursor:pointer;transition:all 0.18s}
    .est-opt.sel{border-color:#C41E3A;background:#fff3f3}
    .est-opt input[type=radio]{accent-color:#C41E3A;width:16px;height:16px;flex-shrink:0;margin-top:2px}
    .est-opt-label{font-size:14px;color:#222;font-weight:500}
    .est-opt-sub{font-size:11.5px;color:#999;margin-top:1px}
    .est-num-wrap{position:relative;margin-bottom:18px}
    .est-num{width:100%;padding:12px 52px 12px 14px;border:1.5px solid #e8e8e8;border-radius:8px;font-size:15px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s;box-sizing:border-box}
    .est-num:focus{border-color:#C41E3A}
    .est-num-unit{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#bbb;font-size:12px;pointer-events:none}
    .est-hint{font-size:11.5px;color:#aaa;margin-top:6px;line-height:1.5}
    /* Result */
    .est-result{text-align:center;padding-bottom:4px}
    .est-res-badge{display:inline-block;background:#C9A84C;color:#111;font-family:'Oswald',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:4px 16px;border-radius:2px;margin-bottom:14px}
    .est-res-svc{font-family:'Oswald',sans-serif;font-size:15px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .est-res-range{font-family:'Oswald',sans-serif;font-size:40px;font-weight:700;color:#C41E3A;line-height:1;margin-bottom:4px}
    .est-res-lbl{font-size:12px;color:#bbb;margin-bottom:18px}
    .est-breakdown{background:#f7f7f7;border-radius:10px;padding:14px 16px;margin-bottom:16px;text-align:left}
    .est-bd-title{font-family:'Oswald',sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#aaa;margin-bottom:10px}
    .est-bd-row{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;color:#555;padding:5px 0;border-bottom:1px solid #eee}
    .est-bd-row:last-child{border-bottom:none;font-weight:700;color:#111;font-size:13px}
    .est-disclaimer{font-size:11px;color:#bbb;margin-bottom:18px;line-height:1.6;text-align:left}
    .est-cta-col{display:flex;flex-direction:column;gap:9px}
    .est-btn-call{display:flex;align-items:center;justify-content:center;gap:9px;padding:14px;background:#C41E3A;color:white;font-family:'Oswald',sans-serif;font-size:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border-radius:8px;border:none;cursor:pointer;transition:background 0.2s}
    .est-btn-call:hover{background:#960018}
    .est-btn-wa{display:flex;align-items:center;justify-content:center;gap:9px;padding:14px;background:#25D366;color:white;font-family:'Oswald',sans-serif;font-size:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border-radius:8px;transition:background 0.2s}
    .est-btn-wa:hover{background:#1da851}
    .est-btn-row2{display:flex;gap:9px}
    .est-btn-new{flex:1;padding:12px;border:1.5px solid #e8e8e8;background:white;color:#777;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;transition:all 0.2s}
    .est-btn-new:hover{border-color:#C41E3A;color:#C41E3A}
    .est-btn-person{flex:1;padding:12px;background:#111;color:white;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border-radius:8px;border:none;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center;transition:background 0.2s}
    .est-btn-person:hover{background:#333}
    /* Footer nav */
    .est-footer{display:flex;gap:9px;padding:10px 22px 22px}
    .est-btn-back{padding:12px 18px;border:1.5px solid #e8e8e8;background:white;color:#777;font-family:'Oswald',sans-serif;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;transition:all 0.2s}
    .est-btn-back:hover{border-color:#111;color:#111}
    .est-btn-next{flex:1;padding:13px;background:#C41E3A;color:white;border:none;font-family:'Oswald',sans-serif;font-size:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;transition:background 0.2s}
    .est-btn-next:hover{background:#960018}
    .est-btn-next:disabled{background:#d4d4d4;cursor:not-allowed}
    @media(max-width:480px){
      .est-svc-grid{grid-template-columns:1fr}
      .est-res-range{font-size:30px}
      #est-modal{border-radius:16px 16px 0 0;margin-top:auto;max-height:88vh}
      #est-overlay{align-items:flex-end;padding:0}
    }
  `;
  var s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  /* ─── Services config ────────────────────────────────────── */
  var SVCS = [
    {
      id:'kitchen', name:'Kitchen Remodeling', icon:'🍳',
      questions:[
        { id:'size', label:'¿Tamaño de la cocina?', type:'radio', options:[
          {v:'s', l:'Pequeña', sub:'Menos de 150 sq ft'},
          {v:'m', l:'Mediana', sub:'150 – 250 sq ft'},
          {v:'l', l:'Grande', sub:'Más de 250 sq ft'},
        ]},
        { id:'scope', label:'¿Tipo de remodelación?', type:'radio', options:[
          {v:'cosmetic', l:'Cosmética', sub:'Pintura, hardware, mejoras menores'},
          {v:'mid', l:'Mid-range', sub:'Gabinetes, countertops, plomería'},
          {v:'full', l:'Full remodel', sub:'Distribución nueva, todo nuevo'},
        ]},
        { id:'counter', label:'¿Tipo de countertop?', type:'radio', options:[
          {v:'keep', l:'Conservar el actual', sub:''},
          {v:'lam', l:'Laminado / Formica', sub:'+$1,500 – $3,000'},
          {v:'quartz', l:'Quartz / Granito', sub:'+$3,500 – $8,000'},
        ]},
      ],
      calc:function(a){
        var b=[8000,18000];
        var sm={s:1,m:1.5,l:2.1}[a.size]||1;
        var sc={cosmetic:1,mid:2.3,full:3.6}[a.scope]||1;
        var ct={keep:1,lam:1.1,quartz:1.22}[a.counter]||1;
        return [rnd(b[0]*sm*sc*ct,500), rnd(b[1]*sm*sc*ct,500)];
      }
    },
    {
      id:'bathroom', name:'Bathroom Remodeling', icon:'🚿',
      questions:[
        { id:'size', label:'¿Tamaño del baño?', type:'radio', options:[
          {v:'s', l:'Pequeño', sub:'Menos de 50 sq ft'},
          {v:'m', l:'Mediano', sub:'50 – 80 sq ft'},
          {v:'l', l:'Grande / Master', sub:'Más de 80 sq ft'},
        ]},
        { id:'scope', label:'¿Alcance de la remodelación?', type:'radio', options:[
          {v:'cosmetic', l:'Cosmética', sub:'Vanity, accesorios, pintura'},
          {v:'mid', l:'Mid-range', sub:'Tile, tina/ducha, vanity nueva'},
          {v:'full', l:'Full remodel', sub:'Todo nuevo incluyendo plomería'},
        ]},
        { id:'shower', label:'¿Trabajo de ducha/tina?', type:'radio', options:[
          {v:'none', l:'No necesito', sub:''},
          {v:'retile', l:'Solo retile existente', sub:'+$1,500 – $4,000'},
          {v:'full', l:'Ducha completa nueva', sub:'+$4,000 – $12,000'},
        ]},
      ],
      calc:function(a){
        var b=[4000,10000];
        var sm={s:1,m:1.5,l:2.2}[a.size]||1;
        var sc={cosmetic:1,mid:2.1,full:3.1}[a.scope]||1;
        var sh={none:1,retile:1.2,full:1.45}[a.shower]||1;
        return [rnd(b[0]*sm*sc*sh,500), rnd(b[1]*sm*sc*sh,500)];
      }
    },
    {
      id:'flooring', name:'Flooring', icon:'🪵',
      questions:[
        { id:'area', label:'¿Cuántos sq ft necesitas cubrir?', type:'number', ph:'Ej: 400', unit:'sq ft'},
        { id:'mat', label:'¿Tipo de piso?', type:'radio', options:[
          {v:'lvp', l:'LVP / Laminate', sub:'$4 – $8 / sq ft instalado'},
          {v:'tile', l:'Tile / Porcelain', sub:'$8 – $16 / sq ft instalado'},
          {v:'hardwood', l:'Hardwood', sub:'$10 – $20 / sq ft instalado'},
        ]},
        { id:'demo', label:'¿Necesitas remover el piso actual?', type:'radio', options:[
          {v:'no', l:'No, es área nueva', sub:''},
          {v:'yes', l:'Sí, hay que removerlo', sub:'+$0.75 – $2 / sq ft'},
        ]},
      ],
      calc:function(a){
        var ar=parseFloat(a.area)||300;
        var pr={lvp:[4,8],tile:[8,16],hardwood:[10,20]}[a.mat]||[4,8];
        var dm={no:[0,0],yes:[0.75,2]}[a.demo]||[0,0];
        return [rnd(ar*(pr[0]+dm[0]),100), rnd(ar*(pr[1]+dm[1]),100)];
      }
    },
    {
      id:'painting', name:'Painting', icon:'🎨',
      questions:[
        { id:'type', label:'¿Tipo de pintura?', type:'radio', options:[
          {v:'int', l:'Interior', sub:'Cuartos, paredes interiores'},
          {v:'ext', l:'Exterior', sub:'Fachada, paredes exteriores'},
          {v:'both', l:'Interior + Exterior', sub:'Toda la propiedad'},
        ]},
        { id:'area', label:'¿Cuántos sq ft de pared aproximadamente?', type:'number', ph:'Ej: 1200', unit:'sq ft',
          hint:'Tip: largo × alto × número de paredes'},
        { id:'coats', label:'¿Cuántas manos de pintura?', type:'radio', options:[
          {v:'1', l:'1 mano', sub:'Mantenimiento o colores similares'},
          {v:'2', l:'2 manos', sub:'Recomendado (mejor cobertura)'},
          {v:'full', l:'2 manos + primer', sub:'Cambio de color drástico'},
        ]},
      ],
      calc:function(a){
        var ar=parseFloat(a.area)||800;
        var rt={int:[2.5,4.5],ext:[2,4],both:[2.2,4.2]}[a.type]||[2.5,4.5];
        var cm={'1':1,'2':1.4,'full':1.75}[a.coats]||1.4;
        var mn=Math.max(rnd(ar*rt[0]*cm,100),800);
        var mx=Math.max(rnd(ar*rt[1]*cm,100),1500);
        return [mn,mx];
      }
    },
    {
      id:'drywall', name:'Drywall & Framing', icon:'🧱',
      questions:[
        { id:'scope', label:'¿Tipo de trabajo?', type:'radio', options:[
          {v:'patch', l:'Reparación / Parches', sub:'Hoyos, grietas, daño por agua'},
          {v:'drywall', l:'Drywall nuevo', sub:'Instalación en área existente'},
          {v:'framing', l:'Framing + Drywall', sub:'Pared nueva, cuarto nuevo, adición'},
        ]},
        { id:'area', label:'¿Cuántos sq ft aproximadamente?', type:'number', ph:'Ej: 500', unit:'sq ft'},
      ],
      calc:function(a){
        var ar=parseFloat(a.area)||300;
        if(a.scope==='patch') return [200, Math.min(rnd(200+ar*1.5,100),3500)];
        var rt={drywall:[2.5,4.5],framing:[4.5,8.5]}[a.scope]||[2.5,4.5];
        return [Math.max(rnd(ar*rt[0],100),800), rnd(ar*rt[1],100)];
      }
    },
    {
      id:'plumbing', name:'Plumbing', icon:'🔧',
      questions:[
        { id:'type', label:'¿Tipo de trabajo de plomería?', type:'radio', options:[
          {v:'fixture', l:'Reemplazo de fixture', sub:'Faucet, inodoro, lavabo'},
          {v:'repair', l:'Reparación de fuga/tubería', sub:'Detectar y reparar fugas'},
          {v:'new', l:'Instalación nueva', sub:'Nueva línea, reubicación de plomería'},
          {v:'heater', l:'Water heater', sub:'Reemplazo o instalación'},
        ]},
        { id:'qty', label:'¿Cuántos fixtures o áreas?', type:'number', ph:'Ej: 2', unit:'unidades'},
      ],
      calc:function(a){
        var qty=Math.max(parseInt(a.qty)||1,1);
        var rt={fixture:[250,700],repair:[500,2500],new:[1500,6000],heater:[900,2500]}[a.type]||[500,1500];
        if(a.type==='repair'||a.type==='heater') return [rt[0],rt[1]];
        return [rnd(rt[0]*qty,100), rnd(rt[1]*qty,100)];
      }
    },
    {
      id:'electrical', name:'Electrical Work', icon:'⚡',
      questions:[
        { id:'type', label:'¿Tipo de trabajo eléctrico?', type:'radio', options:[
          {v:'outlet', l:'Outlets / Switches', sub:'Instalación o reemplazo'},
          {v:'panel', l:'Panel upgrade', sub:'100A→200A, nuevo sub-panel'},
          {v:'circuits', l:'Circuitos nuevos', sub:'Para appliances, cuartos, etc.'},
          {v:'lights', l:'Lámparas / Recessed lights', sub:'Instalación de luminarias'},
        ]},
        { id:'qty', label:'¿Cuántas unidades / circuitos?', type:'number', ph:'Ej: 4', unit:'unidades'},
      ],
      calc:function(a){
        var qty=Math.max(parseInt(a.qty)||1,1);
        if(a.type==='panel') return [1500,4500];
        var rt={outlet:[150,300],circuits:[500,1500],lights:[150,400]}[a.type]||[200,500];
        return [rnd(rt[0]*qty,50), rnd(rt[1]*qty,50)];
      }
    },
    {
      id:'roofing', name:'Roofing', icon:'🏠',
      questions:[
        { id:'work', label:'¿Tipo de trabajo de techo?', type:'radio', options:[
          {v:'repair', l:'Reparación de fugas', sub:'Áreas pequeñas, tejas rotas'},
          {v:'partial', l:'Reemplazo parcial', sub:'Una sección del techo'},
          {v:'full', l:'Reemplazo completo', sub:'Techo entero'},
        ]},
        { id:'area', label:'¿Área aproximada del techo?', type:'number', ph:'Ej: 1500', unit:'sq ft'},
        { id:'mat', label:'¿Material de techo?', type:'radio', options:[
          {v:'asphalt', l:'Asphalt shingles', sub:'$8 – $12 / sq ft'},
          {v:'tile', l:'Tile (teja)', sub:'$12 – $22 / sq ft'},
          {v:'metal', l:'Metal', sub:'$10 – $18 / sq ft'},
        ]},
      ],
      calc:function(a){
        if(a.work==='repair') return [500,3500];
        var ar=parseFloat(a.area)||1200;
        var rt={asphalt:[8,12],tile:[12,22],metal:[10,18]}[a.mat]||[8,12];
        var part=a.work==='partial'?0.4:1;
        return [rnd(ar*rt[0]*part,100), rnd(ar*rt[1]*part,100)];
      }
    },
    {
      id:'doors', name:'Doors & Windows', icon:'🚪',
      questions:[
        { id:'type', label:'¿Qué necesitas instalar?', type:'radio', options:[
          {v:'int', l:'Puertas interiores', sub:'$400 – $900 c/u instalada'},
          {v:'ext', l:'Puerta exterior / entrada', sub:'$900 – $2,800 c/u instalada'},
          {v:'win', l:'Ventanas', sub:'$600 – $2,000 c/u instalada'},
          {v:'mix', l:'Mezcla puertas y ventanas', sub:'Múltiples tipos'},
        ]},
        { id:'qty', label:'¿Cuántas unidades?', type:'number', ph:'Ej: 3', unit:'unidades'},
      ],
      calc:function(a){
        var qty=Math.max(parseInt(a.qty)||1,1);
        var rt={int:[400,900],ext:[900,2800],win:[600,2000],mix:[600,2000]}[a.type]||[500,1500];
        return [rt[0]*qty, rt[1]*qty];
      }
    },
    {
      id:'concrete', name:'Concrete & Masonry', icon:'🏗️',
      questions:[
        { id:'type', label:'¿Tipo de trabajo de concreto?', type:'radio', options:[
          {v:'drive', l:'Driveway', sub:'$8 – $18 / sq ft'},
          {v:'patio', l:'Patio / Slab', sub:'$7 – $15 / sq ft'},
          {v:'walk', l:'Walkway / Sidewalk', sub:'$6 – $14 / sq ft'},
          {v:'wall', l:'Retaining wall / Muro', sub:'$25 – $50 / linear ft'},
        ]},
        { id:'area', label:'¿Cuántos sq ft (o linear ft para muros)?', type:'number', ph:'Ej: 400', unit:'sq/ln ft'},
        { id:'finish', label:'¿Acabado de concreto?', type:'radio', options:[
          {v:'broom', l:'Estándar (broom finish)', sub:'Precio base'},
          {v:'smooth', l:'Liso / Smooth', sub:'+10%'},
          {v:'stamped', l:'Stamped / Decorativo', sub:'+40-60%'},
        ]},
      ],
      calc:function(a){
        var ar=parseFloat(a.area)||300;
        var rt={drive:[8,18],patio:[7,15],walk:[6,14],wall:[25,50]}[a.type]||[7,15];
        var fm={broom:1,smooth:1.1,stamped:1.5}[a.finish]||1;
        return [Math.max(rnd(ar*rt[0]*fm,100),800), rnd(ar*rt[1]*fm,100)];
      }
    },
  ];

  /* ─── Helpers ────────────────────────────────────────────── */
  function rnd(n, step){ return Math.round(n/step)*step; }
  function fmt(n){ return '$'+Math.round(n).toLocaleString('en-US'); }

  /* ─── State ──────────────────────────────────────────────── */
  var ST = { step:1, svc:null, answers:{}, qi:0 };

  /* ─── Build skeleton ─────────────────────────────────────── */
  function init(){
    var el = document.createElement('div');
    el.id = 'est-overlay';
    el.innerHTML = [
      '<div id="est-modal">',
        '<div class="est-header">',
          '<div class="est-header-left">',
            '<div class="est-header-title">Cotización Gratis</div>',
            '<div class="est-header-sub">Caballero Construction Inc · Inland Empire, CA</div>',
          '</div>',
          '<button class="est-close" onclick="window.closeEstimator()">×</button>',
        '</div>',
        '<div class="est-progress-bar" id="estProg"></div>',
        '<div class="est-body" id="estBody"></div>',
        '<div class="est-footer" id="estFoot"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(el);
    el.addEventListener('click', function(e){ if(e.target===el) window.closeEstimator(); });
    render();
  }

  /* ─── Render ─────────────────────────────────────────────── */
  function render(){
    renderProg();
    if(ST.step===1) renderSvcSelect();
    else if(ST.step===2) renderQuestion();
    else renderResult();
  }

  function renderProg(){
    var p = document.getElementById('estProg');
    // 3 dots: service / questions / result
    var labels = ['Servicio','Preguntas','Resultado'];
    p.innerHTML = labels.map(function(l,i){
      var cls = i+1 < ST.step ? 'done' : i+1===ST.step ? 'active' : '';
      return '<div class="est-dot '+cls+'" title="'+l+'"></div>';
    }).join('');
  }

  function renderSvcSelect(){
    var body=document.getElementById('estBody'), foot=document.getElementById('estFoot');
    body.innerHTML = '<div class="est-step-title">¿Qué servicio necesitas?</div><div class="est-step-sub">Selecciona el trabajo que quieres cotizar y obtendrás un estimado inmediato</div><div class="est-svc-grid" id="estGrid"></div>';
    foot.innerHTML = '';
    var grid = document.getElementById('estGrid');
    SVCS.forEach(function(svc){
      var btn=document.createElement('button');
      btn.className='est-svc-btn'+(ST.svc&&ST.svc.id===svc.id?' sel':'');
      btn.innerHTML='<span class="est-svc-icon">'+svc.icon+'</span><span class="est-svc-name">'+svc.name+'</span>';
      btn.onclick=function(){
        ST.svc=svc; ST.answers={}; ST.qi=0; ST.step=2; render();
      };
      grid.appendChild(btn);
    });
  }

  function renderQuestion(){
    var svc=ST.svc, q=svc.questions[ST.qi];
    var body=document.getElementById('estBody'), foot=document.getElementById('estFoot');
    var cur=ST.qi+1, tot=svc.questions.length;

    var html='<div class="est-step-title">'+svc.icon+' '+svc.name+'</div>';
    html+='<div class="est-step-sub">Pregunta '+cur+' de '+tot+'</div>';
    html+='<label class="est-qlabel">'+q.label+'</label>';

    if(q.type==='radio'){
      html+='<div class="est-opts">';
      q.options.forEach(function(o){
        var sel=ST.answers[q.id]===o.v;
        html+='<label class="est-opt'+(sel?' sel':'')+'" onclick="window.estPick(\''+q.id+'\',\''+o.v+'\',this)">'+
          '<input type="radio" name="eq_'+q.id+'" value="'+o.v+'"'+(sel?' checked':'')+' tabindex="-1">'+
          '<div><div class="est-opt-label">'+o.l+'</div>'+(o.sub?'<div class="est-opt-sub">'+o.sub+'</div>':'')+
          '</div></label>';
      });
      html+='</div>';
    } else {
      var val=ST.answers[q.id]||'';
      html+='<div class="est-num-wrap"><input class="est-num" type="number" min="1" placeholder="'+q.ph+'" value="'+val+'" oninput="window.estNum(\''+q.id+'\',this.value)"><span class="est-num-unit">'+q.unit+'</span></div>';
      if(q.hint) html+='<div class="est-hint">💡 '+q.hint+'</div>';
    }

    body.innerHTML=html;
    var hasAns=!!ST.answers[q.id];
    var isLast=ST.qi>=svc.questions.length-1;
    foot.innerHTML='<button class="est-btn-back" onclick="window.estBack()">← Atrás</button>'+
      '<button class="est-btn-next" id="estNext" onclick="window.estNext()"'+(!hasAns?' disabled':'')+'>'+
      (isLast?'Ver Estimado →':'Siguiente →')+'</button>';
  }

  function renderResult(){
    var svc=ST.svc;
    var range=svc.calc(ST.answers);
    var mn=range[0], mx=range[1];
    var body=document.getElementById('estBody'), foot=document.getElementById('estFoot');

    // Build WhatsApp message
    var answers = ST.answers;
    var msg='Hola! Usé el estimador en su sitio web.\n\nServicio: '+svc.name+'\nEstimado: '+fmt(mn)+' – '+fmt(mx)+'\n\nMe gustaría recibir un estimado oficial. ¿Cuándo podría agendarme?';
    var waUrl='https://wa.me/15623946813?text='+encodeURIComponent(msg);

    // Breakdown
    var rows='';
    svc.questions.forEach(function(q){
      var v=ST.answers[q.id]; if(!v) return;
      var display=v;
      if(q.type==='radio'){var opt=q.options.find(function(o){return o.v===v;}); display=opt?opt.l:v;}
      else display=v+' '+q.unit;
      rows+='<div class="est-bd-row"><span>'+q.label+'</span><span style="font-weight:600;color:#333">'+display+'</span></div>';
    });
    rows+='<div class="est-bd-row"><span>Estimado total</span><span>'+fmt(mn)+' – '+fmt(mx)+'</span></div>';

    body.innerHTML=
      '<div class="est-result">'+
        '<div class="est-res-badge">✓ Estimado Preliminar</div>'+
        '<div class="est-res-svc">'+svc.icon+' '+svc.name+'</div>'+
        '<div class="est-res-range">'+fmt(mn)+' – '+fmt(mx)+'</div>'+
        '<div class="est-res-lbl">Estimado basado en precios de California · 2024</div>'+
        '<div class="est-breakdown">'+
          '<div class="est-bd-title">Tu selección</div>'+
          rows+
        '</div>'+
        '<div class="est-disclaimer">⚠️ Este es un estimado preliminar. El precio final puede variar según materiales específicos, accesibilidad, condición actual y alcance exacto del trabajo. Contáctanos para un estimado gratuito y exacto en tu hogar.</div>'+
        '<div class="est-cta-col">'+
          '<a href="tel:5623946813" class="est-btn-call">'+
            '<svg viewBox="0 0 24 24" style="width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:2.5;flex-shrink:0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.22 1.16 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>'+
            'Llamar Ahora · (562) 394-6813'+
          '</a>'+
          '<a href="'+waUrl+'" target="_blank" class="est-btn-wa">'+
            '<svg viewBox="0 0 24 24" style="width:17px;height:17px;fill:white;flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.122 1.526 5.855L.057 23.944l6.265-1.644A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.006-1.372l-.358-.214-3.717.975.99-3.617-.234-.372A9.8 9.8 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182 17.427 2.182 21.818 6.573 21.818 12c0 5.427-4.39 9.818-9.818 9.818z"/></svg>'+
            'WhatsApp · Mensaje Pre-llenado'+
          '</a>'+
          '<div class="est-btn-row2">'+
            '<button class="est-btn-new" onclick="window.estRestart()">← Nueva cotización</button>'+
            '<a href="#contact" class="est-btn-person" onclick="window.closeEstimator()">Estimado en Persona</a>'+
          '</div>'+
        '</div>'+
      '</div>';
    foot.innerHTML='';
  }

  /* ─── Actions (global) ───────────────────────────────────── */
  window.estPick = function(qId, val, el){
    ST.answers[qId]=val;
    el.closest('.est-opts').querySelectorAll('.est-opt').forEach(function(o){ o.classList.remove('sel'); });
    el.classList.add('sel');
    var nb=document.getElementById('estNext');
    if(nb) nb.disabled=false;
  };

  window.estNum = function(qId, val){
    ST.answers[qId]=val;
    var nb=document.getElementById('estNext');
    if(nb) nb.disabled=!val||parseFloat(val)<=0;
  };

  window.estNext = function(){
    var q=ST.svc.questions[ST.qi];
    if(!ST.answers[q.id]) return;
    if(ST.qi<ST.svc.questions.length-1){ ST.qi++; render(); }
    else { ST.step=3; render(); }
  };

  window.estBack = function(){
    if(ST.qi>0){ ST.qi--; render(); }
    else { ST.step=1; render(); }
  };

  window.estRestart = function(){
    ST={step:1,svc:null,answers:{},qi:0}; render();
  };

  window.openEstimator = function(){
    if(!document.getElementById('est-overlay')){ init(); }
    else { ST={step:1,svc:null,answers:{},qi:0}; render(); }
    requestAnimationFrame(function(){
      document.getElementById('est-overlay').classList.add('est-open');
    });
    document.body.style.overflow='hidden';
  };

  window.closeEstimator = function(){
    var o=document.getElementById('est-overlay');
    if(o) o.classList.remove('est-open');
    document.body.style.overflow='';
  };

  /* ─── Contact Popup ──────────────────────────────────────── */
  var contactCSS = `
    #ctc-overlay{position:fixed;inset:0;z-index:10002;background:rgba(0,0,0,0.72);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity 0.25s}
    #ctc-overlay.ctc-open{opacity:1;pointer-events:all}
    #ctc-modal{background:white;border-radius:20px;width:100%;max-width:380px;overflow:hidden;transform:translateY(24px) scale(0.96);transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1);font-family:'Inter',sans-serif}
    #ctc-overlay.ctc-open #ctc-modal{transform:translateY(0) scale(1)}
    .ctc-head{background:#111;padding:22px 22px 18px;text-align:center;position:relative}
    .ctc-head-title{font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:white;margin-bottom:2px}
    .ctc-head-sub{font-size:12px;color:rgba(255,255,255,0.45)}
    .ctc-x{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,0.4);font-size:24px;cursor:pointer;line-height:1;padding:0;font-family:sans-serif}
    .ctc-x:hover{color:white}
    .ctc-body{padding:22px}
    .ctc-btn{display:flex;align-items:center;gap:14px;width:100%;padding:16px 20px;border-radius:12px;border:none;cursor:pointer;text-decoration:none;margin-bottom:10px;transition:all 0.2s}
    .ctc-btn:last-child{margin-bottom:0}
    .ctc-btn-call{background:#C41E3A;color:white}
    .ctc-btn-call:hover{background:#960018;transform:translateY(-1px)}
    .ctc-btn-sms{background:#111;color:white}
    .ctc-btn-sms:hover{background:#333;transform:translateY(-1px)}
    .ctc-btn-wa{background:#25D366;color:white}
    .ctc-btn-wa:hover{background:#1da851;transform:translateY(-1px)}
    .ctc-btn-icon{width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .ctc-btn-text{}
    .ctc-btn-label{font-family:'Oswald',sans-serif;font-size:15px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;display:block;text-align:left}
    .ctc-btn-desc{font-size:12px;opacity:0.7;display:block;text-align:left;margin-top:1px}
  `;
  var cs2 = document.createElement('style');
  cs2.textContent = contactCSS;
  document.head.appendChild(cs2);

  window.openContact = function(){
    if(!document.getElementById('ctc-overlay')){
      var el=document.createElement('div');
      el.id='ctc-overlay';
      el.innerHTML=
        '<div id="ctc-modal">'+
          '<div class="ctc-head">'+
            '<div class="ctc-head-title">Contáctanos</div>'+
            '<div class="ctc-head-sub">Caballero Construction · (562) 394-6813</div>'+
            '<button class="ctc-x" onclick="window.closeContact()">×</button>'+
          '</div>'+
          '<div class="ctc-body">'+
            '<a href="tel:5623946813" class="ctc-btn ctc-btn-call">'+
              '<div class="ctc-btn-icon"><svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:white;fill:none;stroke-width:2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.22 1.16 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>'+
              '<div class="ctc-btn-text"><span class="ctc-btn-label">Llamar ahora</span><span class="ctc-btn-desc">(562) 394-6813 · Respuesta inmediata</span></div>'+
            '</a>'+
            '<a href="sms:+15623946813&body=Hola%2C%20me%20gustar%C3%ADa%20un%20estimado%20gratuito." class="ctc-btn ctc-btn-sms">'+
              '<div class="ctc-btn-icon"><svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:white;fill:none;stroke-width:2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>'+
              '<div class="ctc-btn-text"><span class="ctc-btn-label">Enviar mensaje de texto</span><span class="ctc-btn-desc">SMS · Te respondemos rápido</span></div>'+
            '</a>'+
            '<a href="https://wa.me/15623946813?text=Hola%2C%20me%20gustar%C3%ADa%20un%20estimado%20gratuito." target="_blank" class="ctc-btn ctc-btn-wa">'+
              '<div class="ctc-btn-icon"><svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.122 1.526 5.855L.057 23.944l6.265-1.644A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.006-1.372l-.358-.214-3.717.975.99-3.617-.234-.372A9.8 9.8 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182 17.427 2.182 21.818 6.573 21.818 12c0 5.427-4.39 9.818-9.818 9.818z"/></svg></div>'+
              '<div class="ctc-btn-text"><span class="ctc-btn-label">WhatsApp</span><span class="ctc-btn-desc">Mensaje instantáneo · Fotos y detalles</span></div>'+
            '</a>'+
          '</div>'+
        '</div>';
      document.body.appendChild(el);
      el.addEventListener('click',function(e){if(e.target===el) window.closeContact();});
    }
    requestAnimationFrame(function(){
      document.getElementById('ctc-overlay').classList.add('ctc-open');
    });
    document.body.style.overflow='hidden';
  };

  window.closeContact = function(){
    var o=document.getElementById('ctc-overlay');
    if(o) o.classList.remove('ctc-open');
    document.body.style.overflow='';
  };

})();
