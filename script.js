const opening = document.querySelector('#opening');
const mainContent = document.querySelector('#mainContent');
const introTwo = document.querySelector('#introLineTwo');
const introSub = document.querySelector('#introSub');
const openSurprise = document.querySelector('#openSurprise');
const audio = document.querySelector('#birthdayAudio');
const playButton = document.querySelector('#playButton');
const turnUp = document.querySelector('#turnUp');
const muteButton = document.querySelector('#muteButton');
const equalizer = document.querySelector('#equalizer');
const toast = document.querySelector('#toast');
const trackSelect = document.querySelector('#trackSelect');
const trackTitle = document.querySelector('#trackTitle');
const albumArt = document.querySelector('#albumArt');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

const trackList = [
  { value: 'birthday.mp3', label: 'Track 01 - Birthday Mode 🔥' },
  { value: '5-7 - Karan Aujla.mp3', label: 'Track 02 - 5-7 - Karan Aujla' },
  { value: '52 Bars - Karan Aujla.mp3', label: 'Track 03 - 52 Bars - Karan Aujla' },
  { value: 'Arhe So Jhde.mp3', label: 'Track 04 - Arhe So Jhde' },
  { value: 'IDK HOW - Karan Aujla.mp3', label: 'Track 05 - IDK HOW - Karan Aujla' },
  { value: 'Jackpot - Cheema Y.mp3', label: 'Track 06 - Jackpot - Cheema Y' },
  { value: 'Low Fade - Karan Aujla.mp3', label: 'Track 07 - Low Fade - Karan Aujla' },
  { value: 'Wavy - Karan Aujla.mp3', label: 'Track 08 - Wavy - Karan Aujla' },
  { value: 'Winning Speech - Karan Aujla.mp3', label: 'Track 09 - Winning Speech - Karan Aujla' }
];

trackSelect.innerHTML = trackList.map((track) => `<option value="${track.value}">${track.label}</option>`).join('');
trackSelect.value = 'birthday.mp3';

function applyTrack(sourceValue) {
  if (!sourceValue) return;
  const sourcePath = sourceValue.includes('://') ? sourceValue : `assets/${sourceValue}`;
  audio.src = sourcePath;
  audio.load();
}

audio.addEventListener('error', () => {
  showToast('This exact song is not reachable from the current local server.');
  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', 'Play birthday music');
  equalizer.classList.add('paused');
});

