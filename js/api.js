// ===== CONFIGURA TU BASE API =====
const API_BASE = 'https://turismomiramar.com/api_miramar/public';

// ------- Helpers -------
const fmtFecha = (iso) => {
  const f = new Date(iso);
  const dia = String(f.getDate()).padStart(2, '0');
  const mes = f.toLocaleString('es-AR', { month: 'short' }).toUpperCase();
  const human = f.toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: 'short' });
  return { dia, mes, human };
};

// ------- Eventos -------
export async function cargarEventos({ contenedorSelector }) {
  const cont = document.querySelector(contenedorSelector);
  if (!cont) return;
  cont.innerHTML = '<p>Cargando eventos…</p>';

  try {
    const res = await fetch(`${API_BASE}/eventos-json.php`);
    const data = await res.json();

    if (!data.length) {
      cont.innerHTML = '<p>No hay eventos publicados.</p>';
      return;
    }

    cont.innerHTML = data.map(ev => {
      const { dia, mes, human } = fmtFecha(ev.fecha);
      const hora = ev.hora || '';
      const img = ev.imagen_url || 'img/placeholder.jpg';

      return `
        <div class="col-12 col-md-6 col-lg-4" data-cat="${(ev.categoria || '').toLowerCase()}" data-title="${ev.titulo}">
          <article class="card h-100 shadow-sm">
            <div class="position-relative">
              <img src="${img}" class="card-img-top" alt="${ev.titulo}">
              <div class="position-absolute top-0 start-0 m-2 px-2 py-1 bg-white rounded fw-bold">${dia} ${mes}</div>
            </div>
            <div class="card-body">
              <h5 class="card-title">${ev.titulo}</h5>
              <p class="text-muted mb-2">
                <i class="far fa-calendar-alt me-1"></i>${human}${hora ? ` · ${hora}` : ''}${ev.lugar ? ` · <i class="fa fa-map-marker-alt ms-1"></i>${ev.lugar}` : ''}
              </p>
              ${ev.descripcion ? `<p class="small">${ev.descripcion}</p>` : ''}
            </div>
          </article>
        </div>`;
    }).join('');
  } catch (e) {
    console.error(e);
    cont.innerHTML = '<p>Error cargando eventos.</p>';
  }
}

// ------- Gastronomía -------
export async function cargarGastronomia({ contenedorSelector }) {
  const cont = document.querySelector(contenedorSelector);
  if (!cont) return;
  cont.innerHTML = '<p>Cargando gastronomía…</p>';

  try {
    const res = await fetch(`${API_BASE}/gastro-json.php`);
    const data = await res.json();

    if (!data.length) {
      cont.innerHTML = '<p>Sin locales publicados.</p>';
      return;
    }

    cont.innerHTML = data.map(g => `
      <div class="col-12 col-md-6 col-lg-4" data-cat="${(g.categoria || '').toLowerCase()}">
        <article class="card h-100 shadow-sm">
          <img src="${g.imagen_url || 'img/gastro/placeholder.jpg'}" class="card-img-top" alt="${g.nombre}">
          <div class="card-body">
            <h5 class="card-title mb-1">${g.nombre}</h5>
            ${g.categoria ? `<span class="badge bg-secondary mb-2">${g.categoria}</span>` : ''}
            ${g.especialidad ? `<p class="mb-1"><strong>Especialidad:</strong> ${g.especialidad}</p>` : ''}
            ${g.otros ? `<p class="mb-1"><strong>Otros:</strong> ${g.otros}</p>` : ''}
            ${g.direccion ? `<p class="mb-1"><i class="fa fa-map-marker-alt me-1"></i>${g.direccion}</p>` : ''}
            ${g.telefono ? `<p class="mb-0"><i class="fa fa-phone-alt me-1"></i>${g.telefono}</p>` : ''}
            ${g.tenedores != null ? `<p class="mb-0"><strong>Tenedores:</strong> ${g.tenedores}</p>` : ''}
          </div>
        </article>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
    cont.innerHTML = '<p>Error cargando gastronomía.</p>';
  }
}

// ------- Hospedaje -------
export async function cargarHospedaje({ contenedorSelector }) {
  const cont = document.querySelector(contenedorSelector);
  if (!cont) return;
  cont.innerHTML = '<p>Cargando hospedajes…</p>';

  try {
    const res = await fetch(`${API_BASE}/hospedajes-json.php`);
    const data = await res.json();

    if (!data.length) {
      cont.innerHTML = '<p>Sin hospedajes publicados.</p>';
      return;
    }

    cont.innerHTML = data.map(h => `
      <div class="col-12 col-md-6 col-lg-4" data-tipo="${(h.tipo || '').toLowerCase()}">
        <article class="card h-100 shadow-sm">
          <img src="${h.imagen_url || 'img/hotel/placeholder.jpg'}" class="card-img-top" alt="${h.nombre}">
          <div class="card-body">
            <h5 class="card-title mb-1">${h.nombre}</h5>
            ${h.tipo ? `<span class="badge bg-secondary mb-2">${h.tipo}</span>` : ''}
            ${h.direccion ? `<p class="mb-1"><i class="fa fa-map-marker-alt me-1"></i>${h.direccion}</p>` : ''}
            ${h.telefono ? `<p class="mb-1"><i class="fa fa-phone-alt me-1"></i>${h.telefono}</p>` : ''}
            ${h.maps_url ? `<a class="btn btn-sm btn-outline-primary mt-2" target="_blank" href="${h.maps_url}">Ver ubicación</a>` : ''}
          </div>
        </article>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
    cont.innerHTML = '<p>Error cargando hospedaje.</p>';
  }
}
