history.scrollRestoration = "manual";

// Select all words
const words = document.querySelectorAll('.word');
const canvas = document.getElementById('lines');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Image mapping for each word
const wordImages = {
    'Nature': 'Nature.webp',
    'Emotions': 'Emotion.png',
    'Drawing': 'Drawing.jpg',
    'Experimenting': 'Experimenting.webp',
    'Politics': './Initials/Initials1.webp',
    'History': 'History.png',
    'Archiving': './Circle/circle colofon.webp',
    'Analog works': 'Analog.webp',
    'Ethnography of self': './Dreams photos/DreamWriting.webp',
    'Typography': './Line font/H_YevaVikhorieva_23.webp',
    'Culture/Ethno/Folk': './Sorochka/Sorochka1.webp',
    'Researching': './Airflow/ProcessBookAir.webp',
    'Books': './Circle/circlebook prev.webp',
    'Digital media': 'Digital.webp'
};

// Project mapping for each word
const wordProjects = {
    'Nature': [
        { name: 'Dreams', url: 'Dreams.html' }
    ],
    'Emotions': [
        { name: 'Dreams', url: 'Dreams.html' },
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ],
    'Drawing': [
        { name: 'Dreams', url: 'Dreams.html' }
    ],
    'Experimenting': [
        { name: 'Dreams', url: 'Dreams.html' },
        { name: 'Parkett vol.53-1998', url: 'Parkett.html' },
        { name: 'Airflow', url: 'Airflow.html' },
        { name: 'Line', url: 'Line.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ],
    'Politics': [
        { name: 'Initial War', url: 'Initial.html' }
    ],
    'History': [
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Sorochka Dance', url: 'Sorochka.html' }
    ],
    'Archiving': [
        { name: 'Circle as Sacred Symbol', url: 'CircleBook.html' }
    ],
    'Analog works': [
        { name: 'Dreams', url: 'Dreams.html' }
    ],
    'Ethnography of self': [
        { name: 'Dreams', url: 'Dreams.html' },
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Sorochka Dance', url: 'Sorochka.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ],
    'Typography': [
        { name: 'Line Font', url: 'project-typography.html' },
        { name: 'Parkett vol.53-1998', url: 'Parkett.html' },
        { name: 'Line', url: 'Line.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ],
    'Culture/Ethno/Folk': [
        { name: 'Circle as Sacred Symbol', url: 'CircleBook.html' },
        { name: 'Sorochka Dance', url: 'Sorochka.html' }
    ],
    'Researching': [
        { name: 'Circle as Sacred Symbol', url: 'CircleBook.html' },
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Sorochka Dance', url: 'Sorochka.html' },
        { name: 'Airflow', url: 'Airflow.html' },
        { name: 'Line', url: 'Line.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ],
    'Books': [
        { name: 'Circle as Sacred Symbol', url: 'CircleBook.html' },
        { name: 'Dreams', url: 'Dreams.html' },
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Parkett vol.53-1998', url: 'Parkett.html' },
        { name: 'Airflow', url: 'Airflow.html' }
    ],
    'Digital media': [
        { name: 'Circle as Sacred Symbol', url: 'CircleBook.html' },
        { name: 'Initial War', url: 'Initial.html' },
        { name: 'Sorochka Dance', url: 'Sorochka.html' },
        { name: 'Airflow', url: 'Airflow.html' },
        { name: 'Line', url: 'Line.html' },
        { name: 'Tofu no Tofu', url: 'Tofuport.html' }
    ]
};

const blurOverlay = document.getElementById('blur-overlay');
const popup = document.getElementById('project-popup');
const popupTitle = document.getElementById('popup-title');
const popupProjects = document.getElementById('popup-projects');
const closePopup = document.querySelector('.close-popup');

// Add hover and click listeners to each word
words.forEach(word => {
    const wordText = word.textContent;
    
    // Hover effect (blur background)
    word.addEventListener('mouseenter', () => {
        if (wordImages[wordText]) {
            blurOverlay.style.backgroundImage = `url('${wordImages[wordText]}')`;
            blurOverlay.style.opacity = '0.3';
        }
    });
    
    word.addEventListener('mouseleave', () => {
        blurOverlay.style.opacity = '0';
    });

    // Click effect (show popup next to word with boundary checking)
    word.addEventListener('click', (e) => {
        if (wordProjects[wordText]) {
            popupTitle.textContent = wordText;
            popupProjects.innerHTML = '';
            
            wordProjects[wordText].forEach(project => {
                const projectLink = document.createElement('a');
                projectLink.href = project.url;
                projectLink.className = 'popup-project-item';
                projectLink.textContent = project.name;
                popupProjects.appendChild(projectLink);
            });
            
            // Position popup next to the clicked word
            const rect = word.getBoundingClientRect();
            const popupWidth = 300;
            const popupHeight = 400;
            
            let leftPos = rect.right + 20;
            let topPos = rect.top;
            
            // Check if popup goes off right edge
            if (leftPos + popupWidth > window.innerWidth) {
                leftPos = rect.left - popupWidth - 20;
            }
            
            // Check if still off left edge
            if (leftPos < 0) {
                leftPos = 20;
            }
            
            // Check if popup goes off bottom edge
            if (topPos + popupHeight > window.innerHeight) {
                topPos = window.innerHeight - popupHeight - 20;
            }
            
            // Check if popup goes off top edge
            if (topPos < 0) {
                topPos = 20;
            }
            
            popup.style.left = leftPos + 'px';
            popup.style.top = topPos + 'px';
            
            popup.classList.add('active');
        }
    });
});

// Close popup
closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

// Close popup when scrolling to projects section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Close popup if scrolled past the first viewport (50vh)
    if (scrollPosition > window.innerHeight * 0.5) {
        popup.classList.remove('active');
    }
});

// Word nodes
let nodes = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Initialize nodes with safe boundaries
words.forEach(word => {
    nodes.push({
        el: word,
        x: random(100, window.innerWidth - 200),
        y: random(120, window.innerHeight - 100),
        vx: random(-0.2, 0.2),
        vy: random(-0.2, 0.2)
    });
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move nodes
    nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce from edges with safe boundaries
        if (n.x < 100 || n.x > window.innerWidth - 200) n.vx *= -1;
        if (n.y < 100 || n.y > window.innerHeight - 100) n.vy *= -1;

        // Apply to DOM
        n.el.style.left = n.x + 'px';
        n.el.style.top = n.y + 'px';
    });

    // Draw lines (distance-based)
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {

            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 300) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.68)';
                ctx.moveTo(nodes[i].x + 40, nodes[i].y + 10);
                ctx.lineTo(nodes[j].x + 40, nodes[j].y + 10);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Handle tag clicks on project images
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const wordText = tag.getAttribute('data-word');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Wait for scroll, then show popup
        setTimeout(() => {
            if (wordProjects[wordText]) {
                popupTitle.textContent = wordText;
                popupProjects.innerHTML = '';
                
                wordProjects[wordText].forEach(project => {
                    const projectLink = document.createElement('a');
                    projectLink.href = project.url;
                    projectLink.className = 'popup-project-item';
                    projectLink.textContent = project.name;
                    popupProjects.appendChild(projectLink);
                });
                
                // Find the word element to position popup
                const wordElement = Array.from(words).find(w => w.textContent === wordText);
                if (wordElement) {
                    const rect = wordElement.getBoundingClientRect();
                    popup.style.left = (rect.right + 20) + 'px';
                    popup.style.top = rect.top + 'px';
                }
                
                popup.classList.add('active');
            }
        }, 800);
    });
});