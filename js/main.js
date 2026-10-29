/* Press kit: lee data/content.js (se edita desde admin.html) y dibuja todo el sitio. */

/* RESPALDO: se usa solo si data/content.js no carga. El contenido real se edita desde admin.html. */
const BASE = {
  "nombre": "Franco Sánchez",
  "lema": "Indie Dance oscuro. Groove pesado. Drops bien marcados.",
  "intro": "DJ de General Roca, con base en el Alto Valle.",
  "acento": "#ff2d46",
  "titulo": "Franco Sánchez | DJ Indie Dance | Press Kit",
  "descripcion": "Franco Sánchez, DJ de General Roca (Alto Valle). Indie Dance oscuro, groove pesado y drops bien marcados.",
  "heroFoto": "assets/hero.jpg",
  "bioFoto": "assets/bio.jpg",
  "bio": [
    "Franco Sánchez es un DJ de General Roca, con base en el Alto Valle, con un sonido centrado en el Indie Dance oscuro, groove pesado y drops bien marcados.",
    "También incursiona en el Progressive House y el Melodic Techno, aunque su identidad se apoya principalmente en ritmos oscuros, sonidos profundos y una fuerte presencia del groove.",
    "Ha sumado experiencias en clubes del Alto Valle y presentaciones como invitado, además de experiencias en Buenos Aires Capital. Ha trabajado junto a productoras como Black Beat, Natural Swing, B2B Sessions y One More, y ha compartido cabina con artistas como Martin Angrissano, Caitto, Gueva, Mayro y Nicolás Van Orton.",
    "Su propuesta busca un balance entre groove, energía y una estética underground, consolidando una identidad propia dentro de la escena regional."
  ],
  "datos": [
    {
      "t": "Sonido",
      "d": "Indie Dance oscuro"
    },
    {
      "t": "También toca",
      "d": "Progressive House y Melodic Techno"
    },
    {
      "t": "Base",
      "d": "General Roca, Alto Valle"
    },
    {
      "t": "Presentaciones",
      "d": "Clubes del Alto Valle y Buenos Aires Capital"
    }
  ],
  "productoras": [
    "Black Beat",
    "Natural Swing",
    "B2B Sessions",
    "One More"
  ],
  "lineup": [
    "Martin Angrissano",
    "Caitto",
    "Gueva",
    "Mayro",
    "Nicolás Van Orton"
  ],
  "soundcloud": "https://soundcloud.com/franco-sanchez-24",
  "videos": [
    "ddVLRmnK3dw",
    "ulpDMl9_QSM"
  ],
  "canales": [
    {
      "nombre": "Natural Swing",
      "link": ""
    },
    {
      "nombre": "Black Beat",
      "link": ""
    },
    {
      "nombre": "B2B Sessions",
      "link": ""
    },
    {
      "nombre": "One More",
      "link": ""
    }
  ],
  "fotos": [
    {
      "src": "assets/g-pantallas.jpg",
      "alt": "Franco Sánchez en cabina con su nombre en las pantallas",
      "pos": ""
    },
    {
      "src": "assets/g-verde.jpg",
      "alt": "Franco Sánchez mezclando con luz verde",
      "pos": ""
    },
    {
      "src": "assets/g-azul.jpg",
      "alt": "Franco Sánchez en cabina con luces azules",
      "pos": ""
    },
    {
      "src": "assets/g-exterior.jpg",
      "alt": "Franco Sánchez mezclando al aire libre de noche",
      "pos": "center 42%"
    }
  ],
  "email": "fsanchezbooking@gmail.com",
  "instagram": "https://www.instagram.com/frsanchez_/",
  "footer": "© 2026 Franco Sánchez",
  "textos": {
    "bioProductoras": "Productoras con las que trabajó",
    "bioLineup": "Compartió cabina con",
    "scSub": "Sets y producciones de Franco, directo desde su perfil.",
    "videosSub": "Franco en cabina. Tocá el video para reproducirlo.",
    "canalesSub": "Sus sets y producciones, subidos por las productoras con las que trabajó.",
    "fotosSub": "En cabina.",
    "contactoSub": "Fechas, colaboraciones y prensa."
  }
};

