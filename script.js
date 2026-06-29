const lodging = {id:'hotel', name:'Alojamiento', lat:41.37882, lon:2.17413};
const points = {
  hotel: lodging,
  aeropuerto:{id:'aeropuerto', name:'Aeropuerto BCN', lat:41.2974, lon:2.0833},
  rambla:{id:'rambla', name:'La Rambla', lat:41.3808, lon:2.1738},
  plazareal:{id:'plazareal', name:'Plaça Reial', lat:41.3801, lon:2.1751},
  gotico:{id:'gotico', name:'Barrio Gótico', lat:41.3839, lon:2.1763},
  catedral:{id:'catedral', name:'Catedral', lat:41.3839, lon:2.1762},
  portvell:{id:'portvell', name:'Port Vell', lat:41.3763, lon:2.1834},
  sagrada:{id:'sagrada', name:'Sagrada Familia', lat:41.4036, lon:2.1744},
  santpau:{id:'santpau', name:'Sant Pau', lat:41.4135, lon:2.1742},
  parkguell:{id:'parkguell', name:'Park Güell', lat:41.4145, lon:2.1527},
  bunkers:{id:'bunkers', name:'Bunkers del Carmel', lat:41.4195, lon:2.1618},
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
  day1:['aeropuerto','hotel','rambla','plazareal','gotico','catedral','portvell','hotel'],
  day2:['hotel','sagrada','santpau','parkguell','bunkers','hotel'],
  day3:['hotel','batllo','pedrera','palau','born','barceloneta','campnou','montjuic','mnac','fonts','hotel'],
  all:['aeropuerto','hotel','rambla','plazareal','gotico','catedral','portvell','sagrada','santpau','parkguell','bunkers','batllo','pedrera','palau','born','barceloneta','campnou','montjuic','mnac','fonts']
};

