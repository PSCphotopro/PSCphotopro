let nameValue = '';
let photoTakenValue = '';
const nameInput = document.getElementById('name');
const photoTaken = document.getElementById('date');
const canvas = document.getElementById('photographcanvas');
const ctx = canvas.getContext('2d');

function updateCanvas() {
    const textHeight = 40;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, canvas.height - textHeight, canvas.width, textHeight);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.textRendering = 'optimizeLegibility';
    const textY = canvas.height - (textHeight / 2);
    ctx.fillText(nameValue, canvas.width / 2, textY - 10);
    ctx.fillText(photoTakenValue, canvas.width / 2, textY + 10);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const desiredWidth = 150;
                const desiredHeight = 200;
                canvas.width = desiredWidth;
                canvas.height = desiredHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                updateCanvas();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

nameInput.addEventListener('input', function() {
    nameValue = nameInput.value;
    updateCanvas();
});

photoTaken.addEventListener('input', function() {
    const dateValue = new Date(this.value);
    const day = dateValue.getDate().toString().padStart(2, '0');
    const month = (dateValue.getMonth() + 1).toString().padStart(2, '0');
    const year = dateValue.getFullYear();
    photoTakenValue = `${day}-${month}-${year}`;
    updateCanvas();
});

document.getElementById('photographInput').addEventListener('change', handleImageUpload);

document.getElementById('autographInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('autographcanvas');
                const ctx = canvas.getContext('2d');
                const desiredWidth = 150;
                const desiredHeight = 100;
                canvas.width = desiredWidth;
                canvas.height = desiredHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.querySelectorAll('#downlode-photo, #downlode-auto').forEach(btn => {
    btn.addEventListener('click', function() {
        let canvasId;
        let filename;
        if (btn.id === 'downlode-photo') {
            canvasId = 'photographcanvas';
            filename = 'photograph.jpg';
        } else if (btn.id === 'downlode-auto') {
            canvasId = 'autographcanvas'; 
            filename = 'autograph.jpg';
        }
        
        const canvas = document.getElementById(canvasId);
        const link = document.createElement('a');
        link.download = filename;

        const getImageDataURL = (quality) => canvas.toDataURL('image/jpeg', quality);

        const compressImage = async () => {
            let quality = 1.0; 
            let dataURL = getImageDataURL(quality);

            const getDataURLSize = (dataURL) => {
                return atob(dataURL.split(',')[1]).length;
            };

            while (true) {
                if (getDataURLSize(dataURL) <= 30720) { 
                    link.href = dataURL;
                    link.click();
                    break;
                } else if (quality <= 0.1) { 
                    alert('Image size is too large, and quality is reduced to the minimum.');
                    link.href = dataURL;
                    link.click();
                    break;
                } else {
                    quality -= 0.1; 
                    dataURL = getImageDataURL(quality);
                }
            }
        };

        compressImage();
    });
});

function toggleMenu() {
    nav.style.display = 'block';
}
    
let navBtn = document.getElementById('navClose');
let nav = document.getElementById('nav');

function showNav() {
    nav.style.display = 'block';
}

function hideNav() {
    nav.style.display = 'none';
}   

navBtn.addEventListener('click', function() {
    if (nav.style.display === 'none' || nav.style.display === '') {
        showNav();
    } else {
        hideNav();
    }
});

let example = document.getElementById('example');
document.getElementById('navHome').addEventListener('click', function() {
    nav.style.display = 'none';
});

document.getElementById('navInstructions').addEventListener('click', function() {
    window.location.href = 'https://www.keralapsc.gov.in/sites/default/files/inline-files/GENENGnew-instructions-to-candidates.pdf';
});

document.getElementById('navExample').addEventListener('click', function() {
    example.style.display = 'flex';
});

document.getElementById('exampleClose').addEventListener('click', function() {
    example.style.display = 'none';
});