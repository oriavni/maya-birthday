const DROPBOX_FOLDER_URL = "https://www.dropbox.com/scl/fo/kflhaofy4irom5vztyz0q/AIiTjARjBpqNaPx9JrbEctg?rlkey=tgx39uh0lthyh0cpid2ha46iu&dl=0";
const PREVIEW_VIDEO_URL = "https://www.dropbox.com/scl/fi/eub3nismjprrsg8dqwsch/maya-s-bd-shorts-greeting-HD-1080p.mov?rlkey=5wbj8gy8g1besuy3tkhorvggq&raw=1";
const VIDEOS_PASSWORD = "arialia";

const backButton = document.querySelector(".back-button");
const folderButton = document.querySelector(".folder-button");
const passwordToast = document.querySelector(".password-toast");
const passwordForm = document.querySelector(".password-form");
const passwordInput = document.querySelector(".password-input");
const passwordMessage = document.querySelector(".password-message");
const passwordSlots = [...document.querySelectorAll(".password-slots span")];
const toastClose = document.querySelector(".toast-close");
const previewVideo = document.querySelector(".preview");
const photo = document.querySelector(".photo");

previewVideo.src = PREVIEW_VIDEO_URL;

const showLoadedPhoto = () => {
  photo.classList.add("is-loaded");
};

photo.addEventListener("load", showLoadedPhoto);

if (photo.complete && photo.naturalWidth > 0) {
  showLoadedPhoto();
}

backButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "./";
});

const renderPasswordSlots = () => {
  const value = passwordInput.value.slice(0, 7);

  passwordSlots.forEach((slot, index) => {
    slot.textContent = value[index] ? "•" : "";
  });
};

const openPasswordToast = () => {
  passwordToast.hidden = false;
  passwordMessage.textContent = "";
  passwordInput.value = "";
  renderPasswordSlots();
  window.setTimeout(() => passwordInput.focus(), 80);
};

const closePasswordToast = () => {
  passwordToast.hidden = true;
  passwordInput.blur();
};

folderButton.addEventListener("click", openPasswordToast);
toastClose.addEventListener("click", closePasswordToast);

passwordToast.addEventListener("click", () => {
  passwordInput.focus();
});

passwordInput.addEventListener("input", () => {
  passwordInput.value = passwordInput.value.slice(0, 7);
  passwordMessage.textContent = "";
  renderPasswordSlots();
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value.trim() !== VIDEOS_PASSWORD) {
    passwordMessage.textContent = "סיסמה לא נכונה";
    passwordInput.value = "";
    renderPasswordSlots();
    passwordInput.focus();
    return;
  }

  passwordMessage.textContent = "";
  window.open(DROPBOX_FOLDER_URL, "_blank", "noopener,noreferrer");
  closePasswordToast();
});

const restartVideo = () => {
  try {
    previewVideo.currentTime = 0;
  } catch {
    previewVideo.load();
  }
};

const playVideo = async () => {
  try {
    await previewVideo.play();
  } catch {
    previewVideo.muted = true;
    await previewVideo.play();
  }
};

const isVideoFullscreen = () =>
  document.fullscreenElement === previewVideo ||
  document.webkitFullscreenElement === previewVideo ||
  previewVideo.webkitDisplayingFullscreen;

const enterVideoFullscreen = async () => {
  if (previewVideo.requestFullscreen) {
    await previewVideo.requestFullscreen();
    return;
  }

  if (previewVideo.webkitRequestFullscreen) {
    previewVideo.webkitRequestFullscreen();
    return;
  }

  if (previewVideo.webkitEnterFullscreen) {
    previewVideo.webkitEnterFullscreen();
  }
};

const exitVideoFullscreen = async () => {
  if (document.exitFullscreen && document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }

  if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
    return;
  }

  if (previewVideo.webkitExitFullscreen && previewVideo.webkitDisplayingFullscreen) {
    previewVideo.webkitExitFullscreen();
  }
};

const startVideoWithAudio = async () => {
  restartVideo();
  previewVideo.muted = false;
  previewVideo.volume = 1;
  await playVideo();
};

const returnToPreviewLoop = async () => {
  await exitVideoFullscreen();
  previewVideo.muted = true;
  await playVideo();
};

let videoClickTimer;

previewVideo.addEventListener("click", () => {
  window.clearTimeout(videoClickTimer);
  videoClickTimer = window.setTimeout(startVideoWithAudio, 220);
});

previewVideo.addEventListener("dblclick", async (event) => {
  event.preventDefault();
  window.clearTimeout(videoClickTimer);

  if (isVideoFullscreen()) {
    await returnToPreviewLoop();
    return;
  }

  restartVideo();
  previewVideo.muted = false;
  previewVideo.volume = 1;
  try {
    await previewVideo.play();
    await enterVideoFullscreen();
  } catch {
    previewVideo.muted = true;
    await previewVideo.play();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    previewVideo.muted = true;
    playVideo();
  }
});

document.addEventListener("webkitfullscreenchange", () => {
  if (!document.webkitFullscreenElement) {
    previewVideo.muted = true;
    playVideo();
  }
});
