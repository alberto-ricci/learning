// Declare constants needed to access HTML elements
const playPauseButton = document.querySelector(".play-pause");
const audio = document.querySelector(".main-song");
const progressBar = document.querySelector(".progress-bar span");
const currentTime = document.querySelector(".time .current");
const totalTime = document.querySelector(".time .final");
const volumeSlider = document.getElementById("volume");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");

// Create an empty array to store track URIs from the Spotify API and set the initial track index to 0
let playlist = [];
let currentTrackIndex = 0;

// Initialize the 'isPlaying' variable to false and add a click event listener to the play/pause button
let isPlaying = false;
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    // Pause the audio and stop the vinyl image rotation
    audio.pause();
    playPauseButton.textContent = "play_arrow";
    document.querySelector(".music-image").classList.remove("rotate");
  } else {
    // Play the audio and start the vinyl image rotation
    audio.play();
    playPauseButton.textContent = "pause";
    document.querySelector(".music-image").classList.add("rotate");
  }
  // Toggle the 'isPlaying' variable
  isPlaying = !isPlaying;
});

// Add a timeupdate event listener to update the progress bar and display the current and total time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  totalTime.textContent = formatTime(audio.duration);
});

// Add an input event listener to update the volume of the audio
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// Add click event listeners to the previous, next, repeat, and shuffle buttons
prevButton.addEventListener("click", () => {
  // Decrement the current track index and play the previous track
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  playTrack(playlist[currentTrackIndex]);
});

nextButton.addEventListener("click", () => {
  // Increment the current track index and play the next track

  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0;
  }
  playTrack(playlist[currentTrackIndex]);
});

repeatButton.addEventListener("click", () => {
  // Toggle the repeat button and enable/disable looping
  audio.loop = !audio.loop;
  repeatButton.classList.toggle("active");
});

shuffleButton.addEventListener("click", () => {
  // Shuffle the playlist array and play the first track
  playlist = shuffleArray(playlist);
  currentTrackIndex = 0;
  playTrack(playlist[currentTrackIndex]);
});

// Define a function to play a track by URI
function playTrack(uri) {
  // Set the new track URI and play it
  audio.src = uri;
  audio.play();
  playPauseButton.textContent = "pause";
  isPlaying = true;
  document.querySelector(".vinyl-image").classList.add("rotate");
}

// Define a function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Define a function to format the time in minutes and seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