const styleTag = document.createElement('style');
styleTag.textContent = `
  .album-art {
    position: relative;
    display: grid;
    place-items: center;
    width: clamp(140px, 17vw, 220px);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, rgba(244, 240, 235, 0.22), rgba(17, 16, 18, 0.96) 34%, rgba(10, 10, 12, 1) 68%);
    overflow: hidden;
    box-shadow: inset 0 0 0 10px rgba(255,255,255,0.03), 0 28px 60px rgba(0,0,0,0.45);
  }
  .album-disc {
    position: absolute;
    inset: 12%;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229,43,50,0.82), rgba(17,16,18,0.9) 38%, rgba(10,10,12,1) 55%);
    border: 12px solid rgba(244,240,235,0.08);
    box-shadow: inset 0 0 30px rgba(0,0,0,0.32), 0 0 22px rgba(229,43,50,0.2);
    animation: spinDisc 4s linear infinite;
    animation-play-state: paused;
  }
  .album-art.is-playing .album-disc {
    animation-play-state: running;
  }
  .album-disc span {
    font-family: var(--display);
    font-size: clamp(2.2rem, 4vw, 4rem);
    letter-spacing: 0.08em;
    color: rgba(244,240,235,0.95);
    text-shadow: 0 0 18px rgba(255,255,255,0.4);
  }
  @keyframes spinDisc {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .album-art .album-grid {
    position: absolute;
    inset: 13%;
    border-radius: 50%;
    background: repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 2px, transparent 2px 10px);
    opacity: 0.9;
  }
  .album-art small {
    position: absolute;
    bottom: 18%;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0.22em;
    font-size: 0.58rem;
    opacity: 0.8;
  }
  .track-title-wrap {
    width: 100%;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
  }
  .track-title {
    display: inline-block;
    min-width: 100%;
    white-space: nowrap;
    animation: titleScroll 9s linear infinite;
    will-change: transform;
  }
  @keyframes titleScroll {
    0% { transform: translateX(0%); }
    20% { transform: translateX(0%); }
    50% { transform: translateX(-14%); }
    80% { transform: translateX(-18%); }
    100% { transform: translateX(-30%); }
  }
  .player-controls {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
  }
  .round-button,
  .icon-button {
    border: 1px solid rgba(244,240,235,0.18);
    background: rgba(255,255,255,0.02);
    color: var(--ink);
    border-radius: 999px;
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  }
  .round-button {
    width: 52px;
    height: 52px;
    font-size: 1.2rem;
  }
  .icon-button {
    padding: 0.65rem 0.9rem;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
  }
  .outro-panel .go-back-button {
    margin-top: 1.4rem;
    padding: 0.9rem 1.4rem;
    border-radius: 999px;
    border: 1px solid rgba(244,240,235,0.2);
    background: rgba(229,43,50,0.12);
    color: var(--ink);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .outro-panel .go-back-button:hover {
    background: rgba(229,43,50,0.2);
  }
  .lyrics-rail {
    position: fixed;
    left: 50%;
    bottom: 12vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.7rem 1.1rem;
    transform: translateX(-50%) translateY(20px);
    opacity: 0;
    pointer-events: none;
    z-index: 95;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .lyrics-rail.is-visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .lyrics-word {
    display: inline-block;
    font-family: var(--display);
    font-size: clamp(2.1rem, 5vw, 6rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(244, 240, 235, 0.9);
    text-shadow: 0 0 22px rgba(229, 43, 50, 0.35);
    opacity: 0;
    transform: translateY(20px);
    animation: lyric-rise 0.8s ease forwards;
  }
  @keyframes lyric-rise {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .memory-card,
  .starter-card,
  .primary-button,
  .outline-button,
  .round-button,
  .icon-button,
  .nav-jump {
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .memory-card:hover,
  .starter-card:hover,
  .primary-button:hover,
  .outline-button:hover,
  .round-button:hover,
  .icon-button:hover,
  .nav-jump:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 18px 24px rgba(229, 43, 50, 0.12);
  }
  .memory-card {
    transform-origin: center;
  }
  .memory-card:hover img {
    transform: scale(1.08) rotate(-1deg);
  }
  .memory-card img {
    transition: transform 0.8s ease;
  }
  .fireworks-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 90;
    overflow: hidden;
  }
  .firework {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ink);
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.8);
    animation: firework-pop 1.2s ease-out forwards;
  }
  @keyframes firework-pop {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.2);
    }
    100% {
      opacity: 0;
      transform: translate(var(--dx), var(--dy)) scale(1.9);
    }
  }
  .outro-screen {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(6, 7, 11, 0.8);
    backdrop-filter: blur(10px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease, visibility 0.8s ease;
    z-index: 130;
  }
  .outro-screen.is-visible {
    opacity: 1;
    visibility: visible;
  }
  .outro-panel {
    width: min(560px, calc(100% - 48px));
    text-align: center;
    padding: 2.4rem 1.5rem 2rem;
    border: 1px solid rgba(244, 240, 235, 0.2);
    background: rgba(17, 16, 18, 0.9);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.42);
    border-radius: 24px;
  }
  .outro-panel small {
    display: block;
    letter-spacing: 0.3em;
    font-size: 0.72rem;
    color: rgba(244, 240, 235, 0.72);
    margin-bottom: 0.8rem;
  }
  .outro-panel h3 {
    margin: 0 0 1rem;
    font-family: var(--display);
    font-size: clamp(2rem, 5vw, 4rem);
    letter-spacing: 0.08em;
  }
  .outro-panel p {
    margin: 0;
    color: rgba(244, 240, 235, 0.82);
    font-size: 1.1rem;
    font-style: italic;
  }
`;
document.head.appendChild(styleTag);

const lyricsRail = document.createElement('div');
lyricsRail.className = 'lyrics-rail';
lyricsRail.setAttribute('aria-live', 'polite');
document.body.appendChild(lyricsRail);

const fireworksLayer = document.createElement('div');
fireworksLayer.className = 'fireworks-layer';
document.body.appendChild(fireworksLayer);

const outroScreen = document.createElement('div');
outroScreen.className = 'outro-screen';
outroScreen.innerHTML = `
  <div class="outro-panel">
    <small>TRACK ENDED</small>
    <h3>UZAIR — 21 OCTOBER</h3>
    <p>“THE BRO CODE CONTINUES…”</p>
    <button class="go-back-button" id="goBackButton" type="button">Go Back</button>
  </div>
`;
document.body.appendChild(outroScreen);

function makeLyrics() {
  const words = ['BRO', 'YOU', 'DESERVE', 'ALL', 'THIS', 'NOISE', 'ALL', 'THIS', 'LOVE', 'HAPPY', 'BIRTHDAY', 'UZAIR'];
  lyricsRail.innerHTML = '';
  lyricsRail.classList.add('is-visible');
  words.forEach((word, index) => {
    const node = document.createElement('span');
    node.className = 'lyrics-word';
    node.textContent = word;
    node.style.animationDelay = `${index * 0.12}s`;
    lyricsRail.appendChild(node);
  });
  setTimeout(() => lyricsRail.classList.remove('is-visible'), 3400);
}

