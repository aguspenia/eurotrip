const lodging = {id:'hotel', name:'Alojamiento', lat:41.37882, lon:2.17413, type:'base'};

const points = {
  hotel: lodging,
  aeropuerto:{id:'aeropuerto', name:'Aeropuerto BCN', lat:41.2974, lon:2.0833, type:'airport'},
  rambla:{id:'rambla', name:'La Rambla', lat:41.3808, lon:2.1738, type:'walk'},
  boqueria:{id:'boqueria', name:'Mercado de La Boqueria', lat:41.3818, lon:2.1716, type:'walk'},
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
  santamaria:{id:'santamaria', name:'Santa Maria del Mar', lat:41.3838, lon:2.1820, type:'walk'},
  barceloneta:{id:'barceloneta', name:'Barceloneta', lat:41.3790, lon:2.1896, type:'walk'},
  campnou:{id:'campnou', name:'Barça Immersive Tour', lat:41.3809, lon:2.1228, type:'stadium'},
  montjuic:{id:'montjuic', name:'Castillo de Montjuïc', lat:41.3635, lon:2.1663, type:'view'},
  mnac:{id:'mnac', name:'MNAC / Mirador', lat:41.3688, lon:2.1530, type:'view'},
  fonts:{id:'fonts', name:'Fuente Mágica', lat:41.3711, lon:2.1516, type:'view'}
};

