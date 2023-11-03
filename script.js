const poems = {
    '🌼': 'A beautiful flower in the field,\nWith colors so vivid, it\'s a sight to behold.',
    '🌈': 'A rainbow in the sky so high,\nWith colors that paint, the canvas of the sky.',
    '🌟': 'A shining star in the dark of night,\nGuiding us with its gentle light.',
    '🐦': 'A bird that soars in the open sky,\nWith wings spread wide, it\'s flying high.',
    '🍕': 'A pizza with toppings so divine,\nIn every bite, it\'s a flavor party of mine.',
    '🌸': 'Blossoming flowers in the spring,\nNature\'s art, a delightful thing.',
    '🌞': 'The sun rises to start the day,\nWarming the earth in a golden display.',
    '🌍': 'Our planet Earth, a world so vast,\nA home for life, from first to last.',
    '🌷': 'Tulips in the garden, colors so bright,\nA symbol of love, a beautiful sight.',
    '🚀': 'A rocket in space, a thrilling flight,\nExploring the cosmos, day and night.',
    '🌱': 'A tiny seed in the soil it lay,\nGrowing into life, in its own special way.',
    '🌾': 'Fields of wheat swaying in the breeze,\nA sight that puts the mind at ease.',
    '🌋': 'A volcano\'s roar, a fiery display,\nNature\'s power in an awe-inspiring way.',
    '🌅': 'Sunset\'s hues in the evening sky,\nA peaceful moment as the day says goodbye.',
    '🍦': 'Ice cream scoop on a hot summer day,\nSweet and cold, in a delightful way.',
    '🌵': 'Desert cacti standing tall and strong,\nSurviving where it seems nothing belongs.',
    '🌉': 'City lights on a bridge at night,\nA sight that\'s truly a mesmerizing delight.',
    '🍪': 'A warm, freshly baked cookie\'s embrace,\nComfort in every sweet, gooey place.',
    '🌧': 'Raindrops fall from the sky above,\nNourishing the earth with nature\'s love.'
};

const emojiContainers = document.querySelectorAll('.emoji-container');
const poemElement = document.getElementById('poem');
const backButton = document.getElementById('back-button');

let selectedEmoji = null; // Track the selected emoji
let typingTimeout;
const typingSpeed = 5; // Adjust the speed of typing (milliseconds per character)

function typeText(text, index = 0) {
    if (index <= text.length) {
        poemElement.textContent = text.slice(0, index);
        typingTimeout = setTimeout(() => {
            typeText(text, index + 1);
        }, typingSpeed);
    }
}

function clearText() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
}

emojiContainers.forEach(emojiContainer => {
    emojiContainer.addEventListener('click', () => {
        const newSelectedEmoji = emojiContainer.getAttribute('data-emoji');
        
        if (newSelectedEmoji === selectedEmoji) {
            return; // If the same emoji is clicked, do nothing
        }
        
        emojiContainers.forEach(container => {
            container.style.opacity = 0.5;
            container.style.transform = 'scale(1)';
        });

        emojiContainer.style.opacity = 1;
        emojiContainer.style.transform = 'scale(1.5)';
        
        poemElement.style.transition = 'opacity 0.3s';
        poemElement.style.opacity = 0;

        clearText();

        if (poems[newSelectedEmoji]) {
            setTimeout(() => {
                typeText(poems[newSelectedEmoji]);
                poemElement.style.opacity = 1;
                backButton.style.display = 'inline-block';
            }, 300); // Delay the typing animation after fade-out
        } else {
            setTimeout(() => {
                typeText('No poem found for this emoji.');
                poemElement.style.opacity = 1;
                backButton.style.display = 'inline-block';
            }, 300); // Delay the typing animation after fade-out
        }

        selectedEmoji = newSelectedEmoji; // Update the selected emoji
    });
});

backButton.addEventListener('click', () => {
    emojiContainers.forEach(emojiContainer => {
        emojiContainer.style.opacity = 1;
        emojiContainer.style.transform = 'scale(1)';
    });
    clearText();
    poemElement.style.transition = 'opacity 0.3s';
    poemElement.style.opacity = 0;
    setTimeout(() => {
        poemElement.textContent = '';
        backButton.style.display = 'none'; // Hide the button when there's no text
    }, 200);
});
