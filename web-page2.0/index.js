let theme = localStorage.setItem("theme", "Dark");
let lowPerformance = true;
let cursor;
let cursorx = 0;
let cursory = 0;
let cursorSize;
let rafid;
let isPlaying = false;
let video;
let reverseInterval;

function handleMouseMove(event) {
  cursorx = event.clientX;
  cursory = event.clientY;
}

function update() {
  cursor.style.transform = `translate(${cursorx - cursorSize / 2}px, ${
    cursory - cursorSize / 2
  }px)`;
  rafid = requestAnimationFrame(update);
}

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./Animation.json",
});

animation.addEventListener("DOMLoaded", function () {
  animation.goToAndStop(animation.totalFrames - 1, true); // set to end (moon)
  cursor = document.querySelector("#cursor");
  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("mousedown", mouseDown, { passive: true });
  document.addEventListener("mouseup", mouseUp, { passive: true });
  rafid = requestAnimationFrame(update);
  video = document.getElementById("background-video");
});

function mouseDown() {
  cursorSize = 20;
  cursor.animate([{ width: "20px", height: "20px" }], {
    duration: 200,
    fill: "forwards",
  });
}

function mouseUp() {
  cursorSize = 15;
  cursor.animate([{ width: "15px", height: "15px" }], {
    duration: 200,
    fill: "forwards",
  });
}

function playForward() {
  animation.setDirection(1);
  animation.play();
  isPlaying = true;
}

function playBackward() {
  animation.setDirection(-1);
  animation.play();
  isPlaying = true;
}

animation.addEventListener("complete", () => {
  isPlaying = false;
});

function playBackground() {
  clearInterval(reverseInterval);
  video.currentTime = 0;
  video.play();
}

function playReverseBackground() {
  clearInterval(reverseInterval);
  if (video.currentTime === 0) {
    video.currentTime = video.duration;
  }
  video.pause();

  const fps = 24; // Adjust this value to control the playback speed
  const frameDuration = 1000 / fps;

  reverseInterval = setInterval(() => {
    if (video.currentTime <= 0) {
      clearInterval(reverseInterval);
    } else {
      video.currentTime = Math.max(0, video.currentTime - 0.05);
    }
  }, frameDuration);
}

document.getElementById("lottie-container").addEventListener("click", () => {
  if (isPlaying) return; // Ignore clicks while animation is playing

  if (animation.currentFrame === 0) {
    playForward();
    playReverseBackground();
  } else if (animation.currentFrame === animation.totalFrames - 1) {
    playBackward();
    playBackground();
  }
});
