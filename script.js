// NMap Drag-and-Drop Game with Dark Mode and Progress Bar
// --- Game Data ---
const questions = [
  {
    scenario: "Scan the host 192.168.1.1 for open ports 80 and 443, skipping host discovery.",
    answer: ["nmap", "-p 80,443", "-Pn", "192.168.1.1"],
    options: ["nmap", "-p 80,443", "-Pn", "192.168.1.1", "-O", "-T4", "-sU"],
    explanation: "-p 80,443 specifies the ports, -Pn skips host discovery, and the target is 192.168.1.1."
  },
  {
    scenario: "Detect the operating system of example.com.",
    answer: ["nmap", "-O", "example.com"],
    options: ["nmap", "-O", "example.com", "-sS", "-T4", "-Pn"],
    explanation: "-O enables OS detection."
  },
  {
    scenario: "Perform a fast scan on 10.0.0.5 using default scripts.",
    answer: ["nmap", "-F", "-sC", "10.0.0.5"],
    options: ["nmap", "-F", "-sC", "10.0.0.5", "-O", "-Pn"],
    explanation: "-F is fast scan, -sC runs default scripts."
  },
  {
    scenario: "Scan the top 100 most common ports on 172.16.0.1 and show only open ports.",
    answer: ["nmap", "--top-ports 100", "--open", "172.16.0.1"],
    options: ["nmap", "--top-ports 100", "--open", "172.16.0.1", "-O", "-T4", "-sU"],
    explanation: "--top-ports 100 scans the top 100 ports, --open shows only open ports."
  },
  {
    scenario: "Scan all UDP ports on 10.10.10.10 with no DNS resolution.",
    answer: ["nmap", "-sU", "-n", "10.10.10.10"],
    options: ["nmap", "-sU", "-n", "10.10.10.10", "-O", "-T4", "-Pn"],
    explanation: "-sU is UDP scan, -n disables DNS resolution."
  },
  {
    scenario: "Perform an aggressive scan on scanme.nmap.org with service version detection.",
    answer: ["nmap", "-A", "-sV", "scanme.nmap.org"],
    options: ["nmap", "-A", "-sV", "scanme.nmap.org", "-F", "-Pn", "-O"],
    explanation: "-A enables OS/service/script/traceroute, -sV detects service versions."
  },
  {
    scenario: "Scan the IPv6 address 2001:db8::1 for open ports.",
    answer: ["nmap", "-6", "2001:db8::1"],
    options: ["nmap", "-6", "2001:db8::1", "-O", "-T4", "-Pn"],
    explanation: "-6 enables IPv6 scanning."
  },
  {
    scenario: "Scan 192.168.56.101 for open ports 22, 80, and 443 with aggressive timing.",
    answer: ["nmap", "-T4", "-p 22,80,443", "192.168.56.101"],
    options: ["nmap", "-T4", "-p 22,80,443", "192.168.56.101", "-O", "-Pn", "-sU"],
    explanation: "-T4 is aggressive timing, -p specifies ports."
  },
  {
    scenario: "Scan example.com using default scripts and skip host discovery.",
    answer: ["nmap", "-sC", "-Pn", "example.com"],
    options: ["nmap", "-sC", "-Pn", "example.com", "-O", "-T4", "-sU"],
    explanation: "-sC runs default scripts, -Pn skips host discovery."
  },
  {
    scenario: "Scan 8.8.8.8 for open ports and never do DNS resolution.",
    answer: ["nmap", "-n", "8.8.8.8"],
    options: ["nmap", "-n", "8.8.8.8", "-O", "-T4", "-Pn"],
    explanation: "-n disables DNS resolution."
  },
  {
    scenario: "Scan a subnet 10.0.0.0/24 for live hosts only (no port scan).",
    answer: ["nmap", "-sn", "10.0.0.0/24"],
    options: ["nmap", "-sn", "10.0.0.0/24", "-O", "-T4", "-sU", "-F"],
    explanation: "-sn disables port scan, only host discovery."
  },
  {
    scenario: "Scan 192.168.0.10 for all TCP ports with service version detection.",
    answer: ["nmap", "-p-", "-sV", "192.168.0.10"],
    options: ["nmap", "-p-", "-sV", "192.168.0.10", "-O", "-Pn", "-sU"],
    explanation: "-p- scans all 65535 TCP ports, -sV detects service versions."
  },
  {
    scenario: "Scan example.org for open ports using a TCP SYN scan.",
    answer: ["nmap", "-sS", "example.org"],
    options: ["nmap", "-sS", "example.org", "-O", "-T4", "-sU", "-F"],
    explanation: "-sS is a TCP SYN scan."
  },
  {
    scenario: "Scan 203.0.113.5 for open ports and output results in XML format.",
    answer: ["nmap", "-oX", "output.xml", "203.0.113.5"],
    options: ["nmap", "-oX", "output.xml", "203.0.113.5", "-O", "-T4", "-sU"],
    explanation: "-oX output.xml saves results in XML format."
  },
  {
    scenario: "Scan 198.51.100.2 for open ports with a custom timing template (T2).",
    answer: ["nmap", "-T2", "198.51.100.2"],
    options: ["nmap", "-T2", "198.51.100.2", "-O", "-Pn", "-sU"],
    explanation: "-T2 sets a custom timing template."
  },
  {
    scenario: "Scan 10.10.10.20 for open ports and save output in grepable format.",
    answer: ["nmap", "-oG", "output.gnmap", "10.10.10.20"],
    options: ["nmap", "-oG", "output.gnmap", "10.10.10.20", "-O", "-T4", "-sU"],
    explanation: "-oG output.gnmap saves results in grepable format."
  },
  {
    scenario: "Scan 172.16.1.1 for open ports and enable verbose output.",
    answer: ["nmap", "-v", "172.16.1.1"],
    options: ["nmap", "-v", "172.16.1.1", "-O", "-T4", "-sU"],
    explanation: "-v enables verbose output."
  },
  {
    scenario: "Scan 192.0.2.1 for open ports and use a decoy address.",
    answer: ["nmap", "-D", "decoy.com", "192.0.2.1"],
    options: ["nmap", "-D", "decoy.com", "192.0.2.1", "-O", "-T4", "-sU"],
    explanation: "-D decoy.com uses a decoy address."
  },
  {
    scenario: "Scan 203.0.113.10 for open ports and use a custom source port 53.",
    answer: ["nmap", "--source-port", "53", "203.0.113.10"],
    options: ["nmap", "--source-port", "53", "203.0.113.10", "-O", "-T4", "-sU"],
    explanation: "--source-port 53 sets the source port."
  },
  {
    scenario: "Scan 192.168.100.1 for open ports using a TCP connect scan.",
    answer: ["nmap", "-sT", "192.168.100.1"],
    options: ["nmap", "-sT", "192.168.100.1", "-O", "-sU", "-T4"],
    explanation: "-sT performs a TCP connect scan."
  },
  {
    scenario: "Scan 10.1.1.1 for open ports and output results in normal format to a file.",
    answer: ["nmap", "-oN", "output.txt", "10.1.1.1"],
    options: ["nmap", "-oN", "output.txt", "10.1.1.1", "-O", "-sU", "-T4"],
    explanation: "-oN output.txt saves results in normal format."
  },
  {
    scenario: "Scan 203.0.113.20 for open ports and use a custom user agent.",
    answer: ["nmap", "--script-args", "http.useragent='Mozilla'", "203.0.113.20"],
    options: ["nmap", "--script-args", "http.useragent='Mozilla'", "203.0.113.20", "-O", "-sU", "-T4"],
    explanation: "--script-args http.useragent sets a custom user agent."
  },
  {
    scenario: "Scan 172.16.2.2 for open ports and use a specific interface eth0.",
    answer: ["nmap", "-e", "eth0", "172.16.2.2"],
    options: ["nmap", "-e", "eth0", "172.16.2.2", "-O", "-sU", "-T4"],
    explanation: "-e eth0 uses the specified network interface."
  },
  {
    scenario: "Scan 8.8.4.4 for open ports and use IPv6.",
    answer: ["nmap", "-6", "8.8.4.4"],
    options: ["nmap", "-6", "8.8.4.4", "-O", "-sU", "-T4"],
    explanation: "-6 enables IPv6 scanning."
  },
  {
    scenario: "Scan 10.0.0.2 for open ports and use a custom MTU of 32.",
    answer: ["nmap", "--mtu", "32", "10.0.0.2"],
    options: ["nmap", "--mtu", "32", "10.0.0.2", "-O", "-sU", "-T4"],
    explanation: "--mtu 32 sets the packet MTU."
  },
  {
    scenario: "Scan 192.168.1.100 for open ports and use a specific source IP address.",
    answer: ["nmap", "-S", "192.168.1.50", "192.168.1.100"],
    options: ["nmap", "-S", "192.168.1.50", "192.168.1.100", "-O", "-sU", "-T4"],
    explanation: "-S sets the source IP address."
  },
  {
    scenario: "Scan 203.0.113.30 for open ports and use a custom MAC address.",
    answer: ["nmap", "--spoof-mac", "00:11:22:33:44:55", "203.0.113.30"],
    options: ["nmap", "--spoof-mac", "00:11:22:33:44:55", "203.0.113.30", "-O", "-sU", "-T4"],
    explanation: "--spoof-mac sets a custom MAC address."
  },
  {
    scenario: "Scan 10.10.10.10 for open ports and increase verbosity.",
    answer: ["nmap", "-v", "-v", "10.10.10.10"],
    options: ["nmap", "-v", "-v", "10.10.10.10", "-O", "-sU", "-T4"],
    explanation: "-v -v increases verbosity."
  },
  {
    scenario: "Scan 192.0.2.200 for open ports and use a decoy address of 1.2.3.4.",
    answer: ["nmap", "-D", "1.2.3.4", "192.0.2.200"],
    options: ["nmap", "-D", "1.2.3.4", "192.0.2.200", "-O", "-sU", "-T4"],
    explanation: "-D 1.2.3.4 uses a decoy address."
  }
];

