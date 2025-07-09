const waterfallTrack = document.querySelector('.waterfall-track');
const waterfall = document.getElementById('waterfall');

const images = [
  './public/images/20240319_182751.jpg',
  './public/images/20240407_131245.jpg',
];

// Function to append images to waterfall container
function appendImages(imgList) {
  imgList.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image ${i}`;
    img.style.animationDelay = `${i * 1}s`;
    waterfall.appendChild(img);
  });
}

// Utility to wait for all images inside a container to load
function imagesLoaded(container, callback) {
  const imgs = container.querySelectorAll('img');
  let loadedCount = 0;
  const total = imgs.length;
  if (total === 0) {
    callback();
    return;
  }
  imgs.forEach(img => {
    if (img.complete) {
      loadedCount++;
      if (loadedCount === total) callback();
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === total) callback();
      });
      img.addEventListener('error', () => {
        loadedCount++;
        if (loadedCount === total) callback();
      });
    }
  });
}

// Append images twice for seamless scrolling
appendImages(images);
appendImages(images);

// Start scrolling only after images have loaded
imagesLoaded(waterfall, () => {
  startScrolling();
});

function startScrolling() {
  let scrollY = 0;
  let speed = 0.75;      // Normal scroll speed (pixels per frame)
  const normalSpeed = 0.75;
  const slowSpeed = 0.1; // Slow scroll speed on hover
  let targetSpeed = normalSpeed;

  const waterfallHeight = waterfall.offsetHeight;

  function animate() {
    scrollY += speed;
    if (scrollY >= waterfallHeight / 2) {
      scrollY = 0;
    }
    waterfallTrack.style.transform = `translateY(${-scrollY}px)`;
    // Smoothly ease speed toward targetSpeed
    speed += (targetSpeed - speed) * 0.05;
    requestAnimationFrame(animate);
  }

  animate();

  waterfallTrack.addEventListener('mouseenter', () => {
    targetSpeed = slowSpeed;
  });

  waterfallTrack.addEventListener('mouseleave', () => {
    targetSpeed = normalSpeed;
  });
}
