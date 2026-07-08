const DROPBOX_FOLDER_URL = "https://www.dropbox.com/scl/fo/kflhaofy4irom5vztyz0q/AIiTjARjBpqNaPx9JrbEctg?rlkey=tgx39uh0lthyh0cpid2ha46iu&dl=0";
const PREVIEW_VIDEO_URL = "https://www.dropbox.com/scl/fi/nk3atva2eue6aj52w9pfb/0c8a90a7-69db-41db-9fbf-38a2e451706f.MP4?rlkey=wobgyoaxxp8mcprith5g08212&raw=1";
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

previewVideo.addEventListener("click", async () => {
  previewVideo.muted = !previewVideo.muted;

  try {
    await previewVideo.play();
  } catch {
    previewVideo.muted = true;
  }
});
