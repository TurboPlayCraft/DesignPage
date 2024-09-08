let theme = localStorage.setItem("theme", "Dark");

function changeTheme() {
  if (localStorage.getItem("theme") === "Light") {
    document.body.style.backgroundColor = "Black";
    document.body.style.color = "White";
    localStorage.setItem("theme", "Dark");
    return;
  }

  if (localStorage.getItem("theme") === "Dark") {
    document.body.style.backgroundColor = "White";
    document.body.style.color = "Black";
    localStorage.setItem("theme", "Light");
    return;
  }
}

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "./Animation.json", // Update this path
});

let isForward = true;
let isPlaying = false;

// Function to play animation forward
function playForward() {
  animation.setDirection(1);
  animation.play();
  isPlaying = true;
}

// Function to play animation backward
function playBackward() {
  animation.setDirection(-1);
  animation.play();
  isPlaying = true;
}

// Event listener for animation complete
animation.addEventListener("complete", () => {
  isPlaying = false;
});

// Click event listener
document.getElementById("lottie-container").addEventListener("click", () => {
  if (isPlaying) return; // Ignore clicks while animation is playing

  // if (isForward) {
  if (animation.currentFrame === 0) {
    playForward();

    // document.body.style.backgroundColor = "Black";
    // document.body.style.color = "White";
    // localStorage.setItem("theme", "Dark");
    playReverseBackground();
    return;
  }

  if (animation.currentFrame === animation.totalFrames - 1) {
    playBackward();
    
    playBackground();
    localStorage.setItem("theme", "Light");
    return;
  }
});

function playBackground() {
  var video = document.getElementById("background-video");
  video.currentTime = 0;  // Start the video from the beginning
  video.play();  // Play the video
  
  video.addEventListener('timeupdate', function() {
      if (video.currentTime >= video.duration) {
          video.pause();  // Pause the video at the end
      }
  });
}

function playReverseBackground() {
  var video = document.getElementById("background-video");
  video.pause();  // Ensure the video is paused before starting reverse playback
  video.currentTime = video.duration;  // Start from the end of the video
  
  var reverseInterval = setInterval(function() {
      if (video.currentTime > 0) {
          video.currentTime -= 0.05;  // Rewind the video by 0.05 seconds (adjust as needed)
      } else {
          clearInterval(reverseInterval);  // Stop the interval when the video reaches the beginning
      }
  }, 50);  // Interval time in milliseconds (adjust as needed)
};