new Promise((ok, no) => {
  const s = document.createElement('script');
  s.src = 'data/content.js?v=' + Date.now();
  s.onload = () => ok(window.SITE || BASE);
  s.onerror = () => { console.warn('No se encontró data/content.js: se usa el contenido de respaldo.'); ok(BASE); };
  document.head.append(s);
}).then((S) => {
  const T = S.textos || {};
  const e = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const u = (s) => (/^\s*(javascript|vbscript):/i.test(s || '') ? '#' : e(s));
  const L = (a) => (a || []).filter(Boolean);

  const bio = L(S.bio), datos = L(S.datos), prod = L(S.productoras), line = L(S.lineup);
  const videos = L(S.videos), canales = L(S.canales), fotos = L(S.fotos);
  const handle = (S.instagram || '').replace(/\/+$/, '').split('/').pop();
  const [n1, ...n2] = (S.nombre || '').split(' ');

  const secciones = [
    ['bio', 'Bio', bio.length || datos.length || prod.length || line.length || S.bioFoto],
    ['soundcloud', 'SoundCloud', S.soundcloud],
    ['videos', 'Videos', videos.length],
    ['canales', 'Producciones en otros canales', canales.length],
    ['fotos', 'Fotos', fotos.length],
    ['contacto', 'Contacto', S.email || S.instagram || S.soundcloud],
  ].filter((s) => s[3]);

  const html = {
    bio: () => `
      <div class="bio"${S.bioFoto ? '' : ' style="grid-template-columns:1fr"'}>
        <div><h2>Bio</h2>${bio.map((p) => `<p>${e(p)}</p>`).join('')}</div>
        ${S.bioFoto ? `<img class="bio__photo" src="${u(S.bioFoto)}" alt="${e(S.nombre)}">` : ''}
      </div>
      ${datos.length ? `<dl class="facts">${datos.map((d) => `<div><dt>${e(d.t)}</dt><dd>${e(d.d)}</dd></div>`).join('')}</dl>` : ''}
      ${prod.length ? `<h3 class="subhead">${e(T.bioProductoras)}</h3><ul class="chips">${prod.map((p) => `<li>${e(p)}</li>`).join('')}</ul>` : ''}
      ${line.length ? `<h3 class="subhead">${e(T.bioLineup)}</h3><ul class="lineup">${line.map((p) => `<li>${e(p)}</li>`).join('')}</ul>` : ''}`,

    soundcloud: () => `
      <h2>SoundCloud</h2><p class="section__sub">${e(T.scSub)}</p>
      <a class="sc-card" href="${u(S.soundcloud)}" target="_blank" rel="noopener">
        <span class="sc-card__play" aria-hidden="true"></span>
        <span class="sc-card__text"><strong>${e(S.nombre)} en SoundCloud</strong><span>Escuchá todos sus sets y temas.</span></span>
        <span class="btn btn--primary">Abrir perfil</span>
      </a>`,

    videos: () => `
      <h2>Videos</h2><p class="section__sub">${e(T.videosSub)}</p>
      <div class="videos">${videos.map((id) => `
        <div>
          <div class="video__frame"><button class="video__cover" type="button" data-id="${e(id)}" aria-label="Reproducir video">
            <img src="https://i.ytimg.com/vi/${e(id)}/hqdefault.jpg" alt="Miniatura del video" loading="lazy"></button></div>
          <a class="video__link" href="https://www.youtube.com/watch?v=${e(id)}" target="_blank" rel="noopener">Ver en YouTube</a>
        </div>`).join('')}</div>`,

    canales: () => `
      <h2>Producciones en otros canales</h2><p class="section__sub">${e(T.canalesSub)}</p>
      <div class="cards">${canales.map((c) => {
        const inner = `<strong>${e(c.nombre)}</strong><span>Sets y producciones de ${e(S.nombre)} en su canal.</span>`;
        return c.link
          ? `<a class="card" href="${u(c.link)}" target="_blank" rel="noopener">${inner}<em>Escuchar</em></a>`
          : `<div class="card">${inner}<em>Link próximamente</em></div>`;
      }).join('')}</div>`,

    fotos: () => `
      <h2>Fotos</h2><p class="section__sub">${e(T.fotosSub)}</p>
      <div class="carousel">
        <div class="carousel__track" id="carousel-track" tabindex="0" aria-label="Galería de fotos">
          ${fotos.map((f) => `<figure class="carousel__slide"><img src="${u(f.src)}" alt="${e(f.alt)}"${f.pos ? ` style="--pos:${e(f.pos)}"` : ''} loading="lazy"></figure>`).join('')}
        </div>
        <button class="carousel__btn carousel__btn--prev" id="carousel-prev" type="button" aria-label="Foto anterior">&#8249;</button>
        <button class="carousel__btn carousel__btn--next" id="carousel-next" type="button" aria-label="Foto siguiente">&#8250;</button>
        <div class="carousel__dots" id="carousel-dots"></div>
      </div>`,

    contacto: () => `
      <h2>Contacto</h2><p class="section__sub">${e(T.contactoSub)}</p>
      ${S.email ? `<a class="contact__mail" href="mailto:${u(S.email)}">${e(S.email)}</a>` : ''}
      <div class="btn-row">
        ${S.email ? `<a class="btn btn--primary" href="mailto:${u(S.email)}">Escribir por mail</a>` : ''}
        ${S.instagram ? `<a class="btn" href="${u(S.instagram)}" target="_blank" rel="noopener">Instagram @${e(handle)}</a>` : ''}
        ${S.soundcloud ? `<a class="btn" href="${u(S.soundcloud)}" target="_blank" rel="noopener">SoundCloud</a>` : ''}
      </div>`,
  };

  document.title = S.titulo || S.nombre || 'Press Kit';
  document.querySelector('meta[name=description]').content = S.descripcion || '';
  if (S.acento) document.documentElement.style.setProperty('--red', S.acento);

  document.getElementById('app').innerHTML = `
    <header class="hero">
      <div class="container hero__grid">
        <div class="hero__text">
          <h1 class="hero__name">${e(n1)}${n2.length ? '<br>' + e(n2.join(' ')) : ''}</h1>
          <p class="hero__tag">${e(S.lema)}</p>
          <p class="hero__lead">${e(S.intro)}</p>
          <div class="btn-row">
            ${S.soundcloud ? '<a class="btn btn--primary" href="#soundcloud">Escuchar</a>' : ''}
            ${S.email ? '<a class="btn" href="#contacto">Contratar</a>' : ''}
          </div>
        </div>
        ${S.heroFoto ? `<div class="hero__photo"><img src="${u(S.heroFoto)}" alt="Retrato de ${e(S.nombre)}"></div>` : ''}
      </div>
    </header>
    <div class="container">
      <nav class="nav" aria-label="Secciones">${secciones.map((s) => `<a href="#${s[0]}">${s[1]}</a>`).join('')}</nav>
      ${secciones.map((s, i) => `<section id="${s[0]}" class="section${i === secciones.length - 1 ? ' section--last' : ''}">${html[s[0]]()}</section>`).join('')}
      <footer class="footer">${e(S.footer)}</footer>
    </div>`;

  /* Videos: miniatura primero, el reproductor se carga al tocar */
  const comoArchivo = location.protocol === 'file:';   // YouTube no embebe desde file://
  document.querySelectorAll('.video__cover').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (comoArchivo) return window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener');
      btn.parentElement.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    });
  });

  /* Carrusel */
  const track = document.getElementById('carousel-track');
  if (!track) return;
  const slides = track.children, dots = document.getElementById('carousel-dots');
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const goTo = (i) => track.scrollTo({ left: ((i + slides.length) % slides.length) * track.clientWidth, behavior });
  [...slides].forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button'; d.className = 'carousel__dot';
    d.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dots.appendChild(d);
  });
  const mark = () => [...dots.children].forEach((d, i) => d.classList.toggle('is-active', i === current()));
  document.getElementById('carousel-prev').addEventListener('click', () => goTo(current() - 1));
  document.getElementById('carousel-next').addEventListener('click', () => goTo(current() + 1));
  track.addEventListener('scroll', mark, { passive: true });
  mark();
}).catch((err) => {
  console.error(err);
  document.getElementById('app').textContent = 'No se pudo cargar el contenido. Revisá que la carpeta data/ (con content.js) esté junto a index.html.';
});
