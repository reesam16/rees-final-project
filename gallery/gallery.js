const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.querySelector(".lightbox");
const lightBoxContent = document.querySelector(".lightbox-content");
const lightBoxImg = document.querySelector(".lightbox-content img");
const lightBoxPrev = document.querySelector(".lightbox-prev");
const lightBoxNext = document.querySelector(".lightbox-next");
const navbarHide = document.querySelector(".navbar");


let indexLb = 1;

//create function

function showLightBox(n) {
  if (n > galleryItem.length) {
    indexLb = 1;
  } else if (n < 1) {
    indexLb = galleryItem.length;
  }

  let imageLocation = galleryItem[indexLb - 1].children[0].getAttribute("src");
  lightBoxImg.setAttribute("src", imageLocation);
}

function currentImage() {
  lightBoxContainer.style.display = "flex";
  navbarHide.classList.add("hidden");
  let imageIndex = parseInt(this.getAttribute("data-index"));
  showLightBox((indexLb = imageIndex));
}

for (let i = 0; i < galleryItem.length; i++) {
  galleryItem[i].addEventListener("click", currentImage);
}

function sliderImage(n) {
  showLightBox((indexLb += n));
}

function prevImage() {
  sliderImage(-1);
}

function nextImage() {
  sliderImage(1);
}

lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

//close lightbox

function closeLightBox(e) {
  if (this === e.target) {
    lightBoxContainer.style.display = "none";
    navbarHide.classList.remove("hidden");
  }
}

lightBoxContainer.addEventListener("click", closeLightBox);
