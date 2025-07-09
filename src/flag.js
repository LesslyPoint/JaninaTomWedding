const flags = document.querySelectorAll('.flag');

const translations = {
en: {
    Greeting: "You are invited!",
    Married: "We are getting Married!",
    Date: "Our Wedding Date: August 15, 2026",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
    Location: "Wedding Location:",
    questions: "We ask a few things of you;",
    plusOne: "Do you have a Plus One?",
    songRec: "Recommend a song for the evening!",
    gameRec: "Recommend a game for us!",
    foodNeed: "What alergies and food preferences do you have?",
    call: "These are our contacts, write us your RSVP!"
},
at: {
    Greeting: "Sie sind Eingeladen!",
    Married: "Wir werden Heiraten!",
    Date: "Unser Hochzeits Datum: August 15, 2026",
    Days: "Tage",
    Hours: "Stunden",
    Minutes: "Minuten",
    Seconds: "Sekunden",
    Location: "Hochzeit Location:",
    questions: "Wir würden ein paar sachen von sie fragen;",
    plusOne: "Haben sie eine Plus Eins?",
    songRec: "Emphele uns ein Lied!",
    gameRec: "Emphele uns Ein Spiel!",
    foodNeed: "Welche Alergien oder Essensbedurfnisse haben sie?",
    call: "Unsere Kontakte, schreib uns eure RSVP!"
}
};

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || `[Missing translation: ${key}]`;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', translations[lang][key] || '');
    });
}


flags.forEach(flag => {
    flag.addEventListener('click', () => {
        flags.forEach(f => f.classList.remove('selected'));
        flag.classList.add('selected');

        const langCode = flag.getAttribute('data-lang');

        applyTranslations(langCode);
    });
});