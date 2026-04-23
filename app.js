const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const link = document.querySelectorAll(".link");
// const nav = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

link.forEach((n) => {
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});


// slider code --------------------------------------

const track = document.querySelector('.slider-track');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');


if(nextBtn && track){
//STARTING point
let sliderIndex = 0;
//the amount it can move
//NOT USED!!!!! b/c does not work w/ mobile
// const maxIndex = 2; 



nextBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    //on mobile you have more moves so it uses 4
    const currMax = isMobile ? 4 : 2;
    if (sliderIndex < currMax) {
        sliderIndex++;
    } else {
        sliderIndex = 0; 
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    //on mobile you have more moves so it will uses 4
    const currMax = isMobile ? 4 : 2;
    if (sliderIndex > 0) {
        sliderIndex--;
    } else {
        sliderIndex = currMax;
    }
    updateSlider();
});

function updateSlider() {
    const isMobile = window.innerWidth <= 768;
    //sets distance of the move 100 is mobil
    //3.333 is for desktop
    const moveAmont = isMobile ? 100 : 33.333;
    //on mobile you have more moves so it uses 4
    const currMax = isMobile ? 4 : 2;

    //when browser is resized
    if(sliderIndex > currMax) sliderIndex = currMax;
    track.style.transform = `translateX(-${sliderIndex * moveAmont}%)`
    // 33% accounts for the 31% image width and the 2% gap
    // track.style.transform = `translateX(-${index * 33}%)`;
}

window.addEventListener('resize', updateSlider);
}



// Display comments on index page
function renderHomePreview() {
    //SAFTY CHECK: if not on index page do not run the function
    //checks for home page and willnot allow it to disp on contact pg
    const homeList = document.getElementById('home-submission-list');
    if (!homeList) return;
    //Data Retieval: converts stingified data in local storage 
    //parse turns data from "string" back to list[array] of obj
    const sharedData = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    //Clear the container so we do not double-post comments on refresh
    homeList.innerHTML = '';
    //feedback if no comments posted 
    if (sharedData.length === 0) {
        homeList.innerHTML = '<p>No comments yet. Be the first!</p>';
        return;
    }
    //slice() copy the array
    // reverse() puts the newest comments at the top for the homepage
    //slice(0,3) takes top 3
    const latestThree = sharedData.slice().reverse().slice(0, 3);

    //makes the display cards
    latestThree.forEach((sub) => {
        const previewCard = document.createElement('div');
        previewCard.className = 'message-card'; 
        previewCard.innerHTML = `
            <h4>${sub.name}</h4>
            <p>"${sub.message}"</p>
        `;
        //places the card on the page
        homeList.appendChild(previewCard);
    });
}

//runs the function 
renderHomePreview();
