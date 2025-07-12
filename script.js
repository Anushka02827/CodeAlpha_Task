const playlist = [
  {
    title: "Mechanical Sundariye",
    artist: "Armaan Malik",
    src: "songs/Mechanical Sundariye.mp3",
    img: "images/robot 2.0.jpg",
    
  },
  {
    title: "Laal Pari",
    artist: "Yo Yo Honey Singh",
    src: "songs/laal pari.mp3.mpeg",
    img: "images/Housefull 5.jpg",
    
  },
  {
    title: "Euphoria",
    artist: "John Seagull",
    src: "songs/euphoria-133934.mp3",
    img: "images/euphoria.jpg",
    
  },
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    src: "songs/sapphire.mpeg",
    img: "images/sapphire.jpg",
    
  },
  {
    title: "Garam Masala",
    artist: "Adnan Sami",
    src: "songs/Garam Masala.mpeg",
    img: "images/garam masala.jpg",
    
  }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const cover = document.getElementById("cover");

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.img || "images/default.jpg";
  document.body.style.background = song.color;
  updatePlaylistHighlight();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}

function updateProgress() {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

function setProgress(e) {
  const percent = e.target.value;
  audio.currentTime = (percent / 100) * audio.duration;
}

function setVolume(e) {
  audio.volume = e.target.value;
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}


function buildPlaylist() {
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist} (Loading...)`;
    playlistEl.appendChild(li);

    const tempAudio = new Audio();
    tempAudio.src = song.src;

    tempAudio.addEventListener("loadedmetadata", () => {
      const duration = formatTime(tempAudio.duration);
      li.textContent = `${song.title} - ${song.artist} (${duration})`;
    });

    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(index);
      playSong();
    });
  });
}

function updatePlaylistHighlight() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentSongIndex);
  });
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volume.addEventListener("input", setVolume);
audio.addEventListener("ended", nextSong);

// Initialize
buildPlaylist();
loadSong(currentSongIndex);
