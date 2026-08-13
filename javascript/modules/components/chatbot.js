const STORAGE = {
  messages: 'bisa-chat-messages',
  history: 'bisa-chat-history',
  open: 'bisa-chat-open',
  view: 'bisa-chat-view',
};

const MUSIC_DATA = [
  { title: 'i love egg', url: 'https://github.com/joonk2/music/raw/music/i-love-egg.mp3' },
  { title: 'cookier-run-violin', url: 'https://github.com/joonk2/music/raw/music/cookier-run-violin.mp3' },
  { title: 'fantasy-01', url: 'https://github.com/joonk2/music/raw/music/suno-fantasy-01.mp3' },
  { title: 'cookie-run-frozen-tower', url: 'https://github.com/joonk2/music/raw/music/cookie-run-frozen-tower.mp3' },
];

const CAT_AVATAR = 'https://github.com/joonk2/mySvg/blob/main/chill-kitty-loop-unlimited.gif?raw=true';
const WELCOME = '안녕! 나는 고준환 블로그의 AI 고양이 비사다냥 🐾\n궁금한 거 있으면 편하게 물어봐!';
const CHATBOT_API = 'https://blog-chatbot.with-joonk.workers.dev';

let root;
let chatHistory = [];
let isChatLoading = false;
let typingEl = null;
let isOpen = false;
let audio;
let currentIdx = 0;
let isPlaying = false;

function $(id) {
  return document.getElementById(id);
}

function readJSON(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function persistState() {
  const rows = root.querySelectorAll('#cb-chat-area .msg-row:not(.typing-row)');
  const messages = Array.from(rows).map((row) => ({
    sender: row.classList.contains('user') ? 'user' : 'bot',
    text: row.dataset.rawText || row.querySelector('.msg-bubble')?.textContent || '',
  }));
  writeJSON(STORAGE.messages, messages);
  writeJSON(STORAGE.history, chatHistory);
  sessionStorage.setItem(STORAGE.open, isOpen ? '1' : '0');
}

function extractBotText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  return parts.map((p) => p?.text).filter(Boolean).join('\n').trim() || null;
}

function extractErrorMessage(data, response) {
  if (data?.error?.message) return data.error.message;
  if (typeof data?.error === 'string') return data.error;
  if (!response.ok) return `서버 오류 (${response.status})`;
  const reason = data?.candidates?.[0]?.finishReason;
  return reason ? `답변 중단 (${reason})` : '응답 형식을 이해하지 못했어요';
}

function formatTime(date) {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDateLabel(date) {
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return '오늘';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return '어제';
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function scrollChatToBottom() {
  const area = $('cb-chat-area');
  if (!area) return;
  requestAnimationFrame(() => { area.scrollTop = area.scrollHeight; });
}

function updateComposerActions() {
  const input = $('cb-user-input');
  const sendBtn = $('cb-send-btn');
  const micBtn = $('cb-mic-btn');
  if (!input || !sendBtn || !micBtn) return;
  const hasText = input.value.trim().length > 0;
  sendBtn.classList.toggle('visible', hasText && !isChatLoading);
  micBtn.classList.toggle('hidden', hasText);
}

function applyMessageGrouping() {
  const rows = root.querySelectorAll('#cb-chat-area .msg-row:not(.typing-row)');
  rows.forEach((row, i) => {
    row.classList.remove('no-avatar');
    const prev = rows[i - 1];
    if (row.classList.contains('bot') && prev?.classList.contains('bot')) {
      row.classList.add('no-avatar');
    }
  });
}

function formatMessageHtml(text) {
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  formatted = formatted.replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  return formatted;
}

function appendDateDivider(date) {
  const area = $('cb-chat-area');
  const divider = document.createElement('div');
  divider.className = 'chat-date-divider';
  divider.textContent = formatDateLabel(date);
  area.appendChild(divider);
}

function appendMessage(sender, text, options = {}) {
  const { skipPersist = false, skipHistory = false, timestamp = Date.now() } = options;
  const area = $('cb-chat-area');
  const now = new Date(timestamp);
  const label = formatDateLabel(now);
  const lastDivider = area.querySelector('.chat-date-divider:last-of-type');
  if (!lastDivider || lastDivider.textContent !== label) appendDateDivider(now);

  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;
  const avatarHtml = sender === 'bot'
    ? `<div class="msg-avatar bot-avatar-wrap"><img src="${CAT_AVATAR}" alt="비사"></div>`
    : '<div class="msg-avatar user-avatar">나</div>';

  row.innerHTML = `${avatarHtml}<div class="msg-body"><div class="msg-meta"></div><div class="msg-bubble"></div></div>`;
  row.dataset.rawText = text;
  row.querySelector('.msg-bubble').innerHTML = formatMessageHtml(text);
  area.appendChild(row);
  applyMessageGrouping();
  scrollChatToBottom();

  if (!skipHistory && (sender === 'user' || sender === 'bot')) {
    chatHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });
    if (chatHistory.length > 16) chatHistory.splice(0, chatHistory.length - 16);
  }
  if (!skipPersist) persistState();
}

