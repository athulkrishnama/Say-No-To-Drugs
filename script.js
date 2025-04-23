// Typewriter Effect for Title
function typewriterEffectTitle() {
    const text = "sayNoTo(drugs);";
    let index = 0;
    let isDeleting = false;
  
    function updateTitle() {
      if (!isDeleting && index < text.length) {
        // Add one character at a time
        document.title += text.charAt(index);
        index++;
        setTimeout(updateTitle, 150);
      } else if (!isDeleting && index === text.length) {
        // Pause before starting to delete
        isDeleting = true;
        setTimeout(updateTitle, 1000); 
      } else if (isDeleting && index > 1) {  // Start deleting only after the second character
        // Delete one character at a time
        document.title = text.substring(0, index - 1);
        index--;
        setTimeout(updateTitle, 100);
      } else {
        // After deleting, start typing again
        isDeleting = false;
        setTimeout(updateTitle, 500); // Pause before typing again
      }
    }
  
    updateTitle();
}

// Banner Animation for Title Text
function animateBannerText() {
    const bannerText = "Drugs Are Like a Memory Leak—They Drain You!";
    const bannerTextElement = document.getElementById("banner-text");
    let index = 0;

    function typeWriterBanner() {
        if (index < bannerText.length) {
            bannerTextElement.innerHTML += bannerText.charAt(index);
            index++;
            setTimeout(typeWriterBanner, 150);
        } else {
            setTimeout(() => {
                bannerTextElement.innerHTML = "";
                index = 0;
                typeWriterBanner(); // Restart after a pause
            }, 2000); // Pause for 2 seconds after completing the text
        }
    }

    typeWriterBanner();
}

// Navbar Shrinking Effect on Scroll
function navbarShrinkOnScroll() {
    window.onscroll = function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    };
}

// Call functions on page load
window.onload = function () {
    typewriterEffectTitle();
    animateBannerText();
    navbarShrinkOnScroll();

    // Future functions can be added here easily
    // Example: futureFunction();
};


// games
let timeLeft = 10;
let score = 0;
let timerInterval;
let timerStarted = false;

const trashItems = document.querySelectorAll('.drug-item');
const trashBin = document.getElementById('trash-bin');
const feedback = document.getElementById('trash-feedback');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const finalMessage = document.getElementById('final-message');

// Ensure proper dragstart handling for each item
trashItems.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', item.innerText.trim());
    item.classList.add('animate__pulse');
    
    if (!timerStarted) {
      timerStarted = true;
      startTimer(); // Start the timer only on first drag
    }
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('animate__pulse');
  });
});

trashBin.addEventListener('dragover', (e) => {
  e.preventDefault();
  trashBin.classList.add('bg-[#111111]');
});

trashBin.addEventListener('dragleave', () => {
  trashBin.classList.remove('bg-[#111111]');
});

trashBin.addEventListener('drop', (e) => {
  e.preventDefault();
  trashBin.classList.remove('bg-[#111111]');
  
  const itemText = e.dataTransfer.getData('text/plain');
  const validItems = ["Drug", "Cigarette", "Alcohol", "Injection", "Chemical"];
  
  const draggedItem = [...document.querySelectorAll('.drug-item')].find(i => i.innerText.trim() === itemText);

  if (!draggedItem) return; // If no dragged item found, return

  if (validItems.includes(itemText)) {
    score += 10;
    scoreEl.textContent = score;
    feedback.textContent = `"${itemText}" removed! ✅`;
    feedback.classList.add("text-green-400");
    feedback.classList.remove("text-red-400");

    // Animate and remove item after drop
    draggedItem.classList.add('animate__fadeOut');
    setTimeout(() => draggedItem.remove(), 500); // Remove item after fade-out animation
  } else {
    feedback.textContent = `"${itemText}" is not harmful! ❌`;
    feedback.classList.add("text-red-400");
    feedback.classList.remove("text-green-400");
  }

  checkWinCondition(); // Check win condition after the drop
});

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}

function checkWinCondition() {
  // Check if there are any harmful items left
  const remainingBad = [...document.querySelectorAll('.drug-item')].filter(item =>
    ["Drug", "Cigarette", "Alcohol", "Injection", "Chemical"].includes(item.innerText.trim())
  );
  if (remainingBad.length === 0) {
    clearInterval(timerInterval); // Stop the timer when all harmful items are removed
    endGame(true);
  }
}

function endGame(won) {
  finalMessage.classList.remove('hidden');
  finalMessage.classList.add('animate__fadeIn');
  finalMessage.textContent = won ? "🎉 You cleaned up all harmful items!" : "⏰ Time's up! Try again.";
  finalMessage.classList.add(won ? "text-green-400" : "text-red-400");
}



document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);
    
    // Sign button functionality
    const signButton = document.getElementById('sign-button');
    
    signButton.addEventListener('click', function() {
      const userName = document.getElementById('user-name').value.trim();
      
      if (userName) {
        // Trigger confetti animation
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
        
        (function frame() {
          const timeLeft = animationEnd - Date.now();
          
          if (timeLeft <= 0) {
            return;
          }
          
          const particleCount = 50;
          
          confetti({
            particleCount,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            origin: { y: 0.6 },
            colors: ['#8B4513', '#A0522D', '#CD853F', '#D2B48C', '#DEB887']
          });
          
          requestAnimationFrame(frame);
        }());
        
        // Change the button text after signing
        signButton.textContent = "Signed!";
        signButton.classList.add("bg-green-700");
        signButton.disabled = true;
        
        // Make the input field readonly
        document.getElementById('user-name').readOnly = true;
      } else {
        alert("Please enter your name before signing the pledge.");
      }
    });
  });