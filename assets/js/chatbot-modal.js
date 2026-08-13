(function () {
  'use strict';

  const STORAGE = {
    messages: 'bisa-chat-messages',
    history: 'bisa-chat-history',
    open: 'bisa-chat-open',
    view: 'bisa-chat-view',
    userPersona: 'bisa-user-persona',
  };

  const MUSIC_DATA = [
    { title: 'i love egg', url: 'https://github.com/joonk2/music/raw/music/i-love-egg.mp3' },
    { title: 'cookier-run-violin', url: 'https://github.com/joonk2/music/raw/music/cookier-run-violin.mp3' },
    { title: 'fantasy-01', url: 'https://github.com/joonk2/music/raw/music/suno-fantasy-01.mp3' },
    { title: 'cookie-run-frozen-tower', url: 'https://github.com/joonk2/music/raw/music/cookie-run-frozen-tower.mp3' },
  ];

  const WELCOME = '안녕하세요! AI 채팅봇입니다.\n무엇이든 편하게 물어보세요.';
  const CHATBOT_API = 'https://blog-chatbot.with-joonk.workers.dev';

  let botAvatar = '/assets/img/chatbot-robot.png';

  let root;
  let chatHistory = [];
  let isChatLoading = false;
  let typingEl = null;
  let isOpen = false;
  let audio;
  let currentIdx = 0;
  let isPlaying = false;
  let userPersona = {
    nickname: '',
    occupation: '',
    extra: '',
    useMemory: true,
  };

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

  function readLocalJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeLocalJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadUserPersona() {
    var saved = readLocalJSON(STORAGE.userPersona, null);
    if (saved && typeof saved === 'object') {
      userPersona = {
        nickname: saved.nickname || '',
        occupation: saved.occupation || '',
        extra: saved.extra || '',
        useMemory: saved.useMemory !== false,
      };
    }
    return userPersona;
  }

  function saveUserPersona() {
    writeLocalJSON(STORAGE.userPersona, userPersona);
  }

  function getUserPersonaPayload() {
    if (!userPersona.useMemory) return { enabled: false };
    var nickname = (userPersona.nickname || '').trim();
    var occupation = (userPersona.occupation || '').trim();
    var extra = (userPersona.extra || '').trim();
    if (!nickname && !occupation && !extra) return { enabled: false };
    return {
      enabled: true,
      nickname: nickname,
      occupation: occupation,
      extra: extra,
    };
  }

  function fillPersonaForm() {
    var nick = $('cb-persona-nickname');
    var job = $('cb-persona-occupation');
    var extra = $('cb-persona-extra');
    var memory = $('cb-persona-memory');
    if (nick) nick.value = userPersona.nickname || '';
    if (job) job.value = userPersona.occupation || '';
    if (extra) extra.value = userPersona.extra || '';
    if (memory) memory.checked = userPersona.useMemory !== false;
  }

  function readPersonaForm() {
    userPersona = {
      nickname: ($('cb-persona-nickname') && $('cb-persona-nickname').value.trim()) || '',
      occupation: ($('cb-persona-occupation') && $('cb-persona-occupation').value.trim()) || '',
      extra: ($('cb-persona-extra') && $('cb-persona-extra').value.trim()) || '',
      useMemory: !($('cb-persona-memory') && !$('cb-persona-memory').checked),
    };
  }

  function setPersonaStatus(text, ok) {
    var el = $('cb-persona-status');
    if (!el) return;
    el.textContent = text || '';
    el.classList.toggle('is-success', Boolean(ok));
  }

  function persistState() {
    const rows = root.querySelectorAll('#cb-chat-area .msg-row:not(.typing-row)');
    const messages = Array.from(rows).map(function (row) {
      return {
        sender: row.classList.contains('user') ? 'user' : 'bot',
        text: row.dataset.rawText || (row.querySelector('.msg-bubble') && row.querySelector('.msg-bubble').textContent) || '',
      };
    });
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
    if (!response.ok) return '서버 오류 (' + response.status + ')';
    const reason = data?.candidates?.[0]?.finishReason;
    return reason ? '답변 중단 (' + reason + ')' : '응답 형식을 이해하지 못했어요';
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
    requestAnimationFrame(function () { area.scrollTop = area.scrollHeight; });
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
    rows.forEach(function (row, i) {
      row.classList.remove('no-avatar');
      const prev = rows[i - 1];
      if (row.classList.contains('bot') && prev && prev.classList.contains('bot')) {
        row.classList.add('no-avatar');
      }
    });
  }

  function formatMessageHtml(text) {
    var formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    formatted = formatted.replace(/(https?:\/\/[^\s<]+)/g, function (match, url, offset, str) {
      var before = str.substring(Math.max(0, offset - 20), offset);
      if (before.indexOf('href="') !== -1 || before.indexOf("href='") !== -1) return match;
      return '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>';
    });
    return formatted;
  }

  function appendDateDivider(date) {
    const area = $('cb-chat-area');
    const divider = document.createElement('div');
    divider.className = 'chat-date-divider';
    divider.textContent = formatDateLabel(date);
    area.appendChild(divider);
  }

  function appendMessage(sender, text, options) {
    options = options || {};
    const skipPersist = options.skipPersist || false;
    const skipHistory = options.skipHistory || false;
    const area = $('cb-chat-area');
    const now = new Date();
    const label = formatDateLabel(now);
    const lastDivider = area.querySelector('.chat-date-divider:last-of-type');
    if (!lastDivider || lastDivider.textContent !== label) appendDateDivider(now);

    const row = document.createElement('div');
    row.className = 'msg-row ' + sender;
    const avatarHtml = sender === 'bot'
      ? '<div class="msg-avatar bot-avatar-wrap"><img src="' + botAvatar + '" alt="채팅봇"></div>'
      : '<div class="msg-avatar user-avatar">나</div>';

    row.innerHTML = avatarHtml + '<div class="msg-body"><div class="msg-meta"></div><div class="msg-bubble"></div></div>';
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

  function applyBotConfig(cfg) {
    if (!cfg) return;
    if (cfg.name) {
      var title = $('cb-chat-title');
      if (title) title.textContent = cfg.name;
    }
  }

  async function fetchBotConfig() {
    try {
      var res = await fetch(CHATBOT_API + '/config');
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.warn('[chatbot] config fetch failed:', e);
      return null;
    }
  }

  async function restoreMessages() {
    chatHistory = readJSON(STORAGE.history, []);
    const saved = readJSON(STORAGE.messages, []);
    $('cb-chat-area').innerHTML = '';

    if (!saved.length) {
      var cfg = await fetchBotConfig();
      applyBotConfig(cfg);
      var welcome = (cfg && cfg.welcome) || WELCOME;
      appendMessage('bot', welcome, { skipPersist: true, skipHistory: true });
      chatHistory = [{ role: 'assistant', content: welcome }];
      persistState();
      return;
    }

    saved.forEach(function (msg) {
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
      typingEl.innerHTML = '<div class="msg-avatar bot-avatar-wrap"><img src="' + botAvatar + '" alt="채팅봇"></div><div class="msg-body"><div class="typing-bubble"><span></span><span></span><span></span></div></div>';
    }
    const lastRow = area.querySelector('.msg-row:not(.typing-row):last-of-type');
    typingEl.classList.toggle('no-avatar', lastRow && lastRow.classList.contains('bot'));
    area.appendChild(typingEl);
    scrollChatToBottom();
  }

  function hideTyping() {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function showView(view) {
    root.querySelectorAll('.view-content').forEach(function (v) { v.classList.remove('active'); });
    root.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
    var chatView = $('cb-view-' + view);
    var tabBtn = $('cb-tab-' + view);
    if (chatView) chatView.classList.add('active');
    if (tabBtn) tabBtn.classList.add('active');
    sessionStorage.setItem(STORAGE.view, view);
  }

  function chatFetchErrorMessage(err) {
    if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
      return 'Worker API에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.';
    }
    return (err && err.message) || '알 수 없는 오류';
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
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(0, -1),
          userPersona: getUserPersonaPayload(),
        }),
      });
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('서버 응답을 읽을 수 없어요 (HTTP ' + response.status + ')');
      }
      const reply = extractBotText(data);
      appendMessage('bot', reply || extractErrorMessage(data, response));
    } catch (e) {
      console.error('Chat Error:', e);
      appendMessage('bot', '연결에 실패했습니다. (' + chatFetchErrorMessage(e) + ')');
    } finally {
      setChatLoading(false);
    }
  }

  function resizeInput() {
    const input = $('cb-user-input');
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    updateComposerActions();
  }

  function createPlaylist() {
    const list = $('cb-playlist-items');
    if (!list || list.childElementCount) return;
    MUSIC_DATA.forEach(function (song, i) {
      const item = document.createElement('div');
      item.className = 'playlist-item';
      item.id = 'cb-item-' + i;
      item.innerHTML = '<i class="fas fa-play" style="font-size:0.7em;opacity:0.5"></i> ' + song.title;
      item.addEventListener('click', function () { playTrack(i); });
      list.appendChild(item);
    });
  }

  function loadTrack(idx) {
    currentIdx = idx;
    audio.src = MUSIC_DATA[idx].url;
    $('cb-m-title').innerText = MUSIC_DATA[idx].title;
    root.querySelectorAll('.playlist-item').forEach(function (el) { el.classList.remove('active'); });
    var item = $('cb-item-' + idx);
    if (item) item.classList.add('active');
  }

  function playTrack(idx) {
    loadTrack(idx);
    audio.play().catch(function () {});
    isPlaying = true;
    updatePlayerUI();
  }

  function togglePlay() {
    if (isPlaying) audio.pause();
    else audio.play().catch(function () {});
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
    const launcher = $('chatbot-launcher');
    if (fab) {
      fab.classList.toggle('is-active', open);
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      fab.setAttribute('aria-label', open ? 'AI 챗봇 닫기' : 'AI 챗봇 열기');
    }
    if (launcher) {
      launcher.classList.toggle('is-open', open);
      if (open) launcher.classList.add('is-awake');
    }

    sessionStorage.setItem(STORAGE.open, open ? '1' : '0');

    if (open) {
      scrollChatToBottom();
      setTimeout(function () {
        var input = $('cb-user-input');
        if (input) input.focus();
      }, 120);
    }
  }

  function toggleChatbot() {
    if (!root) root = $('bisa-chatbot-root');
    if (!root) return;
    setOpen(!isOpen);
  }

  function bindLauncherWake() {
    var launcher = $('chatbot-launcher');
    if (!launcher) return;

    function wake() {
      launcher.classList.add('is-awake');
    }

    function sleep() {
      if (!isOpen) {
        launcher.classList.remove('is-awake');
        var bubble = launcher.querySelector('.chatbot-dream-bubble');
        if (bubble) {
          bubble.style.animation = 'none';
          void bubble.offsetWidth;
          bubble.style.animation = '';
        }
      }
    }

    launcher.addEventListener('mouseenter', wake);
    launcher.addEventListener('mouseleave', sleep);
    launcher.addEventListener('focusin', wake);
    launcher.addEventListener('focusout', sleep);
    launcher.addEventListener('touchstart', wake, { passive: true });
  }

  window.toggleChatbot = toggleChatbot;

  function positionLauncher() {
    var launcher = $('chatbot-launcher');
    var sidebar = document.getElementById('sidebar');
    var sidebarBottom = document.querySelector('#sidebar .sidebar-bottom');
    if (!launcher) return;

    if (window.innerWidth >= 850 && sidebar && sidebarBottom) {
      var sidebarRect = sidebar.getBoundingClientRect();
      var bottomRect = sidebarBottom.getBoundingClientRect();
      var launcherWidth = launcher.offsetWidth || 80;
      launcher.style.left = (sidebarRect.left + (sidebarRect.width - launcherWidth) / 2) + 'px';
      launcher.style.bottom = (window.innerHeight - bottomRect.top + 12) + 'px';
      launcher.style.transform = 'none';
    } else {
      launcher.style.left = '16px';
      launcher.style.bottom = '16px';
      launcher.style.transform = 'none';
    }
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(positionLauncher, 80);
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('#chatbot-fab')) {
      e.preventDefault();
      toggleChatbot();
    }
  });

  function bindPersonaEvents() {
    var openBtn = $('cb-open-persona');
    var backBtn = $('cb-persona-back');
    var saveBtn = $('cb-persona-save');

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        fillPersonaForm();
        setPersonaStatus('');
        showView('persona');
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        showView('chat');
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        readPersonaForm();
        saveUserPersona();
        setPersonaStatus('저장되었습니다. 이제 맞춤형 답변을 받을 수 있어요.', true);
        setTimeout(function () { showView('chat'); }, 700);
      });
    }
  }

  function bindEvents() {
    root.querySelectorAll('[data-chatbot-close]').forEach(function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });

    root.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () { showView(btn.dataset.view); });
    });

    root.querySelectorAll('[data-music]').forEach(function (el) {
      const action = el.dataset.music;
      el.addEventListener('click', function () {
        if (action === 'prev') prevMusic();
        else if (action === 'next') nextMusic();
        else togglePlay();
      });
    });

    const input = $('cb-user-input');
    if (input) {
      input.addEventListener('input', resizeInput);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          if (e.isComposing || e.keyCode === 229) return;
          e.preventDefault();
          sendMessage();
        }
      });
    }

    $('cb-send-btn') && $('cb-send-btn').addEventListener('click', sendMessage);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) setOpen(false);
    });
  }

  async function initChatbot() {
    try {
      root = $('bisa-chatbot-root');
      if (!root) {
        console.warn('[chatbot] modal root not found');
        return;
      }

      if (root.dataset.botAvatar) botAvatar = root.dataset.botAvatar;

      loadUserPersona();
      fillPersonaForm();

      audio = new Audio();
      audio.onended = nextMusic;

      await restoreMessages();
      createPlaylist();
      loadTrack(0);
      bindEvents();
      bindPersonaEvents();
      bindLauncherWake();
      updateComposerActions();

      showView(sessionStorage.getItem(STORAGE.view) || 'chat');

      if (sessionStorage.getItem(STORAGE.open) === '1') setOpen(true);
      if (new URLSearchParams(window.location.search).get('chat') === 'open') {
        setOpen(true);
        sessionStorage.setItem(STORAGE.open, '1');
      }

      positionLauncher();
      requestAnimationFrame(positionLauncher);
    } catch (err) {
      console.error('[chatbot] init failed:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
