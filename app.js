const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const phone = $('#phone');
const lock = $('#lock');
const home = $('#home');
const statusbar = $('#statusbar');
const homeBar = $('#homeBar');

let currentApp = null;

/* ---------- clock ---------- */

function tick() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  $$('.clock').forEach(el => el.textContent = `${h}:${m}`);

  $('#lockDate').textContent = now.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}
tick();
setInterval(tick, 10000);

/* ---------- icons ---------- */

const ico = {
  snap: '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="11" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="18" cy="18" r="4.5" fill="#fff"/></svg>',
  tiktok: '<svg viewBox="0 0 36 36"><ellipse cx="13" cy="25" rx="5" ry="4" fill="#fff"/><path d="M16.5 25V8l10 3.5v4.5l-7.2-2.4V25z" fill="#fff"/></svg>',
  x: '<svg viewBox="0 0 36 36"><text x="18" y="27" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#fff">X</text></svg>',
  wa: '<svg viewBox="0 0 36 36"><path d="M18 6c6.6 0 12 5 12 11.2S24.6 28.4 18 28.4c-1.6 0-3-.3-4.4-.8L7 30l1.9-5.6A10.8 10.8 0 016 17.2C6 11 11.4 6 18 6z" fill="#fff"/><path d="M14.2 12.6c.4 0 .7.2.9.6l1 2.2c.1.3 0 .7-.2.9l-.8.9a8 8 0 003.8 3.6l.9-.9c.3-.2.6-.3.9-.1l2.2 1c.4.2.6.6.5 1l-.2.8c-.3.9-1.2 1.5-2.2 1.4-4.4-.6-8-4.1-8.7-8.5-.1-1 .5-1.9 1.4-2.2z" fill="#25d366"/></svg>',
  photos: '<svg viewBox="0 0 36 36"><rect x="6" y="8" width="24" height="20" rx="4" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="13" cy="14.5" r="2.5" fill="#fff"/><path d="M7.5 25l7-7 5 5 3-3 6 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>',
  files: '<svg viewBox="0 0 36 36"><path d="M5 11a3 3 0 013-3h6.5l3 3H28a3 3 0 013 3v12a3 3 0 01-3 3H8a3 3 0 01-3-3z" fill="#1a84ff"/><path d="M5 15h26v11a3 3 0 01-3 3H8a3 3 0 01-3-3z" fill="#4aa3ff"/></svg>',
  notes: '<svg viewBox="0 0 36 36"><rect x="0" y="0" width="36" height="10" fill="#f5c518"/><path d="M7 16h22M7 21h22M7 26h15" stroke="#c7c7cc" stroke-width="1.6"/></svg>',
  settings: '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="6" fill="none" stroke="#fff" stroke-width="3"/><path d="M18 5v5M18 26v5M5 18h5M26 18h5M8.8 8.8l3.5 3.5M23.7 23.7l3.5 3.5M8.8 27.2l3.5-3.5M23.7 12.3l3.5-3.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
  weather: '<svg viewBox="0 0 36 36"><circle cx="14" cy="14" r="5" fill="#ffd60a"/><path d="M12 27a5 5 0 010-10 7 7 0 0113.4 2A4 4 0 0125 27z" fill="#fff"/></svg>',
  calc: '<svg viewBox="0 0 36 36"><circle cx="11" cy="11" r="4" fill="#a5a5a5"/><circle cx="25" cy="11" r="4" fill="#ff9f0a"/><circle cx="11" cy="25" r="4" fill="#a5a5a5"/><circle cx="25" cy="25" r="4" fill="#ff9f0a"/></svg>',
  phone: '<svg viewBox="0 0 36 36"><path d="M12.5 7.5c.6 0 1.1.4 1.3.9l1.6 3.8c.2.5.1 1-.3 1.4l-1.6 1.6a14 14 0 006.8 6.8l1.6-1.6c.4-.4.9-.5 1.4-.3l3.8 1.6c.5.2.9.7.9 1.3v3c0 1.1-.9 2-2 2C14.8 28 8 21.2 8 9.5c0-1.1.9-2 2-2z" fill="#fff"/></svg>',
  msgs: '<svg viewBox="0 0 36 36"><path d="M18 7c6.9 0 12 4.4 12 10s-5.1 10-12 10c-1.3 0-2.6-.2-3.8-.5L8 29l1.6-4.6C7.4 22.6 6 20 6 17c0-5.6 5.1-10 12-10z" fill="#fff"/></svg>',
  insta: '<svg viewBox="0 0 36 36"><path d="M18 28s-9-5.6-9-12a5 5 0 019-3 5 5 0 019 3c0 6.4-9 12-9 12z" fill="none" stroke="#fff" stroke-width="2.8" stroke-linejoin="round"/></svg>',
  camera: '<svg viewBox="0 0 36 36"><path d="M13 9l-2 3H8a3 3 0 00-3 3v10a3 3 0 003 3h20a3 3 0 003-3V15a3 3 0 00-3-3h-3l-2-3z" fill="#1c1c1e"/><circle cx="18" cy="20" r="5" fill="none" stroke="#636366" stroke-width="2.4"/></svg>'
};

const apps = [
  { id: 'snap', name: 'سناب شات', bg: '#fffc00', icon: ico.snap, open: 'app-snap' },
  { id: 'tiktok', name: 'تيك توك', bg: '#000', icon: ico.tiktok, open: 'app-tiktok' },
  { id: 'x', name: 'X', bg: '#000', icon: ico.x, open: 'app-x', border: true },
  { id: 'insta', name: 'انستقرام', bg: 'linear-gradient(45deg,#f9a03f,#e1306c 50%,#833ab4)', icon: ico.insta, open: 'app-insta' },
  { id: 'photos', name: 'الصور', bg: 'linear-gradient(135deg,#ff9f0a,#ff375f 45%,#5e5ce6)', icon: ico.photos, open: 'app-photos' },
  { id: 'files', name: 'الملفات', bg: '#fff', icon: ico.files, open: 'app-files' },
  { id: 'notes', name: 'الملاحظات', bg: '#fff', icon: ico.notes, open: 'app-notes', clip: true },
  { id: 'cal', name: 'التقويم', bg: '#fff', cal: true },
  { id: 'weather', name: 'الطقس', bg: 'linear-gradient(180deg,#2f80ed,#56ccf2)', icon: ico.weather, open: 'app-weather' },
  { id: 'calc', name: 'الحاسبة', bg: '#1c1c1e', icon: ico.calc, open: 'app-calc' },
  { id: 'settings', name: 'الإعدادات', bg: '#8e8e93', icon: ico.settings }
];

const dockApps = [
  { id: 'phone', name: 'الهاتف', bg: '#34c759', icon: ico.phone, open: 'app-phone', badge: 14 },
  { id: 'wa', name: 'واتساب', bg: '#25d366', icon: ico.wa, open: 'app-wa', badge: 9 },
  { id: 'msgs', name: 'الرسائل', bg: '#34c759', icon: ico.msgs, open: 'app-sms', badge: 2 },
  { id: 'camera', name: 'الكاميرا', bg: '#e5e5ea', icon: ico.camera, open: 'app-camera' }
];

function iconHTML(a) {
  let inner = a.icon || '';
  if (a.cal) {
    const d = new Date();
    inner = `<small>${d.toLocaleDateString('ar-SA-u-ca-gregory', { weekday: 'long' })}</small><b>${d.getDate()}</b>`;
  }
  const style = `background:${a.bg};${a.border ? 'box-shadow:inset 0 0 0 1px #333;' : ''}${a.clip ? 'overflow:hidden;' : ''}`;
  return `
    <div class="icon" data-id="${a.id}">
      <div class="icon-tile ${a.cal ? 'cal-tile' : ''}" style="${style}">
        ${inner}
        ${a.badge ? `<span class="badge">${a.badge}</span>` : ''}
      </div>
      <span class="icon-label">${a.name}</span>
    </div>`;
}

$('#homeGrid').innerHTML = apps.map(iconHTML).join('');
$('#dock').innerHTML = dockApps.map(iconHTML).join('');

[...apps, ...dockApps].forEach(a => {
  const el = $(`.icon[data-id="${a.id}"]`);
  el.addEventListener('click', () => {
    if (a.open) return openApp(a.open);
    el.classList.remove('wiggle');
    void el.offsetWidth;
    el.classList.add('wiggle');
  });
});