function restoreMessages() {
  chatHistory = readJSON(STORAGE.history, []);
  const saved = readJSON(STORAGE.messages, []);
  const area = $('cb-chat-area');
  area.innerHTML = '';

  if (!saved.length) {
    appendMessage('bot', WELCOME, { skipPersist: true, skipHistory: true });
    chatHistory = [{ role: 'assistant', content: WELCOME }];
    persistState();
    return;
  }

  saved.forEach((msg) => {
    appendMessage(msg.sender, msg.text, { skipPersist: true, skipHistory: true });
  });
}

function setChatLoading(loading) {
  isChatLoading = loading;
  const sendBtn = $('cb-send-btn');
  if (sendBtn) sendBtn.disabled = loading;
  updateComposerActions();
  if (loading) showTyping();
  else hideTyping();
}

function showTyping() {
  const area = $('cb-chat-area');
  if (!typingEl) {
    typingEl = document.createElement('div');
    typingEl.className = 'msg-row bot typing-row';
    typingEl.innerHTML = `<div class="msg-avatar bot-avatar-wrap"><img src="${CAT_AVATAR}" alt="비사"></div><div class="msg-body"><div class="typing-bubble"><span></span><span></span><span></span></div></div>`;
  }
  const lastRow = area.querySelector('.msg-row:not(.typing-row):last-of-type');
  typingEl.classList.toggle('no-avatar', lastRow?.classList.contains('bot'));
  area.appendChild(typingEl);
  scrollChatToBottom();
}

function hideTyping() {
  if (typingEl?.parentNode) typingEl.parentNode.removeChild(typingEl);
  typingEl = null;
}

function showView(view) {
  root.querySelectorAll('.view-content').forEach((v) => v.classList.remove('active'));
  root.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
  $(`cb-view-${view}`)?.classList.add('active');
  $(`cb-tab-${view}`)?.classList.add('active');
  sessionStorage.setItem(STORAGE.view, view);
}

function chatFetchErrorMessage(err) {
  if (err?.name === 'TypeError' && /fetch/i.test(err.message)) {
    return 'Worker API에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.';
  }
  return err?.message || '알 수 없는 오류';
}

async function sendMessage() {
  if (isChatLoading) return;
  const input = $('cb-user-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';
  resizeInput();
  updateComposerActions();
  setChatLoading(true);

  try {
    const response = await fetch(CHATBOT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: chatHistory.slice(0, -1) }),
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`서버 응답을 읽을 수 없어요 (HTTP ${response.status})`);
    }
    const reply = extractBotText(data);
    appendMessage('bot', reply || `냥... ${extractErrorMessage(data, response)}`);
  } catch (e) {
    console.error('Chat Error:', e);
    appendMessage('bot', `연결 실패했다옹! (${chatFetchErrorMessage(e)})`);
  } finally {
    setChatLoading(false);
  }
}

