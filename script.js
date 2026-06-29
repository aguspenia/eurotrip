const lodging = {id:'hotel', name:'Alojamiento', lat:41.37882, lon:2.17413, type:'base'};

const points = {
  hotel: lodging,
  aeropuerto:{id:'aeropuerto', name:'Aeropuerto BCN', lat:41.2974, lon:2.0833, type:'airport'},
  rambla:{id:'rambla', name:'La Rambla', lat:41.3808, lon:2.1738, type:'walk'},
  plazareal:{id:'plazareal', name:'Plaça Reial', lat:41.3801, lon:2.1751, type:'walk'},
  gotico:{id:'gotico', name:'Barrio Gótico', lat:41.3839, lon:2.1763, type:'walk'},
  catedral:{id:'catedral', name:'Catedral de Barcelona', lat:41.3839, lon:2.1762, type:'walk'},
  portvell:{id:'portvell', name:'Port Vell', lat:41.3763, lon:2.1834, type:'walk'},
  sagrada:{id:'sagrada', name:'Sagrada Familia', lat:41.4036, lon:2.1744, type:'ticket'},
  santpau:{id:'santpau', name:'Recinte Modernista Sant Pau', lat:41.4135, lon:2.1742, type:'ticket'},
  parkguell:{id:'parkguell', name:'Park Güell', lat:41.4145, lon:2.1527, type:'ticket'},
  bunkers:{id:'bunkers', name:'Bunkers del Carmel', lat:41.4195, lon:2.1618, type:'view'},
  batllo:{id:'batllo', name:'Casa Batlló', lat:41.3917, lon:2.1649, type:'ticket'},
  pedrera:{id:'pedrera', name:'La Pedrera', lat:41.3954, lon:2.1619, type:'ticket'},
  palau:{id:'palau', name:'Palau de la Música Catalana', lat:41.3876, lon:2.1753, type:'ticket'},
  born:{id:'born', name:'El Born / Museo Picasso', lat:41.3852, lon:2.1810, type:'walk'},
  barceloneta:{id:'barceloneta', name:'Barceloneta', lat:41.3790, lon:2.1896, type:'walk'},
  campnou:{id:'campnou', name:'Barça Immersive Tour', lat:41.3809, lon:2.1228, type:'stadium'},
  montjuic:{id:'montjuic', name:'Castillo de Montjuïc', lat:41.3635, lon:2.1663, type:'view'},
  mnac:{id:'mnac', name:'MNAC / Mirador', lat:41.3688, lon:2.1530, type:'view'},
  fonts:{id:'fonts', name:'Fuente Mágica', lat:41.3711, lon:2.1516, type:'view'}
};

const routes = {
  day1:['aeropuerto','hotel','rambla','plazareal','gotico','catedral','portvell','hotel'],
  day2:['hotel','sagrada','santpau','parkguell','bunkers','hotel'],
  day3:['hotel','batllo','pedrera','palau','born','barceloneta','campnou','montjuic','mnac','fonts','hotel'],
  day4:['hotel','aeropuerto'],
  all:Object.keys(points)
};

