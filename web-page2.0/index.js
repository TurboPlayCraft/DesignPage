let theme = localStorage.setItem("theme", "Dark");
let lowPerformance = true;

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./Animation.json",
});

animation.addEventListener("DOMLoaded", function () {
  animation.goToAndStop(animation.totalFrames - 1, true);
});
let isForward = true;
let isPlaying = false;

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
  var video = document.getElementById("background-video");
  video.currentTime = 0;
  video.play();

  video.addEventListener("timeupdate", function () {
    if (video.currentTime >= video.duration) {
      video.pause();
    }
  });
}

function playReverseBackground() {
  var video = document.getElementById("background-video");
  video.pause();
  video.currentTime = video.duration;

  var reverseInterval = setInterval(function () {
    if (video.currentTime > 0) {
      video.currentTime -= 0.05;
    } else {
      clearInterval(reverseInterval);
    }
  }, 50);
}

document.getElementById("lottie-container").addEventListener("click", () => {
  if (isPlaying) return; // Ignore clicks while animation is playing

  if (animation.currentFrame === 0) {
    playForward();
    playReverseBackground();
    return;
  }

  if (animation.currentFrame === animation.totalFrames - 1) {
    playBackward();
    playBackground();
    return;
  }
});

document.addEventListener("mousemove", (event) => {
  let cursor = document.getElementById("cursor");
  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
});
