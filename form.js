const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('statusMessage');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusMessage.textContent = ''; // Clears old errors

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const message = document.querySelector('#message').value.trim();

    const rules = [
        { isValid: name.length > 2, msg: 'Please enter a name (at least 2 characters).' },
        { isValid: email.includes('@') && email.includes('.'), msg: 'Please enter a valid email.' },
        { isValid: subject.length > 2, msg: 'Subject is required.' },
        { isValid: message.length >= 50, msg: 'Please use more than 50 characters.' }
    ];

    // 1. Create the list container ONCE
    const ul = document.createElement('ul');
    let hasErrors = false;

    // 2. Loop through and find errors
    rules.forEach(rule => {
        if (!rule.isValid) {
            hasErrors = true;
            const li = document.createElement('li');
            li.textContent = rule.msg;
            ul.appendChild(li);
        }
    });

    // 3. Decide what to show
    if (hasErrors) {
        statusMessage.style.color = "red";
        statusMessage.appendChild(ul);
    } else {
        statusMessage.textContent = "Processing your message...";
        statusMessage.style.color = "green";
        
        // Optional: create your object for the submissions array here
        const newSubmission = { name, email, subject, message };
        console.log("Success! Saved:", newSubmission);
        
        contactForm.reset(); 
    }
});