/* ---------- open / close ---------- */

const hooks = {};

function openApp(id) {
  if (currentApp) return;
  const el = document.getElementById(id);
  currentApp = el;
  el.classList.add('open');
  home.classList.add('behind');
  const light = el.classList.contains('light');
  statusbar.classList.toggle('dark', light);
  homeBar.classList.toggle('dark', light);
  if (hooks[id]?.open) hooks[id].open();
}

function closeApp() {
  if (!currentApp) return;
  const id = currentApp.id;
  currentApp.classList.remove('open');
  home.classList.remove('behind');
  statusbar.classList.remove('dark');
  homeBar.classList.remove('dark');
  if (hooks[id]?.close) hooks[id].close();
  currentApp = null;
}

$$('[data-close]').forEach(b => b.addEventListener('click', closeApp));
homeBar.addEventListener('click', () => {
  if (currentApp) closeApp();
  else if (!unlocked) unlock();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if ($('#alert').classList.contains('show')) return hideAlert();
    if ($('#mv').classList.contains('show')) return closeMedia();
    if ($('#viewer').classList.contains('show')) return closeViewer();
    closeApp();
  }
});

/* ---------- face id + alert ---------- */

const faceid = $('#faceid');
let faceBusy = false;

function tryFaceId(failText, done) {
  if (faceBusy) return;
  faceBusy = true;
  $('#faceidText').textContent = 'Face ID';
  faceid.classList.remove('fail');
  faceid.classList.add('show');
  setTimeout(() => {
    faceid.classList.add('fail');
    $('#faceidText').textContent = failText;
  }, 1300);
  setTimeout(() => {
    faceid.classList.remove('show', 'fail');
    faceBusy = false;
    if (done) done();
  }, 2700);
}

function showAlert(title, text) {
  $('#alertTitle').textContent = title;
  $('#alertText').textContent = text;
  $('#alert').classList.add('show');
}
function hideAlert() { $('#alert').classList.remove('show'); }
$('#alertOk').addEventListener('click', hideAlert);

/* ---------- small helpers ---------- */

const playIco = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg>';
const camIco = '<svg viewBox="0 0 24 24"><path d="M9 4l-1.5 2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-3.5L15 4zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" fill="currentColor"/></svg>';

function minsAgo(m) {
  const d = new Date(Date.now() - m * 60000);
  const h = d.getHours();
  return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h < 12 ? 'ص' : 'م'}`;
}

/* ---------- lock / unlock ---------- */

const lockNotifs = [
  { type: 'wa', title: 'كوبرا', text: 'يطلقققون علي الحقني', time: 'منذ 3 س' },
  { type: 'wa', title: 'طارق', text: 'اد مختفي', time: 'منذ 12 د' },
  { type: 'ph', title: 'مكالمة فائتة', text: 'ايجنت ماكس', time: 'منذ 6 د' },
  { type: 'sms', title: 'رقم مجهول', text: 'أمر تكليف سري', time: 'منذ 41 د' },
  { type: 'wa', title: '101', text: 'صورة', img: true, time: 'منذ 1 س' }
];

const nIcons = {
  wa: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1 0-2-.1-2.9-.4L4 20l1.3-3.8A7.6 7.6 0 013 11c0-4.4 4-8 9-8z"/></svg>',
  ph: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>',
  sms: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 4c5 0 9 3.4 9 7.6s-4 7.6-9 7.6c-1 0-2-.1-2.9-.4L4 20.5l1.4-3.6A7.2 7.2 0 013 11.6C3 7.4 7 4 12 4z"/></svg>'
};

$('#lockNotifs').innerHTML = lockNotifs.map(n => `
  <div class="notif">
    <span class="n-ico ${n.type}-i">${nIcons[n.type]}</span>
    <div class="n-body">
      <div class="n-head"><b>${n.title}</b><small>${n.time}</small></div>
      <p class="${n.img ? 'img-line' : ''}">${n.img ? camIco : ''}${n.text}</p>
    </div>
  </div>
`).join('');

let unlocked = false;
let startY = null;

function unlock() {
  if (unlocked) return;
  unlocked = true;
  lock.classList.add('open');
  home.classList.add('show');
  smsBurst();
}

/* sms banners that pile up right after unlocking */

const burstMsgs = [
  ['رقم مجهول', 'فيه قرار جاي القبض على رتبة عليا في الداخلية ومراقبته'],
  ['رقم مجهول', 'صورة'],
  ['+1 (213) 555-0198', 'فيديو'],
  ['طارق', 'لكن في موضوع أبيك فيه'],
  ['طارق', '(480) 164-4233 tried to call you but you didn\'t answer'],
  ['طارق', 'أنا في الدور 491 شقة رقم 701'],
  ['طارق', '(480) 164-4233 tried to call you but you didn\'t answer'],
  ['طارق', '(480) 164-4233 tried to call you but you didn\'t answer']
];

const bursts = $('#bursts');
let burstTimers = [];

function clearBursts() {
  burstTimers.forEach(clearTimeout);
  burstTimers = [];
  bursts.innerHTML = '';
}

function smsBurst() {
  clearBursts();
  burstMsgs.forEach(([who, text], i) => {
    burstTimers.push(setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'notif burst';
      el.innerHTML = `
        <span class="n-ico sms-i">${nIcons.sms}</span>
        <div class="n-body">
          <div class="n-head"><b>${who}</b><small>الآن</small></div>
          <p dir="auto">${text}</p>
        </div>`;
      el.addEventListener('click', () => { clearBursts(); openApp('app-sms'); });
      bursts.prepend(el);
      while (bursts.children.length > 4) bursts.lastChild.remove();
    }, 500 + i * 260));
  });
  burstTimers.push(setTimeout(() => {
    $$('.burst', bursts).forEach(b => b.classList.add('out'));
    burstTimers.push(setTimeout(() => bursts.innerHTML = '', 400));
  }, 500 + burstMsgs.length * 260 + 2600));
}

/* side button locks the phone again */

function lockPhone() {
  clearBursts();
  if ($('#mv').classList.contains('show')) closeMedia();
  hideAlert();
  closeApp();
  home.classList.remove('show');
  lock.classList.remove('open');
  unlocked = false;
}

$('#powerBtn').addEventListener('click', () => { if (unlocked) lockPhone(); else unlock(); });

lock.addEventListener('click', unlock);
lock.addEventListener('touchstart', e => startY = e.touches[0].clientY, { passive: true });
lock.addEventListener('touchend', e => {
  if (startY !== null && startY - e.changedTouches[0].clientY > 40) unlock();
  startY = null;
});

/* ---------- media viewer (docs, images, video, audio) ---------- */

const mv = $('#mv');
const mvStage = $('#mvStage');
let mvList = [];
let mvIndex = 0;
let audioEl = null;

function fmtTime(s) {
  s = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function waveBars(seed) {
  let x = seed * 9301 + 49297;
  return Array.from({ length: 46 }, () => {
    x = (x * 9301 + 49297) % 233280;
    return 8 + Math.round(x / 233280 * 36);
  });
}

function showMedia(i) {
  if (audioEl) { audioEl.pause(); audioEl = null; }
  mvIndex = (i + mvList.length) % mvList.length;
  const m = mvList[mvIndex];
  mvStage.classList.remove('zoomed');
  $('#mvTitle').textContent = m.name || '';
  $('#mvN').textContent = mvList.length > 1 ? `${mvIndex + 1}/${mvList.length}` : '';
  $('#mvArrows').style.display = mvList.length > 1 ? '' : 'none';
  $('#mvHint').textContent = '';

  if (m.kind === 'video') {
    mvStage.innerHTML = `<video src="${m.src}" controls autoplay playsinline></video>`;
  } else if (m.kind === 'audio') {
    const bars = waveBars(m.src.length + mvIndex);
    mvStage.innerHTML = `
      <div class="player">
        <div class="player-art"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="#ff9f0a" stroke-width="1.6"/><path d="M5 11a7 7 0 0014 0M12 18v3" fill="none" stroke="#ff9f0a" stroke-width="1.6" stroke-linecap="round"/></svg></div>
        <h3>${m.name}</h3>
        <p>تسجيل صوتي</p>
        <div class="wave" id="wave">${bars.map(h => `<i style="height:${h}px"></i>`).join('')}</div>
        <div class="player-times"><span id="pCur">0:00</span><span id="pDur">${m.dur || ''}</span></div>
        <button class="player-btn" id="pBtn"></button>
      </div>`;
    audioEl = new Audio(m.src);
    const btn = $('#pBtn');
    const pauseSvg = '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" fill="#000"/><rect x="14" y="5" width="4" height="14" rx="1" fill="#000"/></svg>';
    const playSvg = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#000"/></svg>';
    const a = audioEl;
    btn.innerHTML = playSvg;
    btn.onclick = () => { a.paused ? a.play() : a.pause(); };
    a.onplay = () => btn.innerHTML = pauseSvg;
    a.onpause = () => btn.innerHTML = playSvg;
    a.onloadedmetadata = () => $('#pDur').textContent = fmtTime(a.duration);
    a.ontimeupdate = () => {
      if (a !== audioEl) return;
      $('#pCur').textContent = fmtTime(a.currentTime);
      const on = Math.round(a.currentTime / (a.duration || 1) * bars.length);
      $$('#wave i').forEach((b, k) => b.classList.toggle('on', k < on));
    };
    $('#wave').onclick = e => {
      const r = e.currentTarget.getBoundingClientRect();
      if (a.duration) a.currentTime = (e.clientX - r.left) / r.width * a.duration;
    };
    a.play().catch(() => {});
  } else {
    mvStage.innerHTML = `<img src="${m.src}" alt="">`;
    $('#mvHint').textContent = m.doc ? 'اضغط على الصورة للتكبير' : '';
    $('img', mvStage).onclick = () => mvStage.classList.toggle('zoomed');
  }
}

function openMedia(list, i = 0) {
  mvList = list;
  mv.classList.add('show');
  showMedia(i);
}

function closeMedia() {
  if (audioEl) { audioEl.pause(); audioEl = null; }
  mvStage.innerHTML = '';
  mv.classList.remove('show');
}

$('#mvClose').addEventListener('click', closeMedia);
$('#mvNext').addEventListener('click', () => showMedia(mvIndex + 1));
$('#mvPrev').addEventListener('click', () => showMedia(mvIndex - 1));

/* ---------- x ---------- */

const verified = '<svg viewBox="0 0 24 24" class="tw-ver"><path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1.1 3 1.1 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1-2.8-1.6 1.1-3-1.1-3 2.8-1.6.9-3.1 3.2.3z" fill="#1d9bf0"/><path d="M8 12l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>';

const tweets = [
  { text: 'مافي مشكلة', img: 'img/album/20.jpg', time: '3 س', stats: [41, 18, 402, 9] },
  { text: 'الولاية في أمان', img: 'img/album/18.jpg', time: '2 ي', stats: [27, 11, 288, 14] }
];

const twIcons = [
  '<svg viewBox="0 0 24 24"><path d="M4 11a7 7 0 017-7h2a7 7 0 010 14h-2l-5 3v-4.2A7 7 0 014 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M5 9l3-3 3 3M8 6v9a2 2 0 002 2h4M19 15l-3 3-3-3M16 18V9a2 2 0 00-2-2h-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-4.2-6 4.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
];

$('#xFeed').innerHTML = `
  <div class="x-prof">
    <div class="x-banner"></div>
    <img class="av" src="img/x/avatar.jpg" alt="">
    <h2>Dimitri Restova ${verified}</h2>
    <div class="handle">@dimitri_restova</div>
    <div class="stats"><span><b>48</b> يتابع</span><span><b>6,203</b> متابع</span></div>
  </div>