// --- Game Session Logic ---
let gameQuestions = [];
let current = 0;
let score = 0;

function startGame() {
  // Shuffle and select 10 random questions
  gameQuestions = shuffle(questions).slice(0, 10);
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  submitBtn.disabled = false;
  renderQuestion();
}

// --- DOM Elements ---
const scenarioEl = document.getElementById('scenario');
const dragOptionsEl = document.getElementById('drag-options');
const dropZoneEl = document.getElementById('drop-zone');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const playAgainBtn = document.getElementById('play-again-btn');
const congratsMessage = document.getElementById('congrats-message');

// --- Utility Functions ---
function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function renderQuestion() {
  // Clear drop zone and feedback
  dropZoneEl.innerHTML = '';
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  // Show scenario
  scenarioEl.textContent = gameQuestions[current].scenario;
  // Render draggable options
  dragOptionsEl.innerHTML = '';
  shuffle(gameQuestions[current].options).forEach((opt, i) => {
    const chip = document.createElement('div');
    chip.className = 'draggable-chip';
    chip.textContent = opt;
    chip.setAttribute('draggable', 'true');
    chip.setAttribute('data-value', opt);
    chip.setAttribute('tabindex', 0);
    // Drag events
    chip.addEventListener('dragstart', dragStart);
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        chip.setAttribute('aria-grabbed', 'true');
        dropZoneEl.appendChild(chip);
      }
    });
    // --- Touch events for mobile ---
    chip.addEventListener('touchstart', touchStartChip, { passive: false });
    dragOptionsEl.appendChild(chip);
  });
  updateProgressBar();
}