function resizeInput() {
  const input = $('cb-user-input');
  if (!input) return;
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 100)}px`;
  updateComposerActions();
}

function createPlaylist() {
  const list = $('cb-playlist-items');
  if (!list || list.childElementCount) return;
  MUSIC_DATA.forEach((song, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.id = `cb-item-${i}`;
    item.innerHTML = `<i class="fas fa-play" style="font-size:0.7em;opacity:0.5"></i> ${song.title}`;
    item.addEventListener('click', () => playTrack(i));
    list.appendChild(item);
  });
}

function loadTrack(idx) {
  currentIdx = idx;
  audio.src = MUSIC_DATA[idx].url;
  $('cb-m-title').innerText = MUSIC_DATA[idx].title;
  root.querySelectorAll('.playlist-item').forEach((el) => el.classList.remove('active'));
  $(`cb-item-${idx}`)?.classList.add('active');
}

function playTrack(idx) {
  loadTrack(idx);
  audio.play().catch(() => {});
  isPlaying = true;
  updatePlayerUI();
}

function togglePlay() {
  if (isPlaying) audio.pause();
  else audio.play().catch(() => {});
  isPlaying = !isPlaying;
  updatePlayerUI();
}

function updatePlayerUI() {
  $('cb-m-play-icon').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
  $('cb-m-art').classList.toggle('playing', isPlaying);
}

function nextMusic() {
  currentIdx = (currentIdx + 1) % MUSIC_DATA.length;
  playTrack(currentIdx);
}

function prevMusic() {
  currentIdx = (currentIdx - 1 + MUSIC_DATA.length) % MUSIC_DATA.length;
  playTrack(currentIdx);
}

function setOpen(open) {
  isOpen = open;
  root.classList.toggle('is-open', open);
  root.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('chatbot-modal-open', open);

  const fab = $('chatbot-fab');
  if (fab) {
    fab.classList.toggle('is-active', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    fab.setAttribute('aria-label', open ? 'AI 고양이 챗봇 닫기' : 'AI 고양이 챗봇 열기');
  }

  const controls = $('chatbot-controls');
  controls?.classList.toggle('is-open', open);

  sessionStorage.setItem(STORAGE.open, open ? '1' : '0');

  if (open) {
    scrollChatToBottom();
    setTimeout(() => $('cb-user-input')?.focus(), 120);
  }
}

function toggleChatbot() {
  setOpen(!isOpen);
}

function bindEvents() {
  root.querySelectorAll('[data-chatbot-close]').forEach((el) => {
    el.addEventListener('click', () => setOpen(false));
  });

  root.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  root.querySelectorAll('[data-music]').forEach((el) => {
    const action = el.dataset.music;
    el.addEventListener('click', () => {
      if (action === 'prev') prevMusic();
      else if (action === 'next') nextMusic();
      else togglePlay();
    });
  });

  const input = $('cb-user-input');
  input?.addEventListener('input', resizeInput);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      sendMessage();
    }
    if (e.key === 'Escape') setOpen(false);
  });

  $('cb-send-btn')?.addEventListener('click', sendMessage);

  $('chatbot-fab')?.addEventListener('click', toggleChatbot);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) setOpen(false);
  });
}

export function initChatbot() {
  root = $('bisa-chatbot-root');
  if (!root) return;

  audio = new Audio();
  audio.onended = nextMusic;

  restoreMessages();
  createPlaylist();
  loadTrack(0);
  bindEvents();
  updateComposerActions();

  const savedView = sessionStorage.getItem(STORAGE.view) || 'chat';
  showView(savedView);

  window.toggleChatbot = toggleChatbot;

  document.querySelectorAll('[data-chatbot-toggle]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      toggleChatbot();
    });
  });

  if (sessionStorage.getItem(STORAGE.open) === '1') {
    setOpen(true);
  }

  if (new URLSearchParams(window.location.search).get('chat') === 'open') {
    setOpen(true);
    sessionStorage.setItem(STORAGE.open, '1');
  }
}
