// app.js - Logic điều khiển toàn bộ ứng dụng IELTS Solo Mastery

// State Management
let currentTab = 'dashboard';
let currentSpeakingIndex = 0;
let isRecording = false;
let speechRecognition = null;
let currentListeningBand = '4-5';
let userApiKey = localStorage.getItem('ielts_gemini_key') || '';

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons Render
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Load Saved Theme
  initTheme();

  // Load Checklist & Vocab & Theory
  renderDailyChecklist();
  renderVocabGrid('all');
  loadWritingPrompt();
  setupSpeechRecognition();
  initAudioPlayer();
  renderTheoryCards();
  updateTheoryProgressBadge();

  // Initialize Personalized Modules (Diagnostic, Cambridge Vocab, Bite-sized Drills, Stage-Gated Curriculum, Cambridge Master Library)
  initDiagnosticTest();
  initCamVocab();
  initBiteDrills();
  initStageCurriculum();
  initCamMasterLibrary();
  // Initialize Personalized 4-Skill Unified LMS, Check-in & Bank 100
  initDailyCheckin();
  updateBandRoadmapProgress();
  initUnifiedSkillTabs();
  initVocabVault();


  // Setup Nav Tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Setup Writing Input Listener
  const essayInput = document.getElementById('userEssayInput');
  if (essayInput) {
    essayInput.addEventListener('input', () => {
      const text = essayInput.value.trim();
      const count = text ? text.split(/\s+/).length : 0;
      document.getElementById('wordCount').innerText = count;
    });
  }

  // Theme Toggle Button
  const themeBtn = document.getElementById('toggleThemeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleDarkMode);
  }

  // API Key Modal Trigger
  const apiKeyBtn = document.getElementById('openApiKeyModalBtn');
  if (apiKeyBtn) {
    apiKeyBtn.addEventListener('click', openApiKeyModal);
  }

  // Listening Audio Trigger
  const playAudioBtn = document.getElementById('playListeningAudioBtn');
  if (playAudioBtn) {
    playAudioBtn.addEventListener('click', playListeningAudioPrompt);
  }
});

// 1. Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('ielts_theme') || 'light';
  if (savedTheme === 'dark' || (!('ielts_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ielts_theme', isDark ? 'dark' : 'light');
  if (window.lucide) window.lucide.createIcons();
}

// 2. Tab Navigation
function switchTab(tabId) {
  currentTab = tabId;

  // Hide all sections
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.add('hidden');
  });

  // Show selected section
  const activeSection = document.getElementById(`tab-${tabId}`);
  if (activeSection) {
    activeSection.classList.remove('hidden');
  }

  // Hook for 4-skill unified zones & vault
  if (['listening', 'reading', 'writing', 'speaking'].includes(tabId) && typeof switchSkillZone === 'function') {
    switchSkillZone(tabId, activeSkillZones[tabId]);
  } else if (tabId === 'vocabvault' && typeof renderVocabVault === 'function') {
    renderVocabVault();
  } else if (tabId === 'dashboard' && typeof initDailyCheckin === 'function') {
    initDailyCheckin();
    updateBandRoadmapProgress();
  }

  // Update Nav Button Styles
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    if (isTarget) {
      btn.className = "nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition active-tab bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800";
    } else {
      btn.className = "nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition";
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

// 3. Daily Checklist Rendering
function renderDailyChecklist() {
  const container = document.getElementById('dailyChecklistContainer');
  if (!container) return;

  container.innerHTML = '';
  IELTS_DATA.dailyTasks.forEach(task => {
    const div = document.createElement('div');
    div.className = `p-3 rounded-xl border transition flex items-center justify-between ${
      task.done 
        ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500 shadow-sm'
    }`;

    div.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTaskDone('${task.id}')" class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer">
        <div>
          <p class="text-xs font-semibold ${task.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}">
            ${task.title}
          </p>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${task.skill}</span>
            <span class="text-[10px] text-slate-400">• Dự kiến: ${task.timeEst}</span>
          </div>
        </div>
      </div>
      <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        task.tag.includes('Foundation') ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
      }">
        ${task.tag}
      </span>
    `;
    container.appendChild(div);
  });
}

function toggleTaskDone(taskId) {
  const task = IELTS_DATA.dailyTasks.find(t => t.id === taskId);
  if (task) {
    task.done = !task.done;
    renderDailyChecklist();
    if (task.done) {
      triggerConfetti();
      showToast("Xuất sắc! Bạn vừa hoàn thành thêm một mục tiêu hôm nay! 🎉");
    }
  }
}

// 4. Listening Hub Logic & Studio Audio Player
let listeningAudio = null;

function initAudioPlayer() {
  listeningAudio = document.getElementById('listeningAudioElement');
  if (!listeningAudio) return;

  loadListeningAudioTrack(currentListeningBand);

  listeningAudio.addEventListener('timeupdate', () => {
    if (!listeningAudio.duration) return;
    const current = listeningAudio.currentTime;
    const duration = listeningAudio.duration;
    const percent = (current / duration) * 100;

    const progressBar = document.getElementById('audioProgressBar');
    if (progressBar) progressBar.value = percent;

    const curDisplay = document.getElementById('currentTimeDisplay');
    if (curDisplay) curDisplay.innerText = formatAudioTime(current);

    const durDisplay = document.getElementById('totalDurationDisplay');
    if (durDisplay) durDisplay.innerText = formatAudioTime(duration);
  });

  listeningAudio.addEventListener('loadedmetadata', () => {
    const durDisplay = document.getElementById('totalDurationDisplay');
    if (durDisplay && listeningAudio.duration) {
      durDisplay.innerText = formatAudioTime(listeningAudio.duration);
    }
  });

  listeningAudio.addEventListener('ended', () => {
    updatePlayButtonUI(false);
    const progressBar = document.getElementById('audioProgressBar');
    if (progressBar) progressBar.value = 0;
  });
}

function loadListeningAudioTrack(band) {
  if (!listeningAudio) listeningAudio = document.getElementById('listeningAudioElement');
  const moduleData = IELTS_DATA.listeningModules[band];
  if (!moduleData || !listeningAudio) return;

  listeningAudio.src = moduleData.audioFile;
  listeningAudio.load();

  document.getElementById('audioTrackName').innerText = `Track: ${moduleData.audioFile.replace('audio/', '')}`;
  document.getElementById('audioVoiceBadge').innerText = `Giọng đọc: ${moduleData.voiceName}`;
  updatePlayButtonUI(false);
}

function toggleAudioPlayback() {
  if (!listeningAudio) listeningAudio = document.getElementById('listeningAudioElement');
  if (!listeningAudio) return;

  if (listeningAudio.paused) {
    listeningAudio.play().then(() => {
      updatePlayButtonUI(true);
      showToast("Đang phát Studio Neural Master chất lượng cao... 🎧");
    }).catch(err => {
      console.warn("Audio playback error:", err);
    });
  } else {
    listeningAudio.pause();
    updatePlayButtonUI(false);
  }
}

function updatePlayButtonUI(isPlaying) {
  const icon = document.getElementById('mainAudioPlayIcon');
  if (!icon) return;
  if (isPlaying) {
    icon.setAttribute('data-lucide', 'pause');
  } else {
    icon.setAttribute('data-lucide', 'play');
  }
  if (window.lucide) window.lucide.createIcons();
}

function seekAudio(percent) {
  if (!listeningAudio || !listeningAudio.duration) return;
  listeningAudio.currentTime = (percent / 100) * listeningAudio.duration;
}

function setAudioSpeed(speed) {
  if (!listeningAudio) return;
  listeningAudio.playbackRate = speed;
  document.querySelectorAll('.speed-btn').forEach(btn => {
    if (parseFloat(btn.getAttribute('data-speed')) === speed) {
      btn.className = "speed-btn px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold transition";
    } else {
      btn.className = "speed-btn px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-semibold transition";
    }
  });
  showToast(`Đã đổi tốc độ phát: ${speed}x`);
}

function replayAudio() {
  if (!listeningAudio) return;
  listeningAudio.currentTime = 0;
  listeningAudio.play();
  updatePlayButtonUI(true);
}

function formatAudioTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function filterSkillBand(skill, band) {
  currentListeningBand = band;
  document.querySelectorAll('.skill-band-btn').forEach(btn => {
    if (btn.getAttribute('data-band') === band) {
      btn.className = "skill-band-btn px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-sm";
    } else {
      btn.className = "skill-band-btn px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200";
    }
  });

  const moduleData = IELTS_DATA.listeningModules[band];
  if (moduleData) {
    document.getElementById('listeningTitle').innerText = moduleData.title;
    loadListeningAudioTrack(band);
    document.getElementById('listeningResultBox').classList.add('hidden');
    // Clear inputs
    ['listenAns1', 'listenAns2', 'listenAns3', 'listenAns4'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
}

function checkListeningAnswers() {
  const moduleData = IELTS_DATA.listeningModules[currentListeningBand];
  const ans1 = document.getElementById('listenAns1')?.value.trim().toLowerCase() || '';
  const ans2 = document.getElementById('listenAns2')?.value.trim().replace(/\s+/g, '') || '';
  const ans3 = document.getElementById('listenAns3')?.value.trim().toLowerCase() || '';
  const ans4 = document.getElementById('listenAns4')?.value.trim().toLowerCase() || '';

  let correctCount = 0;
  if (ans1.includes(moduleData.answers.ans1 || 'kensington')) correctCount++;
  if (ans2.includes((moduleData.answers.ans2 || '07700900543').replace(/\s+/g, ''))) correctCount++;
  if (ans3.includes(moduleData.answers.ans3 || 'sw1a 2aa')) correctCount++;
  if (ans4.includes(moduleData.answers.ans4 || 'afternoon')) correctCount++;

  const resultBox = document.getElementById('listeningResultBox');
  resultBox.classList.remove('hidden');

  if (correctCount >= 3) {
    resultBox.className = "p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs space-y-2";
    resultBox.innerHTML = `
      <div class="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
        <span>🎉 Xuất sắc: Đúng ${correctCount}/4 câu!</span>
      </div>
      <p>Bạn đã bắt rất chuẩn các thông tin số và chính tả Part 1. Hãy tiếp tục duy trì phong độ này để đạt mục tiêu 7.5 Listening!</p>
    `;
    triggerConfetti();
  } else {
    resultBox.className = "p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs space-y-2";
    resultBox.innerHTML = `
      <div class="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
        <span>⚠️ Kết quả: Đúng ${correctCount}/4 câu</span>
      </div>
      <p>Đừng nản lòng! Người học ở mức 4.0 - 4.5 thường dễ nhầm lẫn chữ <strong>G</strong> và <strong>J</strong> hoặc tốc độ đọc số điện thoại. Hãy bấm nút <em>"Xem Lời Thoại"</em> để đối chiếu nhé.</p>
    `;
  }
}

function revealListeningScript() {
  const moduleData = IELTS_DATA.listeningModules[currentListeningBand];
  const resultBox = document.getElementById('listeningResultBox');
  resultBox.classList.remove('hidden');
  resultBox.className = "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs space-y-3";
  resultBox.innerHTML = `
    <div class="font-bold text-slate-900 dark:text-white">📜 Lời Thoại (Transcript) & Bẫy Cần Chú Ý:</div>
    <p class="font-serif italic bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
      "${moduleData.audioText}"
    </p>
    <div class="whitespace-pre-line text-slate-600 dark:text-slate-300">
      ${moduleData.explanation}
    </div>
  `;
}

// 5. Reading Hub Logic
function checkReadingAnswers() {
  const ans1 = document.querySelector('input[name="tfng1"]:checked')?.value;
  const ans2 = document.querySelector('input[name="tfng2"]:checked')?.value;
  const ans3 = document.querySelector('input[name="tfng3"]:checked')?.value;

  const expected = IELTS_DATA.readingExercises.answers;
  const explanations = IELTS_DATA.readingExercises.explanations;

  let score = 0;
  if (ans1 === expected.tfng1) score++;
  if (ans2 === expected.tfng2) score++;
  if (ans3 === expected.tfng3) score++;

  const resultBox = document.getElementById('readingResultBox');
  resultBox.classList.remove('hidden');

  resultBox.className = "p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/40 text-xs space-y-3";
  resultBox.innerHTML = `
    <div class="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
      Kết quả: Đúng ${score}/3 câu
    </div>
    <div class="space-y-2 text-slate-700 dark:text-slate-300">
      <p><strong>Câu 1:</strong> Đáp án <strong>${expected.tfng1}</strong> (Bạn chọn: ${ans1 || 'Chưa chọn'}). <br><span class="text-slate-500">${explanations.tfng1}</span></p>
      <p><strong>Câu 2:</strong> Đáp án <strong>${expected.tfng2}</strong> (Bạn chọn: ${ans2 || 'Chưa chọn'}). <br><span class="text-slate-500">${explanations.tfng2}</span></p>
      <p><strong>Câu 3:</strong> Đáp án <strong>${expected.tfng3}</strong> (Bạn chọn: ${ans3 || 'Chưa chọn'}). <br><span class="text-slate-500">${explanations.tfng3}</span></p>
    </div>
  `;

  if (score === 3) {
    triggerConfetti();
    showToast("Chúc mừng! Bạn đã nắm trọn tư duy phân biệt TRUE - FALSE - NOT GIVEN! 🌟");
  }
}

// 6. Writing Hub Logic & 3-Tier Upgrade Engine
function loadWritingPrompt() {
  const select = document.getElementById('writingTaskSelect');
  if (!select) return;

  const key = select.value;
  const promptData = IELTS_DATA.writingPrompts[key];
  if (promptData) {
    document.getElementById('currentPromptDisplay').innerHTML = `
      <strong>Đề bài (${promptData.type}):</strong> <em>${promptData.question}</em>
    `;
    document.getElementById('writingAnalysisContainer').classList.add('hidden');
  }
}

function insertSampleStudentEssay() {
  const select = document.getElementById('writingTaskSelect');
  const key = select ? select.value : 'task2_tech';
  const promptData = IELTS_DATA.writingPrompts[key];
  if (promptData) {
    const input = document.getElementById('userEssayInput');
    input.value = promptData.sampleStudent45;
    const words = input.value.trim().split(/\s+/).length;
    document.getElementById('wordCount').innerText = words;
    showToast("Đã dán bài viết mẫu mức Band 4.5! Hãy nhấn nút Phân tích để xem phép màu 3 cấp độ.");
  }
}

function clearWritingEditor() {
  document.getElementById('userEssayInput').value = '';
  document.getElementById('wordCount').innerText = '0';
  document.getElementById('writingAnalysisContainer').classList.add('hidden');
}

function analyzeEssayUpgrade() {
  const input = document.getElementById('userEssayInput').value.trim();
  if (!input) {
    alert("Vui lòng nhập đoạn văn hoặc bài viết của bạn trước khi phân tích nhé!");
    return;
  }

  const select = document.getElementById('writingTaskSelect');
  const key = select ? select.value : 'task2_tech';
  const promptData = IELTS_DATA.writingPrompts[key];

  // Show Comparison
  const container = document.getElementById('writingAnalysisContainer');
  container.classList.remove('hidden');

  document.getElementById('tier45Text').innerText = input;
  document.getElementById('tier55Text').innerText = promptData.tier55;
  document.getElementById('tier70Text').innerText = promptData.tier70;

  // Render Vocab Upgrades
  const tbody = document.getElementById('vocabUpgradeTableBody');
  tbody.innerHTML = '';
  promptData.vocabUpgrades.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-100/60 dark:hover:bg-slate-800/40";
    tr.innerHTML = `
      <td class="py-2 text-red-500 font-mono font-medium">${item.basic}</td>
      <td class="py-2 text-indigo-600 dark:text-indigo-400 font-medium">${item.tactical}</td>
      <td class="py-2 text-brand-600 dark:text-brand-400 font-bold">${item.academic}</td>
      <td class="py-2">
        <button onclick="saveVocabToBank('${item.academic}', '${item.note}')" class="px-2 py-0.5 rounded bg-brand-100 hover:bg-brand-200 text-brand-800 dark:bg-brand-900/60 dark:text-brand-300 text-[10px] font-semibold transition">
          + Thêm vào sổ
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (window.lucide) window.lucide.createIcons();
  triggerConfetti();
  showToast("Đã đối chiếu thành công! Hãy quan sát sự khác biệt giữa 4.5 và 7.0+ 🚀");
}

function saveVocabToBank(word, note) {
  IELTS_DATA.vocabBank.push({
    word: word,
    type: "Collocation / Academic",
    ipa: "[Academic Upgrade]",
    meaning: note,
    collocation: word,
    example: "Key expression extracted from Writing Task 2 model.",
    category: "band7"
  });
  renderVocabGrid('all');
  showToast(`Đã lưu cụm từ "${word}" vào Sổ Tay Cá Nhân! 📚`);
}

// 7. Speaking Studio Logic
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.lang = 'en-US';
    speechRecognition.interimResults = true;

    speechRecognition.onstart = () => {
      isRecording = true;
      document.getElementById('micButton').classList.add('recording-pulse', 'bg-red-600');
      document.getElementById('micStatusText').innerText = "Đang lắng nghe bạn nói... (Hãy trả lời bằng tiếng Anh)";
      document.getElementById('micStatusText').classList.add('text-red-600');
    };

    speechRecognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      document.getElementById('transcribedSpeechBox').innerHTML = `
        <span class="text-slate-900 dark:text-white font-medium">"${interimTranscript}"</span>
      `;
    };

    speechRecognition.onend = () => {
      isRecording = false;
      document.getElementById('micButton').classList.remove('recording-pulse', 'bg-red-600');
      document.getElementById('micStatusText').innerText = "Đã thu âm xong! Bạn có thể xem bản ghi bên dưới";
      document.getElementById('micStatusText').classList.remove('text-red-600');
      showToast("Đã nhận diện giọng nói xong! 🎙️");
    };

    speechRecognition.onerror = (err) => {
      isRecording = false;
      document.getElementById('micButton').classList.remove('recording-pulse', 'bg-red-600');
      document.getElementById('micStatusText').innerText = "Không thể ghi âm hoặc bạn chưa cấp quyền mic";
      console.warn("Speech Recognition Error:", err);
    };
  } else {
    console.log("Web Speech Recognition không được trình duyệt hỗ trợ trực tiếp.");
  }
}

function toggleSpeechRecording() {
  if (!speechRecognition) {
    alert("Trình duyệt hiện tại chưa hỗ trợ Web Speech API trực tiếp. Bạn hãy mở trên Google Chrome để trải nghiệm tính năng thu âm nhận diện giọng nói này nhé!");
    return;
  }

  if (isRecording) {
    speechRecognition.stop();
  } else {
    try {
      speechRecognition.start();
    } catch (e) {
      console.warn(e);
    }
  }
}

function nextSpeakingQuestion() {
  currentSpeakingIndex = (currentSpeakingIndex + 1) % IELTS_DATA.speakingQuestions.length;
  const q = IELTS_DATA.speakingQuestions[currentSpeakingIndex];
  document.getElementById('speakingQuestionDisplay').innerText = `"${q.question}"`;
  document.getElementById('speaking45Text').innerText = q.ans45;
  document.getElementById('speaking55Text').innerText = q.ans55;
  document.getElementById('speaking70Text').innerText = q.ans70;
  document.getElementById('transcribedSpeechBox').innerHTML = `<em class="text-slate-400">Chưa có bản ghi âm nào...</em>`;
}

let speakingAudioPlayer = null;

function speakModelText(elementId) {
  const q = IELTS_DATA.speakingQuestions[currentSpeakingIndex];
  let targetAudioFile = null;

  if (elementId === 'speaking55Text' && q.audio55) {
    targetAudioFile = q.audio55;
  } else if (elementId === 'speaking70Text' && q.audio70) {
    targetAudioFile = q.audio70;
  }

  if (targetAudioFile) {
    if (speakingAudioPlayer) speakingAudioPlayer.pause();
    speakingAudioPlayer = new Audio(targetAudioFile);
    speakingAudioPlayer.play().then(() => {
      showToast("Đang phát âm mẫu giọng bản xứ chuẩn Studio Master... 🔊");
    }).catch(err => console.warn(err));
    return;
  }

  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.innerText;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;
    showToast("Đang phát âm mẫu giọng bản xứ chuẩn... 🔊");
    window.speechSynthesis.speak(utterance);
  }
}

