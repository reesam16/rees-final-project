
// 1. data storage created outside the listener
let submissions = [];


// Check if there is already data in array
const savedData = localStorage.getItem('mySubmissions');

// If there, turn the string back into an array and use it
if (savedData) {
    //turns the JSON back in to a usable array to display
    submissions = JSON.parse(savedData);
    renderSubmission(); // Run your function to show them on the screen immediately
}

const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('statusMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    statusMessage.textContent = '';

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const message = document.getElementById('message').value.trim();


    const rules = [
        { isValid: name.length > 2, msg: 'Please enter a name (at least 2 characters).' },
        { isValid: email.includes('@') && email.includes('.'), msg: 'Pleas enter valid email' },
        { isValid: subject.length > 2, msg: 'Subject is required.' },
        { isValid: message.length >= 10, msg: 'Please use more than 50 characters.' }
    ];

    const ul = document.createElement('ul');
    let hasErrors = false;

    //loop to find the errors and creates a ul
    rules.forEach(rule => {
        if (!rule.isValid) {
            hasErrors = true;
            const li = document.createElement('li');
            li.textContent = rule.msg;
            ul.appendChild(li);
        }
    });
    //decids what to show
    if (hasErrors) {

        statusMessage.style.color = 'red';
        statusMessage.appendChild(ul);

    } else {
        // 2. Save the data since it's valid!
        const newSubmission = { name, email, subject, message };
        //this adds submissions to the array
        submissions.push(newSubmission);

        //using global obj localStorage to store 
        //array of objs in browser
        //the method setItem makes this
        //the key mySubmissions and the value JSON verson of submissions
        localStorage.setItem('mySubmissions', JSON.stringify(submissions));

        // console.log(submissions.length)
        // console.log("Submissions so far:", submissions);

        statusMessage.style.color = 'green';
        statusMessage.textContent = "Success! Your message has been sent.";
        //clears the form
        contactForm.reset();

        // alert("Form Submitted and inputs will be Cleared with reset()")
        renderSubmission()
    }
});


function renderSubmission() {
    const listArea = document.getElementById('submission-list');
    const clearBtn = document.getElementById('clear-btn');//local var


    listArea.innerHTML = '';

///checks if the clear-btn should be displayed
if(submissions.length === 0){
    clearBtn.classList.add('hidden');
    listArea.innerHTML = '<p>No messages yet.</p>';
}else{
    clearBtn.classList.remove('hidden');
}

    submissions.forEach((sub) => {
        const card = document.createElement('div');
        card.className = 'message-card';

        card.innerHTML = `
        <h4>${sub.subject}</h4>
        <p><strong>From:</strong> ${sub.name} (${sub.email})</p>
        <p>${sub.message}</p>
        <hr>`;
        listArea.appendChild(card)
    })
}

const clearBtn = document.getElementById('clear-btn');//global var
clearBtn.addEventListener('click', () => {
    // Confirm with the user first
    if (confirm("Are you sure you want to delete all messages?")) {
        submissions = []; // Empty the live array
        localStorage.removeItem('mySubmissions'); // Wipe the storage
        renderSubmission(); // Redraw the UI (this will hide the button!)
    }
});