function rad(x){ return x*Math.PI/180; }
function hav(a,b){
  const R=6371;
  const dLat=rad(b.lat-a.lat), dLon=rad(b.lon-a.lon);
  const s=Math.sin(dLat/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(s));
}
function distKm(a,b){ return Math.max(0.25, hav(a,b)*1.22); }
function walkMin(km){ return Math.round(km/4.6*60); }
function taxiMin(km){ return Math.max(6, Math.round(6 + km/23*60)); }
function gmaps(p){ return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name+' Barcelona')}`; }

function transportHint(from,to){
  const km=distKm(points[from],points[to]);
  if(from==='aeropuerto' || to==='aeropuerto') return 'Aerobús/taxi';
  if(km<1.4) return 'Caminar';
  if(['parkguell','bunkers','montjuic','mnac','fonts'].includes(to)) return 'Bus/taxi por subida';
  if(to==='campnou') return 'Metro L3';
  if(km>4.5) return 'Metro o taxi';
  return 'Metro/bus';
}

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

const checklist = [
  ['Sagrada Familia', 'Reservar entrada para el 26/09 a la mañana.'],
  ['Park Güell', 'Reservar para el 26/09 a la tarde.'],
  ['Casa Batlló o La Pedrera', 'Decidir una sola para cuidar presupuesto.'],
  ['Palau de la Música', 'Comprar visita guiada si les interesa arquitectura.'],
  ['Camp Nou / partido', 'Revisar calendario antes de comprar tour.'],
  ['Cena final', 'Reservar un lugar bueno para el 27/09.'],
  ['Traslado salida', 'Definir taxi/Aerobús para salir 28/09 temprano.'],
  ['Google Maps offline', 'Descargar mapa de Barcelona antes de viajar.']
];

const sources = [
 ['Sagrada Família oficial','https://sagradafamilia.org/en/tickets-individuals'],
 ['Park Güell oficial','https://parkguell.barcelona/en/planning-your-visit/prices-and-times'],
 ['TMB tarifas transporte','https://www.tmb.cat/en/barcelona-fares-metro-bus/transport-ticket-fares'],
 ['T-Casual y excepción aeropuerto','https://t-mobilitat.atm.cat/en/web/t-mobilitat/fares/t-casual'],
 ['Palau de la Música oficial','https://www.palaumusica.cat/en/visites/visits-and-tickets_1159168'],
 ['Sant Pau oficial','https://santpaubarcelona.org/es/']
];

function routeSummary(dayId){
  if(dayId==='day4') return 'Salida temprano · no turístico';
  let arr=routes[dayId], total=0;
  for(let i=0;i<arr.length-1;i++) total+=distKm(points[arr[i]],points[arr[i+1]]);
  return `${total.toFixed(1)} km aprox. entre puntos`;
}

function routeBlock(a,b){
  const km=distKm(points[a],points[b]);
  return `<div class="route"><strong>Próximo traslado:</strong> ${points[a].name} → ${points[b].name}<br>📏 ${km.toFixed(1)} km · 🚶 ${walkMin(km)} min · 🚇/🚌 ${transportHint(a,b)} · 🚖 ${taxiMin(km)} min aprox.</div>`;
}

function renderDays(){
  const cont=document.getElementById('daysContainer');
  cont.innerHTML='';
  dayData.forEach(day=>{
    let html=`<article class="day"><div class="day-head"><div><h3>${day.title}</h3><p>${day.label}</p></div><span class="badge">${routeSummary(day.id)}</span></div><div class="timeline">`;
    day.stops.forEach((s,i)=>{
      const [time,title,desc,price,duration,pid]=s;
      html+=`<div class="stop"><div class="time">${time}</div><div class="stop-card"><h4>${title}</h4><p>${desc}</p><div class="meta"><span class="pill">${price}</span><span class="pill">${duration}</span><a class="pill" href="${gmaps(points[pid])}" target="_blank" rel="noopener">Abrir mapa</a></div>`;
      if(i<day.stops.length-1) html+=routeBlock(pid, day.stops[i+1][5]);
      html+=`</div></div>`;
    });
    html+=`</div></article>`;
    cont.insertAdjacentHTML('beforeend',html);
  });
}

function renderRanking(){
  const body=document.getElementById('rankingBody');
  body.innerHTML='';
  ranking.forEach(r=>{
    body.insertAdjacentHTML('beforeend',`<tr><td>${r[0]}</td><td class="priority">${r[1]}</td><td><strong>${r[2]}</strong></td><td>${r[3]}</td></tr>`);
  });
}

function renderChecklist(){
  const box=document.getElementById('checklistBox');
  box.innerHTML='';
  checklist.forEach((c,i)=>{
    box.insertAdjacentHTML('beforeend',`<label class="check-item"><input type="checkbox" data-check="${i}"><div><strong>${c[0]}</strong><br><span>${c[1]}</span></div></label>`);
  });
  box.querySelectorAll('input').forEach(inp=>{
    inp.checked = localStorage.getItem('check_'+inp.dataset.check)==='1';
    inp.addEventListener('change',()=>localStorage.setItem('check_'+inp.dataset.check, inp.checked?'1':'0'));
  });
}

function renderSources(){
  const el=document.getElementById('sourcesList');
  el.innerHTML='';
  sources.forEach(s=>el.insertAdjacentHTML('beforeend',`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`));
}

let map, layerGroup;
function markerIcon(type){
  const colors = {base:'#2563eb', airport:'#475569', ticket:'#f97316', walk:'#16a34a', view:'#7c3aed', stadium:'#dc2626'};
  return L.divIcon({
    className:'custom-marker',
    html:`<span style="background:${colors[type]||'#0f172a'}"></span>`,
    iconSize:[18,18],
    iconAnchor:[9,9]
  });
}

function renderMap(routeId='day1'){
  if(!map){
    map = L.map('map', {scrollWheelZoom:false}).setView([41.389,2.168], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    layerGroup=L.layerGroup().addTo(map);
  }
  layerGroup.clearLayers();
  const ids = routes[routeId] || routes.day1;
  const latLngs = [];
  ids.forEach(id=>{
    const p=points[id];
    const m=L.marker([p.lat,p.lon], {icon:markerIcon(p.type)}).addTo(layerGroup);
    m.bindPopup(`<strong>${p.name}</strong><br><a href="${gmaps(p)}" target="_blank" rel="noopener">Abrir en Google Maps</a>`);
    latLngs.push([p.lat,p.lon]);
  });
  if(routeId!=='all' && latLngs.length>1){
    L.polyline(latLngs, {color:'#f97316', weight:4, opacity:.8}).addTo(layerGroup);
  }
  map.fitBounds(latLngs, {padding:[35,35]});
}

document.querySelectorAll('.map-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.map-tabs button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMap(btn.dataset.route);
}));

document.getElementById('themeToggle').addEventListener('click',()=>{
  const dark=document.documentElement.dataset.theme==='dark';
  document.documentElement.dataset.theme = dark ? '' : 'dark';
  document.getElementById('themeToggle').textContent = dark ? 'Modo oscuro' : 'Modo claro';
});

renderDays();
renderRanking();
renderChecklist();
renderSources();
renderMap('day1');
