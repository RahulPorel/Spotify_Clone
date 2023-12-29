import { songs } from "./data.js";
let songIndex = 0;
const playListBtn = document.getElementById("playlist");
const artistListBtn = document.getElementById("artists");
const albumsListBtn = document.getElementById("albums");
const podcastListBtn = document.getElementById("podcast");
const playListContentShow = document.getElementById("playlist-lists");
const artistListContentShow = document.getElementById("artists-lists");
const albumstListContentShow = document.getElementById("albums-lists");
const podcastListContentShow = document.getElementById("podcast-lists");
const container = document.getElementById("box-p1");
let audioElement = new Audio("songs/1.mp3");
const masterPlay = document.getElementById("masterPlay");
const masterSongName = document.getElementById("masterSongName");
const myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));

podcastListBtn.addEventListener("click", () => {
  podcastListContentShow.style.display = "block";
  albumstListContentShow.style.display = "none";
  playListContentShow.style.display = "none";
  artistListContentShow.style.display = "none";
  podcastListBtn.style.opacity = 1;
  artistListBtn.style.opacity = 0.75;
  albumsListBtn.style.opacity = 0.75;
  playListBtn.style.opacity = 0.75;
});

albumsListBtn.addEventListener("click", () => {
  albumstListContentShow.style.display = "block";
  podcastListContentShow.style.display = "none";
  playListContentShow.style.display = "none";
  artistListContentShow.style.display = "none";
  albumsListBtn.style.opacity = 1;
  podcastListBtn.style.opacity = 0.75;
  artistListBtn.style.opacity = 0.75;
  playListBtn.style.opacity = 0.75;
});

playListBtn.addEventListener("click", () => {
  podcastListContentShow.style.display = "none";
  albumstListContentShow.style.display = "none";

  playListContentShow.style.display = "block";
  artistListContentShow.style.display = "none";
  playListBtn.style.opacity = 1;
  albumsListBtn.style.opacity = 0.75;
  podcastListBtn.style.opacity = 0.75;
  artistListBtn.style.opacity = 0.75;
});

artistListBtn.addEventListener("click", () => {
  artistListContentShow.style.display = "block";
  podcastListContentShow.style.display = "none";
  playListContentShow.style.display = "none";
  albumstListContentShow.style.display = "none";
  artistListBtn.style.opacity = 1;
  playListBtn.style.opacity = 0.75;
  albumsListBtn.style.opacity = 0.75;
  podcastListBtn.style.opacity = 0.75;
});

container.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    container.scrollLeft += 100;
    e.preventDefault();
  } else {
    container.scrollLeft -= 100;
    e.preventDefault();
  }
});

audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

document.getElementById("next-play").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous-play").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