` + tweets.map((t, i) => `
  <article class="tweet">
    <div class="tw-user">
      <img src="img/x/avatar.jpg" alt="">
      <div class="tw-names">
        <b>Dimitri Restova ${verified}</b>
        <small>@dimitri_restova · <span class="tw-time">${t.time}</span></small>
      </div>
    </div>
    <div class="tw-text">${t.text}</div>
    <div class="tw-media" data-i="${i}"><img src="${t.img}" alt=""></div>
    <div class="tw-actions">
      ${t.stats.map((n, k) => `<span>${twIcons[k]}${n}</span>`).join('')}
    </div>
  </article>
`).join('');

$$('#xFeed .tw-media').forEach(el => el.addEventListener('click', () => {
  openMedia(tweets.map(t => ({ src: t.img })), +el.dataset.i);
}));

/* ---------- whatsapp ---------- */

const ticks = '<svg viewBox="0 0 18 11"><path d="M1 6l3 3 6-7M7 9l1 1 7-8" fill="none" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const groupIco = '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" fill="#cfd8dc"/><path d="M2 19c0-3.5 3-6 7-6s7 2.5 7 6z" fill="#cfd8dc"/><circle cx="17" cy="9" r="2.8" fill="#cfd8dc"/><path d="M15.5 13.2c3.6-.4 6.5 1.8 6.5 5.8h-4.4c0-2.3-.8-4.3-2.1-5.8z" fill="#cfd8dc"/></svg>';
const personIco = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4" fill="#cfd8dc"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" fill="#cfd8dc"/></svg>';
const photoIco = '<svg viewBox="0 0 24 24"><path d="M9 4l-1.5 2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-3.5L15 4zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" fill="#8696a0"/></svg>';
const blockedNote = 'لقد حظرت جهة الاتصال هذه. اضغط لإلغاء الحظر.';

const senderColors = {
  'ايجنت ماكس': '#ff7b7b',
  'كوبرا': '#ffd279'
};

const chats = [
  {
    id: 'tarek', name: 'طارق', color: '#2f6f8f',
    preview: 'اد مختفي', time: minsAgo(12), unread: 4,
    sub: 'آخر ظهور اليوم',
    msgs: [
      { day: 'أغسطس' },
      { img: 'img/tarek-aug.jpg', at: '12:58 ص' },
      { t: 'أنا والله الصراحة هذولا الاثنين ما عاجبيني، هذولا معك؟', at: '12:58 ص' },
      { me: 1, t: 'كوبرا أعرفه بس ما أهتم', at: '1:01 ص' },
      { t: 'طيب والثاني هذا؟', at: '1:01 ص' },
      { me: 1, t: 'أول مرة أشوفه', at: '1:02 ص' },
      { me: 1, t: 'بالنسبة لهم حالياً هذولا موضوعهم ما هو أكبر همي', at: '1:02 ص' },
      { me: 1, t: 'لكن أنا عندي مشكلة', at: '1:02 ص' },
      { t: 'وش هي؟', at: '1:03 ص' },
      { me: 1, t: 'اد', at: '1:03 ص' },
      { t: 'وش فيه؟', at: '1:03 ص' },
      { me: 1, t: 'واضح لي إنه مو موجود، واضح لي إنه ميت', at: '1:04 ص' },
      { me: 1, t: 'بس هذا اللي أنا متأكد منه', at: '1:04 ص' },
      { t: 'طيب تبغى تخش في الموضوع هنا مع هذولا؟', at: '1:05 ص' },
      { me: 1, t: 'خلها بيني وبينك، مكان… تعرف أنت المكان', at: '1:05 ص' },
      { t: 'ما عليك، وأنا خلني مع هذولا', at: '1:06 ص' },
      { me: 1, t: 'خلاص أبد', at: '1:06 ص' },
      { day: 'أمس' },
      { img: 'img/order2.jpg', at: '9:12 م' },
      { t: 'تكملة الملف، يظهر لنا اربع اماكن', at: '9:12 م' },
      { t: 'لو صار اي زعزعه داخل الولايه بيتم تأخير هذي المهمه', at: '9:13 م' },
      { t: 'بس كيف المكتب الفدرالي يدري ان عندك مهمه من جهه برا الولايه، وفي نفس الوقت يجينا من داخل الولايه مهمه قبض على رتبه عليا؟', at: '9:14 م' },
      { me: 1, t: 'عشان كذا متعب لازم يتراقب', at: '9:20 م' },
      { t: 'ليش وش صار', at: '9:20 م' },
      { me: 1, t: 'آخر مره قابلته قال لي عندي 14 يوم', at: '9:21 م' },
      { me: 1, t: 'وما وضح 14 يوم لايش', at: '9:21 م' },
      { me: 1, t: 'وفيه شكوك عليه من قبل', at: '9:21 م' },
      { t: 'انا كنت بكلمك بموضوعه اصلا', at: '9:23 م' },
      { t: 'لازم تكون موجود بنفسك، متعب ما يدخل المهمه الثانيه', at: '9:23 م' },
      { t: 'المهمه اللي ماسكها واللي يسويه فيها ماهو نظيف', at: '9:24 م' },
      { t: 'ولا صافي', at: '9:24 م' },
      { me: 1, t: 'متعب يستغل المنصب الفدرالي عشان اهدافه الشخصيه', at: '9:26 م' },
      { me: 1, t: 'وللحين ما نعرف وش هي اهدافه', at: '9:26 م' },
      { t: 'طيب وش نسوي', at: '9:27 م' },
      { me: 1, t: 'مافي مشكلة. خلك عليه ولا تحسسه بشي', at: '9:30 م' },
      { day: 'اليوم' },
      { t: 'الجريمه حصلت في تاريخ 8-31 انا قلت لكوبرا يحط التاريخ', at: '12:20 ص' },
      { t: 'يغيره', at: '12:20 ص' },
      { t: 'السوات ماكانو فيه اصلا عشان تسهل خروج فواز', at: '12:21 ص' },
      { t: 'اد مختفي', at: minsAgo(12) }
    ]
  },
  {
    id: 'cobra', name: 'كوبرا', blocked: true,
    preview: 'أنت: مافي مشكله', time: '2:14 ص',
    msgs: [
      { day: 'اليوم' },
      { t: 'الحقني بموت', at: '1:41 ص' },
      { t: 'يتتبعوني ترا', at: '1:41 ص' },
      { t: 'عرفو مكاني ساعدني', at: '1:41 ص' },
      { t: 'سسسساعدني', at: '1:42 ص' },
      { t: 'انا وليون نايمين بين الجبال تعال لنا', at: '1:42 ص' },
      { t: 'يطلقققون علي الحقني', at: '1:42 ص' },
      { me: 1, t: 'بشوف الموضوع', at: '2:14 ص' },
      { me: 1, t: 'مافي مشكله', at: '2:14 ص' },
      { sys: blockedNote }
    ]
  },
  {
    id: '101', name: '101', color: '#5b5b5b',
    preview: 'photo', time: minsAgo(64),
    sub: 'آخر ظهور اليوم',
    msgs: [
      { day: 'اليوم' },
      { img: 'img/from101.jpg', at: minsAgo(64) }
    ]
  },
  {
    id: 'fib', name: 'قروب FIB', group: true,
    preview: 'ايجنت ماكس: ياخي والله انك كسول حسبي الله على اد', time: 'أمس',
    sub: 'ماكس، كوبرا، اد، ليون كندي، ايجنت دانيال، ايجنت ناس، أنت',
    msgs: [
      { day: 'أمس' },
      { me: 1, t: 'مافي مشكلة', at: '11:31 م' },
      { from: 'ايجنت ماكس', t: 'حسبي الله عليك يا اد ليش جبته', at: '11:40 م' },
      { from: 'ايجنت ماكس', t: 'كوبرا وش سويت اليوم', at: '11:40 م' },
      { from: 'ايجنت ماكس', t: 'يا كوبرا', at: '11:42 م' },
      { from: 'كوبرا', t: 'سم', at: '11:44 م' },
      { from: 'ايجنت ماكس', t: 'انت عندك مشكلة في انك تسوي تقارير', at: '11:45 م' },
      { from: 'كوبرا', t: 'مو انا اللي مسويه', at: '11:46 م' },
      { from: 'كوبرا', t: 'ولا انا اللي ماسح البصمات', at: '11:46 م' },
      { from: 'ايجنت ماكس', t: 'ياخي انت شخص ف FIB عين اي شخص', at: '11:48 م' },
      { from: 'ايجنت ماكس', t: 'ياخي والله انك كسول حسبي الله على اد', at: '11:48 م' }
    ]
  },
  {
    id: 'leon', name: 'ليون كندي', blocked: true,
    preview: 'السلام عليكم', time: 'أمس',
    msgs: [
      { day: 'أمس' },
      { t: 'السلام عليكم', at: '6:12 م' },
      { sys: blockedNote }
    ]
  },
  {
    id: 'metab', name: 'ايجنت متعب', color: '#b5542f',
    preview: 'اسال عنه', time: 'السبت',
    sub: 'آخر ظهور السبت',
    msgs: [
      { day: 'السبت' },
      { t: 'ديمتري', at: '3:07 ص' },
      { t: 'انا انحرق كرتييي', at: '3:07 ص' },
      { t: 'فوازززز احرق كرتي', at: '3:08 ص' },
      { t: 'انا انتهيت', at: '3:08 ص' },
      { t: 'انا انتهيت', at: '3:08 ص' },
      { t: 'اذا اختفيت 14 يوم اسال عن الليموني', at: '3:09 ص' },
      { t: 'اسال عنه', at: '3:09 ص' }
    ]
  },
  {
    id: 'ahmad', name: 'احمد عسيري', color: '#3d6b4a',
    preview: 'أنت: لكن على كلام متعب، فواز ارتكب حماقة او شي، وما عاد ندري عن الموضوع', time: 'الجمعة',
    sub: 'آخر ظهور أمس',
    msgs: [
      { day: 'الجمعة' },
      { t: 'وش السالفه؟', at: '10:14 م' },
      { t: 'وليش فواز اعدم متعب؟', at: '10:14 م' },
      { me: 1, t: 'متعب اخذ فواز معه تحت جناح السيد، مثل ما يقول', at: '10:16 م' },
      { me: 1, t: 'وبعدها فواز سبب له مشاكل، ومتعب طلّع فواز من الموقف اللي هو فيه', at: '10:16 م' },
      { me: 1, t: 'لكن اللي راح ضحية هالموضوع متعب', at: '10:17 م' },
      { me: 1, t: 'من بعدها متعب صار شخص ثاني. ألقيت القبض عليه ومسكته', at: '10:17 م' },
      { me: 1, t: 'لكن كان فيه خلايا نايمة كثيرة قدر يزرعها في ذيك الفترة، لأنهم تملكوه بالكامل', at: '10:18 م' },
      { me: 1, t: 'ما ادري وش الشي اللي كانوا ماسكينه عليه، لكن تملكوه كشخص كامل', at: '10:18 م' },
      { me: 1, t: 'ومتعب كان يقول اذا ما لقيتوني، ابحثوا عن واحد اسمه الليموني', at: '10:19 م' },
      { t: 'ايش الليموني؟', at: '10:19 م' },
      { me: 1, t: 'ايه، قال ابحثوا عن واحد اسمه الليموني، واختفى', at: '10:20 م' },
      { me: 1, t: 'لين جا اليوم اللي جا فيه متعب وألقى القبض على فواز، وانت تتذكر يوم تقابلنا وصارت هالأحداث كلها', at: '10:21 م' },
      { me: 1, t: 'لين ذيك الفترة متعب كان طرف خير', at: '10:21 م' },
      { me: 1, t: 'حتى يوم كنت اقول لك يا تي زيرو ان الموضوع عندي وانا بتعامل معه، لأن متعب كان متغلغل فيه', at: '10:22 م' },
      { me: 1, t: 'لكن على كلام متعب، فواز ارتكب حماقة او شي، وما عاد ندري عن الموضوع', at: '10:23 م' }
    ]
  },
  {
    id: 'martin', name: 'النقيب مارتن', color: '#4a5a8a',
    preview: 'أنت: نعم عندي، لأني كنت في فتره من الفترات عندكم وفي ارضكم. اكيد بيكون عندي معلومات عن ناس كثير', time: 'الخميس',
    sub: 'آخر ظهور الخميس',
    msgs: [
      { day: 'الخميس' },
      { t: 'معاليكم الكريم، انت اليوم تعرف اني ذكرت لك', at: '4:30 م' },
      { me: 1, t: 'وش التقارير الواضحه لكم؟', at: '4:31 م' },
      { t: 'واضح لي انه هو اللي اطلق النار', at: '4:31 م' },
      { me: 1, t: 'وش التقارير الواضحه لكم؟ اي تقارير؟', at: '4:32 م' },
      { t: 'مثل ما ذكرت لك، هو اللي اطلق النار', at: '4:32 م' },
      { me: 1, t: 'هو اللي اطلق النار؟', at: '4:33 م' },
      { t: 'ايه', at: '4:33 م' },
      { me: 1, t: 'كيف عندك معلومات زي كذا يا مارتن؟', at: '4:34 م' },
      { t: 'زي ما انت معاليكم الكريم قبل شوي ذكرت ان عندك معلومات عن المدعو ترافس، اكيد احنا عندنا برضو', at: '4:35 م' },
      { me: 1, t: 'نعم عندي، لأني كنت في فتره من الفترات عندكم وفي ارضكم. اكيد بيكون عندي معلومات عن ناس كثير', at: '4:36 م' }
    ]
  },
  {
    id: 'max', name: 'ايجنت ماكس', color: '#8a3a3a',
    preview: 'ترا هذا كله مردود سلبي علينا', time: 'يوليو',
    sub: 'آخر ظهور اليوم',
    msgs: [
      { day: 'يوليو' },
      { img: 'img/max-july.jpg', at: '11:52 م' },
      { t: 'مستمتع جدا', at: '11:52 م' },
      { t: 'بس خاطري كلام', at: '11:58 م' },
      { t: 'يوم ما فتحت باب الروسية في الجزيرة صرت مجنون', at: '11:58 م' },
      { t: 'أنا أقولها لك بصريح العبارة، بعيد عن الرتب اللي بيني وبينك', at: '11:59 م' },
      { t: 'أنت تعرف أنا إيش كنت معك قبل ما نصير نظام فيدرالي', at: '11:59 م' },
      { t: 'أنت صاير داج بما تعنيه الكلمة', at: '12:00 ص' },
      { t: 'جبت علينا أسئلة كثير بلا أجوبة. كل يومين ثلاث متاهة جديدة', at: '12:00 ص' },
      { t: 'قاعدين ندخل في جدار، كله عشان هدف واحد كنت تبغاه في الجزيرة', at: '12:01 ص' },
      { t: 'إلى يومك هذا وأنت ماشي على نفس الطريق، ما قاعد تفكر ولا قاعد تاخذ خيار صحيح', at: '12:01 ص' },
      { me: 1, t: 'انت تغلط', at: '12:02 ص' },
      { t: 'ترا هذا كله مردود سلبي علينا', at: '12:02 ص' }
    ]
  },
  {
    id: 'alpha', name: 'الفا الكساندر ماهون', color: '#2b2b2b',
    preview: 'تسلم يدينك، خلهم عندي والأمور طيبة. فيه تجارب كثيرة نقصتنا عينات نحتاجهم فيها', time: 'منذ سنة',
    sub: 'آخر ظهور منذ مدة طويلة',
    msgs: [
      { day: '22 نوفمبر 2025' },
      { me: 1, t: 'يعني قاعدين يعملون على الخطوط، يتأكدون من كل شي يمشي بأجمل صورة ممكنة، بنسبة أغلاط 0%. هو اللي قاعد يصير حاليا', at: '1:12 ص' },
      { t: 'طيب الأشخاص اللي ينفذون الأوامر هل تضمن أنهم ما يسربون معلومات؟', at: '1:13 ص' },
      { me: 1, t: 'والله خلني أكون معك واضح وبسيط جدا، هذول أشخاص ينضبطون أو الدنيا تكذب عليهم، لكن هم حاليا عندهم توجيهات معينة. في حال إنه في حاجة نتعامل معهم بطريقة ثانية', at: '1:14 ص' },
      { me: 1, t: 'طيب، ارتاح من هذي الناحية تمام الراحة', at: '1:14 ص' },
      { t: 'بس الموضوع حساس ترى جدا جدا جدا، لو تسرب يشغلني بالفترة القادمة', at: '1:15 ص' },
      { t: 'الضيف اللي بيجيني غالبا ما هو ضيف، لأنه بيجي مغطى وجهه. هو أحد القادات السبيدية، بقدم له عرض مفيد له ومفيد لي', at: '1:16 ص' },
      { t: 'لو تسرب هذا العلم ممكن يضر الشخص قبل ما يضرني، لأنك عارف بنظر وزارة الداخلية ألفا يعتبر فاسد. غالبا بيتجنبوني وأتجنبهم، ولما يدرون إن أحد قاداتهم عندي ممكن يضرونه لأنه يتعامل مع فاسد', at: '1:17 ص' },
      { t: 'أما من ناحيتي أنا ممكن يزعلون لأني أحاول آخذ من عندهم عضو. وأنا ماني قاعد آخذ عضو، أنا أنفذ خطة أحتاجها لحماية هذي الولاية', at: '1:18 ص' },
      { me: 1, t: 'ما في شي. الشخص هذا أنا أعرفه يا ألفا', at: '1:19 ص' },
      { me: 1, t: 'أظن إنه قد جاكم، بتأكد وأنا أتذكر', at: '1:19 ص' },
      { t: 'هو واحد من اللي جونا. جانا عبدالصمد القرشي', at: '1:20 ص' },
      { t: 'ما أدري إذا عندك نظرة معينة تجاه هذا الشخص أو فكرة', at: '1:20 ص' },
      { me: 1, t: 'والله فيه أشياء أعرفها عشان أكون معك صادق، لكن ما أبي أخلط كل شي ببعض', at: '1:21 ص' },
      { t: 'لا عادي شاركني. إذا في بالك أشياء أو فكرة تبي توصلها ما في مشكلة، شاركني', at: '1:22 ص' },
      { me: 1, t: 'بشكل مختصر هو مطلوب عندنا في ملفات، قضايا، جثث. كلها إذا وصلنا الخطوط ببعض توصل لنفس الشخص اللي قاعد تتكلم عنه الحين', at: '1:23 ص' },
      { me: 1, t: 'المواضيع الثانية والجانبية نتكلم فيها وقت ثاني، لين ما ترجع لأمورك وتصير رؤيتك واضحة. الحين خلنا نركز على الشي اللي حنا عليه', at: '1:24 ص' },
      { t: 'اليوم اللي يقرب، تأكد من تواجده في الولاية، ومباشرة بنرسل الأشخاص يجيبونه مغطى وجهه', at: '1:25 ص' },
      { t: 'اللي أحتاجه منك، تطلب الشباب أو أبلغهم أنا يعطونك لبس مرتب للـ CIA، وتحضر الجلسة كاملة من البداية. أنت واحد منا ولا في شك', at: '1:26 ص' },
      { t: 'وإذا بتدخل الاثنين اللي معك وما تضمن إنهم بيكتمون السر، يا تفنشهم بعد ما نخلص، يا ترسلهم الحين في أي مهمة في الولاية', at: '1:27 ص' },
      { me: 1, t: 'ما في إشكالية، بتعامل معهم بطريقتي', at: '1:28 ص' },
      { me: 1, t: 'بس عشان أكون معك صادق، ماني مخطط أرجع معي إلا 4 أشخاص اللي شفتهم، هم بس. الباقين يا ألفا أنت تعرف', at: '1:29 ص' },
      { me: 1, t: 'عمل مثل اللي نقوم فيه ما ينفع تطلع منه معلومة في العلن، وحنا في غنى عن هذي الأشياء', at: '1:29 ص' },
      { me: 1, t: 'لذلك قلت لك عندنا 4 أشخاص، وأنا الخامس، هذي أماكننا. أما الباقين تسلم، يكونون ضيوف عندك', at: '1:30 ص' },
      { t: 'تسلم يدينك، خلهم عندي والأمور طيبة. فيه تجارب كثيرة نقصتنا عينات نحتاجهم فيها', at: '1:31 ص' }
    ]
  }
];

function avatar(c, id) {
  const idAttr = id ? ` id="${id}"` : '';
  if (c.group) return `<span class="wa-av"${idAttr} style="background:#6a7175">${groupIco}</span>`;
  if (c.blocked || /^\d/.test(c.name)) return `<span class="wa-av"${idAttr} style="background:#6a7175">${personIco}</span>`;
  return `<span class="wa-av"${idAttr} style="background:${c.color}">${c.name.replace('ايجنت ', '').replace('النقيب ', '').replace('الفا ', '').charAt(0)}</span>`;
}

$('#waRows').innerHTML = chats.map(c => `
  <div class="wa-row" data-chat="${c.id}">
    ${avatar(c)}
    <div class="wa-row-body">
      <div class="wa-row-top"><b>${c.name}</b><small class="${c.unread ? 'new' : ''}">${c.time}</small></div>
      <div class="wa-row-bot">
        <p>${c.preview === 'photo' ? photoIco + 'صورة' : c.preview}</p>
        ${c.unread ? `<span class="wa-unread">${c.unread}</span>` : ''}
      </div>
    </div>
  </div>
