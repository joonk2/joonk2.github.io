import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime, loadImg } from './modules/plugins';

loadImg();
initLocaleDatetime();
initSidebar();
initTopbar();
basic();

// 챗봇 관련 함수들
window.openChatbotPopup = function() {
  console.log('Opening chatbot popup');
  document.getElementById('chatbot-popup').style.display = 'flex';
};

window.closeChatbotPopup = function() {
  console.log('Closing chatbot popup');
  document.getElementById('chatbot-popup').style.display = 'none';
};

window.sendChatbotMessage = function() {
  console.log('Sending message');
  const input = document.getElementById('chatbot-popup-input-text');
  const messages = document.getElementById('chatbot-popup-messages');
  const message = input.value.trim();
  
  if (message) {
    // 사용자 메시지
    const userDiv = document.createElement('div');
    userDiv.className = 'chatbot-msg user';
    userDiv.innerHTML = `<div class='chatbot-bubble'>${message}</div>`;
    messages.appendChild(userDiv);
    
    // 챗봇 응답
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'chatbot-msg bot';
      botDiv.innerHTML = `<img src='/assets/img/racoon.png' class='chatbot-avatar-mini' alt='bot' /><div class='chatbot-bubble'>${getGuardBotResponse(message)}</div>`;
      messages.appendChild(botDiv);
      messages.scrollTop = messages.scrollHeight;
    }, 500);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
};

function getGuardBotResponse(message) {
  const responses = {
    '안녕': '어서오셔 구리! 궁금한 것이 있으면 무엇이든 물어보셔 구리.',
    '이름': '나는 너굴이야 구리',
    '블로그': '이곳은 고준환의 기술 블로그야 구리.',
    '도움': '궁금한 점, 불편한 점, 무엇이든 말해주셔 구리.',
    '감사': '고마워! 너의 방문이 나에겐 큰 힘이 돼 구리.',
    '누구': '나는 언제나 도움을 드리려 대기 중인 너굴이야 구리!',
    '시간': '시간은 소중하니까 알차게 써보는 거야 구리!',
    '잘자': '좋은 꿈 꾸셔 구리~ 내일도 힘내는 거야 구리!',
    '좋아': '그 말 들으니까 기분이 몹시 좋아졌어 구리!',
    '싫어': '그럴 수도 있지 구리~ 그럼 다른 걸 해보는 건 어때 구리?',
    '귀여워': '에헤헤~ 그런 말 들으면 부끄럽다구 구리!',
    '배고파': '배고프면 힘도 안 나지 구리~ 맛있는 거 꼭 챙겨먹어 구리!',
    '졸려': '눈이 스르륵 감기면 살짝 쉬어가는 것도 좋아 구리~',
    '일해': '열심히 일하는 건 좋지만 너무 무리하진 마 구리!',
    '쉬어': '쉼도 중요하니까 잠깐 숨 돌리는 건 어때 구리?',
    '오늘 날씨': '오늘 하늘은 어떤가 구리? 흐리든 맑든, 너의 마음은 맑았으면 좋겠어 구리!',
    '기분': '너의 기분이 좋아졌으면 좋겠어 구리! 나는 늘 응원해 구리!',
    '스트레스': '힘든 일이 있으면 말해줘 구리, 같이 나눠보자 구리.',
    '화났어': '화나는 일 있었구리? 너의 마음이 빨리 풀리길 바란다구 구리.',
    '행복해': '너의 행복이 나한테도 전해지는 것 같아 구리~',
    '이상한 질문': '세상에 이상한 질문이 어딨어 구리! 궁금한 건 언제든 환영이야 구리!',
    '좋은 하루': '오늘 하루도 반짝반짝 빛나길 바랄게 구리!',
    '너굴': '너굴은 언제나 너를 응원하고 있어 구리~ 화이팅 구리!',
    '공부': '공부는 느려도 괜찮아 구리~ 포기하지 않는 게 중요하다구 구리!',
    '코딩': '코딩은 퍼즐 맞추기 같아 구리! 하나씩 맞춰가보자 구리!',
    '취업': '취업 준비도 인생도 마라톤이야 구리. 천천히 가도 괜찮다구 구리!',
    '실수': '실수는 괜찮아 구리. 그걸로 배우는 거니까 구리!',
    '성공': '작은 성공도 아주 값진 거라구 구리~ 축하해 구리!',
    '계획': '작은 계획부터 차근차근 실행해보자 구리!',
  };

  const randomResponses = [
    '너의 하루가 궁금하다구 구리!',
    '뭔가 고민이 있다면 나한테 말해도 괜찮다구 구리.',
    '따뜻한 차 한 잔 마시면서 쉬어가는 건 어때 구리?',
    '너는 언제나 잘하고 있어 구리~ 걱정하지 마 구리!',
    '오늘은 조금 느긋하게 가보는 것도 좋다구 구리.',
  ];

  const hour = new Date().getHours();
  let timeGreeting = '';
  if (hour >= 5 && hour < 12) {
    timeGreeting = '좋은 아침이야 구리! 오늘도 힘내보자구 구리 ☀️';
  } else if (hour >= 12 && hour < 18) {
    timeGreeting = '점심은 잘 챙겨 먹었어 구리? 오후도 파이팅이야 구리 💪';
  } else if (hour >= 18 && hour < 22) {
    timeGreeting = '오늘 하루도 수고 많았어 구리~ 저녁은 맛있게 먹자구 구리 🍽️';
  } else {
    timeGreeting = '밤이 깊었구리~ 푹 쉬고 내일 다시 시작하자구 구리 🌙';
  }

  for (let key in responses) {
    if (message.includes(key)) {
      return responses[key];
    }
  }

  // 키워드 매칭 없으면 시간대 인사 + 랜덤 반응
  const random = randomResponses[Math.floor(Math.random() * randomResponses.length)];
  return `${timeGreeting} ${random}`;
}

// 페이지 로드 시 콘솔에 메시지 출력
console.log('Chatbot script loaded successfully');