const routes = {
  day1:['aeropuerto','hotel','boqueria','rambla','plazareal','gotico','catedral','portvell','hotel'],
  day2:['hotel','sagrada','santpau','parkguell','bunkers','hotel'],
  day3:['hotel','batllo','pedrera','palau','born','santamaria','barceloneta','campnou','mnac','fonts','hotel'],
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
 {id:'day1', title:'Día 1 · Jueves 25/09 · Llegada + Centro Histórico', label:'Tarde tranquila · Sin reservas ni entradas caras', stops:[
  ['13:00','Llegada a Barcelona','Llegada al aeropuerto. Entre equipaje, salida y traslado, calcular aproximadamente 2 horas hasta quedar instalados.','-','1 h 30–2 h','aeropuerto'],
  ['15:00','Check-in','Alojamiento en Carrer Nou de la Rambla, 31. Dejar valijas, descansar y organizar la salida de la tarde.','-','45 min','hotel'],
  ['16:00','Mercado de La Boqueria','Primera parada ideal por cercanía. Probar jugos, fruta, jamón ibérico o comprar algo para desayunar. Evitar decidir en los primeros puestos de la entrada.','Gratis / €5–20','45–60 min','boqueria'],
  ['17:00','La Rambla','Recorrido corto para ubicarse. Buena conexión entre Boqueria, Plaça Reial y el Gótico. Tener cuidado con celulares y billeteras.','Gratis','30 min','rambla'],
  ['17:40','Plaça Reial','Una de las plazas más lindas del centro. Buena para fotos, descanso o tomar algo rápido.','Gratis','20 min','plazareal'],
  ['18:10','Barrio Gótico','Caminar por calles medievales, Plaça Sant Jaume, calle del Bisbe y alrededores. Ideal para recorrer sin horario fijo.','Gratis','1 h','gotico'],
  ['19:15','Catedral de Barcelona','Ver exterior y alrededores. Entrar solamente si tienen ganas y tiempo.','Gratis exterior','30 min','catedral'],
  ['20:00','Port Vell + Monumento a Colón','Bajar caminando hacia el puerto para cerrar la tarde con vista al mar.','Gratis','45 min','portvell'],
  ['21:00','Cena','Recomendación: Poble-sec, Sant Antoni o El Born. Evitar cenar sobre La Rambla.','€20–35','Flexible','hotel']
 ]},
 {id:'day2', title:'Día 2 · Viernes 26/09 · Gaudí', label:'Día fuerte · Reservar Sagrada Familia y Park Güell', stops:[
  ['09:00','Sagrada Familia','Visita principal del viaje. Llegar 15 minutos antes y reservar online con anticipación.','€36–40','2 h','sagrada'],
  ['11:30','Recinte Modernista Sant Pau','Muy recomendable y menos masivo que Sagrada Familia. Arquitectura modernista excelente.','€16–18','1 h','santpau'],
  ['13:00','Almuerzo','Zona Sant Pau / Gràcia. Buscar menú del día o tapas casuales, evitando restaurantes pegados a atracciones.','€20–30','1 h','santpau'],
  ['15:00','Park Güell','Reservar para la tarde. Ir con margen porque hay subidas y el acceso puede llevar tiempo.','€18','1 h 30','parkguell'],
  ['18:00','Bunkers del Carmel','Atardecer con vista panorámica. Si están cansados, reemplazar por volver a descansar o por Montjuïc/MNAC.','Gratis','1 h','bunkers'],
  ['21:00','Cena','Gràcia o Sant Antoni. Elegir zona según energía del grupo.','€25–40','Flexible','hotel']
 ]},
 {id:'day3', title:'Día 3 · Sábado 27/09 · Modernismo + Playa + Fútbol', label:'Último día completo · Elegir prioridades', stops:[
  ['09:30','Passeig de Gràcia','Ver Casa Batlló, Casa Amatller y La Pedrera por fuera. Zona ideal para fotos y compras.','Gratis','45 min','batllo'],
  ['10:30','Casa Batlló o La Pedrera','Elegir solamente una para no gastar de más. Para primera visita elegiría Casa Batlló; para terraza, La Pedrera.','€30–45','1 h 30','batllo'],
  ['12:30','Palau de la Música Catalana','Visita corta y muy visual. Buena alternativa para sumar arquitectura sin repetir otro Gaudí caro.','€20–24','1 h','palau'],
  ['13:45','El Born','Recorrer el barrio antes de almorzar. Buena zona para caminar, tapas y calles lindas.','Gratis','30 min','born'],
  ['14:15','Santa Maria del Mar','Una de las iglesias más lindas de Barcelona. Muy recomendable y suele quedar fuera de los recorridos más turísticos.','Gratis / donativo','30 min','santamaria'],
  ['15:00','Almuerzo','Almorzar en El Born. Buena zona para tapas o comida casual.','€20–35','1 h','born'],
  ['16:30','Barceloneta','Paseo por playa y puerto. Si el grupo prioriza fútbol, acortar esta parte.','Gratis','1 h','barceloneta'],
  ['18:00','Camp Nou Experience','Opción futbolera principal. Si hay partido, reemplazar el tour por el partido.','€30–40 aprox.','2 h','campnou'],
  ['20:30','Montjuïc / MNAC / Fuente Mágica','Cierre panorámico cerca del alojamiento. Confirmar si hay espectáculo de Fuente Mágica.','Gratis exterior / €12 museo','1 h','mnac'],
  ['21:30','Cena de despedida','Última cena del viaje. Recomendación: tapas, paella o restaurante reservado previamente.','€25–45','Flexible','hotel']
 ]},
 {id:'day4', title:'Día 4 · Domingo 28/09 · Regreso', label:'Salida temprano · No planificar turismo', stops:[
  ['05:45','Salida del alojamiento','Para vuelo 09:00 conviene salir muy temprano. Definir taxi, Aerobús o traslado la noche anterior.','Taxi/Aerobús','45–60 min','hotel'],
  ['06:30','Aeropuerto','Llegar con margen para equipaje y controles.','-','2 h aprox.','aeropuerto'],
  ['09:00','Vuelo','Fin del viaje.','-','-','aeropuerto']
 ]}
];

const ranking = [
 ['Sagrada Familia','⭐⭐⭐⭐⭐','Obligatorio','La visita más importante. Comprar con anticipación para el 26/09.'],
 ['Mercado de La Boqueria','⭐⭐⭐⭐⭐','Obligatorio','Ideal para el día de llegada. Queda a 5 minutos del alojamiento.'],
 ['Park Güell','⭐⭐⭐⭐','Muy recomendado','Caro para ser parque, pero visualmente muy Barcelona. Mejor el 26/09 a la tarde.'],
 ['Casa Batlló','⭐⭐⭐⭐','Recomendado','Mejor interior modernista para primera visita; precio alto.'],
 ['La Pedrera','⭐⭐⭐','Opcional','Buena terraza, pero elegiría una entre esta y Casa Batlló.'],
 ['Sant Pau','⭐⭐⭐⭐','Sorpresa positiva','Arquitectura excelente y menos saturada.'],
 ['Palau de la Música','⭐⭐⭐⭐','Muy recomendado','Visita corta, céntrica y distinta.'],
 ['Santa Maria del Mar','⭐⭐⭐⭐⭐','Muy recomendado','Una de las iglesias más lindas de Barcelona. Agregarla en El Born.'],
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
