const opening = document.querySelector('#opening');
const mainContent = document.querySelector('#mainContent');
const introTwo = document.querySelector('#introLineTwo');
const introSub = document.querySelector('#introSub');
const openSurprise = document.querySelector('#openSurprise');
const audio = document.querySelector('#birthdayAudio');
const playButton = document.querySelector('#playButton');
const turnUp = document.querySelector('#turnUp');
const muteButton = document.querySelector('#muteButton');
const progress = document.querySelector('#progress');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
const equalizer = document.querySelector('#equalizer');
const toast = document.querySelector('#toast');
const trackSelect = document.querySelector('#trackSelect');
const trackTitle = document.querySelector('#trackTitle');

setTimeout(() => introTwo.classList.add('show'), 1100);
setTimeout(() => { introSub.classList.add('show'); openSurprise.classList.add('show'); }, 2300);

openSurprise.addEventListener('click', () => {
  opening.classList.add('is-hidden');
  mainContent.removeAttribute('aria-hidden');
  mainContent.classList.add('is-live');
  document.body.classList.add('entered');
  burstConfetti(42);
});

document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' })));

function formatTime(value) {
  if (!Number.isFinite(value)) return '0:00';
  return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
}
function syncAudio() {
  const playing = !audio.paused;
  playButton.textContent = playing ? 'Ⅱ' : '▶';
  playButton.setAttribute('aria-label', playing ? 'Pause birthday music' : 'Play birthday music');
  equalizer.classList.toggle('paused', !playing);
}
async function startMusic() {
  try {
    await audio.play();
    showToast('BIRTHDAY MODE: VOLUME UP 🔥');
  } catch (error) {
    showToast('Add your file at assets/birthday.mp3 to start the track.');
  }
  syncAudio();
}
playButton.addEventListener('click', () => audio.paused ? startMusic() : audio.pause());
turnUp.addEventListener('click', () => { document.querySelector('#music').scrollIntoView({ behavior: 'smooth' }); startMusic(); });
muteButton.addEventListener('click', () => { audio.muted = !audio.muted; muteButton.textContent = audio.muted ? 'MUTE' : 'VOL'; });
audio.addEventListener('play', syncAudio);
audio.addEventListener('pause', syncAudio);
audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => { currentTime.textContent = formatTime(audio.currentTime); progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0; });
progress.addEventListener('input', () => { if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration; });
trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.options[trackSelect.selectedIndex];
  audio.src = `assets/${encodeURIComponent(trackSelect.value)}`;
  trackTitle.innerHTML = `${selectedTrack.textContent} <span>🔥</span>`;
  audio.load();
  startMusic();
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: .14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const message = "Bro, jokes apart, you're genuinely one of the realest people I've got. We've had our share of bakchodi, arguments, laughs and unforgettable moments, and that's exactly what makes this friendship special. Keep doing your thing, keep chasing your goals, and don't ever change the real person you are. Happy Birthday, Uzair. Here's to more madness, more memories and more legendary moments. ❤️🔥";
const typewriter = document.querySelector('#typewriter');
const messageLines = message.match(/.{1,78}(?:\\s|$)/g) || [message];
let typed = false;
const messageObserver = new IntersectionObserver((entries) => { if (entries[0].isIntersecting && !typed) { typed = true; messageLines.forEach((line, index) => { const element = document.createElement('span'); element.className = 'type-line'; element.style.animationDelay = `${index * .55}s`; element.textContent = line.trim(); typewriter.appendChild(element); }); } }, { threshold: .35 });
messageObserver.observe(typewriter);

document.querySelectorAll('.starter-card').forEach((card) => card.addEventListener('click', () => { document.querySelectorAll('.starter-card').forEach((item) => item.classList.remove('active')); card.classList.add('active'); document.querySelector('#diagnostic').innerHTML = `DIAGNOSTIC: ${card.dataset.cardMessage.toUpperCase()} <span>✓</span>`; document.querySelector('#diagnostic').classList.add('is-active'); }));

const modal = document.querySelector('#secretModal');
document.querySelector('#secretButton').addEventListener('click', () => { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); burstConfetti(75); });
document.querySelector('#closeModal').addEventListener('click', () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); });
modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('is-open'); });

document.querySelector('#blowButton').addEventListener('click', () => {
  document.querySelector('.final-section').classList.add('blown');
  document.querySelector('#finalMessage').classList.add('is-visible');
  document.querySelector('#blowButton').disabled = true;
  burstConfetti(130);
  burstBalloons(9);
  startMusic();
  document.querySelector('#finale').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function burstConfetti(amount) {
  const colors = ['#e52b32', '#f4f0eb', '#ffb638', '#7e1b20'];
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty('--x', `${(Math.random() - .5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}
function burstBalloons(amount) {
  for (let index = 0; index < amount; index += 1) {
    const balloon = document.createElement('i');
    balloon.className = 'balloon';
    balloon.style.left = `${5 + Math.random() * 90}vw`;
    balloon.style.background = index % 2 ? '#f4f0eb' : '#e52b32';
    balloon.style.animationDelay = `${Math.random() * .8}s`;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 5000);
  }
}
function showToast(messageText) { toast.textContent = messageText; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3300); }

document.addEventListener('pointermove', (event) => { const glow = document.querySelector('.cursor-glow'); glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });
