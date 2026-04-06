// ===== BONDR APP LOGIC =====

// Show a screen by ID
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

// Select connection intent
function selectIntent(btn) {
  document.querySelectorAll('.intent-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Toggle interest tags
let selectedInterests = [];
function toggleInterest(btn) {
  btn.classList.toggle('selected');
  const tag = btn.textContent.trim();
  if (btn.classList.contains('selected')) {
    selectedInterests.push(tag);
  } else {
    selectedInterests = selectedInterests.filter(t => t !== tag);
  }
  const count = selectedInterests.length;
  const countEl = document.getElementById('interest-count');
  const nextBtn = document.getElementById('interest-next');
  if (count === 0) {
    countEl.textContent = '0 selected — pick at least 3';
    countEl.style.color = '';
  } else if (count < 3) {
    countEl.textContent = `${count} selected — pick ${3 - count} more`;
    countEl.style.color = '#BA7517';
  } else {
    countEl.textContent = `${count} selected ✓ looking good!`;
    countEl.style.color = '#1D9E75';
  }
  nextBtn.disabled = count < 3;
}

// Bio character count
const bioEl = document.getElementById('profile-bio');
const charCountEl = document.getElementById('char-count');
if (bioEl && charCountEl) {
  bioEl.addEventListener('input', () => {
    const len = bioEl.value.length;
    charCountEl.textContent = `${len} / 150`;
    charCountEl.style.color = len > 130 ? '#BA7517' : '';
  });
}

// Photo preview
function triggerUpload() {
  document.getElementById('photo-input').click();
}
function previewPhoto(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.getElementById('avatar-preview');
      preview.innerHTML = `<img src="${e.target.result}" alt="profile photo">`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Open chat screen
function showChat(name, initials, color) {
  // Update chat nav
  const navAvatar = document.getElementById('chat-nav-avatar');
  const navName = document.getElementById('chat-nav-name');
  if (navAvatar && navName) {
    navAvatar.textContent = initials;
    navAvatar.style.background = color + '22';
    navAvatar.style.color = color;
    navName.textContent = name;
  }
  showScreen('screen-chat');
}

// Send a chat message
function sendMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!input || !messages) return;
  const text = input.value.trim();
  if (!text) return;

  // Add sent message
  const msg = document.createElement('div');
  msg.className = 'msg sent';
  msg.textContent = text;
  messages.appendChild(msg);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Simulate a reply after a short delay
  setTimeout(() => {
    const replies = [
      "that's so interesting! tell me more 😊",
      "haha yes!! totally agree with that 📸",
      "wow we really do have so much in common!",
      "I was thinking the exact same thing!",
      "okay now I'm even more curious about you 👀",
      "that made me smile honestly 😄",
      "100%! we should definitely meet up sometime",
    ];
    const reply = document.createElement('div');
    reply.className = 'msg received';
    reply.textContent = replies[Math.floor(Math.random() * replies.length)];
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

// Send spark prompt as message
function sendSpark() {
  const sparkText = document.getElementById('spark-text');
  const input = document.getElementById('chat-input');
  if (sparkText && input) {
    input.value = sparkText.textContent.replace(/"/g, '');
    sendMessage();
    // Hide spark bar
    const sparkBar = document.getElementById('spark-bar');
    if (sparkBar) sparkBar.style.display = 'none';
  }
}

// Report modal
function showReport() {
  document.getElementById('report-modal').style.display = 'flex';
}
function closeReport() {
  document.getElementById('report-modal').style.display = 'none';
}
function submitReport(btn) {
  document.getElementById('report-modal').style.display = 'none';
  document.getElementById('report-confirm').style.display = 'flex';
}

// Space join buttons
document.querySelectorAll('.space-join-btn:not(.joined-btn)').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'joined ✓';
    btn.classList.add('joined-btn');
    const card = btn.closest('.space-card');
    if (card) card.classList.add('joined');
  });
});

// Filter chips toggle
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.closest('.filter-chips').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

// Settings toggle items click
document.querySelectorAll('.toggle-item').forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.classList.contains('toggle')) return;
    const toggle = item.querySelector('.toggle');
    if (toggle) toggle.checked = !toggle.checked;
  });
});

// Animate match bar fills on page load
function animateMatchBars() {
  document.querySelectorAll('.match-bar-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = target; }, 300);
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-landing');
  animateMatchBars();
});