// --- Drag and Drop Logic ---
let dragged = null;
function dragStart(e) {
  dragged = e.target;
  setTimeout(() => dragged.classList.add('hide'), 0);
}

dragOptionsEl.addEventListener('dragend', (e) => {
  if (dragged) dragged.classList.remove('hide');
  dragged = null;
});

dropZoneEl.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZoneEl.classList.add('dragover');
});
dropZoneEl.addEventListener('dragleave', () => {
  dropZoneEl.classList.remove('dragover');
});
dropZoneEl.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragged) {
    dropZoneEl.appendChild(dragged);
    dropZoneEl.classList.remove('dragover');
    dragged = null;
  }
});

dragOptionsEl.addEventListener('dragover', (e) => e.preventDefault());
dragOptionsEl.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragged) {
    dragOptionsEl.appendChild(dragged);
    dragged = null;
  }
});

// --- Touch Drag-and-Drop Logic ---
let touchDraggedChip = null;
let touchClone = null;
function touchStartChip(e) {
  e.preventDefault();
  touchDraggedChip = e.currentTarget;
  // Create a visual clone to follow the finger
  touchClone = touchDraggedChip.cloneNode(true);
  touchClone.style.position = 'fixed';
  touchClone.style.pointerEvents = 'none';
  touchClone.style.opacity = '0.8';
  touchClone.style.zIndex = '99999';
  touchClone.style.left = e.touches[0].clientX - touchClone.offsetWidth / 2 + 'px';
  touchClone.style.top = e.touches[0].clientY - touchClone.offsetHeight / 2 + 'px';
  document.body.appendChild(touchClone);
  document.addEventListener('touchmove', touchMoveChip, { passive: false });
  document.addEventListener('touchend', touchEndChip, { passive: false });
}
function touchMoveChip(e) {
  e.preventDefault();
  if (!touchClone) return;
  touchClone.style.left = e.touches[0].clientX - touchClone.offsetWidth / 2 + 'px';
  touchClone.style.top = e.touches[0].clientY - touchClone.offsetHeight / 2 + 'px';
}
function touchEndChip(e) {
  e.preventDefault();
  if (!touchDraggedChip || !touchClone) return;
  // Get touch end coordinates
  const x = e.changedTouches[0].clientX;
  const y = e.changedTouches[0].clientY;
  // Check if over drop zone
  const dropRect = dropZoneEl.getBoundingClientRect();
  const optionsRect = dragOptionsEl.getBoundingClientRect();
  if (
    x >= dropRect.left && x <= dropRect.right &&
    y >= dropRect.top && y <= dropRect.bottom
  ) {
    dropZoneEl.appendChild(touchDraggedChip);
  } else if (
    x >= optionsRect.left && x <= optionsRect.right &&
    y >= optionsRect.top && y <= optionsRect.bottom
  ) {
    dragOptionsEl.appendChild(touchDraggedChip);
  }
  document.body.removeChild(touchClone);
  touchDraggedChip = null;
  touchClone = null;
  document.removeEventListener('touchmove', touchMoveChip);
  document.removeEventListener('touchend', touchEndChip);
}

