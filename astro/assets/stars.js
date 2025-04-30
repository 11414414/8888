
const numStars = 144;
const stars = [];

for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = 1 + Math.random() * 3; // 1vw - 4vw
  const speed = 0.055 + (4 - size) * 0.055; // increased by 10%
  const opacity = 0.5 + Math.random() * 0.5;
  const shimmerDuration = 3 + Math.random() * 3; // randomize shimmer timing

  star.style.width = `${size}vw`;
  star.style.height = `${size}vw`;
  star.style.animationDuration = `${shimmerDuration}s`;
  star.style.opacity = opacity;

  document.body.appendChild(star);

  stars.push({
    el: star,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * speed * 2,
    vy: (Math.random() - 0.5) * speed * 2,
    rotation: Math.random() * 360,
    rotationSpeed: 0.055 + Math.random() * 0.11,
    wobblePhaseX: Math.random() * Math.PI * 2,
    wobblePhaseY: Math.random() * Math.PI * 2
  });
}

function animateStars() {
  const time = Date.now() / 1000;
  stars.forEach(star => {
    const wobbleX = Math.sin(time + star.wobblePhaseX) * 0.5;
    const wobbleY = Math.cos(time + star.wobblePhaseY) * 0.5;

    star.x += star.vx + wobbleX;
    star.y += star.vy + wobbleY;
    star.rotation += star.rotationSpeed;

    if (star.x < -100) star.x = window.innerWidth + 100;
    if (star.x > window.innerWidth + 100) star.x = -100;
    if (star.y < -100) star.y = window.innerHeight + 100;
    if (star.y > window.innerHeight + 100) star.y = -100;

    star.el.style.transform = `translate3d(${star.x}px, ${star.y}px, 0) rotate(${star.rotation}deg)`;
  });

  requestAnimationFrame(animateStars);
}

animateStars();

function toggleTheme() {
  if (getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)') {
    document.documentElement.style.setProperty('--bg-color', 'black');
    document.querySelectorAll('.star').forEach(star => {
      star.style.filter = 'invert(100%) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))';
    });
    document.querySelector('.theme-toggle').style.color = 'white';
    document.querySelector('.theme-toggle').style.borderColor = 'white';
  } else {
    document.documentElement.style.setProperty('--bg-color', 'white');
    document.querySelectorAll('.star').forEach(star => {
      star.style.filter = 'invert(0%) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))';
    });
    document.querySelector('.theme-toggle').style.color = 'black';
    document.querySelector('.theme-toggle').style.borderColor = 'black';
  }
}