function burstFireworks() {
  const colors = ['#e52b32', '#f4f0eb', '#ffb638', '#7e1b20', '#ff7a7a'];
  for (let index = 0; index < 26; index += 1) {
    const firework = document.createElement('span');
    firework.className = 'firework';
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 70 + 12}%`;
    firework.style.background = colors[index % colors.length];
    firework.style.setProperty('--dx', `${(Math.random() - 0.5) * 220}px`);
    firework.style.setProperty('--dy', `${(Math.random() - 0.5) * 220}px`);
    fireworksLayer.appendChild(firework);
    setTimeout(() => firework.remove(), 1200);
  }
}

function showOutroScreen() {
  outroScreen.classList.add('is-visible');
}

function attachMotionEffect(element) {
  if (!element) return;
  element.addEventListener('pointermove', (event) => {
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
    element.style.transform = `translateY(-2px) rotateX(${(-y).toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;
  });
  element.addEventListener('pointerleave', () => {
    element.style.transform = '';
  });
}

document.querySelectorAll('.memory-card, .starter-card, .primary-button, .outline-button, .nav-jump').forEach(attachMotionEffect);

function changeTrack(step) {
  const currentIndex = trackList.findIndex((track) => track.value === trackSelect.value);
  const nextIndex = (currentIndex + step + trackList.length) % trackList.length;
  trackSelect.value = trackList[nextIndex].value;
  trackSelect.dispatchEvent(new Event('change', { bubbles: true }));
}

function setDiscState(isPlaying) {
  albumArt.classList.toggle('is-playing', isPlaying);
}

setTimeout(() => introTwo.classList.add('show'), 1100);
setTimeout(() => { introSub.classList.add('show'); openSurprise.classList.add('show'); }, 2300);

openSurprise.addEventListener('click', () => {
  opening.classList.add('is-hidden');
  mainContent.removeAttribute('aria-hidden');
  mainContent.classList.add('is-live');
  document.body.classList.add('entered');
  burstConfetti(42);
  makeLyrics();
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
  setDiscState(playing);
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
prevButton.addEventListener('click', () => changeTrack(-1));
nextButton.addEventListener('click', () => changeTrack(1));
turnUp.addEventListener('click', () => { document.querySelector('#music').scrollIntoView({ behavior: 'smooth' }); startMusic(); });
muteButton.addEventListener('click', () => { audio.muted = !audio.muted; muteButton.textContent = audio.muted ? 'MUTE' : 'VOL'; });
audio.addEventListener('play', syncAudio);
audio.addEventListener('pause', syncAudio);
audio.addEventListener('ended', () => {
  burstFireworks();
  makeLyrics();
  showOutroScreen();
});
trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.options[trackSelect.selectedIndex];
  if (!selectedTrack) return;
  const titleText = selectedTrack.textContent.replace(/\s*🔥\s*$/, '').trim();
  trackTitle.innerHTML = `${titleText} <span>🔥</span>`;
  trackTitle.classList.toggle('short-title', titleText.length <= 12);
  applyTrack(trackSelect.value);
  audio.muted = false;
  startMusic();
});

document.addEventListener('keydown', (event) => {
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    changeTrack(-1);
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    changeTrack(1);
  } else if (event.code === 'Space') {
    event.preventDefault();
    audio.paused ? startMusic() : audio.pause();
  }
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
document.querySelector('#secretButton').addEventListener('click', () => {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('#secretModal .modal-panel h2').textContent = 'MAKE A WISH...';
  document.querySelector('#secretModal .modal-panel h3').textContent = 'THE BRO CODE NEVER FORGETS. THIS ONE IS FOR UZAIR.';
  document.querySelector('#secretModal .modal-panel p').textContent = 'HAPPY BIRTHDAY, UZAIR. MAY THE NEXT YEAR BE WILD, BLESSED, AND UNSTOPPABLE. ❤️';
  burstConfetti(75);
});
document.querySelector('#closeModal').addEventListener('click', () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); });
modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('is-open'); });

document.querySelector('#blowButton').addEventListener('click', () => {
  document.querySelector('.final-section').classList.add('blown');
  document.querySelector('#finalMessage').classList.add('is-visible');
  document.querySelector('#finalMessage h3').innerHTML = 'YOUR WISH IS IN MOTION <span>🔥🥂</span>';
  document.querySelector('#finalMessage p').textContent = 'THE NIGHT IS LOUDER. THE ENERGY IS HIGHER. THE WISH IS ALREADY ON ITS WAY.';
  document.querySelector('#blowButton').disabled = true;
  burstConfetti(130);
  burstBalloons(9);
  burstFireworks();
  makeLyrics();
  startMusic();
  document.querySelector('#finale').scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(showOutroScreen, 2600);
});

document.querySelector('#goBackButton')?.addEventListener('click', () => {
  outroScreen.classList.remove('is-visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