`).join('');

const wa = $('#app-wa');
const waChat = $('#waChat');

function openChat(c) {
  $('#waChatAv').outerHTML = avatar(c, 'waChatAv');
  $('#waChatName').textContent = c.name;
  $('#waChatSub').textContent = c.sub || '';
  waChat.classList.toggle('blocked', !!c.blocked);

  const imgs = c.msgs.filter(m => m.img).map(m => ({ src: m.img }));
  let last = null;
  $('#waMsgs').innerHTML = c.msgs.map(m => {
    if (m.day) { last = null; return `<div class="wa-day">${m.day}</div>`; }
    if (m.sys) return `<div class="wa-sys">${m.sys}</div>`;
    const who = m.me ? 'me' : (m.from || 'them');
    const first = who !== last;
    last = who;
    const name = c.group && !m.me && first ? `<span class="who" style="color:${senderColors[m.from] || '#53bdeb'}">${m.from}</span>` : '';
    const meta = `<span class="meta">${m.at}${m.me ? ticks : ''}</span>`;
    if (m.img) {
      const k = imgs.findIndex(x => x.src === m.img);
      return `<div class="bub media ${m.me ? 'out' : 'in'} ${first ? 'first' : ''}">${name}<img src="${m.img}" alt="" data-k="${k}">${meta}</div>`;
    }
    return `<div class="bub ${m.me ? 'out' : 'in'} ${first ? 'first' : ''}">${name}${m.t}${meta}</div>`;
  }).join('');

  $$('#waMsgs img[data-k]').forEach(im => im.addEventListener('click', () => openMedia(imgs, +im.dataset.k)));

  wa.classList.add('in-chat');
  const box = $('#waMsgs');
  box.scrollTop = box.scrollHeight;
  $$('img', box).forEach(im => im.addEventListener('load', () => box.scrollTop = box.scrollHeight, { once: true }));
}

$$('.wa-row').forEach(row => row.addEventListener('click', () => {
  openChat(chats.find(x => x.id === row.dataset.chat));
}));

$('#waBack').addEventListener('click', () => wa.classList.remove('in-chat'));
$('#waBlocked').addEventListener('click', () => {
  showAlert('إلغاء الحظر', 'لا يمكن إلغاء الحظر إلا من صاحب الجوال.');
});

hooks['app-wa'] = { close() { wa.classList.remove('in-chat'); } };

/* ---------- messages (sms) ---------- */

const autoCall = '<a>(480) 164-4233</a> tried to call you but you didn\'t answer, press the number to call back';

const threads = [
  {
    id: 'unknown1', name: 'رقم مجهول', time: minsAgo(41),
    preview: 'صورة',
    msgs: [
      { day: 'اليوم ' + minsAgo(42) },
      { t: 'فيه قرار جاي القبض على رتبة عليا في الداخلية ومراقبته' },
      { img: 'img/order.jpg', name: 'أمر تكليف سري' }
    ]
  },
  {
    id: 'unknown2', name: '+1 (213) 555-0198', time: 'أمس',
    preview: 'فيديو',
    msgs: [
      { day: 'أمس 3:02 ص' },
      { video: 'ed.mp4', poster: 'img/ed-poster.jpg', dur: '2:57', name: 'تسجيل' }
    ]
  },
  {
    id: 'tarek-sms', name: 'طارق', time: 'أغسطس',
    preview: 'tried to call you but you didn\'t answer',
    msgs: [
      { day: 'أغسطس' },
      { t: 'لكن في موضوع أبيك فيه' },
      { auto: 1 },
      { t: 'أنا في الدور 491 شقة رقم 701. انتظرك لين تشوف وش النهاية معهم' },
      { auto: 1 },
      { auto: 1 },
      { auto: 1 }
    ]
  }
];

const smsApp = $('#app-sms');

function smsAvatar(th) {
  return th.name.startsWith('+') || th.name === 'رقم مجهول' ? personIco : th.name.charAt(0);
}

$('#smsRows').innerHTML = threads.map(th => `
  <div class="sms-row" data-id="${th.id}">
    <span class="sms-av">${smsAvatar(th)}</span>
    <div class="sms-row-body">
      <div class="sms-row-top"><b>${th.name}</b><small>${th.time}</small></div>
      <p>${th.preview}</p>
    </div>
  </div>
