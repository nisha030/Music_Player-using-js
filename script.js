const playlist = [
  { title: "Apt", artist: "Rose and Bruno Mars", src: "./songs/apt.mp3" },
  { title: "TypaGirl", artist: "Blackpink", src: "./songs/typa-girl.mp3" },
  { title: "paint_the_town_red", artist: "Doja Cat", src: "./songs/paint_the_town_red.mp3" },
  { title: "Shinunoga_e_wa", artist: "Artist 3", src: "./songs/Shinunoga_e_wa.mp3" },
  { title: "Lalisa", artist: "Lalisa", src: "./songs/Lalisa.mp3" },
  { title: "Die With A Smile", artist: "Bruno Mars", src: "./songs/DieWithASmile.mp3" },
  { title: "Espresso", artist: "unknown", src: "./songs/Espresso.mp3" },
  { title: "Maiyya", artist: "Sachet-parampara", src: "./songs/Maiyya.mp3" },
  { title: "Maula Mere Maula", artist: "Roopkumar Rathore", src: "./songs/MaulaMereMaula.mp3" },
  { title: "Parindey", artist: "B praak Avvy sra", src: "./songs/Parindey.mp3" },
  { title: "Ye Tune Kya Kiya", artist: "Pritam, Javed bashir", src: "./songs/YeTuneKyaKiya.mp3" },
  { title: "Parindey", artist: "B praak Avvy sra", src: "./songs/Parindey.mp3" },
  { title: "Mere Humsafar", artist: "Tulsi kumar", src: "./songs/MereHumsafar.mp3" },


];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio-player");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeElem = document.getElementById("current-time");
const totalDurationElem = document.getElementById("total-duration");
const volumeControl = document.getElementById("volume");
const playlistElem = document.getElementById("playlist");

// Load a new track into the player
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;

  audio.addEventListener("loadedmetadata", () => {
    totalDurationElem.textContent = formatTime(audio.duration);
    progressBar.style.width = "0%";
  });

  updatePlaylistUI();
}

// Play the current track
function playTrack() {
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}

// Pause the current track
function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
}

// Toggle play/pause
function togglePlayPause() {
  isPlaying ? pauseTrack() : playTrack();
}

// Update progress bar as the track plays
function updateProgressBar() {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeElem.textContent = formatTime(audio.currentTime);
  }
}

// Set progress on click of the progress bar
function setProgress(e) {
  const newTime = (e.offsetX / e.target.offsetWidth) * audio.duration;
  audio.currentTime = newTime;
}

// Format time into minutes:seconds
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Change volume based on the slider
function changeVolume(e) {
  audio.volume = e.target.value;
}

// Go to the next track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Go to the previous track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Update the playlist UI
function updatePlaylistUI() {
  playlistElem.innerHTML = playlist
    .map(
      (track, index) => `
      <li class="${index === currentTrackIndex ? "active" : ""}" data-index="${index}">
        ${track.title} - ${track.artist}
      </li>
    `
    )
    .join("");
}

// Playlist item click event
playlistElem.addEventListener("click", (e) => {
  const selectedIndex = e.target.dataset.index;
  if (selectedIndex) {
    currentTrackIndex = parseInt(selectedIndex);
    loadTrack(currentTrackIndex);
    playTrack();
  }
});

// Event listeners for buttons and controls
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
audio.addEventListener("timeupdate", updateProgressBar);
volumeControl.addEventListener("input", changeVolume);

// Load the first track
loadTrack(currentTrackIndex);
