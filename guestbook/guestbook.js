// 1. Storage & Initialization
let submissions = JSON.parse(localStorage.getItem('guestbookEntries')) || [];

const contactForm = document.getElementById('contact-form');
const statusMessage = document.getElementById('statusMessage');
const listArea = document.getElementById('submission-list');
const clearBtn = document.getElementById('clear-btn');

// 2. The Render Function (Cleaned up for Guestbook)
function renderSubmission() {
    listArea.innerHTML = '';

    if (submissions.length === 0) {
        clearBtn.classList.add('hidden');
        listArea.innerHTML = '<p>No messages yet. Be the first to sign!</p>';
    } else {
        clearBtn.classList.remove('hidden');
    }

    submissions.forEach((sub) => {
        const card = document.createElement('div');
        card.className = 'message-card';

        // We only show Name and Message for the Guestbook
        card.innerHTML = `
            <h4>${sub.name}</h4>
            <p>${sub.message}</p>
            <small>Posted on: ${sub.date || 'Recently'}</small>
        `;
        listArea.appendChild(card);
    });
}

// 3. The Submit Listener
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    statusMessage.textContent = '';

    const name = document.querySelector('#name').value.trim();
    const message = document.querySelector('#message').value.trim();

    // Rules for the Guestbook
    const rules = [
        { isValid: name.length >= 2, msg: 'Please enter a name (at least 2 characters).' },
        { isValid: message.length >= 10, msg: 'Please leave a slightly longer comment (at least 10 chars).' }
    ];

    let hasErrors = false;
    const ul = document.createElement('ul');

    rules.forEach(rule => {
        if (!rule.isValid) {
            hasErrors = true;
            const li = document.createElement('li');
            li.textContent = rule.msg;
            ul.appendChild(li);
        }
    });

    if (hasErrors) {
        statusMessage.style.color = 'red';
        statusMessage.appendChild(ul);
    } else {
        // Save logic
        const newSubmission = { 
            name, 
            message, 
            date: new Date().toLocaleDateString() 
        };
        
        submissions.push(newSubmission);
        localStorage.setItem('guestbookEntries', JSON.stringify(submissions));

        statusMessage.style.color = 'green';
        statusMessage.textContent = "Thanks for signing the book!";
        contactForm.reset();
        renderSubmission();
    }
});

// 4. The Clear Button
clearBtn.addEventListener('click', () => {
    if (confirm("Clear all guestbook entries?")) {
        submissions = [];
        localStorage.removeItem('guestbookEntries');
        renderSubmission();
    }
});

// Run immediately on load
renderSubmission();