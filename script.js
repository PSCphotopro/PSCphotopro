document.addEventListener('DOMContentLoaded', function() {
    let autograph = document.getElementById('autograph');
    autograph.style.display = 'none';
    let photograph = document.getElementById('photograph');
    let photographBtn = document.getElementById('p1');
    let autographBtn = document.getElementById('p2');

    function updateButtonStyles() {
        if (autograph.style.display === 'flex') {
            photographBtn.style.borderBottom = '0px solid black';
            autographBtn.style.borderBottom = '5px solid hotpink';
        } else {
            photographBtn.style.borderBottom = '5px solid hotpink';
            autographBtn.style.borderBottom = '0px solid black';
        }
    }

    autographBtn.addEventListener('click', function() {
        photograph.style.display = 'none';
        autograph.style.display = 'flex';
        updateButtonStyles();
    });
    
    photographBtn.addEventListener('click', function() {
        photograph.style.display = 'flex';
        autograph.style.display = 'none';
        updateButtonStyles();
    });

    updateButtonStyles();

const welcomeTextElement = document.getElementById('welcome-txt');
const welcomeText = welcomeTextElement.textContent;
welcomeTextElement.textContent = '';

let index = 0;
const typingSpeed = 50; 

function typeText() {
    if (index < welcomeText.length) {
        // Append the next character to the element
        welcomeTextElement.textContent += welcomeText.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    }
}
typeText();
});