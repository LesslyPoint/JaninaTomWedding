// Get URL parameters
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const guestname = params.get('name');
const card = params.get('card');

// Auto-fill fields
if (id) document.getElementById('id').value = id;
if (guestname) document.getElementById('guestname').value = guestname;
if (card) document.getElementById('playingCard').value = card;

if (guestname) {
    const greeting = document.getElementById('name');
    greeting.textContent = guestname;
}

if (card) {
    const title = document.getElementById('cardID');
    title.textContent = card;
}

// Form submission handler
document.getElementById('questionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('id', document.getElementById('id').value);
    data.append('name', document.getElementById('guestname').value);
    data.append('plusOne', document.getElementById('plusOne').value);
    data.append('songRec', document.getElementById('songRec').value);
    data.append('gameRec', document.getElementById('gameRec').value);
    data.append('foodNeed', document.getElementById('foodNeed').value);
    data.append('playingCard', document.getElementById('playingCard').value);

    fetch('https://script.google.com/macros/s/AKfycbz748AUz-LqcQpP1Uh0SBOX0myVXjVJhLhz0CmoifxJUrC76j3jF4efbL4_4wQQMdY4rw/exec', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(result => alert('Submitted successfully!'))
    .catch(error => alert('Error submitting form.'));
});