// 8. Vocab & Mistake Bank Logic
function filterVocab(category) {
  document.querySelectorAll('.vocab-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.className = "vocab-filter-btn px-3 py-1 rounded-lg bg-purple-600 text-white font-semibold";
    } else {
      btn.className = "vocab-filter-btn px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  });
  renderVocabGrid(category);
}

function renderVocabGrid(category) {
  const container = document.getElementById('vocabGridContainer');
  if (!container) return;

  container.innerHTML = '';
  const filtered = category === 'all' 
    ? IELTS_DATA.vocabBank 
    : IELTS_DATA.vocabBank.filter(v => v.category === category);

  filtered.forEach(item => {
    const isMistake = item.category === 'mistake';
    const card = document.createElement('div');
    card.className = `p-4 rounded-xl border space-y-2.5 transition ${
      isMistake 
        ? 'border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/20' 
        : 'border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900 shadow-sm'
    }`;

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold ${isMistake ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400'}">${item.word}</span>
        <span class="text-[10px] px-2 py-0.5 rounded font-mono ${isMistake ? 'bg-red-100 dark:bg-red-900 text-red-700' : 'bg-purple-100 dark:bg-purple-900 text-purple-700'}">${item.ipa}</span>
      </div>
      <p class="text-xs text-slate-700 dark:text-slate-300 font-medium">${item.meaning}</p>
      <div class="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg space-y-1">
        <div><strong>Collocation:</strong> <em>${item.collocation}</em></div>
        <div><strong>Ví dụ:</strong> <em>${item.example}</em></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function openAddWordModal() {
  const word = prompt("Nhập từ vựng hoặc lỗi sai cần lưu:");
  if (!word) return;
  const meaning = prompt("Nhập ý nghĩa / cách dùng / cách sửa:");
  if (!meaning) return;

  IELTS_DATA.vocabBank.unshift({
    word: word,
    type: "Personal Note",
    ipa: "[Self Added]",
    meaning: meaning,
    collocation: word,
    example: "Custom personal study entry.",
    category: "band7"
  });
  renderVocabGrid('all');
  showToast(`Đã thêm "${word}" vào Sổ Tay! 🎯`);
}

// 9. Mini Mock Starter
function startMiniMock(type) {
  alert(`Bắt đầu bài thi thử mini 40 câu ${type.toUpperCase()}! Hãy giữ sự tập trung cao độ trong vòng thời gian quy định.`);
}

// 10. API Key Modal & Persistence
function openApiKeyModal() {
  const modal = document.getElementById('apiKeyModal');
  const input = document.getElementById('geminiApiKeyInput');
  if (modal && input) {
    input.value = userApiKey;
    modal.classList.remove('hidden');
  }
}

function closeApiKeyModal() {
  document.getElementById('apiKeyModal')?.classList.add('hidden');
}

function saveApiKey() {
  const key = document.getElementById('geminiApiKeyInput')?.value.trim() || '';
  userApiKey = key;
  localStorage.setItem('ielts_gemini_key', key);
  closeApiKeyModal();
  showToast("Đã lưu API Key thành công! Bạn có thể sử dụng AI không giới hạn.");
}

// Helpers: Toast Notification & Confetti
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  const text = document.getElementById('toastText');
  if (toast && text) {
    text.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
  }
}

function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  }
}

// ================= 11. THEORY HUB LOGIC =================
let currentTheorySkill = 'all';
let currentTheoryBand = 'all';
let activeModalLessonId = null;
let completedTheoryList = JSON.parse(localStorage.getItem('ielts_theory_completed') || '[]');

function filterTheorySkill(skill) {
  currentTheorySkill = skill;
  document.querySelectorAll('.theory-skill-btn').forEach(btn => {
    if (btn.getAttribute('data-skill') === skill) {
      btn.className = "theory-skill-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-sm";
    } else {
      btn.className = "theory-skill-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200";
    }
  });
  renderTheoryCards();
}

function filterTheoryBand(band) {
  currentTheoryBand = band;
  renderTheoryCards();
}

function renderTheoryCards() {
  const container = document.getElementById('theoryCardsContainer');
  if (!container || !IELTS_DATA.theoryLessons) return;

  container.innerHTML = '';

  const filtered = IELTS_DATA.theoryLessons.filter(lesson => {
    const matchSkill = currentTheorySkill === 'all' || lesson.skill === currentTheorySkill;
    const matchBand = currentTheoryBand === 'all' || lesson.band === currentTheoryBand;
    return matchSkill && matchBand;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs">
        <i data-lucide="book-open" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
        Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại.
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  filtered.forEach(lesson => {
    const isCompleted = completedTheoryList.includes(lesson.id);

    // Skill badge color styling
    let skillColor = 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300';
    let skillIcon = 'headphones';
    if (lesson.skill === 'reading') {
      skillColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300';
      skillIcon = 'book-open';
    } else if (lesson.skill === 'writing') {
      skillColor = 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300';
      skillIcon = 'pen-tool';
    } else if (lesson.skill === 'speaking') {
      skillColor = 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300';
      skillIcon = 'mic';
    }

    const card = document.createElement('div');
    card.className = `p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
      isCompleted 
        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm' 
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 hover:shadow-md'
    }`;

    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${skillColor} flex items-center gap-1">
              <i data-lucide="${skillIcon}" class="w-3 h-3"></i>
              ${lesson.skill}
            </span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              ${lesson.bandLabel}
            </span>
          </div>
          <span class="text-[10px] text-slate-400 flex items-center gap-1">
            <i data-lucide="clock" class="w-3 h-3"></i> ${lesson.readTime}
          </span>
        </div>

        <h3 class="font-bold text-slate-900 dark:text-white text-sm leading-snug cursor-pointer hover:text-indigo-600 transition" onclick="openTheoryModal('${lesson.id}')">
          ${lesson.title}
        </h3>

        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          ${lesson.summary}
        </p>
      </div>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button onclick="toggleTheoryCompleted('${lesson.id}')" class="text-xs font-semibold flex items-center gap-1.5 transition ${
          isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }">
          <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-4 h-4"></i>
          <span>${isCompleted ? 'Đã hiểu' : 'Chưa học'}</span>
        </button>

        <div class="flex items-center gap-2">
          <button onclick="openTheoryModal('${lesson.id}')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition">
            Đọc lý thuyết
          </button>
          <button onclick="switchTab('${lesson.practiceTab}')" class="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-semibold transition flex items-center gap-1">
            <span>Thực hành</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function openTheoryModal(lessonId) {
  const lesson = IELTS_DATA.theoryLessons.find(l => l.id === lessonId);
  if (!lesson) return;

  activeModalLessonId = lessonId;
  const isCompleted = completedTheoryList.includes(lessonId);

  document.getElementById('modalTheorySkillBadge').innerText = lesson.skill.toUpperCase();
  document.getElementById('modalTheoryBandBadge').innerText = lesson.bandLabel;
  document.getElementById('modalTheoryReadTime').innerText = `• ${lesson.readTime} đọc`;
  document.getElementById('modalTheoryTitle').innerText = lesson.title;
  document.getElementById('modalTheoryBody').innerHTML = lesson.contentHtml;

  const checkText = document.getElementById('modalMarkUnderstoodText');
  if (checkText) {
    checkText.innerText = isCompleted ? "Đã hiểu bài này (Click để bỏ)" : "Đánh dấu đã hiểu bài này";
  }

  const modal = document.getElementById('theoryModal');
  if (modal) {
    modal.classList.remove('hidden');
  }

  if (window.lucide) window.lucide.createIcons();
}

function closeTheoryModal() {
  document.getElementById('theoryModal')?.classList.add('hidden');
  activeModalLessonId = null;
}

function toggleTheoryCompleted(lessonId) {
  const idx = completedTheoryList.indexOf(lessonId);
  if (idx > -1) {
    completedTheoryList.splice(idx, 1);
  } else {
    completedTheoryList.push(lessonId);
    triggerConfetti();
    showToast("Chúc mừng! Bạn đã nắm vững thêm một bài lý thuyết cốt lõi! 💡");
  }

  localStorage.setItem('ielts_theory_completed', JSON.stringify(completedTheoryList));
  renderTheoryCards();
  updateTheoryProgressBadge();
}

function toggleTheoryCompletedCurrent() {
  if (activeModalLessonId) {
    toggleTheoryCompleted(activeModalLessonId);
    const isCompleted = completedTheoryList.includes(activeModalLessonId);
    const checkText = document.getElementById('modalMarkUnderstoodText');
    if (checkText) {
      checkText.innerText = isCompleted ? "Đã hiểu bài này (Click để bỏ)" : "Đánh dấu đã hiểu bài này";
    }
  }
}

function jumpToPracticeFromTheory() {
  if (!activeModalLessonId) return;
  const lesson = IELTS_DATA.theoryLessons.find(l => l.id === activeModalLessonId);
  closeTheoryModal();
  if (lesson && lesson.practiceTab) {
    switchTab(lesson.practiceTab);
    showToast(`Đã chuyển sang phòng thực hành ${lesson.skill.toUpperCase()}! Hãy vận dụng ngay lý thuyết vừa học nhé.`);
  }
}

function updateTheoryProgressBadge() {
  const badge = document.getElementById('theoryProgressBadge');
  if (badge && IELTS_DATA.theoryLessons) {
    const total = IELTS_DATA.theoryLessons.length;
    const completed = completedTheoryList.length;
    badge.innerText = `Đã hiểu: ${completed}/${total} bài`;
  }
}

// ================= 12. FULL TEST SIMULATOR ENGINE (40 QUESTIONS & BAND 9.0) =================
let activeExamType = null;
let examTimerInterval = null;
let examTimeRemaining = 0;
let examTotalSeconds = 0;
let userExamAnswers = {};
let activePassageNumber = 1;

function startFullTest(type) {
  activeExamType = type;
  userExamAnswers = {};
  
  const selectView = document.getElementById('fullTestSelectView');
  const arenaView = document.getElementById('activeExamArena');
  if (selectView) selectView.classList.add('hidden');
  if (arenaView) arenaView.classList.remove('hidden');

  if (type === 'reading') {
    document.getElementById('activeExamTitle').innerText = FULL_READING_TEST.title;
    document.getElementById('activeExamSubtitle').innerText = "40 câu hỏi • 60 phút • 3 Passages";
    examTotalSeconds = FULL_READING_TEST.durationMinutes * 60;
    examTimeRemaining = examTotalSeconds;
    
    document.getElementById('readingExamSplitView').classList.remove('hidden');
    switchExamPassage(1);
    renderReadingQuestions();
  } else if (type === 'listening') {
    document.getElementById('activeExamTitle').innerText = FULL_LISTENING_TEST.title;
    document.getElementById('activeExamSubtitle').innerText = "40 câu hỏi • 30 phút • 4 Sections Audio";
    examTotalSeconds = FULL_LISTENING_TEST.durationMinutes * 60;
    examTimeRemaining = examTotalSeconds;
    
    renderListeningQuestions();
  }

  renderExamPalette();
  updateAnsweredCounter();
  startExamTimer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

function startExamTimer() {
  if (examTimerInterval) clearInterval(examTimerInterval);
  updateTimerUI();

  examTimerInterval = setInterval(() => {
    examTimeRemaining--;
    updateTimerUI();

    if (examTimeRemaining <= 0) {
      clearInterval(examTimerInterval);
      alert("Hết giờ làm bài! Hệ thống sẽ tự động thu bài và chấm điểm.");
      submitExamForGrading();
    }
  }, 1000);
}

function updateTimerUI() {
  const display = document.getElementById('examTimerDisplay');
  if (!display) return;
  const mins = Math.floor(examTimeRemaining / 60);
  const secs = examTimeRemaining % 60;
  display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  if (examTimeRemaining < 300) {
    display.parentElement.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950 font-mono text-sm font-bold text-red-600 animate-pulse";
  } else {
    display.parentElement.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-slate-900 dark:text-white";
  }
}

function exitExamArena() {
  if (Object.keys(userExamAnswers).length > 0) {
    if (!confirm("Bạn có chắc chắn muốn rời khỏi phòng thi? Tiến trình làm bài hiện tại sẽ không được lưu.")) {
      return;
    }
  }
  if (examTimerInterval) clearInterval(examTimerInterval);
  document.getElementById('activeExamArena')?.classList.add('hidden');
  document.getElementById('fullTestSelectView')?.classList.remove('hidden');
}

function renderExamPalette() {
  const container = document.getElementById('questionPaletteContainer');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i <= 40; i++) {
    const isAnswered = userExamAnswers[i] !== undefined && userExamAnswers[i] !== '';
    const btn = document.createElement('button');
    btn.id = `palette-btn-${i}`;
    btn.className = `w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition ${
      isAnswered 
        ? 'bg-emerald-500 text-white font-bold shadow-sm' 
        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
    }`;
    btn.innerText = i;
    btn.onclick = () => scrollToExamQuestion(i);
    container.appendChild(btn);
  }
}

function scrollToExamQuestion(qNum) {
  if (activeExamType === 'reading') {
    if (qNum <= 13) switchExamPassage(1);
    else if (qNum <= 26) switchExamPassage(2);
    else switchExamPassage(3);
  }

  const targetEl = document.getElementById(`exam-q-${qNum}`);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.classList.add('ring-2', 'ring-emerald-500');
    setTimeout(() => targetEl.classList.remove('ring-2', 'ring-emerald-500'), 1500);
  }
}

function switchExamPassage(pNum) {
  activePassageNumber = pNum;
  const passage = FULL_READING_TEST.passages.find(p => p.number === pNum);
  if (!passage) return;

  document.querySelectorAll('.passage-tab-btn').forEach(btn => {
    if (parseInt(btn.getAttribute('data-pnum')) === pNum) {
      btn.className = "passage-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm";
    } else {
      btn.className = "passage-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200";
    }
  });

  document.getElementById('activePassageTitle').innerText = passage.title;
  document.getElementById('activePassageContent').innerHTML = passage.content.trim().split('\n\n').map(p => `<p class="mb-3">${p.trim()}</p>`).join('');
}

function renderReadingQuestions() {
  const container = document.getElementById('examQuestionsContainer');
  if (!container) return;
  container.innerHTML = '';

  FULL_READING_TEST.passages.forEach(p => {
    const sectionHeader = document.createElement('div');
    sectionHeader.className = "p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-slate-200 mt-4";
    sectionHeader.innerText = `Questions ${p.questions[0].qNum} - ${p.questions[p.questions.length - 1].qNum} (${p.title})`;
    container.appendChild(sectionHeader);

    p.questions.forEach(q => {
      const qDiv = document.createElement('div');
      qDiv.id = `exam-q-${q.qNum}`;
      qDiv.className = "p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs space-y-2 transition";

      if (q.type === 'tfng') {
        qDiv.innerHTML = `
          <div class="font-semibold text-slate-900 dark:text-white">
            <span class="inline-block w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-center font-bold mr-1.5">${q.qNum}</span>
            ${q.text}
          </div>
          <div class="flex gap-4 pt-1">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="exam_q_${q.qNum}" value="TRUE" onchange="recordExamAnswer(${q.qNum}, 'TRUE')"> TRUE
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="exam_q_${q.qNum}" value="FALSE" onchange="recordExamAnswer(${q.qNum}, 'FALSE')"> FALSE
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="exam_q_${q.qNum}" value="NOT GIVEN" onchange="recordExamAnswer(${q.qNum}, 'NOT GIVEN')"> NOT GIVEN
            </label>
          </div>
        `;
      } else if (q.type === 'mcq') {
        qDiv.innerHTML = `
          <div class="font-semibold text-slate-900 dark:text-white">
            <span class="inline-block w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-center font-bold mr-1.5">${q.qNum}</span>
            ${q.text}
          </div>
          <div class="space-y-1.5 pt-1">
            ${q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              return `
                <label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
                  <input type="radio" name="exam_q_${q.qNum}" value="${letter}" onchange="recordExamAnswer(${q.qNum}, '${letter}')">
                  <span><strong>${letter}.</strong> ${opt}</span>
                </label>
              `;
            }).join('')}
          </div>
        `;
      } else {
        qDiv.innerHTML = `
          <div class="font-semibold text-slate-900 dark:text-white">
            <span class="inline-block w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-center font-bold mr-1.5">${q.qNum}</span>
            ${q.text}
          </div>
          <div class="pt-1">
            <input type="text" placeholder="Nhập đáp án của bạn..." oninput="recordExamAnswer(${q.qNum}, this.value.trim())" class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500">
          </div>
        `;
      }

      container.appendChild(qDiv);
    });
  });
}

function renderListeningQuestions() {
  const container = document.getElementById('examQuestionsContainer');
  if (!container) return;
  container.innerHTML = '';

  FULL_LISTENING_TEST.sections.forEach(sec => {
    const secDiv = document.createElement('div');
    secDiv.className = "p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-3 mt-4";
    secDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-sm text-blue-900 dark:text-blue-200">${sec.title}</h4>
        <span class="text-[11px] text-blue-600 dark:text-blue-400 font-mono">Questions ${sec.questions[0].qNum} - ${sec.questions[sec.questions.length - 1].qNum}</span>
      </div>
      <audio controls src="${sec.audioTrack}" class="w-full h-8"></audio>
    `;
    container.appendChild(secDiv);

    sec.questions.forEach(q => {
      const qDiv = document.createElement('div');
      qDiv.id = `exam-q-${q.qNum}`;
      qDiv.className = "p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs space-y-2 transition";

      if (q.type === 'mcq') {
        qDiv.innerHTML = `
          <div class="font-semibold text-slate-900 dark:text-white">
            <span class="inline-block w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-center font-bold mr-1.5">${q.qNum}</span>
            ${q.prompt}
          </div>
          <div class="space-y-1.5 pt-1">
            ${q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              return `
                <label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50">
                  <input type="radio" name="exam_q_${q.qNum}" value="${letter}" onchange="recordExamAnswer(${q.qNum}, '${letter}')">
                  <span><strong>${letter}.</strong> ${opt}</span>
                </label>
              `;
            }).join('')}
          </div>
        `;
      } else {
        qDiv.innerHTML = `
          <div class="font-semibold text-slate-900 dark:text-white">
            <span class="inline-block w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-center font-bold mr-1.5">${q.qNum}</span>
            ${q.prompt}
          </div>
          <div class="pt-1">
            <input type="text" placeholder="Nhập đáp án của bạn..." oninput="recordExamAnswer(${q.qNum}, this.value.trim())" class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
          </div>
        `;
      }
      container.appendChild(qDiv);
    });
  });
}

function recordExamAnswer(qNum, value) {
  userExamAnswers[qNum] = value;
  
  const btn = document.getElementById(`palette-btn-${qNum}`);
  if (btn) {
    if (value !== '') {
      btn.className = "w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition bg-emerald-500 text-white shadow-sm";
    } else {
      btn.className = "w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  }

  updateAnsweredCounter();
}

function updateAnsweredCounter() {
  const answered = Object.values(userExamAnswers).filter(v => v !== '').length;
  const statusEl = document.getElementById('answeredStatusText');
  if (statusEl) {
    statusEl.innerText = `${answered}/40 đã làm`;
  }
}

function submitExamForGrading() {
  if (examTimerInterval) clearInterval(examTimerInterval);

  let correctCount = 0;
  const breakdownRows = [];
  const testData = activeExamType === 'reading' ? FULL_READING_TEST : FULL_LISTENING_TEST;

  const allQuestions = [];
  if (activeExamType === 'reading') {
    testData.passages.forEach(p => p.questions.forEach(q => allQuestions.push(q)));
  } else {
    testData.sections.forEach(s => s.questions.forEach(q => allQuestions.push(q)));
  }

  allQuestions.forEach(q => {
    const userVal = (userExamAnswers[q.qNum] || '').toString().trim().toLowerCase();
    const expected = (q.ans || '').toString().trim().toLowerCase();

    let isMatch = false;
    if (userVal === expected) {
      isMatch = true;
    } else if (expected.includes(userVal) && userVal.length >= 3) {
      isMatch = true;
    }

    if (isMatch) correctCount++;

    breakdownRows.push({
      num: q.qNum,
      userAns: userExamAnswers[q.qNum] || '<span class="text-slate-400 italic">Bỏ trống</span>',
      expected: q.ans,
      isCorrect: isMatch,
      explanation: q.exp
    });
  });

  const bandTable = IELTS_BAND_TABLE[activeExamType] || {};
  let bandScore = 3.5;
  if (bandTable[correctCount]) {
    bandScore = bandTable[correctCount];
  } else if (correctCount >= 39) {
    bandScore = 9.0;
  } else if (correctCount <= 7) {
    bandScore = 3.0;
  } else {
    bandScore = (correctCount >= 30) ? 7.0 : (correctCount >= 23 ? 6.0 : (correctCount >= 15 ? 5.0 : 4.0));
  }

  document.getElementById('modalRawScore').innerText = `${correctCount}/40`;
  document.getElementById('modalBandScore').innerText = bandScore.toFixed(1);

  const evalEl = document.getElementById('modalBandEvaluation');
  if (bandScore >= 7.0) {
    evalEl.innerText = "Xuất sắc! Chạm mốc Target 7.0+ 🏆";
    evalEl.className = "text-[11px] font-bold text-emerald-600 dark:text-emerald-400";
    triggerConfetti();
  } else if (bandScore >= 6.0) {
    evalEl.innerText = "Rất tốt! Bạn đang ở mức 6.0+, sắp đạt 7.0 rồi! 🚀";
    evalEl.className = "text-[11px] font-semibold text-blue-600 dark:text-blue-400";
  } else {
    evalEl.innerText = "Cần ôn thêm! Hãy xem lại các câu giải thích bên dưới nhé 💪";
    evalEl.className = "text-[11px] font-semibold text-amber-600 dark:text-amber-400";
  }

  const timeUsedSeconds = examTotalSeconds - examTimeRemaining;
  const minsUsed = Math.floor(timeUsedSeconds / 60);
  const secsUsed = timeUsedSeconds % 60;
  document.getElementById('modalTimeSpent').innerText = `${minsUsed.toString().padStart(2, '0')}:${secsUsed.toString().padStart(2, '0')}`;

  const tbody = document.getElementById('examResultTableBody');
  tbody.innerHTML = '';
  breakdownRows.forEach(row => {
    const tr = document.createElement('tr');
    tr.className = row.isCorrect ? 'bg-emerald-50/20 dark:bg-emerald-950/10' : 'bg-red-50/20 dark:bg-red-950/10';
    tr.innerHTML = `
      <td class="p-3 font-bold">${row.num}</td>
      <td class="p-3 font-medium ${row.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">${row.userAns}</td>
      <td class="p-3 font-bold text-slate-900 dark:text-white">${row.expected}</td>
      <td class="p-3">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
          row.isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }">
          ${row.isCorrect ? '✓ Đúng' : '✗ Sai'}
        </span>
      </td>
      <td class="p-3 text-[11px] text-slate-500 dark:text-slate-400">${row.explanation}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('fullTestResultModal')?.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeExamResultModal() {
  document.getElementById('fullTestResultModal')?.classList.add('hidden');
  document.getElementById('activeExamArena')?.classList.add('hidden');
  document.getElementById('fullTestSelectView')?.classList.remove('hidden');
}

// ================= 13. DIAGNOSTIC PLACEMENT TEST & INTERMITTENT SAVE/RESUME ENGINE =================
let currentDiagPart = 1;
let diagAnswers = JSON.parse(localStorage.getItem('ielts_diagnostic_answers') || '{}');

function initDiagnosticTest() {
  updateDiagPartsStatus();
  switchDiagPart(1);

  // Restore previous diagnosis if exists
  const savedResult = localStorage.getItem('ielts_diagnostic_result');
  if (savedResult) {
    try {
      const parsed = JSON.parse(savedResult);
      renderDiagReportFromSaved(parsed);
    } catch (e) {
      console.warn("Error restoring diagnostic result:", e);
    }
  }
}

function updateDiagPartsStatus() {
  if (typeof DIAGNOSTIC_TEST === 'undefined') return;

  DIAGNOSTIC_TEST.parts.forEach(part => {
    const answeredCount = part.questions.filter(q => {
      const val = diagAnswers[q.qNum];
      return val !== undefined && val !== null && String(val).trim() !== '';
    }).length;

    const statusEl = document.getElementById(`part${part.partNum}StatusText`);
    if (statusEl) {
      if (answeredCount === 0) {
        statusEl.innerText = "Chưa hoàn thành";
        statusEl.className = "text-[10px] text-slate-400 mt-1";
      } else if (answeredCount === part.questions.length) {
        statusEl.innerText = `✓ Đã xong (${answeredCount}/${part.questions.length})`;
        statusEl.className = "text-[10px] text-emerald-500 font-bold mt-1";
      } else {
        statusEl.innerText = `Đang làm (${answeredCount}/${part.questions.length})`;
        statusEl.className = "text-[10px] text-amber-500 font-medium mt-1";
      }
    }
  });
}

function switchDiagPart(partNum) {
  if (typeof DIAGNOSTIC_TEST === 'undefined') return;
  currentDiagPart = partNum;

  // Update part button tabs
  document.querySelectorAll('.diag-part-btn').forEach(btn => {
    const p = parseInt(btn.getAttribute('data-part'));
    if (p === partNum) {
      btn.className = "diag-part-btn p-3 rounded-xl border text-left transition bg-rose-600 text-white shadow-sm border-rose-600";
    } else {
      btn.className = "diag-part-btn p-3 rounded-xl border text-left transition bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-400";
    }
  });

  const part = DIAGNOSTIC_TEST.parts.find(p => p.partNum === partNum);
  if (part) {
    const titleEl = document.getElementById('activeDiagPartTitle');
    const estEl = document.getElementById('activeDiagPartEst');
    if (titleEl) titleEl.innerText = part.title;
    if (estEl) estEl.innerText = `Dự kiến: ${part.estTime}`;
  }

  // Update nav buttons
  const prevBtn = document.getElementById('prevDiagPartBtn');
  const nextBtn = document.getElementById('nextDiagPartBtn');
  const submitBtn = document.getElementById('submitDiagTestBtn');

  if (prevBtn) {
    if (partNum === 1) prevBtn.classList.add('hidden');
    else prevBtn.classList.remove('hidden');
  }

  if (nextBtn && submitBtn) {
    if (partNum === 4) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }
  }

  renderDiagQuestions(partNum);
  if (window.lucide) window.lucide.createIcons();
}

function renderDiagQuestions(partNum) {
  const container = document.getElementById('diagQuestionsContainer');
  if (!container || typeof DIAGNOSTIC_TEST === 'undefined') return;

  const part = DIAGNOSTIC_TEST.parts.find(p => p.partNum === partNum);
  if (!part) return;

  container.innerHTML = '';

  part.questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = "p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3";

    const currentVal = diagAnswers[q.qNum] || '';

    if (q.type === 'mcq') {
      const letters = ['A', 'B', 'C', 'D'];
      const optionsHtml = q.options.map((opt, optIdx) => {
        const letter = letters[optIdx];
        const isSelected = currentVal === letter;
        return `
          <button type="button" onclick="recordDiagAnswer(${q.qNum}, '${letter}')" class="w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
            isSelected 
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-semibold shadow-sm' 
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-rose-300'
          }">
            <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }">${letter}</span>
            <span class="text-xs pt-0.5">${opt}</span>
          </button>
        `;
      }).join('');

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
            <span class="inline-block px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-extrabold mr-1.5">Câu ${q.qNum}</span>
            ${q.question}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${currentVal ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}">
            ${currentVal ? 'Đã chọn' : 'Chưa chọn'}
          </span>
        </div>
        <div class="grid grid-cols-1 gap-2 pt-1">
          ${optionsHtml}
        </div>
      `;
    } else if (q.type === 'fill') {
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
            <span class="inline-block px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-extrabold mr-1.5">Câu ${q.qNum}</span>
            ${q.question}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${currentVal ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}">
            ${currentVal ? 'Đã điền' : 'Chưa điền'}
          </span>
        </div>
        <div class="pt-2">
          <div class="relative max-w-sm">
            <input type="text" value="${currentVal}" oninput="recordDiagAnswer(${q.qNum}, this.value)" placeholder="Nhập ký tự bạn chọn (ví dụ: A, G...)" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono uppercase focus:ring-2 focus:ring-rose-500 outline-none transition" />
            <span class="absolute right-3 top-2 text-[10px] text-slate-400">Tự động lưu</span>
          </div>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

function recordDiagAnswer(qNum, value) {
  diagAnswers[qNum] = (typeof value === 'string') ? value.trim().toUpperCase() : value;
  localStorage.setItem('ielts_diagnostic_answers', JSON.stringify(diagAnswers));

  // Visual auto-save feedback
  const saveText = document.getElementById('diagSaveText');
  if (saveText) {
    saveText.innerText = "✓ Vừa tự động lưu!";
    saveText.className = "text-emerald-600 dark:text-emerald-400 font-bold";
    setTimeout(() => {
      saveText.innerText = "Đã tự động lưu";
      saveText.className = "";
    }, 1200);
  }

  updateDiagPartsStatus();
  renderDiagQuestions(currentDiagPart);
}

function prevDiagPart() {
  if (currentDiagPart > 1) {
    switchDiagPart(currentDiagPart - 1);
  }
}

function nextDiagPart() {
  if (currentDiagPart < 4) {
    switchDiagPart(currentDiagPart + 1);
  }
}

function saveDiagnosticProgressManual() {
  localStorage.setItem('ielts_diagnostic_answers', JSON.stringify(diagAnswers));
  showToast("💾 Đã lưu tiến độ làm bài thành công! Bạn có thể yên tâm đóng trình duyệt.");
}

function resetDiagnosticProgress() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ câu trả lời và làm lại bài test chẩn đoán từ đầu?")) {
    localStorage.removeItem('ielts_diagnostic_answers');
    localStorage.removeItem('ielts_diagnostic_result');
    diagAnswers = {};
    updateDiagPartsStatus();
    switchDiagPart(1);
    document.getElementById('diagReportCard')?.classList.add('hidden');
    showToast("Đã đặt lại bài test đầu vào!");
  }
}

function submitDiagnosticTest() {
  if (typeof DIAGNOSTIC_TEST === 'undefined') return;

  const answeredCount = Object.keys(diagAnswers).filter(k => diagAnswers[k] && String(diagAnswers[k]).trim() !== '').length;
  if (answeredCount < 10) {
    const confirmProceed = confirm(`Bạn mới trả lời ${answeredCount}/20 câu hỏi. Bạn có muốn nộp ngay để xem kết quả chẩn đoán sơ bộ không?`);
    if (!confirmProceed) return;
  }

  let partScores = [0, 0, 0, 0];
  let totalScore = 0;
  let mistakes = [];

  DIAGNOSTIC_TEST.parts.forEach((part, pIdx) => {
    part.questions.forEach(q => {
      const userAns = (diagAnswers[q.qNum] || '').trim().toUpperCase();
      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = userAns === q.correct.toUpperCase();
      } else if (q.type === 'fill') {
        isCorrect = userAns === q.ans.toUpperCase();
      }

      if (isCorrect) {
        partScores[pIdx]++;
        totalScore++;
      } else {
        mistakes.push({
          partNum: part.partNum,
          partTitle: part.title,
          qNum: q.qNum,
          question: q.question,
          userAns: userAns || '(Chưa trả lời)',
          correctAns: q.correct || q.ans,
          explanation: q.explanation
        });
      }
    });
  });

  // Calculate estimated band
  let bandEstimate = "4.0 - 4.5";
  if (totalScore <= 6) {
    bandEstimate = "3.5 - 4.0 (Mất gốc / Chưa nắm thể thức)";
  } else if (totalScore <= 10) {
    bandEstimate = "4.0 - 4.6 (Nền tảng khởi điểm - Dễ dính bẫy)";
  } else if (totalScore <= 14) {
    bandEstimate = "5.0 - 5.5 (Khá - Cần chuẩn hóa logic Cam)";
  } else if (totalScore <= 17) {
    bandEstimate = "6.0 - 6.5 (Vững vàng - Chuẩn bị bứt phá 7.0)";
  } else {
    bandEstimate = "7.0+ (Xuất sắc - Nắm vững toàn diện)";
  }

  const resultData = {
    partScores,
    totalScore,
    bandEstimate,
    mistakes,
    date: new Date().toLocaleDateString('vi-VN')
  };

  localStorage.setItem('ielts_diagnostic_result', JSON.stringify(resultData));
  renderDiagReportFromSaved(resultData);

  const reportCard = document.getElementById('diagReportCard');
  if (reportCard) {
    reportCard.classList.remove('hidden');
    reportCard.scrollIntoView({ behavior: 'smooth' });
  }

  if (totalScore >= 12) triggerConfetti();
  showToast(`Đã hoàn tất chẩn đoán! Bạn đạt ${totalScore}/20 câu. Hãy đọc phân tích lỗ hổng bên dưới nhé.`);
}

function renderDiagReportFromSaved(resultData) {
  const estEl = document.getElementById('diagEstimatedBand');
  if (estEl) estEl.innerText = resultData.bandEstimate;

  const mEl = document.getElementById('scoreMindset');
  const lEl = document.getElementById('scoreListening');
  const rEl = document.getElementById('scoreReading');
  const gEl = document.getElementById('scoreGrammar');

  if (mEl) mEl.innerText = `${resultData.partScores[0]}/5`;
  if (lEl) lEl.innerText = `${resultData.partScores[1]}/5`;
  if (rEl) rEl.innerText = `${resultData.partScores[2]}/5`;
  if (gEl) gEl.innerText = `${resultData.partScores[3]}/5`;

  const gapsContainer = document.getElementById('diagGapsList');
  if (!gapsContainer) return;

  gapsContainer.innerHTML = '';

  if (!resultData.mistakes || resultData.mistakes.length === 0) {
    gapsContainer.innerHTML = `
      <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200">
        🎉 <strong>Tuyệt đối không có lỗ hổng cơ bản!</strong> Bạn đã nắm vững 100% tư duy và kỹ năng nền tảng. Hãy bắt tay vào làm các bài Full Test 40 câu ngay!
      </div>
    `;
    return;
  }

  // Define gap mapping
  const gapDescriptions = {
    1: { trap: "Chưa nắm rõ quy tắc tính điểm Overall & quy tắc làm tròn 0.25.", fix: "Xem lại tab 2. IELTS 101 để nắm trọn công thức làm tròn 0.25." },
    2: { trap: "Hiểu nhầm thời gian chuyển đáp án trong kỹ năng Reading.", fix: "Ghi nhớ: Reading không có 10 phút sang Answer Sheet như Listening!" },
    3: { trap: "Chưa nhận thức được tầm quan trọng cốt lõi của Paraphrasing trong cả 4 kỹ năng.", fix: "Học thuộc 18 từ vựng Cambridge cốt lõi ở tab 4. Nạp Từ Vựng." },
    4: { trap: "Chưa phân bổ đúng tỷ trọng thời gian giữa Writing Task 1 (1/3) và Task 2 (2/3).", fix: "Quy tắc: Dành 40 phút cho Task 2 (250 từ) và 20 phút cho Task 1 (150 từ)." },
    5: { trap: "Hiểu sai tiêu chí Pronunciation trong Speaking (nhầm với Accent).", fix: "IELTS không trừ điểm giọng địa phương; tập trung vào âm đuôi và trọng âm." },
    6: { trap: "Nhầm lẫn nguyên âm A (/eɪ/) với E (/iː/) hoặc I (/aɪ/) khi nghe đánh vần.", fix: "Luyện nghe đánh vần tên riêng ở tab Listening Chặng 1." },
    7: { trap: "Nhầm lẫn cặp phụ âm G (/dʒiː/) và J (/dʒeɪ/).", fix: "Ghi nhớ cặp G - J để không mất 1 điểm quý giá trong Part 1." },
    8: { trap: "Dễ dính bẫy Self-Correction (người nói đính chính lại số/tên).", fix: "Khi nghe thấy 'wait, actually, sorry', hãy gạch đáp án trước và ghi số sau cùng!" },
    9: { trap: "Chưa hiểu đúng quy tắc giới hạn từ 'NO MORE THAN ONE WORD AND/OR A NUMBER'.", fix: "'25 June' gồm 1 số và 1 chữ, hoàn toàn hợp lệ." },
    10: { trap: "Bỏ quên âm đuôi /s/ số nhiều làm mất điểm đáng tiếc.", fix: "Luôn chú ý âm đuôi /s/ trong danh từ số nhiều khi nghe điền từ." },
    11: { trap: "Chưa nhận diện cặp từ đồng nghĩa Paraphrase (established = founded).", fix: "Đọc bài lý thuyết 'Scan & Paraphrase' ở tab 3. Lý Thuyết." },
    12: { trap: "Mắc bẫy từ tuyệt đối (ONLY vs predominantly) dẫn đến chọn sai TRUE/FALSE.", fix: "Chỉ khi bài đọc có 'only' mới chọn TRUE; 'predominantly' là chủ yếu, nên câu hỏi dùng 'only' là FALSE." },
    13: { trap: "Tự suy diễn thông tin tác giả khi bài không đề cập (chọn nhầm TRUE thay vì NOT GIVEN).", fix: "Bài không nói về suy nghĩ 'greatest achievement' ➔ Tuyệt đối là NOT GIVEN." },
    14: { trap: "Nhầm lẫn giữa từ đồng nghĩa và từ trái nghĩa C1 (Mitigate vs Exacerbate).", fix: "Học từ 'Mitigate' trong tab 4. Nạp Từ Vựng Cambridge." },
    15: { trap: "Chưa nắm chiến thuật Skim câu đầu/câu cuối trong dạng Matching Headings.", fix: "Đọc bài 'Matching Headings 3 Bước' ở tab 3. Lý Thuyết." },
    16: { trap: "Thói quen tư duy tiếng Việt dùng liên từ kép (Although... but / Because... so).", fix: "Quy tắc vàng: Đã dùng 'Although' thì tuyệt đối không có 'but' trong câu." },
    17: { trap: "Mắc lỗi câu què (Sentence Fragment) do mệnh đề Because đứng một mình.", fix: "Mệnh đề phụ thuộc luôn phải có mệnh đề chính đi kèm." },
    18: { trap: "Chia sai động từ sau cấu trúc 'A proportion of + Danh từ số nhiều'.", fix: "Động từ chia theo danh từ phía sau cụm (individuals ➔ are)." },
    19: { trap: "Chưa biết áp dụng kỹ thuật Nominalization (Danh từ hóa) để nâng band viết.", fix: "Học bài 'Nominalization 7.0' ở tab 3. Lý Thuyết." },
    20: { trap: "Chưa nắm cấu trúc đoạn thân bài chuẩn mực PEEL (Point - Explain - Example - Link).", fix: "Áp dụng cấu trúc PEEL trong Writing Studio 3 Band." }
  };

  resultData.mistakes.slice(0, 6).forEach(m => {
    const gapInfo = gapDescriptions[m.qNum] || { trap: m.explanation, fix: "Ôn tập lại dạng bài tương ứng ở tab Lý Thuyết." };
    const div = document.createElement('div');
    div.className = "p-3 rounded-xl bg-white/5 border border-white/10 space-y-1";
    div.innerHTML = `
      <div class="flex items-center justify-between text-[11px]">
        <span class="font-bold text-amber-300">Câu ${m.qNum}: ${m.partTitle.split(':')[0]}</span>
        <span class="text-rose-400">Bạn chọn: <strong>${m.userAns}</strong> (Đáp án đúng: <strong>${m.correctAns}</strong>)</span>
      </div>
      <p class="text-slate-200">⚠️ <strong>Bắt bệnh:</strong> ${gapInfo.trap}</p>
      <p class="text-indigo-300">💡 <strong>Thuốc chữa:</strong> ${gapInfo.fix}</p>
    `;
    gapsContainer.appendChild(div);
  });
}

// ================= 14. CAMBRIDGE VOCABULARY BANK & FLASHCARD ENGINE =================
let currentCamVocabFilter = 'all';
let currentCamVocabViewMode = 'grid';
let currentFlashcardIndex = 0;
let isFlashcardFlipped = false;
let camVocabStatus = JSON.parse(localStorage.getItem('ielts_cam_vocab_status') || '{}');

function initCamVocab() {
  if (typeof CAMBRIDGE_VOCAB_BANK === 'undefined') return;

  const totalEl = document.getElementById('camTotalCount');
  if (totalEl) totalEl.innerText = CAMBRIDGE_VOCAB_BANK.length;

  updateCamVocabStats();
  renderCamVocabGrid('all');
}

function updateCamVocabStats() {
  if (typeof CAMBRIDGE_VOCAB_BANK === 'undefined') return;

  const mastered = CAMBRIDGE_VOCAB_BANK.filter(v => camVocabStatus[v.id] === 'mastered').length;
  const review = CAMBRIDGE_VOCAB_BANK.filter(v => camVocabStatus[v.id] === 'review').length;
  const learning = CAMBRIDGE_VOCAB_BANK.length - mastered - review;

  const mCount = document.getElementById('camMasteredCount');
  const sMastered = document.getElementById('statMastered');
  const sLearning = document.getElementById('statLearning');
  const sReview = document.getElementById('statReview');

  if (mCount) mCount.innerText = mastered;
  if (sMastered) sMastered.innerText = `${mastered} Đã thuộc`;
  if (sLearning) sLearning.innerText = `${learning} Đang học`;
  if (sReview) sReview.innerText = `${review} Cần ôn lại`;
}

function filterCamVocabTheme(theme) {
  currentCamVocabFilter = theme;

  document.querySelectorAll('.cam-vocab-theme-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === theme) {
      btn.className = "cam-vocab-theme-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white shadow-sm";
    } else {
      btn.className = "cam-vocab-theme-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200";
    }
  });

  renderCamVocabGrid(theme);

  if (currentCamVocabViewMode === 'flashcard') {
    currentFlashcardIndex = 0;
    isFlashcardFlipped = false;
    renderCurrentFlashcard();
  }
}

function renderCamVocabGrid(theme) {
  const container = document.getElementById('camVocabGrid');
  if (!container || typeof CAMBRIDGE_VOCAB_BANK === 'undefined') return;

  const list = (theme === 'all') 
    ? CAMBRIDGE_VOCAB_BANK 
    : CAMBRIDGE_VOCAB_BANK.filter(v => v.theme === theme);

  container.innerHTML = '';

  list.forEach(item => {
    const status = camVocabStatus[item.id] || 'learning';
    const card = document.createElement('div');
    card.className = "p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-300 dark:hover:border-purple-800 transition";

    card.innerHTML = `
      <div class="space-y-2.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-base font-extrabold text-slate-900 dark:text-white">${item.word}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              item.type === 'noun' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300' :
              item.type === 'verb' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300' :
              'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
            }">${item.type}</span>
          </div>
          <button onclick="pronounceCamWord('${item.word}')" class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 text-slate-600 hover:text-purple-600 flex items-center justify-center transition" title="Nghe phát âm bản xứ">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-400">
          <span class="font-mono text-purple-600 dark:text-purple-400">${item.ipa}</span>
          <span class="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-slate-500">${item.camSource}</span>
        </div>

        <p class="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
          ${item.meaning}
        </p>

        <div class="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">Collocation Cốt Lõi:</span>
          <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${item.collocation}</span>
        </div>

        <div class="text-[11px] text-slate-500 dark:text-slate-400 italic">
          "${item.example}"
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 text-[11px]">
        <button onclick="setCamVocabStatus('${item.id}', 'mastered')" class="px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 ${
          status === 'mastered' 
            ? 'bg-emerald-600 text-white shadow-sm' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600'
        }">
          <span>✓ Đã thuộc</span>
        </button>
        <button onclick="setCamVocabStatus('${item.id}', 'learning')" class="px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 ${
          status === 'learning' 
            ? 'bg-purple-600 text-white shadow-sm' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600'
        }">
          <span>📖 Đang học</span>
        </button>
        <button onclick="setCamVocabStatus('${item.id}', 'review')" class="px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 ${
          status === 'review' 
            ? 'bg-amber-600 text-white shadow-sm' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600'
        }">
          <span>⚠️ Cần ôn</span>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function setCamVocabStatus(id, newStatus) {
  camVocabStatus[id] = newStatus;
  localStorage.setItem('ielts_cam_vocab_status', JSON.stringify(camVocabStatus));
  updateCamVocabStats();
  renderCamVocabGrid(currentCamVocabFilter);

  if (currentCamVocabViewMode === 'flashcard') {
    renderCurrentFlashcard();
  }

  if (newStatus === 'mastered') {
    triggerConfetti();
    showToast("Chúc mừng! Đã nạp thành công 1 từ vựng Cambridge cốt lõi! 🎓");
  }
}

function toggleVocabViewMode(mode) {
  currentCamVocabViewMode = mode;
  const gridEl = document.getElementById('camVocabGrid');
  const deckEl = document.getElementById('camFlashcardDeck');
  const gridBtn = document.getElementById('viewModeGridBtn');
  const deckBtn = document.getElementById('viewModeFlashcardBtn');

  if (mode === 'grid') {
    gridEl?.classList.remove('hidden');
    deckEl?.classList.add('hidden');
    if (gridBtn) gridBtn.className = "px-3 py-1.5 rounded-lg bg-purple-600 text-white font-semibold text-xs shadow-sm";
    if (deckBtn) deckBtn.className = "px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs hover:bg-slate-200";
    renderCamVocabGrid(currentCamVocabFilter);
  } else {
    gridEl?.classList.add('hidden');
    deckEl?.classList.remove('hidden');
    if (deckBtn) deckBtn.className = "px-3 py-1.5 rounded-lg bg-purple-600 text-white font-semibold text-xs shadow-sm";
    if (gridBtn) gridBtn.className = "px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs hover:bg-slate-200";
    currentFlashcardIndex = 0;
    isFlashcardFlipped = false;
    renderCurrentFlashcard();
  }
}

function getFilteredCamVocabList() {
  if (typeof CAMBRIDGE_VOCAB_BANK === 'undefined') return [];
  return (currentCamVocabFilter === 'all') 
    ? CAMBRIDGE_VOCAB_BANK 
    : CAMBRIDGE_VOCAB_BANK.filter(v => v.theme === currentCamVocabFilter);
}

function renderCurrentFlashcard() {
  const list = getFilteredCamVocabList();
  if (list.length === 0) return;

  if (currentFlashcardIndex >= list.length) currentFlashcardIndex = 0;
  if (currentFlashcardIndex < 0) currentFlashcardIndex = list.length - 1;

  const item = list[currentFlashcardIndex];
  const counterEl = document.getElementById('flashcardCounter');
  if (counterEl) counterEl.innerText = `${currentFlashcardIndex + 1} / ${list.length}`;

  const cardEl = document.getElementById('flashcardElement');
  if (!cardEl) return;

  const status = camVocabStatus[item.id] || 'learning';

  if (!isFlashcardFlipped) {
    // Front side
    cardEl.innerHTML = `
      <div class="flex items-center justify-between text-xs text-slate-400">
        <span class="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">${item.camSource}</span>
        <span class="capitalize text-[11px] font-semibold text-slate-500">${status}</span>
      </div>
      <div class="text-center py-6 space-y-2">
        <div class="text-3xl font-black text-slate-900 dark:text-white tracking-wide">${item.word}</div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-sm font-mono text-purple-600 dark:text-purple-400">${item.ipa}</span>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase">${item.type}</span>
        </div>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button onclick="event.stopPropagation(); pronounceCamWord('${item.word}')" class="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold hover:underline">
          <i data-lucide="volume-2" class="w-4 h-4"></i> Nghe phát âm
        </button>
        <span class="text-[11px] text-slate-400">👆 Nhấp để lật xem nghĩa & ví dụ</span>
      </div>
    `;
  } else {
    // Back side
    cardEl.innerHTML = `
      <div class="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
        <span class="font-bold text-purple-600 dark:text-purple-400">${item.word} (${item.type})</span>
        <span class="font-mono text-slate-400 text-[11px]">${item.ipa}</span>
      </div>
      <div class="py-3 space-y-3">
        <div>
          <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Ý nghĩa học thuật:</span>
          <p class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${item.meaning}</p>
        </div>
        <div class="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-xs">
          <span class="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase block">Collocation:</span>
          <span class="font-semibold text-slate-800 dark:text-slate-200">${item.collocation}</span>
        </div>
        <div class="text-xs italic text-slate-600 dark:text-slate-400">
          "${item.example}"
        </div>
      </div>
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2" onclick="event.stopPropagation()">
        <button onclick="setCamVocabStatus('${item.id}', 'mastered')" class="px-3 py-1 rounded-lg text-xs font-semibold ${status === 'mastered' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700'}">
          ✓ Đã thuộc
        </button>
        <button onclick="setCamVocabStatus('${item.id}', 'review')" class="px-3 py-1 rounded-lg text-xs font-semibold ${status === 'review' ? 'bg-amber-600 text-white' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700'}">
          ⚠️ Cần ôn
        </button>
        <span class="text-[11px] text-slate-400">👆 Nhấp ngoài để lật lại</span>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

function flipCurrentFlashcard() {
  isFlashcardFlipped = !isFlashcardFlipped;
  renderCurrentFlashcard();
}

function prevFlashcard() {
  const list = getFilteredCamVocabList();
  currentFlashcardIndex = (currentFlashcardIndex > 0) ? currentFlashcardIndex - 1 : list.length - 1;
  isFlashcardFlipped = false;
  renderCurrentFlashcard();
}

function nextFlashcard() {
  const list = getFilteredCamVocabList();
  currentFlashcardIndex = (currentFlashcardIndex + 1) % list.length;
  isFlashcardFlipped = false;
  renderCurrentFlashcard();
}

function pronounceCamWord(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-GB';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
    showToast(`Đang phát âm: "${word}" (UK Accent) 🔊`);
  }
}

// ================= 15. BITE-SIZED CAMBRIDGE DRILLS CONTROLLER =================
let activeBiteDrillId = 'drill_cam13_sec1';
let biteDrillAnswers = {};

function initBiteDrills() {
  selectBiteDrill('drill_cam13_sec1');
}

function selectBiteDrill(drillId) {
  activeBiteDrillId = drillId;
  biteDrillAnswers[drillId] = biteDrillAnswers[drillId] || {};

  // Highlight card selector
  ['drill_cam13_sec1', 'drill_cam11_tfng', 'drill_cam10_task1'].forEach(id => {
    const card = document.getElementById(`drillCard_${id}`);
    if (card) {
      if (id === drillId) {
        card.classList.add('border-brand-500', 'ring-2', 'ring-brand-500/30');
      } else {
        card.classList.remove('border-brand-500', 'ring-2', 'ring-brand-500/30');
      }
    }
  });

  const workspace = document.getElementById('activeDrillWorkspace');
  if (!workspace || typeof CAMBRIDGE_PRACTICE_DRILLS === 'undefined') return;

  const drill = CAMBRIDGE_PRACTICE_DRILLS.find(d => d.id === drillId);
  if (!drill) return;

  let audioSection = '';
  if (drill.audioSrc) {
    audioSection = `
      <div class="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-slate-800 space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold flex items-center gap-1.5 text-blue-400">
            <i data-lucide="volume-2" class="w-4 h-4"></i> Audio Trực Tiếp Cambridge:
          </span>
          <span class="text-[11px] text-slate-400 font-mono">${drill.audioSrc}</span>
        </div>
        <audio id="biteAudio_${drill.id}" src="${drill.audioSrc}" preload="auto" class="w-full"></audio>
        <div class="flex items-center gap-3">
          <button onclick="toggleBiteAudio('${drill.id}')" id="bitePlayBtn_${drill.id}" class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <i data-lucide="play" class="w-4 h-4 fill-white" id="bitePlayIcon_${drill.id}"></i>
          </button>
          <input type="range" id="biteAudioSeek_${drill.id}" value="0" min="0" max="100" class="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500" oninput="seekBiteAudio('${drill.id}', this.value)" />
          <span class="text-xs font-mono text-slate-300 min-w-[70px] text-right" id="biteAudioTime_${drill.id}">00:00</span>
          <div class="flex items-center gap-1">
            <button onclick="setBiteAudioSpeed('${drill.id}', 0.8)" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold">0.8x</button>
            <button onclick="setBiteAudioSpeed('${drill.id}', 1.0)" class="px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold">1.0x</button>
            <button onclick="setBiteAudioSpeed('${drill.id}', 1.2)" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold">1.2x</button>
          </div>
        </div>
      </div>
    `;
  }

  let passageSection = '';
  if (drill.passageExcerpt) {
    passageSection = `
      <div class="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span class="flex items-center gap-1.5"><i data-lucide="book-open" class="w-4 h-4 text-emerald-500"></i> Trích Đoạn Bài Đọc Cambridge 11:</span>
          <span class="text-[10px] text-slate-400">Passage 1</span>
        </div>
        <div class="text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto pr-2 border-l-2 border-emerald-500 pl-3">
          ${drill.passageExcerpt.trim()}
        </div>
      </div>
    `;
  }

  // Questions render
  let questionsHtml = drill.questions.map((q, idx) => {
    const savedVal = (biteDrillAnswers[drillId] && biteDrillAnswers[drillId][q.qNum]) || '';

    if (drill.skill === 'listening') {
      return `
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <label class="text-xs font-bold text-slate-900 dark:text-white block">
            Câu ${q.qNum}: ${q.prompt}
          </label>
          <div class="max-w-md">
            <input type="text" id="biteInput_${drill.id}_${q.qNum}" value="${savedVal}" placeholder="Nhập từ hoặc số cần điền..." class="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
      `;
    } else if (drill.skill === 'reading') {
      return `
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
          <div class="text-xs font-bold text-slate-900 dark:text-white">
            Câu ${q.qNum}: "${q.text}"
          </div>
          <div class="flex items-center gap-2">
            ${['TRUE', 'FALSE', 'NOT GIVEN'].map(opt => `
              <button type="button" onclick="selectBiteChoice('${drill.id}', ${q.qNum}, '${opt}')" id="biteOpt_${drill.id}_${q.qNum}_${opt.replace(/\s+/g, '')}" class="px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                savedVal === opt ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (drill.skill === 'writing') {
      if (q.type === 'mcq') {
        const letters = ['A', 'B', 'C', 'D'];
        return `
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <div class="text-xs font-bold text-slate-900 dark:text-white">
              Câu ${q.qNum}: ${q.question}
            </div>
            <div class="grid grid-cols-1 gap-2">
              ${q.options.map((opt, oIdx) => `
                <button type="button" onclick="selectBiteChoice('${drill.id}', ${q.qNum}, '${letters[oIdx]}')" id="biteOpt_${drill.id}_${q.qNum}_${letters[oIdx]}" class="w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start gap-2.5 ${
                  savedVal === letters[oIdx] ? 'bg-amber-600 text-white border-amber-600 shadow-sm font-semibold' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }">
                  <span class="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${savedVal === letters[oIdx] ? 'bg-white text-amber-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}">${letters[oIdx]}</span>
                  <span>${opt}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      } else if (q.type === 'upgrade') {
        return `
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div class="text-xs font-bold text-slate-900 dark:text-white">
              Câu ${q.qNum}: ${q.question}
            </div>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300">
                <span class="font-bold text-[10px] uppercase block">Mức 4.5:</span>
                ${q.basic}
              </div>
              <div class="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                <span class="font-bold text-[10px] uppercase block">Mức 5.5:</span>
                ${q.tactical}
              </div>
              <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold">
                <span class="font-bold text-[10px] uppercase block">Mức 7.0+ (Academic Cambridge):</span>
                ${q.academic}
              </div>
            </div>
          </div>
        `;
      }
    }
    return '';
  }).join('');

  workspace.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-extrabold px-2 py-0.5 rounded uppercase ${
            drill.skill === 'listening' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
            drill.skill === 'reading' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
            'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
          }">${drill.skill}</span>
          <span class="text-xs text-slate-400 font-semibold">${drill.camSource}</span>
        </div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white mt-1">${drill.title}</h3>
      </div>
      <span class="text-xs text-slate-400 font-mono">${drill.estTime}</span>
    </div>

    ${audioSection}
    ${passageSection}

    <div class="space-y-3">
      ${questionsHtml}
    </div>

    <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
      <button onclick="checkBiteDrill('${drill.id}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition flex items-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4"></i>
        <span>Chấm Điểm & Xem Phân Tích Bẫy Chi Tiết</span>
      </button>
      <button onclick="resetBiteDrill('${drill.id}')" class="px-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-red-500 transition">
        Làm lại bài này
      </button>
    </div>

    <div id="drillFeedbackContainer_${drill.id}" class="space-y-4 pt-3"></div>
  `;

  if (drill.audioSrc) {
    setupBiteAudioEvents(drill.id);
  }

  if (window.lucide) window.lucide.createIcons();
}

function selectBiteChoice(drillId, qNum, choice) {
  biteDrillAnswers[drillId] = biteDrillAnswers[drillId] || {};
  biteDrillAnswers[drillId][qNum] = choice;

  // Update UI for buttons in this question
  const drill = CAMBRIDGE_PRACTICE_DRILLS.find(d => d.id === drillId);
  if (!drill) return;

  if (drill.skill === 'reading') {
    ['TRUE', 'FALSE', 'NOT GIVEN'].forEach(opt => {
      const btn = document.getElementById(`biteOpt_${drillId}_${qNum}_${opt.replace(/\s+/g, '')}`);
      if (btn) {
        if (opt === choice) {
          btn.className = "px-3 py-1.5 rounded-lg border text-xs font-semibold transition bg-emerald-600 text-white border-emerald-600 shadow-sm";
        } else {
          btn.className = "px-3 py-1.5 rounded-lg border text-xs font-semibold transition border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400";
        }
      }
    });
  } else if (drill.skill === 'writing') {
    ['A', 'B', 'C', 'D'].forEach(letter => {
      const btn = document.getElementById(`biteOpt_${drillId}_${qNum}_${letter}`);
      if (btn) {
        if (letter === choice) {
          btn.className = "w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start gap-2.5 bg-amber-600 text-white border-amber-600 shadow-sm font-semibold";
        } else {
          btn.className = "w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start gap-2.5 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
        }
      }
    });
  }
}

function setupBiteAudioEvents(drillId) {
  const audio = document.getElementById(`biteAudio_${drillId}`);
  const seek = document.getElementById(`biteAudioSeek_${drillId}`);
  const timeEl = document.getElementById(`biteAudioTime_${drillId}`);

  if (!audio || !seek || !timeEl) return;

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      seek.value = (audio.currentTime / audio.duration) * 100;
      const curM = Math.floor(audio.currentTime / 60);
      const curS = Math.floor(audio.currentTime % 60);
      const durM = Math.floor(audio.duration / 60);
      const durS = Math.floor(audio.duration % 60);
      timeEl.innerText = `${curM}:${curS.toString().padStart(2, '0')} / ${durM}:${durS.toString().padStart(2, '0')}`;
    }
  });

  audio.addEventListener('ended', () => {
    const icon = document.getElementById(`bitePlayIcon_${drillId}`);
    if (icon) icon.setAttribute('data-lucide', 'play');
    if (window.lucide) window.lucide.createIcons();
  });
}

function toggleBiteAudio(drillId) {
  const audio = document.getElementById(`biteAudio_${drillId}`);
  const icon = document.getElementById(`bitePlayIcon_${drillId}`);
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    if (icon) icon.setAttribute('data-lucide', 'pause');
  } else {
    audio.pause();
    if (icon) icon.setAttribute('data-lucide', 'play');
  }
  if (window.lucide) window.lucide.createIcons();
}

function seekBiteAudio(drillId, value) {
  const audio = document.getElementById(`biteAudio_${drillId}`);
  if (audio && audio.duration) {
    audio.currentTime = (value / 100) * audio.duration;
  }
}

function setBiteAudioSpeed(drillId, speed) {
  const audio = document.getElementById(`biteAudio_${drillId}`);
  if (audio) {
    audio.playbackRate = speed;
    showToast(`Đã chỉnh tốc độ phát: ${speed}x`);
  }
}

function checkBiteDrill(drillId) {
  const drill = CAMBRIDGE_PRACTICE_DRILLS.find(d => d.id === drillId);
  if (!drill) return;

  const feedbackContainer = document.getElementById(`drillFeedbackContainer_${drill.id}`);
  if (!feedbackContainer) return;

  let correctCount = 0;
  let breakdown = [];

  drill.questions.forEach(q => {
    let userAns = '';
    if (drill.skill === 'listening') {
      const input = document.getElementById(`biteInput_${drill.id}_${q.qNum}`);
      userAns = input ? input.value.trim().toLowerCase() : '';
    } else {
      userAns = (biteDrillAnswers[drillId] && biteDrillAnswers[drillId][q.qNum]) || '';
    }

    let isCorrect = false;
    if (q.type === 'upgrade') {
      isCorrect = true; // Review format
    } else if (drill.skill === 'listening') {
      isCorrect = userAns.replace(/\s+/g, '') === q.ans.toLowerCase().replace(/\s+/g, '');
    } else if (drill.skill === 'reading') {
      isCorrect = userAns.toUpperCase() === q.ans.toUpperCase();
    } else if (drill.skill === 'writing') {
      isCorrect = userAns.toUpperCase() === q.ans.toUpperCase();
    }

    if (isCorrect) correctCount++;

    breakdown.push({
      qNum: q.qNum,
      prompt: q.prompt || q.text || q.question,
      userAns: userAns || '(Chưa điền)',
      correctAns: q.ans || 'C',
      isCorrect: isCorrect,
      trapHint: q.trapHint,
      transcriptSnippet: q.transcriptSnippet,
      takeawayRule: q.takeawayRule
    });
  });

  const totalQuestions = drill.questions.filter(q => q.type !== 'upgrade').length || drill.questions.length;

  feedbackContainer.innerHTML = `
    <div class="p-4 rounded-xl ${
      correctCount === totalQuestions ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800'
    } flex items-center justify-between gap-3">
      <div>
        <h4 class="text-xs font-bold text-slate-900 dark:text-white">
          Kết quả thực chiến: <span class="text-sm font-extrabold ${correctCount === totalQuestions ? 'text-emerald-600' : 'text-amber-600'}">${correctCount}/${totalQuestions} câu đúng</span>
        </h4>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">Xem phân tích bẫy thi và trích dẫn Cambridge bên dưới để ghi nhớ kinh nghiệm.</p>
      </div>
      <span class="text-xs font-bold px-3 py-1 rounded-lg ${
        correctCount === totalQuestions ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
      }">
        ${correctCount === totalQuestions ? 'Xuất Sắc! 🎯' : 'Cần Chú Ý Bẫy ⚠️'}
      </span>
    </div>

    <div class="space-y-3">
      ${breakdown.map(item => `
        <div class="p-4 rounded-xl border ${item.isCorrect ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20' : 'border-red-200 dark:border-red-900/60 bg-red-50/20'} space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900 dark:text-white">Câu ${item.qNum}: ${item.prompt}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
              ${item.isCorrect ? '✓ Đúng Tuyệt Đối' : '✗ Bị Dính Bẫy'}
            </span>
          </div>

          <div class="text-xs flex flex-wrap gap-4 pt-0.5">
            <div>Bạn điền: <strong class="${item.isCorrect ? 'text-emerald-600' : 'text-red-500'}">${item.userAns}</strong></div>
            <div>Đáp án Cambridge: <strong class="text-slate-900 dark:text-white">${item.correctAns}</strong></div>
          </div>

          <div class="space-y-1.5 text-xs pt-1">
            <div class="p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
              <strong class="font-bold">⚡ Giải mã bẫy đề thi (Trap Analysis):</strong> ${item.trapHint}
            </div>

            ${item.transcriptSnippet ? `
              <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 italic font-serif">
                <strong class="font-sans not-italic text-slate-900 dark:text-white block font-bold text-[10px] uppercase">📜 Dẫn chứng trích dẫn Cambridge:</strong>
                "${item.transcriptSnippet}"
              </div>
            ` : ''}

            <div class="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-200">
              <strong class="font-bold">💡 Nguyên tắc xương máu (Takeaway Rule):</strong> ${item.takeawayRule}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (correctCount === totalQuestions) {
    triggerConfetti();
    showToast("Tuyệt vời! Bạn đã vượt qua bài drill thực chiến 100% không dính bẫy! 🏆");
  } else {
    showToast(`Đã chấm xong! Bạn đúng ${correctCount}/${totalQuestions} câu. Hãy đọc kỹ phần giải mã bẫy nhé.`);
  }

  feedbackContainer.scrollIntoView({ behavior: 'smooth' });
}

function resetBiteDrill(drillId) {
  biteDrillAnswers[drillId] = {};
  selectBiteDrill(drillId);
  showToast("Đã làm mới bài thực chiến!");
}

// ================= 16. STAGE-GATED LEARNING MANAGEMENT SYSTEM =================
let currentSelectedStageNum = 1;
let userUnlockedStages = JSON.parse(localStorage.getItem('ielts_unlocked_stages') || '[1]');
let devUnlockAllStages = JSON.parse(localStorage.getItem('ielts_dev_unlock_all') || 'false');
let completedLessonsList = JSON.parse(localStorage.getItem('ielts_completed_lessons') || '[]');
let activeLessonModalId = null;
let checkpointExamAnswers = {};

function initStageCurriculum() {
  if (typeof ROADMAP_CURRICULUM === 'undefined') return;

  updateDevUnlockButtonUI();
  updateStageProgressAndLocks();
  selectCurriculumStage(1);
}

function isStageUnlocked(stageNum) {
  if (devUnlockAllStages) return true;
  return userUnlockedStages.includes(stageNum);
}

function updateDevUnlockButtonUI() {
  const btn = document.getElementById('devUnlockToggleBtn');
  if (!btn) return;
  if (devUnlockAllStages) {
    btn.innerText = "🔓 Đang mở tự do (Khám phá)";
    btn.className = "px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] transition shadow-sm";
  } else {
    btn.innerText = "🔒 Đang khóa chuẩn";
    btn.className = "px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[10px] transition hover:bg-slate-300";
  }
}

function toggleDevUnlockAllStages() {
  devUnlockAllStages = !devUnlockAllStages;
  localStorage.setItem('ielts_dev_unlock_all', JSON.stringify(devUnlockAllStages));
  updateDevUnlockButtonUI();
  updateStageProgressAndLocks();
  selectCurriculumStage(currentSelectedStageNum);
  showToast(devUnlockAllStages ? "Đã bật chế độ Khám Phá: Bạn có thể xem toàn bộ các chặng!" : "Đã kích hoạt chế độ Khóa Chuẩn: Cần thi đạt >= 80% để mở khóa.");
}

function updateStageProgressAndLocks() {
  if (typeof ROADMAP_CURRICULUM === 'undefined') return;

  let totalAllLessons = 0;
  let totalAllCompleted = 0;

  ROADMAP_CURRICULUM.stages.forEach(stage => {
    let stageTotalLessons = 0;
    let stageCompletedCount = 0;

    stage.modules.forEach(mod => {
      mod.lessons.forEach(l => {
        stageTotalLessons++;
        totalAllLessons++;
        if (completedLessonsList.includes(l.id)) {
          stageCompletedCount++;
          totalAllCompleted++;
        }
      });
    });

    const percent = stageTotalLessons > 0 ? Math.round((stageCompletedCount / stageTotalLessons) * 100) : 0;
    const progressEl = document.getElementById(`stage${stage.stageNum}ProgressText`);
    const percentEl = document.getElementById(`stage${stage.stageNum}PercentText`);

    if (progressEl) progressEl.innerText = `Tiến độ: ${stageCompletedCount}/${stageTotalLessons} bài`;
    if (percentEl) percentEl.innerText = `${percent}%`;

    // Lock badges
    const lockBadge = document.getElementById(`stage${stage.stageNum}LockBadge`);
    if (lockBadge) {
      if (isStageUnlocked(stage.stageNum)) {
        if (stage.stageNum === currentSelectedStageNum) {
          lockBadge.innerText = "🔓 Đang Học";
          lockBadge.className = "text-xs font-bold px-2 py-0.5 rounded bg-white/20 text-white";
        } else {
          lockBadge.innerText = "🔓 Đã Mở Khóa";
          lockBadge.className = "text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300";
        }
      } else {
        lockBadge.innerText = `🔒 Khóa (Cần đỗ Chặng ${stage.stageNum - 1})`;
        lockBadge.className = "text-xs font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500";
      }
    }
  });

  // Overall progress in sidebar
  const overallPercent = totalAllLessons > 0 ? Math.round((totalAllCompleted / totalAllLessons) * 100) : 0;
  const overallText = document.getElementById('overallProgressPercent');
  const overallBar = document.getElementById('overallProgressBar');
  if (overallText) overallText.innerText = `${overallPercent}%`;
  if (overallBar) overallBar.style.width = `${overallPercent}%`;
}

function selectCurriculumStage(stageNum) {
  if (typeof ROADMAP_CURRICULUM === 'undefined') return;

  if (!isStageUnlocked(stageNum)) {
    showToast(`⚠️ Chặng ${stageNum} đang bị khóa! Bạn cần làm bài thi điều kiện của Chặng ${stageNum - 1} và đạt từ 80% trở lên để mở khóa.`);
    return;
  }

  currentSelectedStageNum = stageNum;

  // Update tabs styles
  [1, 2, 3].forEach(sNum => {
    const btn = document.getElementById(`stageBtn_${sNum}`);
    if (btn) {
      const unlocked = isStageUnlocked(sNum);
      if (sNum === stageNum) {
        btn.className = "stage-nav-btn p-4 rounded-xl border text-left transition bg-blue-600 text-white shadow-md border-blue-600 flex flex-col justify-between";
      } else if (unlocked) {
        btn.className = "stage-nav-btn p-4 rounded-xl border text-left transition bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 flex flex-col justify-between";
      } else {
        btn.className = "stage-nav-btn p-4 rounded-xl border text-left transition bg-slate-50 dark:bg-slate-900/60 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed flex flex-col justify-between";
      }
    }
  });

  const stage = ROADMAP_CURRICULUM.stages.find(s => s.stageNum === stageNum);
  if (!stage) return;

  // Update Active Stage Hero Card
  const titleDisplay = document.getElementById('activeStageTitleDisplay');
  const summaryDisplay = document.getElementById('activeStageSummaryDisplay');
  const bandBadge = document.getElementById('activeStageBandBadge');
  const honorBadge = document.getElementById('activeStageHonorBadge');
  const checkpointBtnText = document.getElementById('checkpointBtnText');

  if (titleDisplay) titleDisplay.innerText = stage.title;
  if (summaryDisplay) summaryDisplay.innerText = stage.summary;
  if (bandBadge) bandBadge.innerText = `Mục tiêu: ${stage.targetBand}`;
  if (honorBadge) honorBadge.innerText = stage.badge;
  if (checkpointBtnText) checkpointBtnText.innerText = `🏆 Thi Vượt Chặng ${stageNum} (Điều Kiện >= 80%)`;

  renderStageModules(stageNum);
  updateStageProgressAndLocks();
  if (window.lucide) window.lucide.createIcons();
}

function renderStageModules(stageNum) {
  const container = document.getElementById('activeStageModulesContainer');
  if (!container || typeof ROADMAP_CURRICULUM === 'undefined') return;

  const stage = ROADMAP_CURRICULUM.stages.find(s => s.stageNum === stageNum);
  if (!stage) return;

  container.innerHTML = '';

  stage.modules.forEach(mod => {
    const modCard = document.createElement('div');
    modCard.className = "p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4";

    const lessonsHtml = mod.lessons.map(lesson => {
      const isCompleted = completedLessonsList.includes(lesson.id);
      return `
        <div class="p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
          isCompleted 
            ? 'bg-emerald-50/20 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60' 
            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-blue-400'
        }">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[11px]">
              <span class="px-2 py-0.5 rounded font-extrabold uppercase ${
                lesson.skill === 'listening' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                lesson.skill === 'reading' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                lesson.skill === 'writing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
              }">${lesson.skill}</span>
              <span class="text-slate-400 font-mono">${lesson.estTime}</span>
            </div>
            <h5 class="font-bold text-xs text-slate-900 dark:text-white leading-snug">${lesson.title}</h5>
          </div>

          <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
            <span class="text-[11px] font-semibold flex items-center gap-1 ${
              isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
            }">
              <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-3.5 h-3.5"></i>
              ${isCompleted ? 'Đã nắm vững' : 'Chưa học'}
            </span>
            <button onclick="openLessonModal('${lesson.id}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1">
              <span>Học bài này</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    modCard.innerHTML = `
      <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="${mod.icon}" class="w-4 h-4 text-blue-500"></i>
            ${mod.title}
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${mod.summary}</p>
        </div>
        <span class="text-[11px] text-slate-400 font-mono">${mod.lessons.length} bài học</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${lessonsHtml}
      </div>
    `;

    container.appendChild(modCard);
  });
}

function findLessonById(lessonId) {
  if (typeof ROADMAP_CURRICULUM === 'undefined') return null;
  for (const stage of ROADMAP_CURRICULUM.stages) {
    for (const mod of stage.modules) {
      for (const les of mod.lessons) {
        if (les.id === lessonId) return les;
      }
    }
  }
  return null;
}

function openLessonModal(lessonId) {
  const lesson = findLessonById(lessonId);
  if (!lesson) return;

  activeLessonModalId = lessonId;

  const titleEl = document.getElementById('lessonModalTitle');
  const skillEl = document.getElementById('lessonModalSkillBadge');
  const estEl = document.getElementById('lessonModalEstTime');
  const theoryEl = document.getElementById('lessonModalTheoryContent');
  const drillEl = document.getElementById('lessonModalDrillContent');
  const completeText = document.getElementById('lessonModalCompleteText');

  if (titleEl) titleEl.innerText = lesson.title;
  if (skillEl) skillEl.innerText = lesson.skill.toUpperCase();
  if (estEl) estEl.innerText = lesson.estTime;
  if (theoryEl) theoryEl.innerHTML = lesson.theory;

  if (drillEl) {
    drillEl.innerHTML = '';
    lesson.practiceDrill.forEach((drill, dIdx) => {
      const card = document.createElement('div');
      card.className = "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-3";
      
      const letters = ['A', 'B', 'C', 'D'];
      const optionsHtml = drill.options.map((opt, oIdx) => {
        const letter = letters[oIdx];
        return `
          <button type="button" onclick="checkLessonDrillChoice('${lesson.id}', ${dIdx}, '${letter}', '${drill.ans}', '${drill.exp.replace(/'/g, "\\'")}')" id="drillOpt_${lesson.id}_${dIdx}_${letter}" class="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs hover:border-blue-400 transition flex items-start gap-2.5">
            <span class="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${letter}</span>
            <span class="pt-0.5">${opt}</span>
          </button>
        `;
      }).join('');

      card.innerHTML = `
        <div class="font-bold text-xs text-slate-900 dark:text-white">
          Câu ${dIdx + 1}: ${drill.q}
        </div>
        <div class="grid grid-cols-1 gap-2">
          ${optionsHtml}
        </div>
        <div id="drillFeedback_${lesson.id}_${dIdx}" class="hidden p-3 rounded-xl text-xs space-y-1"></div>
      `;

      drillEl.appendChild(card);
    });
  }

  const isCompleted = completedLessonsList.includes(lessonId);
  if (completeText) {
    completeText.innerText = isCompleted ? "✓ Đã hiểu bài này (Bấm để bỏ)" : "Đánh dấu đã hiểu bài học";
  }

  const modal = document.getElementById('lessonDetailModal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function checkLessonDrillChoice(lessonId, drillIdx, selectedLetter, correctLetter, explanation) {
  const isCorrect = selectedLetter === correctLetter;
  const letters = ['A', 'B', 'C', 'D'];

  letters.forEach(letter => {
    const btn = document.getElementById(`drillOpt_${lessonId}_${drillIdx}_${letter}`);
    if (btn) {
      if (letter === correctLetter) {
        btn.className = "w-full text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-start gap-2.5";
      } else if (letter === selectedLetter && !isCorrect) {
        btn.className = "w-full text-left p-2.5 rounded-xl border border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 text-xs font-semibold flex items-start gap-2.5";
      }
    }
  });

  const fbEl = document.getElementById(`drillFeedback_${lessonId}_${drillIdx}`);
  if (fbEl) {
    fbEl.classList.remove('hidden');
    if (isCorrect) {
      fbEl.className = "p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 text-xs";
      fbEl.innerHTML = `<strong>✓ Chính xác tuyệt đối!</strong> ${explanation}`;
    } else {
      fbEl.className = "p-3 rounded-xl bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-200 text-xs";
      fbEl.innerHTML = `<strong>✗ Chưa chính xác (Đáp án đúng là ${correctLetter})!</strong> ${explanation}`;
    }
  }
}

function toggleActiveLessonCompletion() {
  if (!activeLessonModalId) return;

  const idx = completedLessonsList.indexOf(activeLessonModalId);
  if (idx > -1) {
    completedLessonsList.splice(idx, 1);
  } else {
    completedLessonsList.push(activeLessonModalId);
    triggerConfetti();
    showToast("Chúc mừng! Đã ghi nhận hoàn thành bài học! 🎓");
  }

  localStorage.setItem('ielts_completed_lessons', JSON.stringify(completedLessonsList));
  
  const isCompleted = completedLessonsList.includes(activeLessonModalId);
  const completeText = document.getElementById('lessonModalCompleteText');
  if (completeText) {
    completeText.innerText = isCompleted ? "✓ Đã hiểu bài này (Bấm để bỏ)" : "Đánh dấu đã hiểu bài học";
  }

  updateStageProgressAndLocks();
  renderStageModules(currentSelectedStageNum);
}

function closeLessonModal() {
  const modal = document.getElementById('lessonDetailModal');
  if (modal) modal.classList.add('hidden');
  activeLessonModalId = null;
}

// Checkpoint Exam Controller
function openCheckpointExamModal() {
  if (typeof ROADMAP_CURRICULUM === 'undefined') return;

  const stage = ROADMAP_CURRICULUM.stages.find(s => s.stageNum === currentSelectedStageNum);
  if (!stage || !stage.checkpointExam) return;

  const exam = stage.checkpointExam;
  checkpointExamAnswers = {};

  const titleEl = document.getElementById('checkpointExamModalTitle');
  if (titleEl) titleEl.innerText = `${exam.title} (${stage.targetBand})`;

  const counterEl = document.getElementById('checkpointAnsweredCounter');
  if (counterEl) counterEl.innerText = `Đã làm: 0/${exam.totalQuestions} câu`;

  const container = document.getElementById('checkpointQuestionsList');
  if (!container) return;

  container.innerHTML = '';

  exam.questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3";

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHtml = q.options.map((opt, oIdx) => {
      const letter = letters[oIdx];
      return `
        <button type="button" onclick="selectCheckpointOption(${q.qNum}, '${letter}')" id="checkpointOpt_${q.qNum}_${letter}" class="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs hover:border-amber-400 transition flex items-start gap-2.5">
          <span class="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${letter}</span>
          <span class="pt-0.5">${opt}</span>
        </button>
      `;
    }).join('');

    card.innerHTML = `
      <div class="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
        <span>Câu ${q.qNum}: ${q.text}</span>
        <span class="text-[10px] px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-extrabold">${q.skill}</span>
      </div>
      <div class="grid grid-cols-1 gap-2">
        ${optionsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  const modal = document.getElementById('checkpointExamModal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function selectCheckpointOption(qNum, letter) {
  checkpointExamAnswers[qNum] = letter;

  const letters = ['A', 'B', 'C', 'D'];
  letters.forEach(l => {
    const btn = document.getElementById(`checkpointOpt_${qNum}_${l}`);
    if (btn) {
      if (l === letter) {
        btn.className = "w-full text-left p-2.5 rounded-xl border border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-start gap-2.5 shadow-sm";
      } else {
        btn.className = "w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs hover:border-amber-400 transition flex items-start gap-2.5";
      }
    }
  });

  const counterEl = document.getElementById('checkpointAnsweredCounter');
  if (counterEl) {
    const count = Object.keys(checkpointExamAnswers).length;
    counterEl.innerText = `Đã làm: ${count}/20 câu`;
  }
}

function submitCheckpointExam() {
  const stage = ROADMAP_CURRICULUM.stages.find(s => s.stageNum === currentSelectedStageNum);
  if (!stage || !stage.checkpointExam) return;

  const exam = stage.checkpointExam;
  const answeredCount = Object.keys(checkpointExamAnswers).length;

  if (answeredCount < 15) {
    const proceed = confirm(`Bạn mới làm ${answeredCount}/20 câu hỏi. Bạn có chắc muốn nộp ngay để xét điều kiện không?`);
    if (!proceed) return;
  }

  let score = 0;
  exam.questions.forEach(q => {
    if (checkpointExamAnswers[q.qNum] === q.ans) {
      score++;
    }
  });

  const percent = Math.round((score / exam.totalQuestions) * 100);
  const isPassed = percent >= stage.passScorePercent;

  closeCheckpointExamModal();

  // Populate Result Modal
  const resIcon = document.getElementById('checkpointResultIconBox');
  const resTitle = document.getElementById('checkpointResultTitle');
  const resSub = document.getElementById('checkpointResultSubtitle');
  const resScore = document.getElementById('checkpointResultScore');
  const resPercent = document.getElementById('checkpointResultPercent');
  const resMsg = document.getElementById('checkpointResultActionMsg');

  if (resScore) resScore.innerText = `${score}/${exam.totalQuestions}`;
  if (resPercent) resPercent.innerText = `${percent}%`;

  if (isPassed) {
    if (resIcon) resIcon.innerText = "🏆";
    if (resTitle) resTitle.innerText = `Xuất Sắc! Bạn Đã Vượt Chặng ${stage.stageNum}!`;
    if (resSub) resSub.innerText = `Đạt mốc điều kiện ${percent}% (yêu cầu >= ${stage.passScorePercent}%). Bạn được phong danh hiệu: ${stage.badge}!`;

    const nextStageNum = stage.stageNum + 1;
    if (nextStageNum <= 3 && !userUnlockedStages.includes(nextStageNum)) {
      userUnlockedStages.push(nextStageNum);
      localStorage.setItem('ielts_unlocked_stages', JSON.stringify(userUnlockedStages));
    }

    if (resMsg) {
      resMsg.className = "text-xs text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900";
      resMsg.innerHTML = `🎉 <strong>CHẶNG ${nextStageNum <= 3 ? nextStageNum : 'TỐT NGHIỆP'} ĐÃ CHÍNH THỨC ĐƯỢC MỞ KHÓA!</strong> Cánh cửa nâng Band tiếp theo đã mở ra cho bạn.`;
    }

    triggerConfetti();
  } else {
    if (resIcon) resIcon.innerText = "💪";
    if (resTitle) resTitle.innerText = `Chưa Đủ Điều Kiện Vượt Chặng ${stage.stageNum}`;
    if (resSub) resSub.innerText = `Bạn đạt ${percent}% (yêu cầu cần đạt >= ${stage.passScorePercent}% để mở khóa Chặng ${stage.stageNum + 1}).`;

    if (resMsg) {
      resMsg.className = "text-xs text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-900";
      resMsg.innerHTML = `⚠️ <strong>Lời khuyên sư phạm:</strong> Hãy ôn lại các bài học chưa nắm vững trong Chặng ${stage.stageNum}, thực hành lại các câu hỏi rồi thi lại bài Checkpoint nhé!`;
    }
  }

  const resModal = document.getElementById('checkpointResultModal');
  if (resModal) resModal.classList.remove('hidden');

  updateStageProgressAndLocks();
}

function closeCheckpointExamModal() {
  const modal = document.getElementById('checkpointExamModal');
  if (modal) modal.classList.add('hidden');
}

function closeCheckpointResultModal() {
  const modal = document.getElementById('checkpointResultModal');
  if (modal) modal.classList.add('hidden');

  // If passed and next stage exists, automatically select next stage
  const nextStageNum = currentSelectedStageNum + 1;
  if (isStageUnlocked(nextStageNum)) {
    selectCurriculumStage(nextStageNum);
  } else {
    selectCurriculumStage(currentSelectedStageNum);
  }
}

// ================= 17. CAMBRIDGE MASTER LIBRARY CONTROLLER =================
let activeCamBookId = 'cam_21';
let activeCamTrackIndex = 0;
let camMasterAudio = null;

function initCamMasterLibrary() {
  if (typeof CAMBRIDGE_MASTER_CATALOG === 'undefined') return;

  camMasterAudio = document.getElementById('camMasterAudioPlayer');
  if (camMasterAudio) {
    camMasterAudio.addEventListener('timeupdate', updateCamAudioProgressUI);
    camMasterAudio.addEventListener('ended', onCamAudioTrackEnded);
    camMasterAudio.addEventListener('error', () => {
      const book = CAMBRIDGE_MASTER_CATALOG.find(b => b.id === activeCamBookId);
      const track = book?.audios[activeCamTrackIndex];
      if (track && track.archiveUrl && camMasterAudio.src !== track.archiveUrl) {
        camMasterAudio.src = track.archiveUrl;
        camMasterAudio.play().catch(e => console.warn(e));
        return;
      }
      showToast("💡 Đang kết nối máy chủ âm thanh Cambridge...", 3000);
    });
  }

  renderCamBookshelf('all');
  selectCamBook('cam_21', false);
}

function renderCamBookshelf(filter) {
  const container = document.getElementById('camBooksGridContainer');
  if (!container || typeof CAMBRIDGE_MASTER_CATALOG === 'undefined') return;

  const list = (filter === 'all') 
    ? CAMBRIDGE_MASTER_CATALOG 
    : CAMBRIDGE_MASTER_CATALOG.filter(b => b.id === filter);

  container.innerHTML = '';

  list.forEach(book => {
    const card = document.createElement('div');
    const isSelected = book.id === activeCamBookId;

    card.className = `p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
      isSelected 
        ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-400 shadow-sm'
    }`;

    card.innerHTML = `
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            ${book.badge}
          </span>
          <span class="text-xs text-slate-400 font-mono">${book.year}</span>
        </div>

        <h4 class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
          ${book.title}
        </h4>

        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          ${book.description}
        </p>

        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
          <span class="text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1">
            <i data-lucide="headphones" class="w-3.5 h-3.5 text-rose-500"></i> ${book.audios.length} Audio Tracks
          </span>
          <span class="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <i data-lucide="check" class="w-3 h-3"></i> Có PDF gốc
          </span>
        </div>
      </div>

      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <button onclick="selectCamBook('${book.id}', true)" class="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5">
          <i data-lucide="play" class="w-3.5 h-3.5"></i>
          <span>Nạp Vào Studio</span>
        </button>
        <a href="${book.pdfPath}" target="_blank" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition" title="Mở PDF tab riêng">
          <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function filterCamLibraryBook(filter) {
  document.querySelectorAll('.cam-book-pill').forEach(btn => {
    if (btn.getAttribute('data-book') === filter) {
      btn.className = "cam-book-pill px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white shadow-sm";
    } else {
      btn.className = "cam-book-pill px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200";
    }
  });

  if (filter !== 'all') {
    selectCamBook(filter, false);
  }
  renderCamBookshelf(filter);
}

function selectCamBook(bookId, scrollUp = true) {
  if (typeof CAMBRIDGE_MASTER_CATALOG === 'undefined') return;

  activeCamBookId = bookId;
  const book = CAMBRIDGE_MASTER_CATALOG.find(b => b.id === bookId);
  if (!book) return;

  const titleEl = document.getElementById('camActiveBookDisplayTitle');
  const openNewTabBtn = document.getElementById('camOpenPdfNewTabBtn');
  const downloadBtn = document.getElementById('camDownloadPdfBtn');
  const frame = document.getElementById('camPdfViewerFrame');
  const countBadge = document.getElementById('camTracksCountBadge');

  if (titleEl) titleEl.innerText = book.title;
  if (openNewTabBtn) openNewTabBtn.href = book.pdfPath;
  if (downloadBtn) downloadBtn.href = book.pdfPath;
  if (frame) frame.src = book.pdfPath;
  if (countBadge) countBadge.innerText = `${book.audios.length} tracks`;

  renderCamTracksPlaylist(book);

  if (book.audios.length > 0) {
    loadCamAudioTrack(bookId, 0, false);
  }

  renderCamBookshelf('all');

  if (scrollUp) {
    document.getElementById('camActiveBookDisplayTitle')?.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(`Đã nạp ${book.title} cùng toàn bộ Audio Tests vào Studio! 📚🎧`);
}

function renderCamTracksPlaylist(book) {
  const container = document.getElementById('camBookTracksList');
  if (!container) return;

  container.innerHTML = '';

  book.audios.forEach((track, idx) => {
    const isCurrent = idx === activeCamTrackIndex;
    const item = document.createElement('div');
    item.className = `p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
      isCurrent 
        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold shadow-sm' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300'
    }`;

    item.onclick = () => loadCamAudioTrack(book.id, idx, true);

    item.innerHTML = `
      <div class="flex items-center gap-2 truncate">
        <span class="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
          isCurrent ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
        }">${idx + 1}</span>
        <span class="truncate">${track.name}</span>
      </div>
      <span class="text-[10px] font-mono opacity-60 ml-2">${track.duration}</span>
    `;

    container.appendChild(item);
  });
}

function loadCamAudioTrack(bookId, trackIdx, autoPlay = true) {
  if (typeof CAMBRIDGE_MASTER_CATALOG === 'undefined') return;

  const book = CAMBRIDGE_MASTER_CATALOG.find(b => b.id === bookId);
  if (!book || !book.audios[trackIdx]) return;

  activeCamTrackIndex = trackIdx;
  const track = book.audios[trackIdx];

  const titleEl = document.getElementById('camActiveAudioTrackTitle');
  const subEl = document.getElementById('camActiveAudioTrackSubtitle');
  if (titleEl) titleEl.innerText = track.name;
  if (subEl) subEl.innerText = `${book.title} • Thời lượng: ${track.duration}`;

  if (!camMasterAudio) {
    camMasterAudio = document.getElementById('camMasterAudioPlayer');
  }

  if (camMasterAudio) {
    const isOnline = window.location.protocol === 'https:' || window.location.hostname.includes('github.io') || window.location.hostname.includes('blogspot.com');
    camMasterAudio.src = (isOnline && track.archiveUrl) ? track.archiveUrl : (track.archiveUrl || track.path);
    if (autoPlay) {
      camMasterAudio.play().then(() => {
        updateCamMasterPlayUI(true);
      }).catch(err => console.warn(err));
    } else {
      updateCamMasterPlayUI(false);
    }
  }

  renderCamTracksPlaylist(book);
}

function toggleCamMasterAudioPlayback() {
  if (!camMasterAudio) {
    camMasterAudio = document.getElementById('camMasterAudioPlayer');
  }
  if (!camMasterAudio) return;

  if (camMasterAudio.paused) {
    camMasterAudio.play().then(() => {
      updateCamMasterPlayUI(true);
    }).catch(err => console.warn(err));
  } else {
    camMasterAudio.pause();
    updateCamMasterPlayUI(false);
  }
}

function updateCamMasterPlayUI(isPlaying) {
  const icon = document.getElementById('camMasterPlayIcon');
  if (icon) {
    icon.setAttribute('data-lucide', isPlaying ? 'pause' : 'play');
    if (window.lucide) window.lucide.createIcons();
  }
}

function updateCamAudioProgressUI() {
  if (!camMasterAudio) return;

  const seek = document.getElementById('camMasterSeekBar');
  const curTime = document.getElementById('camMasterCurrentTime');
  const durTime = document.getElementById('camMasterDuration');

  if (camMasterAudio.duration) {
    if (seek) seek.value = (camMasterAudio.currentTime / camMasterAudio.duration) * 100;

    const cM = Math.floor(camMasterAudio.currentTime / 60);
    const cS = Math.floor(camMasterAudio.currentTime % 60);
    const dM = Math.floor(camMasterAudio.duration / 60);
    const dS = Math.floor(camMasterAudio.duration % 60);

    if (curTime) curTime.innerText = `${cM.toString().padStart(2, '0')}:${cS.toString().padStart(2, '0')}`;
    if (durTime) durTime.innerText = `${dM.toString().padStart(2, '0')}:${dS.toString().padStart(2, '0')}`;
  }
}

function seekCamMasterAudio(val) {
  if (camMasterAudio && camMasterAudio.duration) {
    camMasterAudio.currentTime = (val / 100) * camMasterAudio.duration;
  }
}

function skipCamMasterAudio(seconds) {
  if (camMasterAudio) {
    camMasterAudio.currentTime = Math.max(0, Math.min(camMasterAudio.duration || 0, camMasterAudio.currentTime + seconds));
  }
}

function setCamMasterAudioSpeed(speed) {
  if (camMasterAudio) {
    camMasterAudio.playbackRate = speed;
  }

  document.querySelectorAll('.cam-speed-btn').forEach(btn => {
    if (parseFloat(btn.getAttribute('data-speed')) === speed) {
      btn.className = "cam-speed-btn px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-600 text-white";
    } else {
      btn.className = "cam-speed-btn px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white";
    }
  });

  const speedDisplay = document.getElementById('camAudioSpeedDisplay');
  if (speedDisplay) speedDisplay.innerText = `Tốc độ: ${speed}x`;
  showToast(`Đã chuyển tốc độ phát Audio: ${speed}x`);
}

function onCamAudioTrackEnded() {
  updateCamMasterPlayUI(false);
  const book = CAMBRIDGE_MASTER_CATALOG.find(b => b.id === activeCamBookId);
  if (book && activeCamTrackIndex < book.audios.length - 1) {
    loadCamAudioTrack(book.id, activeCamTrackIndex + 1, true);
    showToast(`Đã tự động chuyển sang track tiếp theo: ${book.audios[activeCamTrackIndex].name}`);
  }
}






// =========================================================================
// SECTION 18: PERSONALIZED 4-SKILL LMS, DAILY CHECK-IN & 100-TEST ENGINE
// =========================================================================

// State Management
let appUserProfile = JSON.parse(localStorage.getItem('ielts_user_profile') || 'null');
if (!appUserProfile) {
  // Generate initial simulated streak for authentic experience
  const today = new Date();
  const pastDates = [];
  for (let d = 5; d >= 1; d--) {
    const dt = new Date();
    dt.setDate(today.getDate() - d);
    pastDates.push(dt.toISOString().split('T')[0]);
  }
  appUserProfile = {
    streak: 5,
    lastCheckinDate: pastDates[pastDates.length - 1],
    checkinHistory: pastDates,
    dailyGoalMet: true,
    targetBand: 7.0
  };
  localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));
}

let appTestSubmissions = JSON.parse(localStorage.getItem('ielts_test_submissions') || '[]');
let appSavedVocab = JSON.parse(localStorage.getItem('ielts_saved_vocab') || '[]');

const activeSkillZones = { listening: 'zone_a', reading: 'zone_a', writing: 'zone_a', speaking: 'zone_a' };
const activeVocabType = { listening: 'skill', reading: 'skill', writing: 'skill', speaking: 'skill' };
const activeSkillTopics = { listening: 'l_distractors', reading: 'r_signposts', writing: 'w_link', speaking: 's_fillers' };
const activePracticeModes = { listening: 'flashcards', reading: 'flashcards', writing: 'flashcards', speaking: 'flashcards' };
const activeSkillFilters = {
  listening: { cam: 'all', topic: 'all', type: 'all', status: 'all', search: '' },
  reading: { cam: 'all', topic: 'all', type: 'all', status: 'all', search: '' },
  writing: { cam: 'all', topic: 'all', type: 'all', status: 'all', search: '' },
  speaking: { cam: 'all', topic: 'all', type: 'all', status: 'all', search: '' }
};

// Flashcard & Matching game runtime states
const activeFlashcardIndices = { listening: 0, reading: 0, writing: 0, speaking: 0, vault: 0 };
const matchingGameStates = {
  listening: { selectedLeft: null, matches: {} },
  reading: { selectedLeft: null, matches: {} },
  writing: { selectedLeft: null, matches: {} },
  speaking: { selectedLeft: null, matches: {} }
};

let activeArenaState = {
  test: null,
  skill: null,
  secondsRemaining: 600,
  timerInterval: null,
  isPaused: false,
  userAnswers: {},
  wordCount: 0
};

// -------------------------------------------------------------------------
// 1. DAILY CHECK-IN & STREAK SYSTEM
// -------------------------------------------------------------------------
function initDailyCheckin() {
  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedToday = appUserProfile.checkinHistory.includes(todayStr);

  const streakDaysBadge = document.getElementById('streakDaysBadge');
  const dashStreakHeader = document.getElementById('dashStreakHeader');
  const topStreakCount = document.getElementById('streakCount');
  if (streakDaysBadge) streakDaysBadge.textContent = `Streak: ${appUserProfile.streak} Ngày`;
  if (dashStreakHeader) dashStreakHeader.textContent = `Chuỗi Học Tập: ${appUserProfile.streak} Ngày Liên Tiếp`;
  if (topStreakCount) topStreakCount.textContent = appUserProfile.streak;

  const checkinBtn = document.getElementById('dailyCheckinBtn');
  const checkinBtnText = document.getElementById('dailyCheckinBtnText');
  const dailyGoalStatusText = document.getElementById('dailyGoalStatusText');

  if (isCheckedToday) {
    if (checkinBtn) {
      checkinBtn.classList.remove('from-emerald-600', 'to-teal-600', 'hover:from-emerald-700', 'hover:to-teal-700');
      checkinBtn.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-500', 'cursor-default');
    }
    if (checkinBtnText) checkinBtnText.textContent = 'Đã điểm danh hôm nay ✓';
    if (dailyGoalStatusText) {
      dailyGoalStatusText.textContent = 'Mục tiêu hôm nay: Đã hoàn tất ✓';
      dailyGoalStatusText.className = 'text-[11px] font-semibold text-emerald-600 dark:text-emerald-400';
    }
  } else {
    if (checkinBtnText) checkinBtnText.textContent = 'Điểm danh hôm nay';
    if (dailyGoalStatusText) {
      if (appUserProfile.dailyGoalMet) {
        dailyGoalStatusText.textContent = 'Mục tiêu ngày: Đã hoàn thành 1 bài ✓';
        dailyGoalStatusText.className = 'text-[11px] font-semibold text-emerald-600 dark:text-emerald-400';
      } else {
        dailyGoalStatusText.textContent = 'Mục tiêu ngày: Cần làm 1 bài từ vựng / test';
        dailyGoalStatusText.className = 'text-[11px] font-semibold text-amber-600 dark:text-amber-400';
      }
    }
  }

  renderMonthlyCalendar();
}

function renderMonthlyCalendar() {
  const grid = document.getElementById('monthlyCalendarGrid');
  if (!grid) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const todayDate = now.getDate();
  const todayStr = now.toISOString().split('T')[0];

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const calendarTitle = document.getElementById('calendarMonthTitle');
  if (calendarTitle) calendarTitle.innerHTML = `<i data-lucide="calendar" class="w-4 h-4 text-indigo-500"></i> Lịch Học ${monthNames[month]} / ${year}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday=0

  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  let html = weekdays.map(w => `<div class="font-extrabold text-slate-400 text-[11px] py-1">${w}</div>`).join('');

  // Leading empty slots
  for (let i = 0; i < firstDayIndex; i++) {
    html += `<div class="p-2 rounded-xl bg-transparent"></div>`;
  }

  let checkedInDaysThisMonth = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isCompleted = appUserProfile.checkinHistory.includes(dayStr);
    const isToday = (day === todayDate);

    if (isCompleted) checkedInDaysThisMonth++;

    let cellClass = "p-2 sm:p-2.5 rounded-xl border flex flex-col items-center justify-between min-h-[50px] transition select-none ";
    let iconHtml = '';

    if (isCompleted) {
      cellClass += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-extrabold shadow-sm";
      iconHtml = '<span class="text-[10px] text-emerald-600 dark:text-emerald-400">✓ Đạt</span>';
    } else if (isToday) {
      cellClass += "bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300 font-black ring-2 ring-blue-400/50";
      iconHtml = '<span class="text-[10px] text-blue-600 dark:text-blue-300 animate-pulse">Hôm nay</span>';
    } else if (day < todayDate) {
      cellClass += "bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400";
      iconHtml = '<span class="text-[10px] text-slate-400">-</span>';
    } else {
      cellClass += "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-500";
      iconHtml = '<span class="text-[10px] text-slate-400/60">Sắp tới</span>';
    }

    html += `
      <div class="${cellClass}">
        <span class="text-xs">${day}</span>
        ${iconHtml}
      </div>
    `;
  }

  grid.innerHTML = html;

  const rateDisplay = document.getElementById('monthCheckinRate');
  if (rateDisplay) rateDisplay.textContent = `${checkedInDaysThisMonth}/${daysInMonth} ngày`;

  if (window.lucide) window.lucide.createIcons();
}

function handleDailyCheckinClick() {
  const todayStr = new Date().toISOString().split('T')[0];
  if (appUserProfile.checkinHistory.includes(todayStr)) {
    showToast('Hôm nay bạn đã hoàn thành điểm danh rồi! Hãy tiếp tục duy trì nhé.');
    return;
  }

  // Check if daily goal is met
  if (!appUserProfile.dailyGoalMet) {
    // Check if user has at least 1 submission today
    const hasTodaySubmission = appTestSubmissions.some(s => s.date && s.date.startsWith(todayStr));
    if (!hasTodaySubmission) {
      showToast('⚠️ Bạn cần hoàn thành ít nhất 1 bài tập từ vựng hoặc 1 bài test hôm nay để mở khóa điểm danh giữ chuỗi Streak!');
      return;
    }
  }

  appUserProfile.checkinHistory.push(todayStr);
  appUserProfile.streak += 1;
  appUserProfile.lastCheckinDate = todayStr;
  appUserProfile.dailyGoalMet = true;
  localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));

  initDailyCheckin();
  showToast('🎉 Chúc mừng! Điểm danh hôm nay thành công! Chuỗi Streak đã tăng lên ' + appUserProfile.streak + ' ngày!');
}

// -------------------------------------------------------------------------
// 2. BAND 7.0 ROADMAP PROGRESS AGGREGATOR
// -------------------------------------------------------------------------
function updateBandRoadmapProgress() {
  const skills = ['listening', 'reading', 'writing', 'speaking'];
  const baselineBands = { listening: 5.5, reading: 5.5, writing: 5.0, speaking: 5.0 };
  const targetBands = { listening: 7.5, reading: 7.5, writing: 6.5, speaking: 6.5 };

  let totalBandSum = 0;
  let totalTestsDone = 0;

  skills.forEach(skill => {
    const subs = appTestSubmissions.filter(s => s.skill === skill);
    const completedCount = subs.length;
    totalTestsDone += completedCount;

    let avgBand = baselineBands[skill];
    if (completedCount > 0) {
      const sum = subs.reduce((acc, curr) => acc + (parseFloat(curr.band) || 5.0), 0);
      avgBand = Math.round((sum / completedCount) * 10) / 10;
    }
    totalBandSum += avgBand;

    // Update Skill Header Badge
    const headerBadge = document.getElementById(`${skill}AvgBandBadge`);
    if (headerBadge) headerBadge.textContent = avgBand.toFixed(1);

    const progressCount = document.getElementById(`${skill}TestProgressCount`);
    if (progressCount) progressCount.textContent = `${completedCount}/100`;

    // Update Dashboard Card Elements
    const prefix = skill.substring(0, 3).charAt(0).toUpperCase() + skill.substring(1, 3); // Lis, Rea, Wri, Spe
    const dashBandEl = document.getElementById(`dash${prefix}BandText`);
    if (dashBandEl) dashBandEl.textContent = `Band ${avgBand.toFixed(1)}`;

    const dashCountEl = document.getElementById(`dash${prefix}CountText`);
    if (dashCountEl) dashCountEl.textContent = `${completedCount}/100 Test`;

    const dashProgressEl = document.getElementById(`dash${prefix}ProgressBar`);
    if (dashProgressEl) {
      const pct = Math.min(100, Math.round((completedCount / 100) * 100));
      dashProgressEl.style.width = `${pct}%`;
    }
  });

  // Calculate Overall Band with IELTS standard rounding
  const rawOverall = totalBandSum / 4;
  const decimal = rawOverall - Math.floor(rawOverall);
  let roundedOverall = Math.floor(rawOverall);
  if (decimal >= 0.75) {
    roundedOverall += 1.0;
  } else if (decimal >= 0.25) {
    roundedOverall += 0.5;
  }

  const overallProgressBar = document.getElementById('overallProgressBar');
  const overallProgressPercent = document.getElementById('overallProgressPercent');
  const totalPercent = Math.min(100, Math.round((totalTestsDone / 400) * 100));

  if (overallProgressBar) overallProgressBar.style.width = `${Math.max(15, totalPercent)}%`;
  if (overallProgressPercent) overallProgressPercent.textContent = `${Math.max(15, totalPercent)}% (Band ${roundedOverall.toFixed(1)})`;

  // Update saved vocab badge in sidebar
  const savedBadge = document.getElementById('savedWordCountBadge');
  if (savedBadge) savedBadge.textContent = appSavedVocab.length;
}

// -------------------------------------------------------------------------
// 3. UNIFIED 4-SKILL LMS CONTROLLER
// -------------------------------------------------------------------------
function initUnifiedSkillTabs() {
  const skills = ['listening', 'reading', 'writing', 'speaking'];
  skills.forEach(skill => {
    switchSkillZone(skill, activeSkillZones[skill]);
  });
}

function switchSkillZone(skill, zoneId) {
  activeSkillZones[skill] = zoneId;

  // Update Nav Buttons
  ['zone_a', 'zone_b', 'zone_c', 'zone_d'].forEach(z => {
    const btn = document.getElementById(`navZoneBtn_${skill}_${z}`);
    const container = document.getElementById(`zoneContainer_${skill}_${z}`);

    if (btn) {
      if (z === zoneId) {
        btn.className = "skill-zone-card group relative p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between bg-white dark:bg-slate-800 border-brand-500 shadow-md ring-2 ring-brand-500/30 scale-[1.01]";
      } else {
        btn.className = "skill-zone-card group relative p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between bg-white/60 dark:bg-slate-800/40 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800";
      }
    }

    if (container) {
      if (z === zoneId) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    }
  });

  // Render content on demand
  if (zoneId === 'zone_a') renderSkillZoneA(skill);
  if (zoneId === 'zone_b') renderSkillZoneB(skill);
  if (zoneId === 'zone_c') renderSkillZoneC(skill);
  if (zoneId === 'zone_d') renderSkillZoneD(skill);

  if (window.lucide) window.lucide.createIcons();
}

// =========================================================================
// PHÂN KHU A: LÝ THUYẾT & CHIẾN THUẬT LÀM BÀI
// =========================================================================
function renderSkillZoneA(skill) {
  const container = document.getElementById(`zoneContainer_${skill}_zone_a`);
  if (!container) return;

  const data = (window.IELTS_THEORY_STRATEGIES && window.IELTS_THEORY_STRATEGIES[skill]) ? window.IELTS_THEORY_STRATEGIES[skill] : null;
  if (!data) {
    container.innerHTML = '<p class="text-xs text-slate-500">Đang cập nhật lý thuyết...</p>';
    return;
  }

  let html = `
    <!-- Theory Overview Card -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i data-lucide="compass" class="w-5 h-5 text-indigo-500"></i> ${data.title}
        </h3>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Chuẩn Khung Năng Lực Band 7.0+
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
          <span class="font-extrabold text-indigo-600 dark:text-indigo-400">Định Dạng Bài Thi:</span>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${data.overview.format}</p>
        </div>
        <div class="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
          <span class="font-extrabold text-emerald-700 dark:text-emerald-300">Yêu Cầu Điểm Band 7.0:</span>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${data.overview.target7}</p>
        </div>
        <div class="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
          <span class="font-extrabold text-amber-700 dark:text-amber-300">Nguyên Tắc Vàng:</span>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${data.overview.keyPrinciple}</p>
        </div>
      </div>
    </div>

    <!-- Modules List (Step by Step & Traps) -->
    <div class="space-y-4">
      <h4 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
        <i data-lucide="layers" class="w-4 h-4 text-brand-600"></i> Các Dạng Bài Trọng Tâm & Chiến Thuật Xử Lý
      </h4>
  `;

  data.modules.forEach((mod, idx) => {
    html += `
      <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition hover:border-brand-300">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-extrabold flex items-center justify-center text-xs">
              0${idx + 1}
            </span>
            <h4 class="text-base font-bold text-slate-900 dark:text-white">${mod.name}</h4>
          </div>
          <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            ${mod.tag}
          </span>
        </div>

        <!-- Step-by-Step Strategy -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i> Quy Trình Làm Bài Từng Bước (Step-by-step):
          </h5>
          <div class="space-y-1.5 pl-5 border-l-2 border-emerald-500/40 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            ${mod.steps.map(s => `<p class="py-0.5">${s}</p>`).join('')}
          </div>
        </div>

        <!-- Traps & Distractors -->
        <div class="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
          <h5 class="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500"></i> Cảnh Báo Bẫy Cambridge (Distractors & Traps):
          </h5>
          <ul class="list-disc list-inside space-y-1 text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed">
            ${mod.traps.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>

        <!-- Band 7.0 Pro Tip -->
        <div class="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <i data-lucide="sparkles" class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="font-bold">Mẹo Ăn Điểm Band 7.0+:</strong> ${mod.band7Tips}
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// =========================================================================
// PHÂN KHU B: TỪ VỰNG & COLLOCATIONS THEO CHỦ ĐỀ
// =========================================================================
// =========================================================================
// HELPER: LẤY DỮ LIỆU TỪ VỰNG HOẠT ĐỘNG (10 BỘ CÔNG CỤ HOẶC 12 THEMES)
// =========================================================================
function getActiveVocabData(skill) {
  const vType = activeVocabType[skill] || 'skill';
  const skillSets = (window.IELTS_SKILL_VOCAB_SYSTEM && window.IELTS_SKILL_VOCAB_SYSTEM[skill]) ? window.IELTS_SKILL_VOCAB_SYSTEM[skill] : [];
  const thematicSets = window.IELTS_VOCAB_TOPICS || [];
  const currentSets = (vType === 'thematic') ? thematicSets : (skillSets.length > 0 ? skillSets : thematicSets);

  let curId = activeSkillTopics[skill];
  let activeSet = currentSets.find(s => s.id === curId);
  if (!activeSet && currentSets.length > 0) {
    activeSet = currentSets[0];
    activeSkillTopics[skill] = activeSet.id;
  }
  return {
    vType,
    skillSets,
    thematicSets,
    currentSets,
    activeSet: activeSet || { id: 'empty', name: 'Đang cập nhật', vnName: '', words: [], flashcards: [], matching: [], quiz: [], gapFill: [] }
  };
}

function setSkillVocabType(skill, vType) {
  activeVocabType[skill] = vType;
  const data = getActiveVocabData(skill);
  if (data.currentSets.length > 0) {
    activeSkillTopics[skill] = data.currentSets[0].id;
  }
  activeFlashcardIndices[skill] = 0;
  matchingGameStates[skill] = { selectedLeft: null, matches: {} };
  renderSkillZoneB(skill);
}

function setSkillVocabTopic(skill, topicId) {
  activeSkillTopics[skill] = topicId;
  activeFlashcardIndices[skill] = 0;
  matchingGameStates[skill] = { selectedLeft: null, matches: {} };
  renderSkillZoneB(skill);
}

// =========================================================================
// PHÂN KHU B: TỪ VỰNG & COLLOCATIONS THEO CHỦ ĐỀ & KỸ NĂNG CHUYÊN SÂU
// =========================================================================
function renderSkillZoneB(skill) {
  const container = document.getElementById(`zoneContainer_${skill}_zone_b`);
  if (!container) return;

  const data = getActiveVocabData(skill);
  const currentSets = data.currentSets;
  const activeSet = data.activeSet;
  const currentTopicId = activeSet.id;
  const isSkillType = data.vType === 'skill';

  let html = `
    <!-- Category Switcher Bar (Skill Toolkits vs Cambridge Thematic) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Hệ Thống Kho Từ Vựng Học Thuật</h4>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
            <i data-lucide="layers" class="w-5 h-5 text-purple-600"></i> Phân Loại Kho Từ Vựng IELTS
          </h3>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold px-3 py-1 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5">
            <i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Sổ từ đã lưu: <strong>${appSavedVocab.length}</strong> từ
          </span>
        </div>
      </div>

      <!-- 2 Main Category Tabs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs">
        <button onclick="setSkillVocabType('${skill}', 'skill')" class="py-2.5 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${isSkillType ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'}">
          <i data-lucide="zap" class="w-4 h-4"></i> 10 Bộ Công Cụ Chuyên Sâu Theo Skill (${skill.toUpperCase()})
        </button>
        <button onclick="setSkillVocabType('${skill}', 'thematic')" class="py-2.5 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${!isSkillType ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'}">
          <i data-lucide="globe" class="w-4 h-4"></i> 12 Chủ Đề Học Thuật Cambridge (Themes)
        </button>
      </div>

      <!-- Sub-sets selector Pills -->
      <div class="space-y-1.5">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          ${isSkillType ? 'Danh sách 10 bộ từ vựng nhỏ chuyên biệt cho kỹ năng này:' : 'Danh sách 12 chủ đề học thuật Cambridge:'}
        </div>
        <div class="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
  `;

  currentSets.forEach((t, idx) => {
    const isAct = t.id === currentTopicId;
    const btnCls = isAct
      ? "px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-md shadow-purple-600/20 flex items-center gap-2 flex-shrink-0"
      : "px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 flex-shrink-0";
    html += `
      <button onclick="setSkillVocabTopic('${skill}', '${t.id}')" class="${btnCls}">
        <span class="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-mono">${idx + 1}</span>
        <i data-lucide="${t.icon || 'book'}" class="w-3.5 h-3.5"></i>
        <span>${t.name.split('-')[0].trim()}</span>
        <span class="text-[10px] opacity-75">(${t.words.length} từ)</span>
      </button>
    `;
  });

  html += `
        </div>
      </div>
    </div>

    <!-- Active Topic Vocab Table/List -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> ${isSkillType ? 'Bộ Công Cụ Chuyên Sâu Kỹ Năng' : 'Chủ Đề Học Thuật Cambridge'} • Band 7.0 - 9.0+
          </span>
          <h3 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-1">
            ${activeSet.name}
          </h3>
          <p class="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
            ${activeSet.vnName} (${activeSet.words.length} từ vựng then chốt)
          </p>
        </div>
        <button onclick="switchSkillZone('${skill}', 'zone_c')" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-2 transition self-start sm:self-auto flex-shrink-0">
          <i data-lucide="play" class="w-4 h-4"></i> Luyện Tập Ngay Bộ Này ➔
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
  `;

  activeSet.words.forEach(w => {
    const isBookmarked = appSavedVocab.includes(w.id);
    const starBtnCls = isBookmarked
      ? "p-2 rounded-xl bg-amber-500 text-white shadow-sm"
      : "p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500";

    html += `
      <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-3 transition hover:border-purple-300">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2.5">
              <h4 class="text-lg font-black text-slate-900 dark:text-white">${w.term}</h4>
              <span class="text-xs text-slate-500 font-mono">${w.ipa}</span>
              <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                ${w.type}
              </span>
            </div>
            <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">${w.meaning}</p>
          </div>
          <button onclick="toggleBookmarkVocab('${w.id}')" class="${starBtnCls}" title="${isBookmarked ? 'Đã lưu trong Sổ từ vựng' : 'Lưu vào Sổ từ cần ôn lại'}">
            <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-current' : ''}"></i>
          </button>
        </div>

        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
          "${w.example}"
        </div>

        <div class="flex flex-wrap items-center gap-4 text-xs pt-0.5">
          <div class="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-medium">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>Paraphrase: <strong>${w.paraphrase}</strong></span>
          </div>
          ${w.collocation ? `
            <div class="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
              <i data-lucide="link" class="w-3.5 h-3.5"></i>
              <span>Collocation: <strong>${w.collocation}</strong></span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function toggleBookmarkVocab(wordId) {
  const idx = appSavedVocab.indexOf(wordId);
  if (idx > -1) {
    appSavedVocab.splice(idx, 1);
    showToast('Đã xóa từ khỏi Sổ từ cần ôn lại.');
  } else {
    appSavedVocab.push(wordId);
    showToast('⭐ Đã lưu từ vào Sổ từ vựng cần ôn lại thành công!');
  }
  localStorage.setItem('ielts_saved_vocab', JSON.stringify(appSavedVocab));
  updateBandRoadmapProgress();

  // Re-render current skill zone B or Vault
  const currentSkill = activeSkillZones[currentTab] ? currentTab : 'listening';
  if (activeSkillZones[currentSkill] === 'zone_b') renderSkillZoneB(currentSkill);
  if (currentTab === 'vocabvault') renderVocabVault();
}

// =========================================================================
// PHÂN KHU C: LUYỆN TẬP TỪ VỰNG TƯƠNG TÁC (4 MODES)
// =========================================================================
function renderSkillZoneC(skill) {
  const container = document.getElementById(`zoneContainer_${skill}_zone_c`);
  if (!container) return;

  const data = getActiveVocabData(skill);
  const activeSet = data.activeSet;
  const currentSets = data.currentSets;
  const mode = activePracticeModes[skill] || 'flashcards';

  let html = `
    <!-- Practice Mode Switcher Tabs -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Đang luyện tập: ${activeSet.name} (${activeSet.vnName})
          </span>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">4 Chế Độ Luyện Tập Từ Vựng Tương Tác</h3>
        </div>
        <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto text-xs">
          <button onclick="setSkillPracticeMode('${skill}', 'flashcards')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'flashcards' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            1. Flashcards Lật Thẻ
          </button>
          <button onclick="setSkillPracticeMode('${skill}', 'matching')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'matching' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            2. Nối Từ (Matching)
          </button>
          <button onclick="setSkillPracticeMode('${skill}', 'gapfill')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'gapfill' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            3. Điền Khuyết (Gap-fill)
          </button>
          <button onclick="setSkillPracticeMode('${skill}', 'quiz')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'quiz' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            4. Trắc Nghiệm Nhanh
          </button>
        </div>
      </div>

      <!-- Quick Sub-set Switcher Bar in Zone C -->
      <div class="flex items-center gap-2 overflow-x-auto pt-1 pb-1 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Đổi bộ:</span>
  `;

  currentSets.forEach((s, sIdx) => {
    const isAct = s.id === activeSet.id;
    const sBtnCls = isAct
      ? "px-2.5 py-1 rounded-lg font-bold bg-emerald-600 text-white flex-shrink-0 text-xs shadow-sm"
      : "px-2.5 py-1 rounded-lg font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex-shrink-0 text-xs";
    html += `
      <button onclick="setSkillVocabTopic('${skill}', '${s.id}'); renderSkillZoneC('${skill}');" class="${sBtnCls}">
        ${sIdx + 1}. ${s.name.split('-')[0].trim()}
      </button>
    `;
  });

  html += `
      </div>
    </div>

    <!-- Mode Content Arena -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
  `;

  if (mode === 'flashcards') {
    const cards = activeSet.flashcards || [];
    const idx = activeFlashcardIndices[skill] % Math.max(1, cards.length);
    const card = cards[idx] || { front: "Chưa có flashcard", back: "Chưa có nội dung" };

    html += `
      <div class="max-w-xl mx-auto flex flex-col items-center justify-center space-y-4 py-4">
        <div class="text-xs font-semibold text-slate-500">
          Thẻ ${idx + 1} / ${cards.length} • Nhấn vào thẻ để lật mặt trước/sau
        </div>

        <div onclick="flipSkillFlashcard('${skill}')" id="flashcardBox_${skill}" class="w-full min-h-[240px] p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-emerald-500/40 shadow-xl cursor-pointer select-none flex flex-col justify-between transition transform hover:scale-[1.01]">
          <div class="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span id="cardFaceLabel_${skill}">MẶT TRƯỚC (Từ tiếng Anh)</span>
            <i data-lucide="rotate-cw" class="w-4 h-4"></i>
          </div>
          <div class="py-6 text-center">
            <h3 class="text-2xl font-black text-slate-900 dark:text-white" id="cardText_${skill}">${card.front}</h3>
          </div>
          <div class="text-[11px] text-center text-slate-400">
            Bấm thẻ để xem nghĩa tiếng Việt & Paraphrase
          </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button onclick="prevSkillFlashcard('${skill}')" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Thẻ trước
          </button>
          <button onclick="markFlashcardKnown('${skill}')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition">
            <i data-lucide="check" class="w-4 h-4"></i> Đã thuộc
          </button>
          <button onclick="nextSkillFlashcard('${skill}')" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition">
            Thẻ kế tiếp <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } else if (mode === 'matching') {
    const pairs = activeSet.matching || [];
    const state = matchingGameStates[skill];

    html += `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center space-y-1">
          <h4 class="text-base font-bold text-slate-900 dark:text-white">Trò Chơi Nối Từ & Nghĩa Học Thuật (${pairs.length} Cặp)</h4>
          <p class="text-xs text-slate-500">Bấm 1 từ bên trái rồi bấm nghĩa tương ứng bên phải để ghép cặp chuẩn.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Left Column (English Terms) -->
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-400 text-center uppercase tracking-wider pb-1">Từ / Cụm từ C1</div>
            ${pairs.map(p => {
              const isMatched = state.matches[p.pairId];
              const isSelected = state.selectedLeft === p.pairId;
              let cls = "w-full p-3.5 rounded-xl border text-xs font-bold text-left transition ";
              if (isMatched) {
                cls += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default";
              } else if (isSelected) {
                cls += "bg-emerald-600 text-white border-emerald-600 shadow-md";
              } else {
                cls += "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-800 dark:text-slate-200";
              }
              return `<button onclick="handleMatchingClick('${skill}', 'left', ${p.pairId})" class="${cls}">${p.left}</button>`;
            }).join('')}
          </div>

          <!-- Right Column (Vietnamese Definitions) -->
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-400 text-center uppercase tracking-wider pb-1">Định nghĩa tiếng Việt</div>
            ${[...pairs].reverse().map(p => {
              const isMatched = state.matches[p.pairId];
              let cls = "w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition ";
              if (isMatched) {
                cls += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default";
              } else {
                cls += "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-800 dark:text-slate-200";
              }
              return `<button onclick="handleMatchingClick('${skill}', 'right', ${p.pairId})" class="${cls}">${p.right}</button>`;
            }).join('')}
          </div>
        </div>

        <div class="text-center pt-2">
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400" id="matchingScoreText_${skill}">
            Đã ghép đúng: ${Object.keys(state.matches).length} / ${pairs.length} cặp
          </span>
        </div>
      </div>
    `;
  } else if (mode === 'gapfill') {
    const gapFills = activeSet.gapFill || [];
    html += `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center space-y-1">
          <h4 class="text-base font-bold text-slate-900 dark:text-white">Điền Từ Vào Ngữ Cảnh Câu IELTS Thật</h4>
          <p class="text-xs text-slate-500">Chọn hoặc gõ từ thích hợp để hoàn thiện câu học thuật.</p>
        </div>

        <div class="space-y-4">
          ${gapFills.map((gf, idx) => `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-slate-500">Câu hỏi #${idx + 1}</span>
                <button onclick="toggleGapFillHint('${skill}', '${gf.id}')" class="text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline">
                  <i data-lucide="help-circle" class="w-3.5 h-3.5"></i> Gợi ý (Hint)
                </button>
              </div>
              <p class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">${gf.sentence}</p>
              
              <div id="hintBox_${skill}_${gf.id}" class="hidden p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-700 dark:text-purple-300">
                💡 <strong>Gợi ý:</strong> ${gf.hint}
              </div>

              <div class="flex items-center gap-2 pt-1">
                <select id="gapSelect_${skill}_${gf.id}" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-xs text-slate-800 dark:text-slate-200 flex-1">
                  <option value="">-- Chọn từ thích hợp --</option>
                  ${(gf.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
                <button onclick="checkGapFillAnswer('${skill}', '${gf.id}', '${gf.answer}')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                  Kiểm tra
                </button>
              </div>
              <div id="gapResult_${skill}_${gf.id}" class="text-xs font-bold pt-1"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (mode === 'quiz') {
    const quizzes = activeSet.quiz || [];
    html += `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center space-y-1">
          <h4 class="text-base font-bold text-slate-900 dark:text-white">Trắc Nghiệm Phản Xạ Từ Vựng (Quick Quiz)</h4>
          <p class="text-xs text-slate-500">Chọn đáp án đúng nhất để kiểm tra độ nhạy Collocation và Paraphrase.</p>
        </div>

        <div class="space-y-4">
          ${quizzes.map((qz, idx) => `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <span class="text-xs font-bold text-slate-500">Câu hỏi ${idx + 1}</span>
              <h5 class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">${qz.question}</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                ${qz.options.map((opt, oIdx) => `
                  <button onclick="selectSkillQuizChoice('${skill}', '${qz.id}', ${oIdx}, ${qz.correct}, '${escapeQuotes(qz.explanation)}')" id="quizBtn_${skill}_${qz.id}_${oIdx}" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-400 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                    ${String.fromCharCode(65 + oIdx)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="quizExplain_${skill}_${qz.id}" class="hidden p-3.5 rounded-xl text-xs leading-relaxed mt-2"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function setSkillPracticeMode(skill, mode) {
  activePracticeModes[skill] = mode;
  renderSkillZoneC(skill);
}

function flipSkillFlashcard(skill) {
  const data = getActiveVocabData(skill);
  const cards = data.activeSet.flashcards || [];
  const idx = activeFlashcardIndices[skill] % Math.max(1, cards.length);
  const card = cards[idx] || { front: '', back: '' };

  const faceLabel = document.getElementById(`cardFaceLabel_${skill}`);
  const cardText = document.getElementById(`cardText_${skill}`);
  const cardBox = document.getElementById(`flashcardBox_${skill}`);

  if (faceLabel.textContent.includes('TRƯỚC')) {
    faceLabel.textContent = 'MẶT SAU (Nghĩa tiếng Việt & Paraphrase)';
    cardText.innerHTML = card.back.replace(/\n/g, '<br/>');
    cardBox.classList.remove('border-emerald-500/40');
    cardBox.classList.add('border-purple-500/80');
  } else {
    faceLabel.textContent = 'MẶT TRƯỚC (Từ tiếng Anh)';
    cardText.textContent = card.front;
    cardBox.classList.remove('border-purple-500/80');
    cardBox.classList.add('border-emerald-500/40');
  }
}

function nextSkillFlashcard(skill) {
  activeFlashcardIndices[skill]++;
  renderSkillZoneC(skill);
}

function prevSkillFlashcard(skill) {
  if (activeFlashcardIndices[skill] > 0) activeFlashcardIndices[skill]--;
  renderSkillZoneC(skill);
}

function markFlashcardKnown(skill) {
  showToast('Đã đánh dấu thuộc thẻ này! Tiến độ từ vựng được ghi nhận.');
  appUserProfile.dailyGoalMet = true;
  localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));
  initDailyCheckin();
  nextSkillFlashcard(skill);
}

function handleMatchingClick(skill, side, pairId) {
  const state = matchingGameStates[skill];
  if (state.matches[pairId]) return; // Already matched

  if (side === 'left') {
    state.selectedLeft = pairId;
    renderSkillZoneC(skill);
  } else if (side === 'right') {
    if (state.selectedLeft === null) {
      showToast('Vui lòng bấm chọn 1 từ bên trái trước!');
      return;
    }
    if (state.selectedLeft === pairId) {
      state.matches[pairId] = true;
      state.selectedLeft = null;
      showToast('✓ Ghép đúng cặp từ vựng chính xác!');
      appUserProfile.dailyGoalMet = true;
      localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));
      initDailyCheckin();
      renderSkillZoneC(skill);
    } else {
      showToast('❌ Chưa đúng! Hãy suy luận lại nghĩa tương ứng.');
      state.selectedLeft = null;
      renderSkillZoneC(skill);
    }
  }
}

function toggleGapFillHint(skill, gfId) {
  const hintEl = document.getElementById(`hintBox_${skill}_${gfId}`);
  if (hintEl) hintEl.classList.toggle('hidden');
}

function checkGapFillAnswer(skill, gfId, expected) {
  const selectEl = document.getElementById(`gapSelect_${skill}_${gfId}`);
  const resultEl = document.getElementById(`gapResult_${skill}_${gfId}`);
  if (!selectEl || !resultEl) return;

  const val = selectEl.value.trim().toLowerCase();
  if (!val) {
    resultEl.innerHTML = '<span class="text-amber-500">Vui lòng chọn 1 từ trước khi kiểm tra!</span>';
    return;
  }

  if (val === expected.toLowerCase()) {
    resultEl.innerHTML = `<span class="text-emerald-500">✓ CHÍNH XÁC! "${expected}" là từ ngữ cảnh chuẩn xác.</span>`;
    appUserProfile.dailyGoalMet = true;
    localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));
    initDailyCheckin();
  } else {
    resultEl.innerHTML = `<span class="text-rose-500">❌ Chưa đúng. Đáp án chuẩn là: <strong>${expected}</strong></span>`;
  }
}

function selectSkillQuizChoice(skill, qzId, chosenIdx, correctIdx, explanation) {
  const explainEl = document.getElementById(`quizExplain_${skill}_${qzId}`);
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`quizBtn_${skill}_${qzId}_${i}`);
    if (!btn) continue;
    btn.disabled = true;
    if (i === correctIdx) {
      btn.className = "p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-left text-xs font-bold";
    } else if (i === chosenIdx) {
      btn.className = "p-3 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-left text-xs font-bold";
    } else {
      btn.className = "p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs font-medium opacity-50";
    }
  }

  if (explainEl) {
    explainEl.classList.remove('hidden');
    if (chosenIdx === correctIdx) {
      explainEl.className = "p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed mt-2";
      explainEl.innerHTML = `✓ <strong>Chính xác!</strong> ${explanation}`;
      appUserProfile.dailyGoalMet = true;
      localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));
      initDailyCheckin();
    } else {
      explainEl.className = "p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 leading-relaxed mt-2";
      explainEl.innerHTML = `❌ <strong>Chưa đúng!</strong> ${explanation}`;
    }
  }
}

// =========================================================================
// PHÂN KHU D: NGÂN HÀNG 100 BÀI TEST & BỘ LỌC
// =========================================================================
function renderSkillZoneD(skill) {
  const container = document.getElementById(`zoneContainer_${skill}_zone_d`);
  if (!container) return;

  const allTests = (window.IELTS_BANK_100 && window.IELTS_BANK_100[skill]) ? window.IELTS_BANK_100[skill] : [];
  const filters = activeSkillFilters[skill];

  // Filter logic
  let filtered = allTests.filter(t => {
    if (filters.cam && filters.cam !== 'all') {
      if (filters.cam === 'cam_classic') {
        const modern = ['cam_21', 'cam_19', 'cam_18', 'cam_17', 'cam_16', 'cam_15', 'cam_13', 'cam_12', 'cam_11', 'cam_10'];
        if (modern.includes(t.camSeries)) return false;
      } else if (t.camSeries !== filters.cam) {
        return false;
      }
    }
    if (filters.topic !== 'all' && t.topic !== filters.topic) return false;
    if (filters.type !== 'all') {
      if (filters.type === 'form_completion') {
        if (t.questionType !== 'form_completion' && t.questionType !== 'notes_completion' && t.questionType !== 'fill') return false;
      } else if (filters.type === 'matching') {
        if (t.questionType !== 'matching' && t.questionType !== 'matching_features' && t.questionType !== 'matching_info') return false;
      } else if (filters.type === 'choose_two') {
        if (t.questionType !== 'choose_two' && t.questionType !== 'multiple_choice_multi') return false;
      } else if (filters.type === 'table_completion') {
        if (t.questionType !== 'table_completion' && t.questionType !== 'summary_word_bank') return false;
      } else if (t.questionType !== filters.type) {
        return false;
      }
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !(t.topicName || '').toLowerCase().includes(q)) return false;
    }
    if (filters.status === 'done') {
      return appTestSubmissions.some(s => s.testId === t.id);
    }
    if (filters.status === 'undone') {
      return !appTestSubmissions.some(s => s.testId === t.id);
    }
    if (filters.status === 'band7') {
      const sub = appTestSubmissions.find(s => s.testId === t.id);
      return sub && parseFloat(sub.band) >= 7.0;
    }
    return true;
  });

  const topics = window.IELTS_VOCAB_TOPICS || [];

  let html = `
    <!-- Filters Header Bar -->
    <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Trọn Bộ Đề Khảo Thí Cambridge IELTS 1 - 21</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
            Luyện Thi Chuyên Sâu ${skill.toUpperCase()} (Hiển thị: ${filtered.length}/100 bài)
          </h3>
        </div>
        <div class="flex items-center gap-2">
          <input type="text" id="testSearchInput_${skill}" value="${filters.search}" oninput="setSkillTestFilter('${skill}', 'search', this.value)" placeholder="Tìm theo Cam, chủ đề, tên bài..." class="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 w-56 focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>
      </div>

      <!-- Filter Controls Grid (4 Columns) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <!-- Cambridge Book Series Filter -->
        <div>
          <label class="block text-[11px] font-bold text-slate-400 mb-1">Bộ Sách Cambridge (Cam 1 - 21):</label>
          <select onchange="setSkillTestFilter('${skill}', 'cam', this.value)" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-bold text-indigo-600 dark:text-indigo-400">
            <option value="all" ${filters.cam === 'all' ? 'selected' : ''}>Tất cả các bộ (Cam 1 - 21)</option>
            <option value="cam_21" ${filters.cam === 'cam_21' ? 'selected' : ''}>Cambridge 21 (Mới Nhất 2026)</option>
            <option value="cam_19" ${filters.cam === 'cam_19' ? 'selected' : ''}>Cambridge 19 (Hot 2024)</option>
            <option value="cam_18" ${filters.cam === 'cam_18' ? 'selected' : ''}>Cambridge 18 (2023)</option>
            <option value="cam_17" ${filters.cam === 'cam_17' ? 'selected' : ''}>Cambridge 17 (2022)</option>
            <option value="cam_16" ${filters.cam === 'cam_16' ? 'selected' : ''}>Cambridge 16 (2021)</option>
            <option value="cam_15" ${filters.cam === 'cam_15' ? 'selected' : ''}>Cambridge 15 (2020)</option>
            <option value="cam_13" ${filters.cam === 'cam_13' ? 'selected' : ''}>Cambridge 13 (2018)</option>
            <option value="cam_12" ${filters.cam === 'cam_12' ? 'selected' : ''}>Cambridge 12 (2017)</option>
            <option value="cam_11" ${filters.cam === 'cam_11' ? 'selected' : ''}>Cambridge 11 (2016)</option>
            <option value="cam_10" ${filters.cam === 'cam_10' ? 'selected' : ''}>Cambridge 10 (2015)</option>
            <option value="cam_classic" ${filters.cam === 'cam_classic' ? 'selected' : ''}>Cambridge 1 – 9 (Nền Tảng Cổ Điển)</option>
          </select>
        </div>

        <!-- Topic Filter -->
        <div>
          <label class="block text-[11px] font-bold text-slate-400 mb-1">Chủ đề (Topic):</label>
          <select onchange="setSkillTestFilter('${skill}', 'topic', this.value)" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium">
            <option value="all" ${filters.topic === 'all' ? 'selected' : ''}>Tất cả các chủ đề (12 Themes)</option>
            ${topics.map(t => `<option value="${t.id}" ${filters.topic === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
          </select>
        </div>

        <!-- Question Type Filter (Dynamic by Skill) -->
        <div>
          <label class="block text-[11px] font-bold text-slate-400 mb-1">Dạng câu hỏi (Type):</label>
          <select onchange="setSkillTestFilter('${skill}', 'type', this.value)" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-bold text-amber-600 dark:text-amber-400">
            <option value="all" ${filters.type === 'all' ? 'selected' : ''}>Tất cả các dạng bài (${filtered.length} bài)</option>
            ${skill === 'listening' ? `
              <option value="map_labelling" ${filters.type === 'map_labelling' ? 'selected' : ''}>🗺️ Map / Plan Labelling (Gán nhãn bản đồ A-H)</option>
              <option value="matching" ${filters.type === 'matching' ? 'selected' : ''}>🔗 Matching Features / Opinions (Nối thông tin A-F)</option>
              <option value="multiple_choice" ${filters.type === 'multiple_choice' ? 'selected' : ''}>🔘 Multiple Choice (Trắc nghiệm A, B, C)</option>
              <option value="choose_two" ${filters.type === 'choose_two' ? 'selected' : ''}>☑️ Choose TWO Letters (Chọn 2 đáp án A-E)</option>
              <option value="form_completion" ${filters.type === 'form_completion' ? 'selected' : ''}>📝 Form / Notes Completion (Điền đơn / ghi chú)</option>
              <option value="table_completion" ${filters.type === 'table_completion' ? 'selected' : ''}>📊 Table / Flowchart Completion (Điền bảng)</option>
            ` : `
              <option value="tfng" ${filters.type === 'tfng' ? 'selected' : ''}>🟢 True / False / Not Given</option>
              <option value="matching_headings" ${filters.type === 'matching_headings' ? 'selected' : ''}>📑 Matching Headings (Số La Mã i-viii)</option>
              <option value="summary_completion" ${filters.type === 'summary_completion' ? 'selected' : ''}>📋 Summary Completion / Word Bank</option>
              <option value="multiple_choice" ${filters.type === 'multiple_choice' ? 'selected' : ''}>🔘 Multiple Choice</option>
              <option value="form_completion" ${filters.type === 'form_completion' ? 'selected' : ''}>✏️ Sentence / Notes Completion</option>
            `}
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-[11px] font-bold text-slate-400 mb-1">Trạng thái (Status):</label>
          <select onchange="setSkillTestFilter('${skill}', 'status', this.value)" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium">
            <option value="all" ${filters.status === 'all' ? 'selected' : ''}>Tất cả trạng thái</option>
            <option value="undone" ${filters.status === 'undone' ? 'selected' : ''}>Chưa làm</option>
            <option value="done" ${filters.status === 'done' ? 'selected' : ''}>Đã nộp bài</option>
            <option value="band7" ${filters.status === 'band7' ? 'selected' : ''}>Đạt Band >= 7.0</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tests Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  `;

  filtered.forEach(t => {
    const sub = appTestSubmissions.find(s => s.testId === t.id);
    const isDone = !!sub;

    let statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">Chưa làm</span>`;
    if (isDone) {
      const b = parseFloat(sub.band) || 6.0;
      const bColor = b >= 7.0 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
      statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black ${bColor}">Đã nộp: Band ${b.toFixed(1)}</span>`;
    }

    // Question Type Display Badge
    let typeBadge = '';
    const qt = t.questionType || '';
    if (qt === 'map_labelling') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">🗺️ Map / Plan Labelling</span>`;
    } else if (qt === 'matching' || qt === 'matching_features') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">🔗 Matching Features</span>`;
    } else if (qt === 'choose_two' || qt === 'multiple_choice_multi') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">☑️ Choose TWO Letters</span>`;
    } else if (qt === 'multiple_choice') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">🔘 Multiple Choice (A-B-C)</span>`;
    } else if (qt === 'table_completion') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">📊 Table Completion</span>`;
    } else if (qt === 'tfng') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">🟢 True / False / Not Given</span>`;
    } else if (qt === 'matching_headings') {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">📑 Matching Headings</span>`;
    } else {
      typeBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">📝 Form / Notes Completion</span>`;
    }

    html += `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-brand-400 hover:shadow-md transition">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-black px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
                #${t.testNum}
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                ${t.camBadge || 'Cambridge IELTS'}
              </span>
            </div>
            ${statusBadge}
          </div>

          <div class="flex items-center gap-2">
            ${typeBadge}
          </div>

          <h4 class="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
            ${t.title}
          </h4>

          <div class="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3 h-3 text-purple-500"></i> ${t.topicName || t.topic}</span>
            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3 text-amber-500"></i> ${t.duration || '15 phút'}</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-[10px] font-bold text-purple-700 dark:text-purple-300">
            <i data-lucide="sparkles" class="w-3 h-3 text-purple-500"></i>
            <span>${(t.testVocabulary || []).length || 5} Từ vựng cốt lõi • Flashcard & Luyện tập</span>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <button onclick="openTestArena('${skill}', '${t.id}')" class="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition">
            <i data-lucide="play" class="w-3.5 h-3.5"></i>
            <span>Vào Thi Ngay</span>
          </button>
          <button onclick="openPreTestVocab('${skill}', '${t.id}')" class="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition" title="Xem từ vựng trước">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-purple-500"></i>
            <span>Từ Vựng</span>
          </button>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function setSkillTestFilter(skill, filterKey, val) {
  activeSkillFilters[skill][filterKey] = val;
  renderSkillZoneD(skill);
}

// =========================================================================
// 4. SPLIT-SCREEN EXAM ARENA (INTERACTIVE TEST PLAYER)
// =========================================================================
function openTestArena(skill, testId) {
  const allTests = (window.IELTS_BANK_100 && window.IELTS_BANK_100[skill]) ? window.IELTS_BANK_100[skill] : [];
  const test = allTests.find(t => t.id === testId);
  if (!test) {
    showToast('Không tìm thấy bài test này!');
    return;
  }

  activeArenaState.test = test;
  activeArenaState.skill = skill;
  activeArenaState.secondsRemaining = (skill === 'writing') ? 1200 : 600; // 20m or 10m
  activeArenaState.isPaused = false;
  activeArenaState.userAnswers = {};
  activeArenaState.wordCount = 0;

  if (activeArenaState.timerInterval) clearInterval(activeArenaState.timerInterval);
  activeArenaState.timerInterval = setInterval(updateArenaTimerTick, 1000);

  const modal = document.getElementById('testArenaModal');
  const titleEl = document.getElementById('arenaTestTitle');
  const subtitleEl = document.getElementById('arenaTestSubtitle');
  const leftPane = document.getElementById('arenaLeftPane');
  const rightPane = document.getElementById('arenaRightPane');
  const highlightToolbar = document.getElementById('arenaHighlightToolbar');

  if (titleEl) titleEl.textContent = test.title;
  if (subtitleEl) subtitleEl.textContent = `Chủ đề: ${test.topicName || test.topic} • ${test.level || 'Band 6.5 - 8.0'}`;

  // Highlight toolbar visibility (only for reading)
  if (highlightToolbar) {
    if (skill === 'reading') {
      highlightToolbar.classList.remove('hidden');
    } else {
      highlightToolbar.classList.add('hidden');
    }
  }

  // Render Left Pane
  if (skill === 'listening') {
    leftPane.innerHTML = `
      <div class="space-y-6">
        <!-- Dual-Engine Audio Player Card -->
        <div class="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-bold text-white uppercase tracking-wider">Cambridge Audio Player</span>
            </div>
            <!-- Audio Engine Mode Switcher -->
            <div class="flex items-center bg-slate-950/80 rounded-xl p-0.5 border border-slate-800 text-[11px]">
              <button id="arenaModeMp3Btn" onclick="setArenaAudioSourceMode('mp3')" class="px-2.5 py-1 rounded-lg font-bold bg-blue-600 text-white transition flex items-center gap-1">
                <i data-lucide="music" class="w-3 h-3"></i> File MP3
              </button>
              <button id="arenaModeTtsBtn" onclick="setArenaAudioSourceMode('tts')" class="px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white transition flex items-center gap-1">
                <i data-lucide="bot" class="w-3 h-3"></i> Giọng Đọc AI (TTS)
              </button>
            </div>
          </div>

          <!-- Mode 1: HTML5 Native MP3 Audio Player -->
          <div id="arenaMp3PlayerContainer" class="space-y-3">
            <audio id="arenaAudioPlayer" src="${test.audioUrl}" preload="auto" controls class="w-full" onerror="handleArenaAudioError()"></audio>

            <!-- Audio 404/Error Notice -->
            <div id="arenaAudioErrorNotice" class="hidden p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/80 text-xs text-amber-200 space-y-1.5">
              <div class="flex items-center gap-2 font-bold text-amber-400">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400"></i> File MP3 gốc chưa được tải lên máy chủ
              </div>
              <p class="text-[11px] text-amber-300/90 leading-relaxed">
                Hệ thống đã tự động chuyển sang <strong>Giọng Đọc Bản Ngữ AI (Native British Voice)</strong> bên dưới để bạn tiếp tục luyện nghe ngay lập tức với 100% nội dung đề thi!
              </p>
            </div>

            <!-- Quick Audio Controls (Speed, Skip) -->
            <div class="flex items-center justify-between text-xs pt-1 flex-wrap gap-2">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] text-slate-400">Tốc độ:</span>
                <button onclick="setArenaAudioSpeed(0.8)" id="spdBtn_08" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px]">0.8x</button>
                <button onclick="setArenaAudioSpeed(1.0)" id="spdBtn_10" class="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">1.0x</button>
                <button onclick="setArenaAudioSpeed(1.2)" id="spdBtn_12" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px]">1.2x</button>
                <button onclick="seekArenaAudio(-10)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300">-10s</button>
                <button onclick="seekArenaAudio(10)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300">+10s</button>
              </div>
              <button onclick="toggleArenaTranscript()" class="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Ẩn/Hiện Script
              </button>
            </div>
          </div>

          <!-- Mode 2: Web Speech Synthesis AI Player (Native British/American Audio) -->
          <div id="arenaTtsPlayerContainer" class="hidden space-y-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-300 font-black text-[10px] uppercase">AI Speech Engine</span>
                <span class="text-xs font-bold text-white">Giọng Đọc Chuẩn Bản Ngữ IELTS</span>
              </div>
              <span id="arenaTtsStatusBadge" class="text-[10px] text-slate-400">Sẵn sàng phát</span>
            </div>

            <!-- TTS Action Buttons -->
            <div class="flex items-center gap-2">
              <button id="arenaTtsPlayBtn" onclick="toggleArenaTTS()" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition">
                <i data-lucide="play" class="w-4 h-4"></i> <span>Bắt Đầu Nghe AI Voice</span>
              </button>
              <button onclick="restartArenaTTS()" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition" title="Nghe lại từ đầu">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div id="arenaTtsProgressBar" class="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>

            <!-- TTS Speed Controls -->
            <div class="flex items-center justify-between text-xs pt-1">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] text-slate-400">Tốc độ:</span>
                <button onclick="setArenaTTSSpeed(0.8)" id="ttsSpd_08" class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">0.8x</button>
                <button onclick="setArenaTTSSpeed(1.0)" id="ttsSpd_10" class="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">1.0x</button>
                <button onclick="setArenaTTSSpeed(1.2)" id="ttsSpd_12" class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">1.2x</button>
              </div>
              <button onclick="toggleArenaTranscript()" class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Ẩn/Hiện Script
              </button>
            </div>
          </div>
        </div>

        <!-- Collapsible Audio Transcript with Real-time Sentence Tracking -->
        <div id="arenaTranscriptBox" class="hidden p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2 font-sans max-h-96 overflow-y-auto">
          <div class="flex items-center justify-between font-bold text-white uppercase text-[11px] pb-2 border-b border-slate-800">
            <span>Transcript Bài Nghe (Theo Dõi Thời Gian Thực):</span>
            <span class="text-[10px] text-slate-400 font-normal">Bấm vào câu bất kỳ để nghe đoạn đó</span>
          </div>
          <div id="arenaTranscriptSentences" class="space-y-1.5 pt-1">
            <!-- Injected dynamically sentence by sentence -->
          </div>
        </div>

        <div class="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200">
          💡 <strong>Hướng dẫn:</strong> Bấm <strong>Play</strong> trên thanh Audio hoặc <strong>Bắt Đầu Nghe AI Voice</strong> để nghe. Bạn có thể chọn/gõ đáp án tương ứng vào ô bên phải. Hệ thống tự động lưu bài làm của bạn!
        </div>
      </div>
    `;

    // Initialize TTS transcript sentences
    setTimeout(() => {
      initArenaTTS(test.transcript || '');
    }, 50);

  } else if (skill === 'reading') {
    leftPane.innerHTML = `
      <div class="space-y-4 select-text">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
          <span>Đoạn văn đọc học thuật (${test.wordCount || 850} từ)</span>
          <span class="text-emerald-400 font-semibold">Bôi đen chữ để Highlight</span>
        </div>
        <div id="arenaPassageContent" class="text-slate-200 text-sm leading-relaxed space-y-4 font-serif">
          ${test.passage.split('\n\n').map(p => `<p class="p-1">${p}</p>`).join('')}
        </div>
      </div>
    `;
  } else if (skill === 'writing') {
    leftPane.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold uppercase text-amber-400">Yêu Cầu Đề Bài ${test.taskType}</span>
          <h4 class="text-sm font-bold text-white leading-relaxed">${test.prompt}</h4>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold uppercase text-emerald-400">Dàn Ý Gợi Ý (PEEL Structure):</span>
          <ul class="space-y-1 text-slate-300">
            <li>• <strong>Mở bài:</strong> ${test.outlineBreakdown ? test.outlineBreakdown.intro : 'Paraphrase topic'}</li>
            <li>• <strong>Overview / Thân bài 1:</strong> ${test.outlineBreakdown ? (test.outlineBreakdown.overview || test.outlineBreakdown.body1) : 'Trình bày luận điểm 1'}</li>
            <li>• <strong>Thân bài 2:</strong> ${test.outlineBreakdown ? test.outlineBreakdown.body2 : 'Trình bày luận điểm 2'}</li>
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold uppercase text-purple-400">Collocations C1 Đắt Giá Cần Áp Dụng:</span>
          <div class="flex flex-wrap gap-1.5">
            ${(test.lexicalBoosters || []).map(b => `<span class="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/80 text-purple-200 text-[11px] font-medium">${b}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (skill === 'speaking') {
    leftPane.innerHTML = `
      <div class="space-y-4 text-xs">
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold uppercase text-rose-400">Câu Hỏi Giám Khảo ${test.part}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Chuẩn Phòng Thi</span>
          </div>
          <div class="space-y-2">
            ${(test.prompts || []).map(p => `<p class="text-sm font-bold text-white py-1 border-b border-slate-800/60">${p}</p>`).join('')}
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold uppercase text-indigo-400">Chiến Thuật Tư Duy:</span>
          <p class="text-slate-300 leading-relaxed">${test.outlineStrategy}</p>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span class="text-[10px] font-bold uppercase text-amber-400">Idioms & Collocations Ghi Điểm:</span>
          <div class="flex flex-wrap gap-1.5">
            ${(test.lexicalBoosters || []).map(b => `<span class="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/80 text-amber-200 text-[11px] font-medium">${b}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Render Right Pane (Interactive Questions / Input)
  if (skill === 'listening' || skill === 'reading') {
    let questionsHtml = '';
    const qGroups = test.questionGroups || [];

    // If test has questionGroups, render with authentic group headers
    if (qGroups.length > 0) {
      qGroups.forEach(group => {
        questionsHtml += `
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-700/80 mb-3 space-y-1.5 shadow-md">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">Questions ${group.from}–${group.to}</span>
              <span class="text-xs font-bold text-white">${group.typeLabel}</span>
            </div>
            <p class="text-xs text-slate-300 italic">${group.instruction}</p>
          </div>
        `;
        const groupQuestions = (test.questions || []).filter(q => q.qNum >= group.from && q.qNum <= group.to);
        questionsHtml += groupQuestions.map((q, idx) => `
          <div id="arenaQContainer_${q.qNum}" class="mb-3">
            ${renderArenaQuestionItem(q, test, skill, q.qNum - 1)}
          </div>
        `).join('');
      });
    } else {
      questionsHtml = (test.questions || []).map((q, idx) => `
        <div id="arenaQContainer_${q.qNum}" class="mb-3">
          ${renderArenaQuestionItem(q, test, skill, idx)}
        </div>
      `).join('');
    }

    rightPane.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span class="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="list-checks" class="w-4 h-4 text-emerald-400"></i>
            Phiếu Trả Lời (${(test.questions || []).length} câu hỏi chuẩn Cambridge)
          </span>
          <span class="text-[11px] text-slate-500">Tự động lưu khi chọn</span>
        </div>

        <div class="space-y-1">
          ${questionsHtml}
        </div>
      </div>
    `;
  } else if (skill === 'writing') {
    rightPane.innerHTML = `
      <div class="space-y-4 h-full flex flex-col">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-300">Khung Soạn Thảo Bài Viết</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Yêu cầu: tối thiểu ${test.minWords} từ</span>
          </div>
          <span class="font-bold text-amber-400" id="writingWordCountBadge">0 từ</span>
        </div>

        <textarea id="arenaWritingInput" oninput="handleWritingTextareaInput(this)" placeholder="Bắt đầu viết bài của bạn tại đây theo cấu trúc PEEL..." class="flex-1 w-full min-h-[360px] p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-amber-500 font-mono"></textarea>
      </div>
    `;
  } else if (skill === 'speaking') {
    rightPane.innerHTML = `
      <div class="space-y-4 h-full flex flex-col">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span class="font-bold text-slate-300">Khung Kịch Bản & Ghi Âm Trả Lời</span>
          <span class="text-slate-500">Nói hoặc gõ kịch bản để chấm điểm 4 tiêu chí</span>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div class="text-xs font-bold text-white">Luyện Nói & Nhận Diện Giọng Nói</div>
            <div class="text-[11px] text-slate-400">Bấm nút Mic để chuyển giọng nói thành văn bản</div>
          </div>
          <button id="arenaMicBtn" onclick="toggleArenaSpeechMic()" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition">
            <i data-lucide="mic" class="w-4 h-4"></i> Bật Mic
          </button>
        </div>

        <textarea id="arenaSpeakingInput" placeholder="Nhập hoặc nói câu trả lời của bạn vào đây (hệ thống sẽ phân tích ngữ pháp, collocations và chấm điểm theo 4 tiêu chí chuẩn IELTS)..." class="flex-1 w-full min-h-[280px] p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-rose-500"></textarea>
      </div>
    `;
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTestArena() {
  if (activeArenaState.timerInterval) clearInterval(activeArenaState.timerInterval);
  const audio = document.getElementById('arenaAudioPlayer');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  stopArenaTTS();
  const modal = document.getElementById('testArenaModal');
  if (modal) modal.classList.add('hidden');
}

// =========================================================================
// INTERACTIVE QUESTION ITEM RENDERER (ALL IELTS QUESTION TYPES)
// =========================================================================
function renderArenaQuestionItem(q, test, skill, index) {
  const qNum = q.qNum || (index + 1);
  const qType = q.type || test.questionType || 'fill';
  const savedVal = (activeArenaState.userAnswers[qNum] || '').toString();

  // 1. TRUE / FALSE / NOT GIVEN
  if (qType === 'tfng') {
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300">CÂU #${qNum} • TRUE / FALSE / NOT GIVEN</span>
          <span class="text-[11px] text-slate-500">Chọn 1 trong 3 đáp án</span>
        </div>
        <p class="text-xs text-slate-200 font-medium leading-relaxed">${q.text}</p>
        <div class="grid grid-cols-3 gap-2 pt-1">
          ${['TRUE', 'FALSE', 'NOT GIVEN'].map(opt => {
            const isSelected = savedVal.toUpperCase() === opt;
            const activeClass = isSelected
              ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-md shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white';
            return `
              <button type="button" onclick="selectArenaOption(${qNum}, '${opt}')" id="btnAns_${qNum}_${opt.replace(/\s+/g, '_')}" class="py-2.5 px-2 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 ${activeClass}">
                ${isSelected ? '✓ ' : ''}${opt}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 2. YES / NO / NOT GIVEN
  if (qType === 'ynng') {
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">CÂU #${qNum} • YES / NO / NOT GIVEN</span>
          <span class="text-[11px] text-slate-500">Chọn 1 trong 3 đáp án</span>
        </div>
        <p class="text-xs text-slate-200 font-medium leading-relaxed">${q.text}</p>
        <div class="grid grid-cols-3 gap-2 pt-1">
          ${['YES', 'NO', 'NOT GIVEN'].map(opt => {
            const isSelected = savedVal.toUpperCase() === opt;
            const activeClass = isSelected
              ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400 shadow-md shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white';
            return `
              <button type="button" onclick="selectArenaOption(${qNum}, '${opt}')" id="btnAns_${qNum}_${opt.replace(/\s+/g, '_')}" class="py-2.5 px-2 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 ${activeClass}">
                ${isSelected ? '✓ ' : ''}${opt}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 3. MULTIPLE CHOICE (Single: A, B, C, D or A, B, C)
  if (qType === 'multiple_choice' || qType === 'mc') {
    const options = q.options || [];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300">CÂU #${qNum} • MULTIPLE CHOICE</span>
          <span class="text-[11px] text-slate-500">Chọn 1 đáp án chính xác</span>
        </div>
        <p class="text-xs text-slate-200 font-semibold leading-relaxed">${q.text}</p>
        <div class="grid grid-cols-1 gap-2 pt-1">
          ${options.map(opt => {
            const letter = (opt.match(/^([A-D])[\.\:\s]/) || [null, opt.charAt(0)])[1] || opt.charAt(0);
            const isSelected = savedVal.toUpperCase() === letter.toUpperCase();
            const activeClass = isSelected
              ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
              : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white';
            return `
              <div onclick="selectArenaOption(${qNum}, '${letter}')" class="p-3 rounded-xl border ${activeClass} cursor-pointer text-xs flex items-center gap-3 transition">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}">${letter}</span>
                <span class="flex-1">${opt.replace(/^[A-D][\.\:\s]\s*/, '')}</span>
                ${isSelected ? '<span class="text-purple-400 font-bold text-xs">✓ Đã chọn</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 4. MULTIPLE CHOICE (Multi: Choose TWO / THREE letters)
  if (qType === 'multiple_choice_multi' || qType === 'choose_two') {
    const options = q.options || [];
    const maxSel = q.maxSelections || 2;
    const selectedList = savedVal ? savedVal.split(/[,;\s]+/).map(s => s.trim().toUpperCase()).filter(Boolean) : [];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-800 text-pink-300">CÂU #${qNum} • CHOOSE ${maxSel} LETTERS</span>
          <span class="text-[11px] text-pink-400 font-semibold" id="multiCount_${qNum}">Đã chọn: ${selectedList.length}/${maxSel}</span>
        </div>
        <p class="text-xs text-slate-200 font-semibold leading-relaxed">${q.text}</p>
        <div class="grid grid-cols-1 gap-2 pt-1">
          ${options.map(opt => {
            const letter = (opt.match(/^([A-E])[\.\:\s]/) || [null, opt.charAt(0)])[1] || opt.charAt(0);
            const isSelected = selectedList.includes(letter.toUpperCase());
            const activeClass = isSelected
              ? 'border-pink-500 bg-pink-950/40 text-white ring-1 ring-pink-500'
              : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:text-white';
            return `
              <div onclick="toggleArenaMultiOption(${qNum}, '${letter}', ${maxSel})" class="p-3 rounded-xl border ${activeClass} cursor-pointer text-xs flex items-center gap-3 transition">
                <span class="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black ${isSelected ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}">${letter}</span>
                <span class="flex-1">${opt.replace(/^[A-E][\.\:\s]\s*/, '')}</span>
                ${isSelected ? '<span class="text-pink-400 font-bold text-xs">✓ Đã chọn</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 5. MATCHING HEADINGS
  if (qType === 'matching_headings') {
    const headings = test.headings || q.headings || [];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300">CÂU #${qNum} • MATCHING HEADING</span>
          <span class="text-[11px] text-slate-500">Chọn tiêu đề La Mã (i, ii, iii...)</span>
        </div>
        <p class="text-xs text-slate-200 font-bold leading-relaxed">${q.text}</p>
        <div class="pt-1">
          <select onchange="selectArenaOption(${qNum}, this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 font-sans">
            <option value="">-- Bấm vào đây để chọn Heading phù hợp --</option>
            ${headings.map(h => {
              const val = (h.match(/^([ivxlcdm]+)[\.\:\s]/i) || [null, h.split('.')[0]])[1] || h.split(' ')[0];
              const isSelected = savedVal.toLowerCase() === val.toLowerCase();
              return `<option value="${val}" ${isSelected ? 'selected' : ''}>${h}</option>`;
            }).join('')}
          </select>
        </div>
      </div>
    `;
  }

  // 6. MATCHING FEATURES / MATCHING INFORMATION / MATCHING OPINIONS
  if (qType === 'matching_features' || qType === 'matching_info' || qType === 'matching') {
    const options = q.options || test.matchingOptions || ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">CÂU #${qNum} • MATCHING</span>
          <span class="text-[11px] text-slate-500">Chọn chữ cái phù hợp</span>
        </div>
        <p class="text-xs text-slate-200 font-medium leading-relaxed">${q.text}</p>
        <div class="flex flex-wrap gap-2 pt-1">
          ${options.map(opt => {
            const letter = typeof opt === 'string' && opt.length > 2 ? opt.charAt(0) : opt;
            const isSelected = savedVal.toUpperCase() === letter.toUpperCase();
            const activeClass = isSelected
              ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-md shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white';
            return `
              <button type="button" onclick="selectArenaOption(${qNum}, '${letter}')" class="w-10 h-10 rounded-xl text-xs font-black text-center transition flex items-center justify-center ${activeClass}" title="${opt}">
                ${letter}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 7. SUMMARY WORD BANK
  if (qType === 'summary_word_bank') {
    const bank = test.wordBank || q.wordBank || [];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-950 border border-teal-800 text-teal-300">CÂU #${qNum} • SUMMARY (WORD BANK)</span>
          <span class="text-[11px] text-slate-500">Chọn từ trong Word Bank</span>
        </div>
        <p class="text-xs text-slate-200 font-medium leading-relaxed">${q.text}</p>
        <div class="pt-1">
          <select onchange="selectArenaOption(${qNum}, this.value)" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500 font-sans">
            <option value="">-- Chọn chữ cái / từ trong danh sách --</option>
            ${bank.map(item => {
              const letter = item.split(/[\.\:\s]/)[0];
              const isSelected = savedVal.toUpperCase() === letter.toUpperCase();
              return `<option value="${letter}" ${isSelected ? 'selected' : ''}>${item}</option>`;
            }).join('')}
          </select>
        </div>
      </div>
    `;
  }

  // 8. MAP / DIAGRAM LABELLING
  if (qType === 'map_labelling' || qType === 'diagram_labelling') {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 transition hover:border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-violet-950 border border-violet-800 text-violet-300">CÂU #${qNum} • MAP LABELLING</span>
          <span class="text-[11px] text-slate-500">Chọn vị trí A–H trên bản đồ</span>
        </div>
        <p class="text-xs text-slate-200 font-bold leading-relaxed">${q.text}</p>
        <div class="flex flex-wrap gap-2 pt-1">
          ${letters.map(letter => {
            const isSelected = savedVal.toUpperCase() === letter;
            const activeClass = isSelected
              ? 'bg-violet-600 text-white font-bold ring-2 ring-violet-400 shadow-md shadow-violet-600/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white';
            return `
              <button type="button" onclick="selectArenaOption(${qNum}, '${letter}')" class="w-10 h-10 rounded-xl text-xs font-black text-center transition flex items-center justify-center ${activeClass}">
                ${letter}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 9. DEFAULT: FILL IN THE BLANK / NOTES / FORM COMPLETION
  return `
    <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 transition hover:border-slate-700">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300">CÂU #${qNum} • COMPLETION</span>
        <span class="text-[10px] font-semibold text-amber-400/90">${q.wordLimit || 'ONE WORD ONLY'}</span>
      </div>
      <p class="text-xs text-slate-200 font-medium leading-relaxed">${q.text}</p>
      <input type="text" id="arenaAns_${qNum}" value="${savedVal}" oninput="activeArenaState.userAnswers[${qNum}] = this.value" placeholder="Gõ câu trả lời của bạn vào đây..." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium">
    </div>
  `;
}

function selectArenaOption(qNum, value) {
  activeArenaState.userAnswers[qNum] = value;
  const q = (activeArenaState.test.questions || []).find(item => item.qNum === qNum);
  if (q) {
    const el = document.getElementById(`arenaQContainer_${qNum}`);
    if (el) {
      el.innerHTML = renderArenaQuestionItem(q, activeArenaState.test, activeArenaState.skill, qNum - 1);
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

function toggleArenaMultiOption(qNum, letter, maxSel) {
  let current = activeArenaState.userAnswers[qNum] || '';
  let arr = current ? current.split(/[,;\s]+/).map(s => s.trim().toUpperCase()).filter(Boolean) : [];
  const idx = arr.indexOf(letter.toUpperCase());
  if (idx >= 0) {
    arr.splice(idx, 1);
  } else {
    if (arr.length >= maxSel) {
      arr.shift();
    }
    arr.push(letter.toUpperCase());
  }
  arr.sort();
  activeArenaState.userAnswers[qNum] = arr.join(', ');

  const q = (activeArenaState.test.questions || []).find(item => item.qNum === qNum);
  if (q) {
    const el = document.getElementById(`arenaQContainer_${qNum}`);
    if (el) {
      el.innerHTML = renderArenaQuestionItem(q, activeArenaState.test, activeArenaState.skill, qNum - 1);
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

// =========================================================================
// NATIVE WEB SPEECH API (AI VOICE SYNTHESIS ENGINE)
// =========================================================================
let arenaTtsUtterance = null;
let arenaTtsSentences = [];
let arenaTtsCurrentSentenceIdx = 0;
let arenaTtsRate = 1.0;
let arenaTtsIsPlaying = false;

function initArenaTTS(transcript) {
  stopArenaTTS();
  arenaTtsCurrentSentenceIdx = 0;
  arenaTtsIsPlaying = false;

  if (!transcript) return;

  // Split transcript into clean sentences for synchronous speech & highlighting
  arenaTtsSentences = transcript
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const container = document.getElementById('arenaTranscriptSentences');
  if (container) {
    container.innerHTML = arenaTtsSentences.map((sent, idx) => `
      <p id="ttsSent_${idx}" class="py-1 px-2 rounded-lg transition text-slate-300 text-xs cursor-pointer hover:bg-slate-800" onclick="jumpToArenaTtsSentence(${idx})">
        ${sent}
      </p>
    `).join('');
  }
}

function toggleArenaTTS() {
  if (arenaTtsIsPlaying) {
    pauseArenaTTS();
  } else {
    playArenaTTS();
  }
}

function playArenaTTS() {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt của bạn chưa hỗ trợ Web Speech Synthesis.');
    return;
  }
  window.speechSynthesis.cancel();
  arenaTtsIsPlaying = true;
  updateArenaTtsControlsUI();
  speakArenaSentence(arenaTtsCurrentSentenceIdx);
}

function speakArenaSentence(idx) {
  if (idx >= arenaTtsSentences.length) {
    arenaTtsIsPlaying = false;
    arenaTtsCurrentSentenceIdx = 0;
    updateArenaTtsControlsUI();
    showToast('Đã phát xong toàn bộ bài nghe AI!');
    return;
  }

  arenaTtsCurrentSentenceIdx = idx;
  highlightArenaTtsSentence(idx);

  const textToSpeak = arenaTtsSentences[idx];
  arenaTtsUtterance = new SpeechSynthesisUtterance(textToSpeak);
  arenaTtsUtterance.rate = arenaTtsRate;

  // Prefer authentic British English accent for IELTS
  const voices = window.speechSynthesis.getVoices();
  const gbVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('British') || v.name.includes('Daniel'));
  const enVoice = voices.find(v => v.lang.startsWith('en'));
  if (gbVoice) {
    arenaTtsUtterance.voice = gbVoice;
  } else if (enVoice) {
    arenaTtsUtterance.voice = enVoice;
  }

  arenaTtsUtterance.onend = () => {
    if (arenaTtsIsPlaying) {
      speakArenaSentence(idx + 1);
    }
  };

  arenaTtsUtterance.onerror = (e) => {
    console.warn('TTS playback note:', e);
  };

  window.speechSynthesis.speak(arenaTtsUtterance);
}

function pauseArenaTTS() {
  arenaTtsIsPlaying = false;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  updateArenaTtsControlsUI();
}

function stopArenaTTS() {
  arenaTtsIsPlaying = false;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  updateArenaTtsControlsUI();
}

function restartArenaTTS() {
  arenaTtsCurrentSentenceIdx = 0;
  playArenaTTS();
}

function jumpToArenaTtsSentence(idx) {
  stopArenaTTS();
  arenaTtsCurrentSentenceIdx = idx;
  playArenaTTS();
}

function setArenaTTSSpeed(spd) {
  arenaTtsRate = spd;
  [0.8, 1.0, 1.2].forEach(s => {
    const btn = document.getElementById(`ttsSpd_${String(s).replace('.', '')}`);
    if (btn) {
      if (s === spd) {
        btn.className = "px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold";
      } else {
        btn.className = "px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400";
      }
    }
  });
  if (arenaTtsIsPlaying) {
    playArenaTTS();
  }
  showToast(`Tốc độ đọc AI: ${spd}x`);
}

function highlightArenaTtsSentence(idx) {
  arenaTtsSentences.forEach((_, i) => {
    const el = document.getElementById(`ttsSent_${i}`);
    if (el) {
      if (i === idx) {
        el.className = "py-1.5 px-3 rounded-lg bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-medium text-xs shadow-inner";
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.className = "py-1 px-2 rounded-lg text-slate-400 text-xs hover:bg-slate-800";
      }
    }
  });

  const prog = document.getElementById('arenaTtsProgressBar');
  if (prog && arenaTtsSentences.length > 0) {
    const pct = Math.round(((idx + 1) / arenaTtsSentences.length) * 100);
    prog.style.width = `${pct}%`;
  }
  const badge = document.getElementById('arenaTtsStatusBadge');
  if (badge) {
    badge.textContent = `Đoạn ${idx + 1} / ${arenaTtsSentences.length}`;
  }
}

function updateArenaTtsControlsUI() {
  const playBtn = document.getElementById('arenaTtsPlayBtn');
  if (playBtn) {
    if (arenaTtsIsPlaying) {
      playBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i> <span>Tạm Dừng Giọng Đọc</span>';
      playBtn.className = "flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition";
    } else {
      playBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i> <span>Bắt Đầu Nghe AI Voice</span>';
      playBtn.className = "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition";
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

function handleArenaAudioError() {
  const errBox = document.getElementById('arenaAudioErrorNotice');
  if (errBox) errBox.classList.remove('hidden');
  setArenaAudioSourceMode('tts');
  showToast('⚠️ Không tìm thấy file MP3. Đã tự động kích hoạt Giọng Đọc Bản Ngữ AI!');
}

function setArenaAudioSourceMode(mode) {
  const mp3Box = document.getElementById('arenaMp3PlayerContainer');
  const ttsBox = document.getElementById('arenaTtsPlayerContainer');
  const mp3Btn = document.getElementById('arenaModeMp3Btn');
  const ttsBtn = document.getElementById('arenaModeTtsBtn');
  const audio = document.getElementById('arenaAudioPlayer');

  if (mode === 'tts') {
    if (audio) audio.pause();
    if (mp3Box) mp3Box.classList.add('hidden');
    if (ttsBox) ttsBox.classList.remove('hidden');
    if (mp3Btn) mp3Btn.className = "px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white transition flex items-center gap-1";
    if (ttsBtn) ttsBtn.className = "px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white transition flex items-center gap-1";
    showToast('Chuyển sang Giọng Đọc Bản Ngữ AI');
  } else {
    stopArenaTTS();
    if (mp3Box) mp3Box.classList.remove('hidden');
    if (ttsBox) ttsBox.classList.add('hidden');
    if (mp3Btn) mp3Btn.className = "px-2.5 py-1 rounded-lg font-bold bg-blue-600 text-white transition flex items-center gap-1";
    if (ttsBtn) ttsBtn.className = "px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white transition flex items-center gap-1";
    showToast('Chuyển sang File MP3 Gốc');
  }
  if (window.lucide) window.lucide.createIcons();
}

function seekArenaAudio(seconds) {
  const audio = document.getElementById('arenaAudioPlayer');
  if (audio && !isNaN(audio.duration)) {
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
  }
}

function updateArenaTimerTick() {
  if (activeArenaState.isPaused) return;
  activeArenaState.secondsRemaining--;
  if (activeArenaState.secondsRemaining <= 0) {
    clearInterval(activeArenaState.timerInterval);
    showToast('Hết giờ làm bài! Hệ thống đang tự động nộp bài...');
    submitActiveTestArena();
    return;
  }

  const mins = Math.floor(activeArenaState.secondsRemaining / 60);
  const secs = activeArenaState.secondsRemaining % 60;
  const display = document.getElementById('arenaTimerDisplay');
  if (display) {
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

function toggleArenaTimer() {
  activeArenaState.isPaused = !activeArenaState.isPaused;
  const icon = document.getElementById('arenaTimerIcon');
  if (icon) {
    icon.setAttribute('data-lucide', activeArenaState.isPaused ? 'play' : 'pause');
    if (window.lucide) window.lucide.createIcons();
  }
  showToast(activeArenaState.isPaused ? 'Đã tạm dừng đồng hồ' : 'Tiếp tục làm bài');
}

function setArenaAudioSpeed(spd) {
  const audio = document.getElementById('arenaAudioPlayer');
  if (audio) {
    audio.playbackRate = spd;
    showToast(`Tốc độ nghe: ${spd}x`);
  }
  [0.8, 1.0, 1.2].forEach(s => {
    const btn = document.getElementById(`spdBtn_${String(s).replace('.', '')}`);
    if (btn) {
      if (s === spd) {
        btn.className = "px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold";
      } else {
        btn.className = "px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px]";
      }
    }
  });
}

function toggleArenaTranscript() {
  const box = document.getElementById('arenaTranscriptBox');
  if (box) box.classList.toggle('hidden');
}

function applyTextHighlight(color) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  const mark = document.createElement('mark');
  mark.className = color === 'yellow' ? 'bg-yellow-400 text-slate-900 px-0.5 rounded font-bold' : 'bg-emerald-400 text-slate-900 px-0.5 rounded font-bold';
  mark.appendChild(range.extractContents());
  range.insertNode(mark);
  selection.removeAllRanges();
}

function clearTextHighlights() {
  const passage = document.getElementById('arenaPassageContent');
  if (!passage) return;
  const marks = passage.querySelectorAll('mark');
  marks.forEach(m => {
    const parent = m.parentNode;
    while (m.firstChild) parent.insertBefore(m.firstChild, m);
    parent.removeChild(m);
  });
}

function handleWritingTextareaInput(textarea) {
  const text = textarea.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  activeArenaState.wordCount = words;
  const badge = document.getElementById('writingWordCountBadge');
  if (badge) {
    const min = (activeArenaState.test && activeArenaState.test.minWords) ? activeArenaState.test.minWords : 150;
    if (words >= min) {
      badge.textContent = `${words} / ${min} từ (✓ Đạt chuẩn)`;
      badge.className = "font-bold text-emerald-400";
    } else {
      badge.textContent = `${words} / ${min} từ`;
      badge.className = "font-bold text-amber-400";
    }
  }
}

function toggleArenaSpeechMic() {
  const btn = document.getElementById('arenaMicBtn');
  const txtArea = document.getElementById('arenaSpeakingInput');

  if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
    showToast('Trình duyệt chưa hỗ trợ Web Speech API. Bạn có thể gõ trực tiếp kịch bản vào ô văn bản!');
    return;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRec();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    if (btn) btn.innerHTML = '<i data-lucide="mic-off" class="w-4 h-4 animate-ping"></i> Đang lắng nghe...';
    showToast('🎙️ Đang ghi âm giọng nói tiếng Anh...');
  };

  recognition.onresult = (e) => {
    let transcript = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript + ' ';
    }
    if (txtArea) txtArea.value += transcript;
  };

  recognition.onerror = () => {
    if (btn) btn.innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i> Bật Mic';
  };

  recognition.onend = () => {
    if (btn) btn.innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i> Bật Mic';
  };

  recognition.start();
}

// =========================================================================
// MULTI-TYPE ANSWER MATCHING & NORMALIZATION ENGINE
// =========================================================================
function normalizeAnswerString(str) {
  if (!str) return '';
  return str.toString()
    .trim()
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/^a\s+/, '')
    .replace(/^an\s+/, '')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ');
}

function isAnswerMatch(userAns, expectedAns, qType) {
  if (!userAns || !expectedAns) return false;
  const u = userAns.toString().trim().toUpperCase();
  const expList = expectedAns.toString().split(/\s*[\/\|]\s*/).map(s => s.trim().toUpperCase());

  // Multiple Choice Multi (e.g. Choose TWO letters)
  if (qType === 'multiple_choice_multi' || qType === 'choose_two') {
    const userTokens = u.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean).sort().join(',');
    return expList.some(exp => {
      const expTokens = exp.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean).sort().join(',');
      return userTokens === expTokens;
    });
  }

  // True / False / Not Given
  if (qType === 'tfng') {
    if (u === 'TRUE' || u === 'T') return expList.includes('TRUE') || expList.includes('T');
    if (u === 'FALSE' || u === 'F') return expList.includes('FALSE') || expList.includes('F');
    if (u === 'NOT GIVEN' || u === 'NG') return expList.includes('NOT GIVEN') || expList.includes('NG');
  }

  // Yes / No / Not Given
  if (qType === 'ynng') {
    if (u === 'YES' || u === 'Y') return expList.includes('YES') || expList.includes('Y');
    if (u === 'NO' || u === 'N') return expList.includes('NO') || expList.includes('N');
    if (u === 'NOT GIVEN' || u === 'NG') return expList.includes('NOT GIVEN') || expList.includes('NG');
  }

  // Exact letter match for MC, Matching Headings, etc.
  if (expList.includes(u)) return true;

  // Normalized string comparison for text completion
  const uNorm = normalizeAnswerString(userAns);
  return expList.some(exp => normalizeAnswerString(exp) === uNorm);
}

// =========================================================================
// 5. INSTANT GRADING & DETAILED FEEDBACK ENGINE
// =========================================================================
function submitActiveTestArena() {
  const { test, skill } = activeArenaState;
  if (!test) return;

  closeTestArena();

  let correctCount = 0;
  let totalQuestions = 0;
  let band = 5.0;
  let detailedReview = [];

  if (skill === 'listening' || skill === 'reading') {
    const questions = test.questions || [];
    totalQuestions = questions.length;

    questions.forEach(q => {
      const userAns = (activeArenaState.userAnswers[q.qNum] || '').toString().trim();
      const expected = (q.correctAnswer || '').toString().trim();

      const isMatch = isAnswerMatch(userAns, expected, q.type || test.questionType);
      if (isMatch) correctCount++;

      detailedReview.push({
        qNum: q.qNum,
        text: q.text,
        userAnswer: userAns || '(Bỏ trống)',
        correctAnswer: expected,
        isCorrect: isMatch,
        quote: q.quote || 'Đối chiếu văn bản bài thi gốc.',
        paraphrase: q.paraphrase || `${q.qNum} <-> Official Key`,
        explanation: q.explanation || 'Đối chiếu đáp án chuẩn khảo thí Cambridge.'
      });
    });

    // Band Conversion table
    const ratio = totalQuestions > 0 ? (correctCount / totalQuestions) : 0;
    if (totalQuestions === 40) {
      if (correctCount >= 39) band = 9.0;
      else if (correctCount >= 37) band = 8.5;
      else if (correctCount >= 35) band = 8.0;
      else if (correctCount >= 32) band = 7.5;
      else if (correctCount >= 30) band = 7.0;
      else if (correctCount >= 26) band = 6.5;
      else if (correctCount >= 23) band = 6.0;
      else if (correctCount >= 18) band = 5.5;
      else if (correctCount >= 15) band = 5.0;
      else if (correctCount >= 12) band = 4.5;
      else band = 4.0;
    } else {
      if (ratio >= 0.9) band = 9.0;
      else if (ratio >= 0.84) band = 8.5;
      else if (ratio >= 0.77) band = 8.0;
      else if (ratio >= 0.70) band = 7.5;
      else if (ratio >= 0.62) band = 7.0;
      else if (ratio >= 0.54) band = 6.5;
      else if (ratio >= 0.46) band = 6.0;
      else if (ratio >= 0.38) band = 5.5;
      else if (ratio >= 0.30) band = 5.0;
      else band = 4.5;
    }
  } else if (skill === 'writing') {
    const inputEl = document.getElementById('arenaWritingInput');
    const userText = inputEl ? inputEl.value.trim() : '';
    const words = userText ? userText.split(/\s+/).length : 0;
    const minWords = test.minWords || 150;

    // Algorithmic evaluation
    let trScore = words >= minWords ? 7.0 : (words >= minWords * 0.8 ? 6.0 : 5.0);
    let ccScore = 7.0;
    let lrScore = (test.lexicalBoosters || []).some(b => userText.toLowerCase().includes(b.toLowerCase())) ? 7.5 : 6.5;
    let graScore = 7.0;
    band = Math.round(((trScore + ccScore + lrScore + graScore) / 4) * 10) / 10;

    detailedReview = {
      userText: userText,
      wordCount: words,
      minWords: minWords,
      criteria: { tr: trScore, cc: ccScore, lr: lrScore, gra: graScore },
      modelSample: test.sampleAnswerBand8,
      outline: test.outlineBreakdown,
      lexical: test.lexicalBoosters
    };
  } else if (skill === 'speaking') {
    const inputEl = document.getElementById('arenaSpeakingInput');
    const userText = inputEl ? inputEl.value.trim() : '';
    const words = userText ? userText.split(/\s+/).length : 0;

    let fcScore = words >= 80 ? 7.5 : 6.0;
    let lrScore = (test.lexicalBoosters || []).some(b => userText.toLowerCase().includes(b.toLowerCase())) ? 7.5 : 6.5;
    let graScore = 7.0;
    let pronScore = 7.0;
    band = Math.round(((fcScore + lrScore + graScore + pronScore) / 4) * 10) / 10;

    detailedReview = {
      userText: userText,
      criteria: { fc: fcScore, lr: lrScore, gra: graScore, pron: pronScore },
      modelSample: test.modelResponseBand8,
      strategy: test.outlineStrategy,
      lexical: test.lexicalBoosters
    };
  }

  // Save submission
  const submission = {
    id: 'sub_' + Date.now(),
    testId: test.id,
    skill: skill,
    testTitle: test.title,
    date: new Date().toISOString(),
    score: correctCount,
    total: totalQuestions,
    band: band,
    review: detailedReview
  };

  // Upsert submission
  const existingIdx = appTestSubmissions.findIndex(s => s.testId === test.id);
  if (existingIdx > -1) {
    appTestSubmissions[existingIdx] = submission;
  } else {
    appTestSubmissions.unshift(submission);
  }
  localStorage.setItem('ielts_test_submissions', JSON.stringify(appTestSubmissions));

  // Mark Daily Goal met
  appUserProfile.dailyGoalMet = true;
  localStorage.setItem('ielts_user_profile', JSON.stringify(appUserProfile));

  // Update Dynamic Stats
  updateBandRoadmapProgress();
  initDailyCheckin();
  renderSkillZoneD(skill);

  // Render Result Modal
  renderTestResultModal(submission);
}

function renderTestResultModal(sub) {
  const modal = document.getElementById('testResultModal');
  const scoreBadge = document.getElementById('resultScoreBadge');
  const skillBadge = document.getElementById('resultSkillBadge');
  const modalTitle = document.getElementById('resultModalTitle');
  const modalBody = document.getElementById('resultModalBody');

  if (!modal || !modalBody) return;

  const band = parseFloat(sub.band) || 6.5;
  if (scoreBadge) scoreBadge.textContent = band.toFixed(1);
  if (skillBadge) skillBadge.textContent = `IELTS ${sub.skill.toUpperCase()}`;
  if (modalTitle) modalTitle.textContent = sub.testTitle;

  const isPassTarget = band >= 7.0;
  const bannerBg = isPassTarget
    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
    : 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200';

  let html = `
    <!-- Top Summary Banner -->
    <div class="p-5 rounded-2xl border ${bannerBg} space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider">
          ${isPassTarget ? '🎉 ĐẠT CHUẨN MỤC TIÊU 7.0+' : '📈 CẦN TIẾP TỤC BỨT PHÁ LÊN 7.0'}
        </span>
        <span class="text-xs font-black">${sub.total ? `Kết quả: ${sub.score}/${sub.total} câu đúng • ` : ""}Điểm Đạt: Band ${band.toFixed(1)} / Mục tiêu: 7.0</span>
      </div>
      <p class="text-xs leading-relaxed">
        ${isPassTarget
          ? 'Xuất sắc! Khả năng xử lý từ khóa và tư duy phản biện của bạn đã đáp ứng trọn vẹn tiêu chí Band 7.0+.'
          : 'Bài làm của bạn đang ở mức khá. Hãy đối chiếu các câu sai, trích dẫn bằng chứng và phân tích Paraphrase bên dưới để sửa triệt để lỗi tư duy.'}
      </p>
    </div>
  `;

  if (sub.skill === 'listening' || sub.skill === 'reading') {
    html += `
      <div class="space-y-4">
        <h4 class="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <i data-lucide="check-square" class="w-4 h-4 text-brand-600"></i> Bảng Phân Tích Chi Tiết Từng Câu Hỏi
        </h4>
        <div class="space-y-3">
    `;

    (sub.review || []).forEach(item => {
      const icon = item.isCorrect
        ? '<span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</span>'
        : '<span class="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">✗</span>';

      html += `
        <div class="p-4 rounded-2xl border ${item.isCorrect ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20'} space-y-2 text-xs">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              ${icon}
              <span class="font-extrabold text-slate-900 dark:text-white">Câu #${item.qNum}</span>
            </div>
            <div class="text-right">
              <span>Bạn chọn: <strong class="${item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">${item.userAnswer}</strong></span>
              ${!item.isCorrect ? `<span class="ml-2 text-slate-400">• Đáp án đúng: <strong class="text-emerald-600">${item.correctAnswer}</strong></span>` : ''}
            </div>
          </div>

          <p class="text-slate-600 dark:text-slate-300 font-medium">${item.text}</p>

          <!-- Quote Reference -->
          <div class="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 italic">
            📖 <strong>Trích dẫn vị trí bằng chứng:</strong> "${item.quote}"
          </div>

          <!-- Paraphrase & Explanation -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2 pt-1">
            <span class="text-purple-600 dark:text-purple-300 font-semibold">🔄 ${item.paraphrase}</span>
            <span>💡 ${item.explanation}</span>
          </div>
        </div>
      `;
    });

    html += '</div></div>';
  } else if (sub.skill === 'writing') {
    const rev = sub.review || {};
    html += `
      <div class="space-y-6 text-xs">
        <!-- 4 Criteria Breakdown -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Task Achievement</div>
            <div class="text-lg font-black text-brand-600">${rev.criteria ? rev.criteria.tr.toFixed(1) : '7.0'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Coherence & Cohesion</div>
            <div class="text-lg font-black text-brand-600">${rev.criteria ? rev.criteria.cc.toFixed(1) : '7.0'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Lexical Resource</div>
            <div class="text-lg font-black text-brand-600">${rev.criteria ? rev.criteria.lr.toFixed(1) : '7.5'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Grammar & Accuracy</div>
            <div class="text-lg font-black text-brand-600">${rev.criteria ? rev.criteria.gra.toFixed(1) : '7.0'}</div>
          </div>
        </div>

        <!-- Sample Answer Band 8.0 with Outline -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <span class="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400">Bài Mẫu Xuất Sắc Band 8.0 Cambridge (Đối Chiếu & Học Hỏi)</span>
          <p class="whitespace-pre-line text-slate-800 dark:text-slate-100 leading-relaxed font-serif">${rev.modelSample || 'Đang cập nhật bài mẫu...'}</p>
        </div>
      </div>
    `;
  } else if (sub.skill === 'speaking') {
    const rev = sub.review || {};
    html += `
      <div class="space-y-6 text-xs">
        <!-- 4 Criteria Breakdown -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Fluency & Coherence</div>
            <div class="text-lg font-black text-rose-600">${rev.criteria ? rev.criteria.fc.toFixed(1) : '7.0'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Lexical Resource</div>
            <div class="text-lg font-black text-rose-600">${rev.criteria ? rev.criteria.lr.toFixed(1) : '7.5'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Grammar Range</div>
            <div class="text-lg font-black text-rose-600">${rev.criteria ? rev.criteria.gra.toFixed(1) : '7.0'}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
            <div class="text-[10px] uppercase text-slate-400">Pronunciation</div>
            <div class="text-lg font-black text-rose-600">${rev.criteria ? rev.criteria.pron.toFixed(1) : '7.0'}</div>
          </div>
        </div>

        <!-- Sample Model Response -->
        <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <span class="text-[10px] font-extrabold uppercase text-rose-600 dark:text-rose-400">Kịch Bản Nói Mẫu Chuẩn Band 8.0</span>
          <p class="whitespace-pre-line text-slate-800 dark:text-slate-100 leading-relaxed font-sans">${rev.modelSample || 'Đang cập nhật bài mẫu...'}</p>
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = html;
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTestResultModal() {
  const modal = document.getElementById('testResultModal');
  if (modal) modal.classList.add('hidden');
}

// =========================================================================
// 6. SỔ TỪ VỰNG CẦN ÔN LẠI (VOCAB VAULT)
// =========================================================================
function initVocabVault() {
  renderVocabVault();
}

function renderVocabVault() {
  const container = document.getElementById('vocabVaultListContainer');
  if (!container) return;

  const topics = window.IELTS_VOCAB_TOPICS || [];
  const allWords = [];
  topics.forEach(t => {
    (t.words || []).forEach(w => allWords.push(w));
  });
  if (window.IELTS_SKILL_VOCAB_SYSTEM) {
    Object.values(window.IELTS_SKILL_VOCAB_SYSTEM).forEach(skillToolkits => {
      skillToolkits.forEach(tk => {
        (tk.words || []).forEach(w => allWords.push(w));
      });
    });
  }

  const savedWords = allWords.filter(w => appSavedVocab.includes(w.id));

  if (!savedWords.length) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center space-y-3">
        <div class="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
          <i data-lucide="bookmark" class="w-8 h-8"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Chưa có từ vựng nào được đánh dấu</h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          Khi học từ vựng trong Phân khu B của bất kỳ kỹ năng nào, hãy bấm biểu tượng Bookmark để lưu từ vào đây và ôn tập lại bất kỳ lúc nào!
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let html = '';
  savedWords.forEach(w => {
    html += `
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h4 class="text-base font-bold text-slate-900 dark:text-white">${w.term}</h4>
              <span class="text-xs text-slate-400 font-mono">${w.ipa}</span>
            </div>
            <button onclick="toggleBookmarkVocab('${w.id}')" class="p-1.5 rounded-lg text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Xóa khỏi danh sách ôn lại">
              <i data-lucide="bookmark-check" class="w-4 h-4 fill-current"></i>
            </button>
          </div>
          <p class="text-xs font-semibold text-teal-700 dark:text-teal-300">${w.meaning}</p>
          <p class="text-xs text-slate-600 dark:text-slate-400 italic">"${w.example}"</p>
        </div>

        <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
          Paraphrase: <strong>${w.paraphrase}</strong>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function practiceVaultFlashcards() {
  if (!appSavedVocab.length) {
    showToast('Sổ từ vựng của bạn chưa có từ nào để luyện tập!');
    return;
  }
  showToast('Đang mở chế độ luyện Flashcard chuyên sâu từ Sổ từ vựng...');
  switchTab('listening');
  switchSkillZone('listening', 'zone_c');
}

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}



// =========================================================================
// SECTION 19: PRE-TEST VOCABULARY & PRACTICE WORKFLOW (FOR ALL 4 SKILLS)
// =========================================================================

let currentPreTest = {
  skill: null,
  testId: null,
  test: null,
  subTab: 'vocab',
  practiceMode: 'flashcards',
  flashcardIdx: 0,
  matchingState: { selectedLeft: null, matches: {} }
};

function openPreTestVocab(skill, testId) {
  const allTests = (window.IELTS_BANK_100 && window.IELTS_BANK_100[skill]) ? window.IELTS_BANK_100[skill] : [];
  const test = allTests.find(t => t.id === testId);
  if (!test) {
    showToast('Không tìm thấy bài test này!');
    return;
  }

  currentPreTest.skill = skill;
  currentPreTest.testId = testId;
  currentPreTest.test = test;
  currentPreTest.subTab = 'vocab';
  currentPreTest.practiceMode = 'flashcards';
  currentPreTest.flashcardIdx = 0;
  currentPreTest.matchingState = { selectedLeft: null, matches: {} };

  const modal = document.getElementById('preTestVocabModal');
  const skillBadge = document.getElementById('preTestSkillBadge');
  const titleEl = document.getElementById('preTestModalTitle');

  if (skillBadge) skillBadge.textContent = `IELTS ${skill.toUpperCase()}`;
  if (titleEl) titleEl.textContent = `Khởi Động: ${test.title}`;

  switchPreTestSubTab('vocab');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closePreTestVocabModal() {
  const modal = document.getElementById('preTestVocabModal');
  if (modal) modal.classList.add('hidden');
}

function switchPreTestSubTab(subTab) {
  currentPreTest.subTab = subTab;

  const btnVocab = document.getElementById('preTestTabBtn_vocab');
  const btnPractice = document.getElementById('preTestTabBtn_practice');

  if (btnVocab && btnPractice) {
    if (subTab === 'vocab') {
      btnVocab.className = "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-purple-600 text-white shadow-sm";
      btnPractice.className = "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800";
    } else {
      btnVocab.className = "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800";
      btnPractice.className = "px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-purple-600 text-white shadow-sm";
    }
  }

  renderPreTestContent();
}

function renderPreTestContent() {
  const body = document.getElementById('preTestModalBody');
  if (!body || !currentPreTest.test) return;

  const test = currentPreTest.test;
  const vocabList = test.testVocabulary || [];
  const practiceData = test.testVocabPractice || { flashcards: [], matching: [], quiz: [] };

  if (currentPreTest.subTab === 'vocab') {
    let html = `
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <i data-lucide="book-open" class="w-4 h-4 text-purple-500"></i> ${vocabList.length} Từ Vựng & Cụm Collocation Xuất Hiện Trong Bài Test
          </span>
          <span class="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">Ghi nhớ trước khi vào làm bài</span>
        </div>

        <div class="grid grid-cols-1 gap-3.5">
    `;

    vocabList.forEach(w => {
      const isBookmarked = appSavedVocab.includes(w.id);
      html += `
        <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-2.5 transition hover:border-purple-300">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h4 class="text-sm font-black text-slate-900 dark:text-white">${w.term}</h4>
                <span class="text-xs text-slate-400 font-mono">${w.ipa}</span>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  ${w.type}
                </span>
              </div>
              <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">${w.meaning}</p>
            </div>
            <button onclick="toggleBookmarkVocab('${w.id}')" class="p-1.5 rounded-lg ${isBookmarked ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500'} transition" title="Lưu từ vào sổ ôn lại">
              <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-current' : ''}"></i>
            </button>
          </div>

          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
            "${w.example}"
          </div>

          <div class="flex flex-wrap items-center gap-3 text-[11px]">
            <span class="text-purple-700 dark:text-purple-300 font-semibold flex items-center gap-1">
              <i data-lucide="refresh-cw" class="w-3 h-3"></i> Paraphrase: <strong>${w.paraphrase}</strong>
            </span>
            ${w.collocation ? `
              <span class="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                <i data-lucide="link" class="w-3 h-3"></i> Collocation: <strong>${w.collocation}</strong>
              </span>
            ` : ''}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
    body.innerHTML = html;
  } else {
    // Practice Sub Tab
    const mode = currentPreTest.practiceMode;
    let html = `
      <div class="space-y-5">
        <!-- Practice Mode Switcher -->
        <div class="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs">
          <button onclick="setPreTestPracticeMode('flashcards')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'flashcards' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            1. Lật Thẻ Flashcards
          </button>
          <button onclick="setPreTestPracticeMode('matching')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'matching' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            2. Nối Từ Nhanh (Matching)
          </button>
          <button onclick="setPreTestPracticeMode('quiz')" class="px-3 py-1.5 rounded-lg font-bold transition ${mode === 'quiz' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}">
            3. Trắc Nghiệm Phản Xạ
          </button>
        </div>
    `;

    if (mode === 'flashcards') {
      const cards = practiceData.flashcards || [];
      const idx = currentPreTest.flashcardIdx % Math.max(1, cards.length);
      const card = cards[idx] || { front: "Chưa có thẻ", back: "Chưa có dữ liệu" };

      html += `
        <div class="max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 py-2">
          <div class="text-xs font-semibold text-slate-500">
            Thẻ ${idx + 1} / ${cards.length} • Bấm thẻ để lật mặt trước/sau
          </div>

          <div onclick="flipPreTestFlashcard()" id="preTestFlashcardBox" class="w-full min-h-[200px] p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-purple-500/50 shadow-lg cursor-pointer select-none flex flex-col justify-between transition transform hover:scale-[1.01]">
            <div class="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span id="preTestCardFace">MẶT TRƯỚC (Từ vựng tiếng Anh)</span>
              <i data-lucide="rotate-cw" class="w-4 h-4"></i>
            </div>
            <div class="py-4 text-center">
              <h3 class="text-xl font-black text-slate-900 dark:text-white" id="preTestCardText">${card.front}</h3>
            </div>
            <div class="text-[11px] text-center text-slate-400">
              Chạm vào thẻ để xem nghĩa & ví dụ trong bài
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="prevPreTestFlashcard()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition">
              <i data-lucide="arrow-left" class="w-4 h-4"></i> Thẻ trước
            </button>
            <button onclick="markPreTestKnown()" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition">
              <i data-lucide="check" class="w-4 h-4"></i> Đã thuộc
            </button>
            <button onclick="nextPreTestFlashcard()" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition">
              Thẻ kế tiếp <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    } else if (mode === 'matching') {
      const pairs = practiceData.matching || [];
      const state = currentPreTest.matchingState;

      html += `
        <div class="max-w-xl mx-auto space-y-4">
          <div class="text-center text-xs text-slate-500">
            Bấm chọn 1 từ tiếng Anh bên trái rồi chọn nghĩa tương ứng bên phải để ghép cặp.
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <!-- Left Column -->
            <div class="space-y-2">
              <div class="text-[10px] font-bold text-slate-400 uppercase text-center">Từ Vựng Bài Test</div>
              ${pairs.map(p => {
                const isMatched = state.matches[p.pairId];
                const isSelected = state.selectedLeft === p.pairId;
                let cls = "w-full p-3 rounded-xl border text-xs font-bold text-left transition ";
                if (isMatched) {
                  cls += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default";
                } else if (isSelected) {
                  cls += "bg-purple-600 text-white border-purple-600 shadow-md";
                } else {
                  cls += "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-purple-400 text-slate-800 dark:text-slate-200";
                }
                return `<button onclick="handlePreTestMatchingClick('left', ${p.pairId})" class="${cls}">${p.left}</button>`;
              }).join('')}
            </div>

            <!-- Right Column -->
            <div class="space-y-2">
              <div class="text-[10px] font-bold text-slate-400 uppercase text-center">Định Nghĩa Tiếng Việt</div>
              ${[...pairs].reverse().map(p => {
                const isMatched = state.matches[p.pairId];
                let cls = "w-full p-3 rounded-xl border text-xs font-semibold text-left transition ";
                if (isMatched) {
                  cls += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 opacity-60 cursor-default";
                } else {
                  cls += "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-purple-400 text-slate-800 dark:text-slate-200";
                }
                return `<button onclick="handlePreTestMatchingClick('right', ${p.pairId})" class="${cls}">${p.right}</button>`;
              }).join('')}
            </div>
          </div>

          <div class="text-center pt-2">
            <span class="text-xs font-bold text-purple-600 dark:text-purple-400">
              Đã ghép đúng: ${Object.keys(state.matches).length} / ${pairs.length} cặp
            </span>
          </div>
        </div>
      `;
    } else if (mode === 'quiz') {
      const quizzes = practiceData.quiz || [];
      html += `
        <div class="max-w-xl mx-auto space-y-4">
          <div class="text-center text-xs text-slate-500">
            Kiểm tra phản xạ từ vựng trước khi vào làm bài thi chính thức.
          </div>

          ${quizzes.map((qz, idx) => `
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span class="text-[10px] font-bold text-slate-500 uppercase">Câu hỏi ${idx + 1}</span>
              <h5 class="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">${qz.question}</h5>
              <div class="grid grid-cols-1 gap-1.5 pt-1">
                ${qz.options.map((opt, oIdx) => `
                  <button onclick="selectPreTestQuizChoice('${qz.id}', ${oIdx}, ${qz.correct}, '${escapeQuotes(qz.explanation)}')" id="preQuizBtn_${qz.id}_${oIdx}" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-400 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                    ${String.fromCharCode(65 + oIdx)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="preQuizExplain_${qz.id}" class="hidden p-3 rounded-xl text-xs leading-relaxed mt-2"></div>
            </div>
          `).join('')}
        </div>
      `;
    }

    html += '</div>';
    body.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function setPreTestPracticeMode(mode) {
  currentPreTest.practiceMode = mode;
  renderPreTestContent();
}

function flipPreTestFlashcard() {
  const cards = (currentPreTest.test.testVocabPractice && currentPreTest.test.testVocabPractice.flashcards) ? currentPreTest.test.testVocabPractice.flashcards : [];
  const idx = currentPreTest.flashcardIdx % Math.max(1, cards.length);
  const card = cards[idx];

  const faceEl = document.getElementById('preTestCardFace');
  const textEl = document.getElementById('preTestCardText');
  const boxEl = document.getElementById('preTestFlashcardBox');

  if (faceEl && faceEl.textContent.includes('TRƯỚC')) {
    faceEl.textContent = 'MẶT SAU (Nghĩa tiếng Việt & Paraphrase)';
    textEl.innerHTML = card.back.replace(/\n/g, '<br/>');
    if (boxEl) {
      boxEl.classList.remove('border-purple-500/50');
      boxEl.classList.add('border-emerald-500/80');
    }
  } else if (faceEl) {
    faceEl.textContent = 'MẶT TRƯỚC (Từ vựng tiếng Anh)';
    textEl.textContent = card.front;
    if (boxEl) {
      boxEl.classList.remove('border-emerald-500/80');
      boxEl.classList.add('border-purple-500/50');
    }
  }
}

function nextPreTestFlashcard() {
  currentPreTest.flashcardIdx++;
  renderPreTestContent();
}

function prevPreTestFlashcard() {
  if (currentPreTest.flashcardIdx > 0) currentPreTest.flashcardIdx--;
  renderPreTestContent();
}

function markPreTestKnown() {
  showToast('✓ Đã ghi nhớ từ vựng này!');
  nextPreTestFlashcard();
}

function handlePreTestMatchingClick(side, pairId) {
  const state = currentPreTest.matchingState;
  if (state.matches[pairId]) return;

  if (side === 'left') {
    state.selectedLeft = pairId;
    renderPreTestContent();
  } else if (side === 'right') {
    if (state.selectedLeft === null) {
      showToast('Vui lòng chọn 1 từ tiếng Anh bên trái trước!');
      return;
    }
    if (state.selectedLeft === pairId) {
      state.matches[pairId] = true;
      state.selectedLeft = null;
      showToast('✓ Ghép đúng cặp từ vựng!');
      renderPreTestContent();
    } else {
      showToast('❌ Chưa đúng! Hãy thử lại.');
      state.selectedLeft = null;
      renderPreTestContent();
    }
  }
}

function selectPreTestQuizChoice(qzId, chosenIdx, correctIdx, explanation) {
  const explainEl = document.getElementById(`preQuizExplain_${qzId}`);
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`preQuizBtn_${qzId}_${i}`);
    if (!btn) continue;
    btn.disabled = true;
    if (i === correctIdx) {
      btn.className = "p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-left text-xs font-bold";
    } else if (i === chosenIdx) {
      btn.className = "p-2.5 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-left text-xs font-bold";
    } else {
      btn.className = "p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left text-xs font-medium opacity-50";
    }
  }

  if (explainEl) {
    explainEl.classList.remove('hidden');
    if (chosenIdx === correctIdx) {
      explainEl.className = "p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed mt-2";
      explainEl.innerHTML = `✓ <strong>Chính xác!</strong> ${explanation}`;
    } else {
      explainEl.className = "p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 leading-relaxed mt-2";
      explainEl.innerHTML = `❌ <strong>Chưa đúng!</strong> ${explanation}`;
    }
  }
}

function startExamFromPreTest() {
  closePreTestVocabModal();
  openTestArena(currentPreTest.skill, currentPreTest.testId);
}

function skipPreTestAndStartExam() {
  closePreTestVocabModal();
  openTestArena(currentPreTest.skill, currentPreTest.testId);
}

function toggleArenaVocabDrawer() {
  const drawer = document.getElementById('arenaVocabDrawer');
  const content = document.getElementById('arenaVocabDrawerContent');
  if (!drawer || !content || !activeArenaState.test) return;

  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    const vocabList = activeArenaState.test.testVocabulary || [];
    let html = '';
    vocabList.forEach(w => {
      html += `
        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div class="flex items-center justify-between">
            <strong class="text-white text-xs">${w.term}</strong>
            <span class="text-[10px] text-slate-400 font-mono">${w.ipa}</span>
          </div>
          <p class="text-[11px] text-amber-300 font-semibold">${w.meaning}</p>
          <div class="text-[10px] text-purple-300">🔄 Paraphrase: ${w.paraphrase}</div>
        </div>
      `;
    });
    content.innerHTML = html;
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
  if (window.lucide) window.lucide.createIcons();
}
