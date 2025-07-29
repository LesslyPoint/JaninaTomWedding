const flags = document.querySelectorAll('.flag');

import { setupAnimatedText } from './letters.js';

const translations = {
en: {
    Greeting: "The wedding of:",
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
    request: "Would you be able to help us with the preperations?",
    foodNeed: "Do you have allergies, food intolerances or food preferences?",
    call: "These are our contacts, write us your RSVP!",
    imageCall: "Also, send us a photo of you!"
},
at: {
    Greeting: "Die Hochzeit von:",
    Married: "Wir werden Heiraten!",
    Date: "Unser Hochzeitsdatum: August 15, 2026",
    Days: "Tage",
    Hours: "Stunden",
    Minutes: "Minuten",
    Seconds: "Sekunden",
    Location: "Hochzeit Location:",
    questions: "Wir haben ein paar Fragen an dich;",
    plusOne: "Wer kommt mit dir zur Hochzeit?",
    songRec: "Welches Lied gehört auf die Playlist?",
    request: "Kannst du uns bei den Vorbereitungen unterstützen?",
    foodNeed: "Hast du Allergien, Lebensmittelunverträglichkeiten oder eine bevorzugte Ernährung?",
    call: "Unsere Kontakte, schreib uns eure RSVP!",
    imageCall: "Und schick uns ein Foto von dir!"
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

    setupAnimatedText();
}

flags.forEach(flag => {
    flag.addEventListener('click', () => {
        flags.forEach(f => f.classList.remove('selected'));
        flag.classList.add('selected');

        const langCode = flag.getAttribute('data-lang');

        applyTranslations(langCode);
    });
});