`).join('');

function openThread(th) {
  $('#smsAv').innerHTML = smsAvatar(th);
  $('#smsName').textContent = th.name;
  $('#smsMsgs').innerHTML = th.msgs.map((m, i) => {
    if (m.day) return `<div class="sms-day">${m.day}</div>`;
    if (m.auto) return `<div class="sb in auto">${autoCall}</div>`;
    if (m.img) return `<div class="sb in media" data-i="${i}"><img src="${m.img}" alt=""></div>`;
    if (m.video) return `<div class="sb in media" data-i="${i}"><div class="vthumb"><img src="${m.poster}" alt="" style="width:100%"><span><i>${playIco}</i></span><small>${m.dur}</small></div></div>`;
    return `<div class="sb ${m.me ? 'out' : 'in'}">${m.t}</div>`;
  }).join('');
  $$('#smsMsgs .sb.media').forEach(el => el.addEventListener('click', () => {
    const m = th.msgs[+el.dataset.i];
    if (m.video) openMedia([{ kind: 'video', src: m.video, name: m.name }]);
    else openMedia([{ src: m.img, name: m.name, doc: true }]);
  }));
  smsApp.classList.add('in-chat');
  const box = $('#smsMsgs');
  box.scrollTop = box.scrollHeight;
  $$('img', box).forEach(im => im.addEventListener('load', () => box.scrollTop = box.scrollHeight, { once: true }));
}

$$('.sms-row').forEach(r => r.addEventListener('click', () => openThread(threads.find(t => t.id === r.dataset.id))));
$('#smsBack').addEventListener('click', () => smsApp.classList.remove('in-chat'));
hooks['app-sms'] = { close() { smsApp.classList.remove('in-chat'); } };

/* ---------- phone ---------- */

const outIco = '<svg viewBox="0 0 24 24"><path d="M8 16L17 7M10 7h7v7" fill="none" stroke="#8e8e93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const infoIco = '<svg viewBox="0 0 24 24" class="c-info"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#0a84ff" stroke-width="1.6"/><path d="M12 11v6" stroke="#0a84ff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.1" fill="#0a84ff"/></svg>';

const calls = [
  { name: 'ايجنت ماكس', missed: true, time: minsAgo(6) },
  { name: 'كوبرا', count: 12, missed: true, time: '1:45 ص' },
  { name: 'طارق', time: '12:24 ص', out: true },
  { name: 'احمد عسيري', time: 'أمس', out: true },
  { name: 'فواز جنازة', time: 'أمس' },
  { name: 'عبدالصمد القرشي', time: 'أمس' },
  { name: 'ليون كندي', count: 2, missed: true, time: 'أمس' },
  { name: 'متعب', time: 'السبت', out: true },
  { name: 'ايجنت دانيال', time: 'السبت' },
  { name: 'ايجنت ناس', time: 'الجمعة', out: true },
  { name: 'فواز جنازة', time: 'الجمعة', out: true },
  { name: 'طارق', count: 4, missed: true, time: 'أغسطس' }
];

$('#callRows').innerHTML = calls.map(c => `
  <div class="c-row ${c.missed ? 'missed' : ''}">
    ${c.out ? outIco : '<svg></svg>'}
    <div class="c-main">
      <div>
        <b>${c.name}${c.count ? ` (${c.count})` : ''}</b>
        <small>جوال</small>
      </div>
      <span class="c-time">${c.time}</span>
      ${infoIco}
    </div>
  </div>