function rad(x){return x*Math.PI/180}
function hav(a,b){const R=6371; const dLat=rad(b.lat-a.lat), dLon=rad(b.lon-a.lon); const s=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(s));}
function distKm(a,b){return Math.max(0.3,hav(a,b)*1.25)}
function walkMin(km){return Math.round(km/4.6*60)}
function taxiMin(km){return Math.round(8+km/22*60)}
function transportHint(from,to){
  const km=distKm(points[from],points[to]);
  if(from==='aeropuerto' || to==='aeropuerto') return 'Aerobús/taxi';
  if(km<1.4) return 'Caminar';
  if(['parkguell','bunkers','montjuic'].includes(to)) return 'Bus/taxi por subida';
  if(to==='campnou') return 'Metro L3';
  if(km>4.5) return 'Metro o taxi';
  return 'Metro/bus';
}
function gmaps(p){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name+' Barcelona')}`}

const dayData = [
 {id:'day1', title:'Día 1 · Jueves 25/09 · Llegada + primera vuelta', label:'No reservar entradas caras · recorrido flexible cerca del alojamiento', stops:[
  ['13:00','Llegada a Barcelona','Aterrizaje estimado. Entre equipaje, salida del aeropuerto y traslado, calcular 1 h 30 a 2 h hasta estar instalados.','€6–40','1 h 30–2 h','aeropuerto'],
  ['15:00','Llegada al alojamiento / check-in','Base: Carrer Nou de la Rambla, 31. Dejar valijas, cargar celulares y organizar la tarde.','-','45 min','hotel'],
  ['16:00','La Rambla','Primera caminata corta desde el alojamiento. Buen punto para ubicarse, pero evitar comer en locales demasiado turísticos.','Gratis','30 min','rambla'],
  ['16:40','Plaça Reial','Plaza muy linda, cerca del alojamiento. Buena para primera foto grupal y café corto.','Gratis','25 min','plazareal'],
  ['17:15','Barrio Gótico','Recorrido caminando por calles históricas. Sin entradas ni presión de horarios.','Gratis','1 h','gotico'],
  ['18:15','Catedral de Barcelona','Ver exterior y alrededores. Entrar solo si hay ganas y tiempo.','Gratis exterior','30–45 min','catedral'],
  ['19:15','Port Vell / paseo marítimo','Bajar caminando hacia el puerto para cerrar la tarde con vista al mar.','Gratis','45 min','portvell'],
  ['21:00','Cena de bienvenida','Recomendación: Poble-sec, Sant Antoni o El Born antes que restaurantes de La Rambla.','€20–35','Flexible','hotel']
 ]},
 {id:'day2', title:'Día 2 · Viernes 26/09 · Gaudí fuerte + vistas', label:'Día completo principal · reservar Sagrada Familia y Park Güell', stops:[
  ['09:00','Sagrada Familia','Imprescindible del viaje. Reservar online y llegar 15 minutos antes. Mejor hacerla temprano.','€36–40','2 h','sagrada'],
  ['11:45','Recinte Modernista Sant Pau','Muy recomendable: arquitectura espectacular y menos masivo que Sagrada Familia.','€16–18','1 h 15','santpau'],
  ['14:00','Almuerzo zona Sant Pau / Gràcia','Evitar restaurantes pegados a atracciones. Buscar menú del día o tapas casuales.','€18–30','1 h','santpau'],
  ['16:30','Park Güell','Reservar horario. Ir sin apuro: hay subidas y conviene llegar con margen.','€18','1 h 30','parkguell'],
  ['18:45','Bunkers del Carmel','Opcional pero muy buen atardecer. Si están cansados, cambiar por mirador más cómodo o volver al alojamiento.','Gratis','1 h','bunkers'],
  ['21:30','Cena','Volver hacia Poble-sec/Sant Antoni/Gràcia según energía.','€25–40','Flexible','hotel']
 ]},
 {id:'day3', title:'Día 3 · Sábado 27/09 · Centro + fútbol + Montjuïc', label:'Día completo final · elegir bien prioridades', stops:[
  ['09:30','Passeig de Gràcia','Ver Casa Batlló, Casa Amatller y La Pedrera por fuera. Zona ideal para fotos y compras.','Gratis','45 min','batllo'],
  ['10:30','Casa Batlló o La Pedrera','Elegir una para no gastar de más. Para primera vez: Casa Batlló. Para terraza: La Pedrera.','€29–45','1 h 30','batllo'],
  ['12:30','Palau de la Música Catalana','Visita corta, céntrica y distinta. Buena alternativa a sumar otro Gaudí caro.','€20–24','1 h','palau'],
  ['14:00','El Born + almuerzo','Zona ideal para tapas y caminar. Museo Picasso solo si el grupo quiere arte.','€20–35','1 h 30','born'],
  ['16:00','Barceloneta','Paseo por playa y puerto. Si el grupo prioriza fútbol, acortar esta parte.','Gratis','1 h','barceloneta'],
  ['17:30','Barça Immersive Tour / Camp Nou Experience','Opción futbolera principal. Si hay partido, priorizar partido sobre tour.','€25–40 aprox.','1 h 30–2 h','campnou'],
  ['19:45','Montjuïc / MNAC / Fuente Mágica','Cierre panorámico cerca del alojamiento. Confirmar si hay espectáculo de Fuente Mágica.','Gratis exterior / €12 museo','1 h 30','mnac'],
  ['21:30','Última cena','Cena grupal final: tapas, paella o hamburguesas según presupuesto.','€25–45','Flexible','hotel']
 ]},
 {id:'day4', title:'Día 4 · Domingo 28/09 · Salida temprano', label:'No cuenta como día turístico · vuelo 09:00', stops:[
  ['05:45','Salida del alojamiento','Para vuelo 09:00 conviene salir muy temprano. Confirmar hora exacta según aeropuerto/terminal y equipaje.','Taxi/Aerobús','45–60 min','hotel'],
  ['06:30','Llegada al aeropuerto','Margen recomendado para vuelo internacional/equipaje.','-','2 h aprox.','aeropuerto'],
  ['09:00','Vuelo de salida','No planificar turismo este día.','-','-','aeropuerto']
 ]}
];

const ranking = [
 ['Sagrada Familia','⭐⭐⭐⭐⭐','Obligatorio','La visita más importante. Comprar con anticipación para el 26/09.'],
 ['Park Güell','⭐⭐⭐⭐','Muy recomendado','Caro para ser parque, pero visualmente muy Barcelona. Mejor el 26/09 a la tarde.'],
 ['Casa Batlló','⭐⭐⭐⭐','Recomendado','Mejor interior modernista para primera visita; precio alto.'],
 ['La Pedrera','⭐⭐⭐','Opcional','Buena terraza, pero elegiría una entre esta y Casa Batlló.'],
 ['Sant Pau','⭐⭐⭐⭐','Sorpresa positiva','Arquitectura excelente y menos saturada.'],
 ['Palau de la Música','⭐⭐⭐⭐','Muy recomendado','Visita corta, céntrica y distinta.'],
 ['Museo Picasso','⭐⭐⭐','Según gustos','Solo si el grupo quiere museo de arte; si no, caminar El Born.'],
 ['Barceloneta/Poblenou','⭐⭐⭐⭐','Recomendado','Ideal para cortar con edificios y comer relajado.'],
 ['Montjuïc / MNAC exterior','⭐⭐⭐⭐','Recomendado','Vistas, fotos y cierre cómodo cerca del alojamiento.'],
 ['Bunkers del Carmel','⭐⭐⭐⭐','Plan alternativo','Gran vista, pero más lejos y puede estar lleno.'],
 ['Barça Immersive Tour','⭐⭐⭐⭐','Recomendado futbolero','Mejor opción de estadio si no hay partido.'],
 ['RCDE Stadium','⭐⭐⭐','Opcional futbolero','Más lejos; hacerlo solo si el grupo es muy futbolero o hay partido.']
];

const sources = [
 ['Sagrada Família oficial','https://sagradafamilia.org/en/tickets-individuals'],
 ['Park Güell oficial','https://parkguell.barcelona/en/planning-your-visit/prices-and-times'],
 ['TMB tarifas transporte','https://www.tmb.cat/en/barcelona-fares-metro-bus/transport-ticket-fares'],
 ['T-Casual y excepción aeropuerto','https://t-mobilitat.atm.cat/en/web/t-mobilitat/fares/t-casual'],
 ['Palau de la Música oficial','https://www.palaumusica.cat/en/visites/visits-and-tickets_1159168'],
 ['Sant Pau oficial','https://santpaubarcelona.org/es/']
];

function renderDays(){
  const cont=document.getElementById('daysContainer');
  cont.innerHTML='';
  dayData.forEach(day=>{
    let html=`<article class="day"><div class="day-head"><div><h3>${day.title}</h3><p>${day.label}</p></div><span class="badge">${routeSummary(day.id)}</span></div><div class="timeline">`;
    day.stops.forEach((s,i)=>{
      const [time,title,desc,price,duration,pid]=s;
      html+=`<div class="stop"><div class="time">${time}</div><div class="stop-card"><h4>${title}</h4><p>${desc}</p><div class="meta"><span class="pill">${price}</span><span class="pill">${duration}</span><a class="pill" href="${gmaps(points[pid])}" target="_blank">Abrir mapa</a></div>`;
      if(i<day.stops.length-1){
        const next=day.stops[i+1][5];
        html+=routeBlock(pid,next);
      }
      html+=`</div></div>`;
    });
    html+=`</div></article>`;
    cont.insertAdjacentHTML('beforeend',html);
  });
}

function routeBlock(a,b){
  const km=distKm(points[a],points[b]);
  return `<div class="route"><strong>Próximo traslado:</strong> ${points[a].name} → ${points[b].name}<br>📏 ${km.toFixed(1)} km · 🚶 ${walkMin(km)} min · 🚇/🚌 ${transportHint(a,b)} · 🚖 ${taxiMin(km)} min aprox.</div>`;
}

function routeSummary(dayId){
  if(dayId==='day4') return 'Salida temprano · no turístico';
  let arr=routes[dayId], total=0;
  for(let i=0;i<arr.length-1;i++) total+=distKm(points[arr[i]],points[arr[i+1]]);
  return `${total.toFixed(1)} km aprox. de recorrido entre puntos`;
}

function renderRanking(){
  const body=document.getElementById('rankingBody');
  body.innerHTML='';
  ranking.forEach(r=>{
    const cls=r[1].length>=5?'p5':r[1].length>=4?'p4':r[1].length>=3?'p3':'p2';
    body.insertAdjacentHTML('beforeend',`<tr><td>${r[0]}</td><td class="priority ${cls}">${r[1]}</td><td><strong>${r[2]}</strong></td><td>${r[3]}</td></tr>`);
  });
}

function renderSources(){
  const el=document.getElementById('sourcesList');
  el.innerHTML='';
  sources.forEach(s=>el.insertAdjacentHTML('beforeend',`<a href="${s[1]}" target="_blank">${s[0]}</a>`));
}

function project(p, bounds){
  const x=(p.lon-bounds.minLon)/(bounds.maxLon-bounds.minLon)*820+40;
  const y=(bounds.maxLat-p.lat)/(bounds.maxLat-bounds.minLat)*480+40;
  return [x,y];
}

function renderMap(routeId='day1'){
  const svg=document.getElementById('routeMap');
  const ids=routes[routeId] || routes.day1;
  const pts=ids.map(id=>points[id]);
  const bounds={
    minLat:Math.min(...Object.values(points).map(p=>p.lat))-.004,
    maxLat:Math.max(...Object.values(points).map(p=>p.lat))+.004,
    minLon:Math.min(...Object.values(points).map(p=>p.lon))-.006,
    maxLon:Math.max(...Object.values(points).map(p=>p.lon))+.006
  };
  let html=`<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#f97316" /></marker></defs><rect x="0" y="0" width="900" height="560" rx="26" fill="#f8fafc"/><g opacity=".55" stroke="#cbd5e1" stroke-width="1">`;
  for(let x=60;x<860;x+=80) html+=`<line x1="${x}" x2="${x}" y1="30" y2="530"/>`;
  for(let y=60;y<520;y+=70) html+=`<line y1="${y}" y2="${y}" x1="30" x2="870"/>`;
  html+=`</g>`;
  if(routeId!=='all'){
    for(let i=0;i<pts.length-1;i++){
      const [x1,y1]=project(pts[i],bounds), [x2,y2]=project(pts[i+1],bounds);
      html+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f97316" stroke-width="4" marker-end="url(#arrow)" opacity=".9"/>`;
    }
  }
  Object.values(points).forEach(p=>{
    if(routeId!=='all'&&!ids.includes(p.id)) return;
    const [x,y]=project(p,bounds);
    const isHotel=p.id==='hotel';
    html+=`<g><circle cx="${x}" cy="${y}" r="${isHotel?13:10}" fill="${isHotel?'#2563eb':'#0f172a'}"/><text x="${x+14}" y="${y+5}" font-size="14" font-weight="800" fill="#111827">${p.name}</text></g>`;
  });
  html+=`<text x="40" y="535" font-size="13" fill="#64748b">Mapa esquemático generado localmente · no sustituye Google Maps</text>`;
  svg.innerHTML=html;
}

document.querySelectorAll('.tabs button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMap(btn.dataset.map);
}));

renderDays();
renderRanking();
renderSources();
renderMap('day1');
