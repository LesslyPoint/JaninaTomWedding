document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".animated-text").forEach(textEl => {
        const words = textEl.textContent.trim().split(" ");
        textEl.innerHTML = words
        .map(word =>
            `<span class="word">${[...word]
            .map(char => `<span>${char}</span>`)
            .join("")}</span>`
        )
        .join("");

        textEl.querySelectorAll(".word").forEach(wordEl => {
            const letters = wordEl.querySelectorAll("span");

            letters.forEach((letterEl, index) => {
                letterEl.addEventListener("mouseenter", () => {
                    letters.forEach((l, i) => {
                        const distance = Math.abs(i - index);
                        setTimeout(() => {
                        const rotation = (Math.random() * 20 - 10).toFixed(1);
                        l.style.transform = `scale(1.2) rotate(${rotation}deg)`;
                        }, distance * 50);
                    });
                });

                letterEl.addEventListener("mouseleave", () => {
                const delayBeforeReverse = letters.length * 50 + 400;

                    letters.forEach((l, i) => {
                        const distance = Math.abs(i - index);
                        setTimeout(() => {
                        l.style.transform = '';
                        l.style.color = '';
                        }, delayBeforeReverse + distance * 50);
                    });
                });
            });
        });
    });
});