`).join('');

/* ---------- files ---------- */

const folderSvg = '<svg viewBox="0 0 78 62"><path d="M4 10a6 6 0 016-6h16l6 6h36a6 6 0 016 6v36a6 6 0 01-6 6H10a6 6 0 01-6-6z" fill="#2d7ff9"/><path d="M4 20a6 6 0 016-6h58a6 6 0 016 6v32a6 6 0 01-6 6H10a6 6 0 01-6-6z" fill="#56a0ff"/></svg>';
const smallLock = '<svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0110 0v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1zm2 0h6V7a3 3 0 00-6 0z" fill="#2d7ff9"/></svg>';
const micIco = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff"/><path d="M5 11a7 7 0 0014 0M12 18v3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';

const folders = [
  {
    name: 'ملفات المنظمة',
    items: [
      { name: 'عبدالصمد القرشي', src: 'img/files/samad.jpg', doc: true },
      { name: 'متعب العتيبي', src: 'img/files/metab.jpg', doc: true, wide: true },
      { name: 'بكر باكور', src: 'img/files/bakr.jpg', doc: true }
    ]
  },
  {
    name: 'ملفات تكاليف',
    items: [
      { name: 'أمر تكليف سري', src: 'img/files/order1.jpg', doc: true },
      { name: 'أمر تكليف سري - المواقع', src: 'img/files/order2.jpg', doc: true }
    ]
  },
  {
    name: 'تسجيلات المحكمة الفدرالية فواز جنازه',
    items: [
      { name: 'ليون في المحكمة الفدرالية', kind: 'audio', src: 'court1.mp3', dur: '1:44' },
      { name: 'طارق وليون بالمحكمة', kind: 'audio', src: 'court2.mp3', dur: '1:19' },
      { name: 'ديمتري مع ليون', kind: 'audio', src: 'court3.mp3', dur: '1:27' }
    ]
  },
  {
    name: 'تسجيل مكالمة المجانين',
    items: [
      { name: 'فواز يلمح لديمتري انه هو الجنازه', kind: 'audio', src: 'call1.mp3', dur: '1:31' },
      { name: 'ديمتري انجلط منهم', kind: 'audio', src: 'call2.mp3', dur: '2:36' }
    ]
  },
  {
    name: 'ذكريات ديمتري',
    items: [
      { name: 'فلاش باك', kind: 'video', src: 'flashback.mp4', poster: 'img/flashback-poster.jpg', dur: '2:37' }
    ]
  },
  { name: 'الوحدة المغلقة', locked: true, count: '11 عنصر' },
  { name: 'عملية الجزيرة', locked: true, count: '26 عنصر' },
  { name: 'ملف عبدالصمد القرشي', locked: true, count: '8 عناصر' },
  { name: 'الأربعة فقط', locked: true, count: '4 عناصر' },
  { name: 'تحركات متعب', locked: true, count: '19 عنصر' },
  { name: '14 يوم', locked: true, count: '14 عنصر' },
  { name: 'الضيوف', locked: true, count: '6 عناصر' }
];

const looseFiles = [
  { name: 'فصل متعب', src: 'img/files/fasl-metab.jpg', doc: true },
  { name: 'تقرير مجنون الولاية', src: 'img/files/majnoon.jpg', doc: true, wide: true },
  { name: 'مقابلة فيكتور وفسدة FBI', kind: 'audio', src: 'victor.mp3', dur: '2:20' },
  { name: 'لوحة الأدلة', src: 'img/files/board.jpg', doc: true, wide: true }
];

function itemCount(n) {
  if (n === 1) return 'عنصر واحد';
  if (n === 2) return 'عنصران';
  return n <= 10 ? `${n} عناصر` : `${n} عنصر`;
}

function itemHTML(it, i) {
  let thumb;
  if (it.kind === 'audio') thumb = `<div class="doc-thumb audio">${micIco}</div>`;
  else if (it.kind === 'video') thumb = `<div class="doc-thumb video wide" style="background-image:url(${it.poster})"><span>${playIco}</span></div>`;
  else thumb = `<div class="doc-thumb ${it.wide ? 'wide' : ''}" style="background-image:url(${it.src})"></div>`;
  const meta = it.dur ? it.dur : (it.kind ? '' : 'مستند');
  return `<div class="folder doc" data-i="${i}">${thumb}<b>${it.name}</b><small>${meta}</small></div>`;
}

$('#fFolders').innerHTML = folders.map((f, i) => `
  <div class="folder" data-i="${i}">
    <div class="folder-ico">${folderSvg}${f.locked ? `<span class="lk">${smallLock}</span>` : ''}</div>
    <b>${f.name}</b>
    <small>${f.locked ? f.count : itemCount(f.items.length)}</small>
  </div>
