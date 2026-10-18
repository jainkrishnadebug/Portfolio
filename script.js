const dialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#search-input');
const searchTrigger = document.querySelector('.search-trigger');
const closeButton = document.querySelector('.dialog-close');

function openSearch() {
  if (!dialog.open) dialog.showModal();
  window.setTimeout(() => searchInput.focus(), 50);
}

searchTrigger.addEventListener('click', openSearch);
closeButton.addEventListener('click', () => dialog.close());

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openSearch();
  }
  if (event.key === 'Escape' && dialog.open) dialog.close();
});

const monthYear = document.querySelector('#month-year');
if (monthYear) {
  monthYear.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
    .format(new Date())
    .replace(' ', '_');
}

const searchShortcut = document.querySelector('#search-shortcut');
if (searchShortcut) {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.includes('android');
  const isApple = /mac|iphone|ipad|ipod/.test(userAgent);
  if (isAndroid) searchShortcut.hidden = true;
  else searchShortcut.textContent = isApple ? '⌘ K' : 'Ctrl K';
}

const logo = document.querySelector('.brand');
const greetingTrigger = document.querySelector('.hero-greeting');
const greeting = document.createElement('div');
greeting.className = 'lego-greeting';
greeting.setAttribute('aria-hidden', 'true');
const greetingImage = document.createElement('img');
greeting.appendChild(greetingImage);
document.body.appendChild(greeting);

let greetingRunning = false;

function updateGreetingQuadrant(x, y) {
  if (!greetingTrigger) return;
  const isFirstOrThird = (x < window.innerWidth / 2 && y < window.innerHeight / 2)
    || (x >= window.innerWidth / 2 && y >= window.innerHeight / 2);
  greetingTrigger.classList.toggle('quadrant-cool', isFirstOrThird);
  greetingTrigger.classList.toggle('quadrant-warm', !isFirstOrThird);
}

if (greetingTrigger) {
  greetingTrigger.classList.add('quadrant-warm');
  window.addEventListener('pointermove', (event) => updateGreetingQuadrant(event.clientX, event.clientY), { passive: true });
  window.addEventListener('pointerdown', (event) => updateGreetingQuadrant(event.clientX, event.clientY), { passive: true });
}

const profilePhoto = document.querySelector('#profile-photo');
if (profilePhoto) {
  const frameNumber = profilePhoto.querySelector('.frame-number');
  let photoIndex = 0;
  const photoNumbers = ['001', '002', '003'];
  const flipPortrait = () => {
    profilePhoto.classList.remove('photo-index-1', 'photo-index-2');
    photoIndex = (photoIndex + 1) % 3;
    if (photoIndex > 0) profilePhoto.classList.add(`photo-index-${photoIndex}`);
    if (frameNumber) frameNumber.textContent = `[ ${photoNumbers[photoIndex]} ]`;
  };
  profilePhoto.addEventListener('click', flipPortrait);
  profilePhoto.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipPortrait();
    }
  });
}

const greetingSequence = [
  ['assets/lego-greeting-01.png', 200],
  ['assets/lego-greeting-02.png', 50],
  ['assets/lego-greeting-03.png', 100],
  ['assets/lego-greeting-04.png', 50],
  ['assets/lego-greeting-05.png', 400],
  ['assets/lego-greeting-04.png', 25],
  ['assets/lego-greeting-03.png', 50],
  ['assets/lego-greeting-02.png', 25],
  ['assets/lego-greeting-01.png', 50]
];

greetingSequence.forEach(([imagePath]) => {
  const preload = new Image();
  preload.src = imagePath;
});

async function playGreeting() {
  if (greetingRunning) return;
  greetingRunning = true;
  greetingImage.src = greetingSequence[0][0];
  greeting.classList.add('is-visible');

  for (const [imagePath, duration] of greetingSequence) {
    greetingImage.src = imagePath;
    await new Promise((resolve) => window.setTimeout(resolve, duration));
  }

  greeting.classList.remove('is-visible');
  await new Promise((resolve) => window.setTimeout(resolve, 500));
  greetingRunning = false;
}

const triggerGreeting = (event) => {
  if (event.type === 'click') event.preventDefault();
  if (greetingTrigger) {
    greetingTrigger.classList.remove('is-vibrating');
    void greetingTrigger.offsetWidth;
    greetingTrigger.classList.add('is-vibrating');
    window.setTimeout(() => greetingTrigger.classList.remove('is-vibrating'), 340);
  }
  playGreeting();
};

logo.addEventListener('click', triggerGreeting);

if (greetingTrigger) {
  greetingTrigger.addEventListener('click', triggerGreeting);
  greetingTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      playGreeting();
    }
  });
}

