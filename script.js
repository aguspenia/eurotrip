const lodging = {id:'hotel', name:'Alojamiento', lat:41.37882, lon:2.17413};
const points = {
  hotel: lodging,
  sagrada:{id:'sagrada', name:'Sagrada Familia', lat:41.4036, lon:2.1744},
  santpau:{id:'santpau', name:'Sant Pau', lat:41.4135, lon:2.1742},
  parkguell:{id:'parkguell', name:'Park Güell', lat:41.4145, lon:2.1527},
  gotico:{id:'gotico', name:'Barrio Gótico', lat:41.3839, lon:2.1763},
  rambla:{id:'rambla', name:'La Rambla', lat:41.3808, lon:2.1738},
  batllo:{id:'batllo', name:'Casa Batlló', lat:41.3917, lon:2.1649},
  pedrera:{id:'pedrera', name:'La Pedrera', lat:41.3954, lon:2.1619},
  palau:{id:'palau', name:'Palau de la Música', lat:41.3876, lon:2.1753},
  born:{id:'born', name:'El Born / Picasso', lat:41.3852, lon:2.1810},
  barceloneta:{id:'barceloneta', name:'Barceloneta', lat:41.3790, lon:2.1896},
  campnou:{id:'campnou', name:'Barça Immersive Tour', lat:41.3809, lon:2.1228},
  montjuic:{id:'montjuic', name:'Castillo Montjuïc', lat:41.3635, lon:2.1663},
  mnac:{id:'mnac', name:'MNAC', lat:41.3688, lon:2.1530},
  fonts:{id:'fonts', name:'Fuente Mágica', lat:41.3711, lon:2.1516}
};
const routes = {
  day1:['hotel','sagrada','santpau','parkguell','gotico','rambla','hotel'],
  day2:['hotel','batllo','pedrera','palau','born','barceloneta','hotel'],
  day3:['hotel','campnou','montjuic','mnac','fonts','hotel'],
  all:['hotel','sagrada','santpau','parkguell','batllo','pedrera','palau','born','barceloneta','campnou','montjuic','mnac','fonts']
};
function rad(x){return x*Math.PI/180}
function hav(a,b){const R=6371; const dLat=rad(b.lat-a.lat), dLon=rad(b.lon-a.lon); const s=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(s));}
function distKm(a,b){return Math.max(0.3,hav(a,b)*1.25)}
function walkMin(km){return Math.round(km/4.6*60)}
function taxiMin(km){return Math.round(8+km/22*60)}
function transportHint(from,to){const km=distKm(points[from],points[to]); if(km<1.4) return 'Caminar'; if(['parkguell','montjuic'].includes(to)) return 'Bus/taxi por subida'; if(to==='campnou') return 'Metro L3'; if(km>4.5) return 'Metro o taxi'; return 'Metro/bus';}
function gmaps(p){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name+' Barcelona')}`}
const dayData = [
 {id:'day1', title:'Día 1 · Gaudí fuerte + Barrio Gótico', label:'Prioridad alta · mucho contenido visual', stops:[
  ['09:00','Sagrada Familia','Imprescindible del viaje. Reservar entrada online y llegar 15 minutos antes.','€36–40','2 h','sagrada'],
  ['11:45','Recinte Modernista Sant Pau','Muy recomendable si les interesa arquitectura. Menos masivo que Sagrada Familia.','€16–18','1 h 15','santpau'],
  ['14:00','Almuerzo zona Sant Pau / Gràcia','Evitar restaurantes pegados a atracciones. Buscar menú del día o tapas casuales.','€18–30','1 h','santpau'],
  ['16:30','Park Güell','Reservar horario. Buen lugar para fotos y vistas; no ir apurados.','€18','1 h 30','parkguell'],
  ['19:30','Barrio Gótico + La Rambla','Recorrido gratuito para cerrar: Catedral, Plaça Sant Jaume, Plaça Reial y Rambla.','Gratis','2 h','gotico'],
  ['22:00','Cena cerca del alojamiento','Poble-sec o Sant Antoni son mejores que cenar sobre La Rambla.','€20–35','Flexible','hotel']
 ]},
 {id:'day2', title:'Día 2 · Modernismo + El Born + mar', label:'Día urbano · caminatas y cena', stops:[
  ['09:30','Passeig de Gràcia','Ver Casa Batlló, Casa Amatller y La Pedrera. Ideal para fotos y compras.','Gratis','45 min','batllo'],
  ['10:30','Casa Batlló o La Pedrera','Elegir una. Para primera vez, Casa Batlló suele impactar más; La Pedrera tiene mejor terraza.','€29–45','1 h 30','batllo'],
  ['12:45','Palau de la Música Catalana','Visita corta, visual y céntrica. Muy buena alternativa a sumar otro Gaudí caro.','€20–24','1 h','palau'],
  ['14:15','Almuerzo en El Born','Zona ideal para tapas, bares y caminar sin apuro.','€20–35','1 h 15','born'],
  ['16:00','El Born / Santa Maria del Mar / Museo Picasso','Museo Picasso si el grupo quiere arte; si no, callejear por El Born.','Gratis–€15','1–2 h','born'],
  ['18:30','Barceloneta al atardecer','Caminar por playa/puerto. Alternativa: Bunkers del Carmel si quieren mirador fuerte.','Gratis','1 h 30','barceloneta'],
  ['21:30','Cena y salida','Gótico, Born, Poble-sec o Gràcia según energía.','€25–45','Flexible','hotel']
 ]},
 {id:'day3', title:'Día 3 · Estadio + Montjuïc + cierre', label:'Fútbol, vistas y despedida', stops:[
  ['10:00','Barça Immersive Tour / Camp Nou Experience','Mejor opción futbolera. Museo, historia, experiencias inmersivas y tienda oficial.','€25–40 aprox.','2 h','campnou'],
  ['13:00','Almuerzo rápido','Comer cerca de Les Corts o volver hacia Poble-sec/Sant Antoni.','€15–30','1 h','campnou'],
  ['15:00','Castillo de Montjuïc / miradores','Más recomendable por vistas que por el interior. Subir en bus/taxi si están cansados.','€10 aprox.','1 h 15','montjuic'],
  ['16:45','MNAC y escalinatas','Aunque no entren, vale por arquitectura, fotos y vista hacia Plaça d’Espanya.','Gratis exterior / €12 museo','1 h','mnac'],
  ['18:30','Fuente Mágica / Plaça d’Espanya','Confirmar si hay espectáculo. Si no, usar como cierre panorámico.','Gratis','45 min','fonts'],
  ['21:00','Última cena','Elegir una cena grupal final: tapas, paella o hamburguesas según presupuesto.','€25–45','Flexible','hotel']
 ]}
];
const ranking = [
 ['Sagrada Familia','⭐⭐⭐⭐⭐','Obligatorio','La visita más importante. Comprar con anticipación.'],
 ['Park Güell','⭐⭐⭐⭐','Muy recomendado','Caro para ser parque, pero visualmente muy Barcelona.'],
 ['Casa Batlló','⭐⭐⭐⭐','Recomendado','Mejor interior modernista para primera visita; precio alto.'],
 ['La Pedrera','⭐⭐⭐','Opcional','Buena terraza, pero elegiría una entre esta y Casa Batlló.'],
 ['Sant Pau','⭐⭐⭐⭐','Sorpresa positiva','Arquitectura excelente y menos saturada.'],
 ['Palau de la Música','⭐⭐⭐⭐','Muy recomendado','Visita corta, céntrica y distinta.'],
 ['Museo Picasso','⭐⭐⭐','Según gustos','Solo si el grupo quiere museo de arte.'],
 ['Barceloneta/Poblenou','⭐⭐⭐⭐','Recomendado','Ideal para cortar con edificios y comer relajado.'],
 ['Montjuïc / MNAC exterior','⭐⭐⭐⭐','Recomendado','Vistas, fotos y cierre cómodo cerca del alojamiento.'],
 ['Bunkers del Carmel','⭐⭐⭐⭐','Plan alternativo','Gran vista, pero más lejos y puede estar muy lleno.'],
 ['RCDE Stadium','⭐⭐⭐','Opcional futbolero','Más lejos; hacerlo si el grupo es muy futbolero.']
];
const sources = [
 ['Sagrada Família oficial','https://sagradafamilia.org/en/tickets-individuals'],
 ['Park Güell oficial','https://parkguell.barcelona/en/planning-your-visit/prices-and-times'],
 ['TMB tarifas transporte','https://www.tmb.cat/en/barcelona-fares-metro-bus/transport-ticket-fares'],
 ['T-Casual y excepción aeropuerto','https://t-mobilitat.atm.cat/en/web/t-mobilitat/fares/t-casual'],
 ['Palau de la Música oficial','https://www.palaumusica.cat/en/visites/visits-and-tickets_1159168'],
 ['Sant Pau oficial','https://santpaubarcelona.org/es/']
];
function renderDays(){const cont=document.getElementById('daysContainer'); cont.innerHTML=''; dayData.forEach(day=>{let html=`<article class="day"><div class="day-head"><div><h3>${day.title}</h3><p>${day.label}</p></div><span class="badge">${routeSummary(day.id)}</span></div><div class="timeline">`; day.stops.forEach((s,i)=>{const [time,title,desc,price,duration,pid]=s; html+=`<div class="stop"><div class="time">${time}</div><div class="stop-card"><h4>${title}</h4><p>${desc}</p><div class="meta"><span class="pill">${price}</span><span class="pill">${duration}</span><a class="pill" href="${gmaps(points[pid])}" target="_blank">Abrir mapa</a></div>`; if(i<day.stops.length-1){const next=day.stops[i+1][5]; html+=routeBlock(pid,next);} html+=`</div></div>`}); html+=`</div></article>`; cont.insertAdjacentHTML('beforeend',html);});}
function routeBlock(a,b){const km=distKm(points[a],points[b]); return `<div class="route"><strong>Próximo traslado:</strong> ${points[a].name} → ${points[b].name}<br>📏 ${km.toFixed(1)} km · 🚶 ${walkMin(km)} min · 🚇/🚌 ${transportHint(a,b)} · 🚖 ${taxiMin(km)} min aprox.</div>`}
function routeSummary(dayId){let arr=routes[dayId], total=0; for(let i=0;i<arr.length-1;i++) total+=distKm(points[arr[i]],points[arr[i+1]]); return `${total.toFixed(1)} km aprox. de recorrido entre puntos`}
function renderRanking(){const body=document.getElementById('rankingBody'); ranking.forEach(r=>{const cls=r[1].length>=5?'p5':r[1].length>=4?'p4':r[1].length>=3?'p3':'p2'; body.insertAdjacentHTML('beforeend',`<tr><td>${r[0]}</td><td class="priority ${cls}">${r[1]}</td><td><strong>${r[2]}</strong></td><td>${r[3]}</td></tr>`)});}
function renderSources(){const el=document.getElementById('sourcesList'); sources.forEach(s=>el.insertAdjacentHTML('beforeend',`<a href="${s[1]}" target="_blank">${s[0]}</a>`));}
function project(p, bounds){const x=(p.lon-bounds.minLon)/(bounds.maxLon-bounds.minLon)*820+40; const y=(bounds.maxLat-p.lat)/(bounds.maxLat-bounds.minLat)*480+40; return [x,y];}
function renderMap(routeId='day1'){const svg=document.getElementById('routeMap'); const ids=routes[routeId]; const pts=ids.map(id=>points[id]); const bounds={minLat:Math.min(...Object.values(points).map(p=>p.lat))-.004,maxLat:Math.max(...Object.values(points).map(p=>p.lat))+.004,minLon:Math.min(...Object.values(points).map(p=>p.lon))-.006,maxLon:Math.max(...Object.values(points).map(p=>p.lon))+.006}; let html=`<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#f97316" /></marker></defs><rect x="0" y="0" width="900" height="560" rx="26" fill="#f8fafc"/><g opacity=".55" stroke="#cbd5e1" stroke-width="1">`; for(let x=60;x<860;x+=80) html+=`<line x1="${x}" x2="${x}" y1="30" y2="530"/>`; for(let y=60;y<520;y+=70) html+=`<line y1="${y}" y2="${y}" x1="30" x2="870"/>`; html+=`</g>`; if(routeId!=='all'){for(let i=0;i<pts.length-1;i++){const [x1,y1]=project(pts[i],bounds), [x2,y2]=project(pts[i+1],bounds); html+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f97316" stroke-width="4" marker-end="url(#arrow)" opacity=".9"/>`;}} Object.values(points).forEach(p=>{if(routeId!=='all'&&!ids.includes(p.id)) return; const [x,y]=project(p,bounds); const isHotel=p.id==='hotel'; html+=`<g><circle cx="${x}" cy="${y}" r="${isHotel?13:10}" fill="${isHotel?'#2563eb':'#0f172a'}"/><text x="${x+14}" y="${y+5}" font-size="14" font-weight="800" fill="#111827">${p.name}</text></g>`;}); html+=`<text x="40" y="535" font-size="13" fill="#64748b">Mapa esquemático generado localmente · no sustituye Google Maps</text>`; svg.innerHTML=html;}
document.querySelectorAll('.tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderMap(btn.dataset.map)}));
renderDays(); renderRanking(); renderSources(); renderMap('day1');