`).join('');

$('#fFiles').innerHTML = looseFiles.map(itemHTML).join('');

const filesApp = $('#app-files');

function openItems(list, i) {
  const it = list[i];
  if (it.kind) return openMedia([it]);
  const docs = list.filter(x => !x.kind);
  openMedia(docs, docs.indexOf(it));
}

$$('#fFolders .folder').forEach(el => el.addEventListener('click', () => {
  const f = folders[+el.dataset.i];
  if (f.locked) {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    tryFaceId('تعذّر التحقق من Face ID');
    return;
  }
  $('#fFolderTitle').textContent = f.name;
  $('#fFolderSub').textContent = itemCount(f.items.length);
  $('#fFolderGrid').innerHTML = f.items.map(itemHTML).join('');
  $$('#fFolderGrid .folder').forEach(x => x.addEventListener('click', () => openItems(f.items, +x.dataset.i)));
  $('#fFolder').scrollTop = 0;
  filesApp.classList.add('in-folder');
}));

$$('#fFiles .folder').forEach(el => el.addEventListener('click', () => openItems(looseFiles, +el.dataset.i)));
$('#fBack').addEventListener('click', () => filesApp.classList.remove('in-folder'));
hooks['app-files'] = { close() { filesApp.classList.remove('in-folder'); } };

/* ---------- camera ---------- */

$('#camShutter').addEventListener('click', () => {
  const fl = $('#camFlash');
  fl.classList.remove('go');
  void fl.offsetWidth;
  fl.classList.add('go');
  $('#camThumb').style.backgroundImage = 'url(img/camera.jpg)';
});

/* ---------- instagram ---------- */

const igPosts = Array.from({ length: 9 }, (_, i) => `img/album/${23 + i}.jpg`);

$('#igGrid').innerHTML = igPosts.map((src, i) => `<div class="ig-cell" data-i="${i}" style="background-image:url(${src})"></div>`).join('');
$$('#igGrid .ig-cell').forEach(el => el.addEventListener('click', () => {
  openMedia(igPosts.map(src => ({ src })), +el.dataset.i);
}));

/* ---------- tiktok ---------- */

const ttVideo = $('#ttVideo');
const ttPaused = $('#ttPaused');

hooks['app-tiktok'] = {
  open() {
    ttVideo.currentTime = 0;
    ttVideo.muted = false;
    ttVideo.play().catch(() => {
      ttVideo.muted = true;
      ttVideo.play();
    });
    ttPaused.classList.remove('show');
  },
  close() { ttVideo.pause(); }
};

ttVideo.addEventListener('click', () => {
  if (ttVideo.paused) { ttVideo.play(); ttPaused.classList.remove('show'); }
  else { ttVideo.pause(); ttPaused.classList.add('show'); }
});
ttVideo.addEventListener('timeupdate', () => {
  if (!ttVideo.duration) return;
  $('#ttBar').style.width = (ttVideo.currentTime / ttVideo.duration * 100) + '%';
});

/* ---------- calculator ---------- */

const keys = [
  ['AC', 'fn'], ['±', 'fn'], ['%', 'fn'], ['÷', 'op'],
  ['7'], ['8'], ['9'], ['×', 'op'],
  ['4'], ['5'], ['6'], ['−', 'op'],
  ['1'], ['2'], ['3'], ['+', 'op'],
  ['0', 'zero'], ['.'], ['=', 'op']
];
$('#calcKeys').innerHTML = keys.map(([k, c]) => `<button class="${c || ''}" data-k="${k}">${k}</button>`).join('');

const calc = { cur: '0', prev: null, op: null, fresh: false };
const calcOut = $('#calcOut');

function fmt(n) {
  if (!isFinite(n)) return 'خطأ';
  const r = parseFloat(n.toPrecision(10));
  return Math.abs(r) >= 1e9 ? r.toExponential(4) : r.toLocaleString('en-US', { maximumFractionDigits: 8 });
}

function run(a, b, op) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') return a / b;
  return b;
}

function showCalc() {
  const txt = calc.cur.endsWith('.') ? calc.cur : fmt(parseFloat(calc.cur));
  calcOut.textContent = txt;
  calcOut.style.fontSize = txt.length > 9 ? '54px' : txt.length > 6 ? '66px' : '';
  $$('.calc-keys .op').forEach(b => b.classList.toggle('on', calc.fresh && b.dataset.k === calc.op));
  $('[data-k="AC"]').textContent = calc.cur !== '0' ? 'C' : 'AC';
}

$('#calcKeys').addEventListener('click', e => {
  const k = e.target.dataset.k;
  if (!k) return;
  if (/^[0-9]$/.test(k)) {
    if (calc.fresh || calc.cur === '0') calc.cur = k;
    else if (calc.cur.replace(/[-.]/g, '').length < 9) calc.cur += k;
    calc.fresh = false;
  } else if (k === '.') {
    if (calc.fresh) { calc.cur = '0.'; calc.fresh = false; }
    else if (!calc.cur.includes('.')) calc.cur += '.';
  } else if (k === 'AC') {
    if (calc.cur !== '0') calc.cur = '0';
    else { calc.prev = null; calc.op = null; }
    calc.fresh = false;
  } else if (k === '±') {
    calc.cur = calc.cur.startsWith('-') ? calc.cur.slice(1) : (calc.cur === '0' ? '0' : '-' + calc.cur);
  } else if (k === '%') {
    calc.cur = String(parseFloat(calc.cur) / 100);
  } else if (k === '=') {
    if (calc.op !== null) {
      calc.cur = String(run(calc.prev, parseFloat(calc.cur), calc.op));
      calc.prev = null; calc.op = null;
    }
    calc.fresh = true;
  } else {
    if (calc.op !== null && !calc.fresh) calc.cur = String(run(calc.prev, parseFloat(calc.cur), calc.op));
    calc.prev = parseFloat(calc.cur);
    calc.op = k;
    calc.fresh = true;
  }
  showCalc();
});

/* ---------- weather ---------- */

const wIco = {
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffd60a"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="4" fill="#ffd60a"/><path d="M8 19a4 4 0 010-8 5.5 5.5 0 0110.6 1.6A3.3 3.3 0 0118 19z" fill="#fff"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" fill="#e5e5ea"/></svg>',
  cloudy: '<svg viewBox="0 0 24 24"><path d="M7 19a4.5 4.5 0 010-9 6 6 0 0111.5 2A3.5 3.5 0 0118 19z" fill="#fff"/></svg>',
  rain: '<svg viewBox="0 0 24 24"><path d="M7 15a4 4 0 010-8 5.5 5.5 0 0110.6 1.6A3.3 3.3 0 0117 15z" fill="#fff"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke="#64d2ff" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

const nowH = new Date().getHours();
$('#wHours').innerHTML = Array.from({ length: 12 }, (_, i) => {
  const h = (nowH + i) % 24;
  const night = h >= 18 || h < 6;
  const temp = i === 0 ? 24 : Math.round(22 + 6 * Math.sin((h - 9) / 24 * Math.PI * 2));
  const icon = night ? (i % 4 === 1 ? wIco.cloudy : wIco.moon) : (i % 3 === 0 ? wIco.cloud : wIco.sun);
  const label = i === 0 ? 'الآن' : `${h % 12 || 12}${h < 12 ? 'ص' : 'م'}`;
  return `<div class="w-hour"><span>${label}</span>${icon}<span>${temp}°</span></div>`;
}).join('');

const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const forecast = [[17, 29, 'cloud'], [16, 27, 'sun'], [15, 26, 'cloudy'], [14, 24, 'rain'], [15, 25, 'cloud'], [17, 28, 'sun'], [18, 30, 'sun'], [17, 28, 'cloud'], [16, 27, 'cloudy'], [16, 28, 'sun']];
const today = new Date().getDay();
$('#wDays').innerHTML = forecast.map(([lo, hi, ic], i) => `
  <div class="w-day">
    <span>${i === 0 ? 'اليوم' : dayNames[(today + i) % 7]}</span>
    ${wIco[ic]}
    <span class="lo">${lo}°</span>
    <div class="w-bar"><i style="left:${(lo - 12) / 20 * 100}%;right:${100 - (hi - 12) / 20 * 100}%"></i></div>
    <span class="hi">${hi}°</span>
  </div>