// --- Submission Logic ---
submitBtn.addEventListener('click', () => {
  const assembled = Array.from(dropZoneEl.children).map(chip => chip.getAttribute('data-value'));
  const correct = gameQuestions[current].answer;
  if (JSON.stringify(assembled) === JSON.stringify(correct)) {
    score++;
    feedbackEl.textContent = 'Correct! ' + gameQuestions[current].explanation;
    feedbackEl.className = 'feedback correct';
    scoreEl.textContent = score;
    launchConfetti();
    setTimeout(nextQuestion, 1500);
  } else {
    feedbackEl.textContent = 'Incorrect. Try again!';
    feedbackEl.className = 'feedback incorrect';
  }
});

// --- Confetti Animation ---
function launchConfetti(numConfetti = 32) {
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.innerHTML = '';
  const colors = ['#f44336', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#00bcd4'];
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.transform = `rotateZ(${Math.random() * 360}deg)`;
    confetti.style.animationDelay = (Math.random() * 0.2) + 's';
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1400);
  }
}

function nextQuestion() {
  current++;
  if (current >= gameQuestions.length) {
    scenarioEl.textContent = 'Game Over! Your score: ' + score + ' / ' + gameQuestions.length;
    dragOptionsEl.innerHTML = '';
    dropZoneEl.innerHTML = '';
    feedbackEl.textContent = 'Refresh page to play again.';
    submitBtn.disabled = true;
    updateProgressBar();
    congratsMessage.style.display = 'flex';
    congratsMessage.style.animation = 'fadeInCongrats 1.2s 0.5s forwards';
    launchFinalConfetti(48); // Modern center burst
  } else {
    renderQuestion();
    submitBtn.disabled = false;
  }
}

// --- Modern Final Confetti Animation ---
function launchFinalConfetti(numConfetti = 48) {
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.innerHTML = '';
  const colors = ['#f44336', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#00bcd4', '#fff', '#3a47d5'];
  const shapes = ['circle', 'square', 'triangle', 'star'];
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'final-confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 12 + Math.random() * 16;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = 'none';
    confetti.style.position = 'fixed';
    // Center burst direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = 120 + Math.random() * 180;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    confetti.style.setProperty('--dx', `${dx}px`);
    confetti.style.setProperty('--dy', `${dy}px`);
    confetti.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
    // Shape rendering
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
      confetti.style.background = color;
    } else if (shape === 'square') {
      confetti.style.borderRadius = '18%';
      confetti.style.background = color;
    } else if (shape === 'triangle') {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.borderLeft = `${size/2}px solid transparent`;
      confetti.style.borderRight = `${size/2}px solid transparent`;
      confetti.style.borderBottom = `${size}px solid ${color}`;
      confetti.style.background = 'none';
    } else if (shape === 'star') {
      confetti.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"/></svg>`;
      confetti.style.background = 'none';
      confetti.style.display = 'flex';
      confetti.style.alignItems = 'center';
      confetti.style.justifyContent = 'center';
      confetti.style.padding = '0';
    }
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1600);
  }
}

function updateProgressBar() {
  const percent = ((current) / gameQuestions.length) * 100;
  progressBar.style.width = percent + '%';
}

// --- Dark Mode Logic ---
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark');
    localStorage.setItem('nmap-dark-mode', '1');
    darkModeSwitch.checked = true;
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('nmap-dark-mode', '0');
    darkModeSwitch.checked = false;
  }
}

darkModeSwitch.addEventListener('change', (e) => {
  setDarkMode(e.target.checked);
});

// On load, set dark mode from localStorage
(function() {
  const dark = localStorage.getItem('nmap-dark-mode');
  setDarkMode(dark === '1');
})();

// --- Start Game ---
startGame(); 