`).join('');

/* ---------- photos ---------- */

const photos = [];
for (let i = 1; i <= 31; i++) photos.push({ src: `img/album/${String(i).padStart(2, '0')}.jpg` });

$('#phCount').textContent = `${photos.length} صورة`;
$('#phGrid').innerHTML = photos.map((p, i) => `
  <div class="ph-item" data-i="${i}">
    <img src="${p.src}" alt="" loading="lazy">
    ${p.video ? `<span>${p.dur}</span>` : ''}
  </div>
`).join('');

const viewer = $('#viewer');
const vStage = $('#vStage');
let vIndex = 0;

function showPhoto(i) {
  vIndex = (i + photos.length) % photos.length;
  const p = photos[vIndex];
  vStage.innerHTML = p.video
    ? `<video src="${p.video}" controls autoplay playsinline></video>`
    : `<img src="${p.src}" alt="">`;
  $('#vCount').textContent = `${vIndex + 1} / ${photos.length}`;
}

function closeViewer() {
  viewer.classList.remove('show');
  vStage.innerHTML = '';
}

$$('.ph-item').forEach(el => el.addEventListener('click', () => {
  showPhoto(+el.dataset.i);
  viewer.classList.add('show');
}));
$('#vClose').addEventListener('click', closeViewer);
$('#vNext').addEventListener('click', () => showPhoto(vIndex + 1));
$('#vPrev').addEventListener('click', () => showPhoto(vIndex - 1));

let vx = null;
viewer.addEventListener('touchstart', e => vx = e.touches[0].clientX, { passive: true });
viewer.addEventListener('touchend', e => {
  if (vx === null) return;
  const dx = e.changedTouches[0].clientX - vx;
  if (Math.abs(dx) > 50) showPhoto(vIndex + (dx < 0 ? 1 : -1));
  vx = null;
});

hooks['app-photos'] = { close: closeViewer };


/* ---------- notes ---------- */

const notes = [
  {
    title: 'مافي مشكلة', date: 'اليوم 2:31 ص', short: '2:31 ص',
    text: Array(90).fill('مافي مشكلة').join('\n')
  },
  {
    title: 'فكتور - فواز جنازة - متعب - المنظمة', date: 'أمس 11:02 م', short: 'أمس',
    text: 'فكتور - فواز جنازة - متعب - المنظمة\n\nالجزيرة\n\nفكتور يعرف أكثر من اللي قاله\nفواز.. هو الجنازة؟\nمتعب مع المنظمة من متى؟\nكل الخطوط ترجع للجزيرة\n\nمافي مشكلة\nمافي مشكلة'
  },
  {
    title: 'فضفضة', date: 'الأحد 3:40 ص', short: 'الأحد',
    text: 'بلغتهم لا يطلعون\nهم اصلا ما يدرون اننا مخترقين المسيرات\nواحنا اللي قاعدين نقصفهم\n\nبس ما حد راضي يسمعني\nما حد راضي يفهم علي\nما حد راضي يستوعب كلامي'
  }
];

function notePreview(n) {
  if (n.checks) return n.checks.map(c => c[0]).join('، ');
  const t = n.text.split('\n').filter(Boolean);
  return t.length > 1 ? t[1] : 'لا يوجد نص إضافي';
}

$('#ntRows').innerHTML = notes.map((n, i) => `
  <div class="nt-row" data-i="${i}">
    <b>${n.title}</b>
    <p><span>${n.short}</span>${notePreview(n)}</p>
  </div>
`).join('');
$('#ntCount').textContent = `${notes.length} ملاحظات`;

const notesApp = $('#app-notes');

function openNote(n) {
  let body = `<div class="nt-date">${n.date}</div><h2>${n.title}</h2>`;
  if (n.checks) {
    body += n.checks.map(([t, done]) => `<div class="check ${done ? 'done' : ''}"><i></i><span>${t}</span></div>`).join('');
  } else if (n.text) {
    const lines = n.text.split('\n');
    if (lines[0] === n.title) lines.shift();
    body += `<p>${lines.join('<br>')}</p>`;
  }
  $('#ntBody').innerHTML = body;
  $('#ntBody').scrollTop = 0;
  notesApp.classList.add('in-note');
}

$$('.nt-row').forEach(r => r.addEventListener('click', () => openNote(notes[+r.dataset.i])));
$('#ntBack').addEventListener('click', () => notesApp.classList.remove('in-note'));
hooks['app-notes'] = { close() { notesApp.classList.remove('in-note'); } };
