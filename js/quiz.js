// js/quiz.js
const QUIZ_TOTAL_COUNT = 20; // 📍 총 문제 수
const LS_FINAL_SCORE = 'quizFinalScore';

const quizData = [
    {
        q: "첫 번째 사운드는 '굵은 나뭇가지가 서로 부딪히는 소리'입니다. 이 소리를 나타내는 가장 적절한 상황은 무엇일까요?",
        sound: "q1.mp3", // 📍 여기에 실제 q1.mp3 파일을 넣어야 합니다.
        options: ["굵은 나뭇가지 충돌음", "잔가지가 바람에 흔들리는 소리", "나무를 톱으로 자르는 소리", "나무 통을 손바닥으로 치는 소리"],
        answerIndex: 0 
    },
    {
        q: "두 번째 사운드는 '나무 긁는 소리'입니다. 이 소리가 나는 상황은?",
        sound: "q2.mp3",
        options: ["손톱으로 나무통을 두드리는 소리", "금속으로 나무 표면을 긁는 소리", "나무판자가 물에 뜨는 소리", "나뭇가지로 돌을 긁는 소리"],
        answerIndex: 1 
    },
    {
        q: "세 번째 사운드는 '나무 손톱으로 치는 소리'입니다. 이 소리를 잘 묘사한 것은?",
        sound: "q3.mp3",
        options: ["나무를 연필로 톡톡 두드리는 소리", "나무에 손톱을 대고 튕기는 소리", "돌멩이로 나무를 세게 때리는 소리", "단단한 나무가 부러지는 소리"],
        answerIndex: 1 
    },
    {
        q: "네 번째 사운드는 '나무뿌리 밟는 소리'입니다. 어떤 소리와 가장 유사할까요?",
        sound: "q4.mp3",
        options: ["낙엽 위를 걷는 소리", "마른 땅 위를 걷는 소리", "흙이 섞인 단단한 나무뿌리를 밟는 소리", "자갈밭을 자동차가 지나가는 소리"],
        answerIndex: 2 
    },
    {
        q: "다섯 번째 사운드는 '나뭇가지 부러트리는 소리'입니다. 이 소리의 특징은?",
        sound: "q5.mp3",
        options: ["땅 속에서 풀이 솟아나는 소리", "작은 막대가 '똑' 하고 부러지는 소리", "시냇물이 졸졸 흐르는 소리", "굵은 나무가 넘어지는 소리"],
        answerIndex: 1 
    },
    {
        q: "여섯 번째 사운드는 '나뭇가지가 뒤엉켜 흔들리는 소리'입니다. 어떤 상황에서 발생할까요?",
        sound: "q6.mp3",
        options: ["태풍이 불 때 나무가 뿌리째 뽑히는 소리", "산불이 났을 때 나무가 타는 소리", "강한 바람에 여러 잔가지들이 부딪히는 소리", "새들이 둥지를 틀 때 내는 소리"],
        answerIndex: 2 
    },
    {
        q: "일곱 번째 사운드는 '나뭇가지로 나무통 긁는 소리'입니다. 이 소리를 들려주는 상황은?",
        sound: "q7.mp3",
        options: ["나뭇가지로 다른 나무통의 표면을 마찰시키는 소리", "돌을 나무통에 던지는 소리", "금속 꼬챙이로 나무통을 뚫는 소리", "도끼로 나무를 찍는 소리"],
        answerIndex: 0 
    },
    {
        q: "여덟 번째 사운드는 '나뭇가지로 돌 긁는 소리'입니다. 이 사운드에 가장 가까운 것은?",
        sound: "q8.mp3",
        options: ["흙바닥에 나뭇가지를 끌 때 나는 소리", "나무통을 돌로 치는 소리", "나무와 돌이 마찰하여 나는 '삭삭' 소리", "두 개의 돌멩이를 부딪히는 소리"],
        answerIndex: 2 
    },
    {
        q: "아홉 번째 사운드는 '나뭇가지로 풀잎 스치는 소리'입니다. 부드러운 마찰음이 특징인 소리는?",
        sound: "q9.mp3",
        options: ["나무가 부러지는 소리", "잔가지로 풀잎을 가볍게 훑는 소리", "새가 날개를 퍼덕이는 소리", "나뭇잎 위로 비가 떨어지는 소리"],
        answerIndex: 1 
    },
    {
        q: "열 번째 사운드는 '나뭇잎 떨어지는 소리'입니다. 이 소리가 가장 잘 들리는 때는?",
        sound: "q10.mp3",
        options: ["바람이 전혀 없을 때 잎이 땅에 닿는 소리", "무성한 숲 속에서 나무가 흔들릴 때", "단풍잎이 땅바닥에 튀어 오르는 소리", "나무에 물을 주는 소리"],
        answerIndex: 0 
    },
    {
        q: "열한 번째 사운드는 '나뭇잎 부스르는 소리 만지는 소리'입니다. 건조한 나뭇잎을 만질 때 나는 소리는?",
        sound: "q11.mp3",
        options: ["축축한 흙을 만지는 소리", "마른 나뭇잎을 손으로 구기거나 비비는 소리", "종이를 찢는 소리", "비 오는 날 우산을 펼치는 소리"],
        answerIndex: 1 
    },
    {
        q: "열두 번째 사운드는 '나뭇잎 손으로 스치는 만지는 소리'입니다. 이 소리는 무엇을 묘사할까요?",
        sound: "q12.mp3",
        options: ["숲 속을 뛰어다니는 소리", "손으로 잎사귀들을 쓸어내릴 때 나는 '사삭' 소리", "바위가 굴러가는 소리", "나무에 기대어 쉬는 소리"],
        answerIndex: 1 
    },
    {
        q: "열세 번째 사운드는 '낙엽 밟는 소리'입니다. 이 소리가 가장 잘 나는 조건은?",
        sound: "q13.mp3",
        options: ["흙바닥을 걷는 소리", "젖은 아스팔트 위를 걷는 소리", "건조한 낙엽 위를 걸을 때 나는 '바스락' 소리", "돌계단을 오르는 소리"],
        answerIndex: 2 
    },
    {
        q: "열네 번째 사운드는 '돌끼리 부딪히는 소리'입니다. 이 소리는?",
        sound: "q14.mp3",
        options: ["부드러운 모래알이 굴러가는 소리", "흙 속의 돌을 파내는 소리", "두 개의 단단한 돌멩이가 충돌하는 소리", "쇠와 돌이 마찰하는 소리"],
        answerIndex: 2 
    },
    {
        q: "열다섯 번째 사운드는 '마른 나뭇잎으로 돌을 긁고 치는 소리'입니다. 이 사운드를 들려주는 행위는?",
        sound: "q15.mp3",
        options: ["바위를 깨는 소리", "돌멩이로 돌멩이를 치는 소리", "돌 표면을 마른 나뭇잎으로 문지르는 소리", "나뭇잎을 돌 위에 올려놓는 소리"],
        answerIndex: 2 
    },
    {
        q: "열여섯 번째 사운드는 '물 흐르는 소리'입니다. 이 소리는 주로 어떤 장소에서 들릴까요?",
        sound: "q16.mp3",
        options: ["마른 땅", "폭포, 시냇가, 수도꼭지 등", "조용한 방 안", "바람이 부는 들판"],
        answerIndex: 1 
    },
    {
        q: "열일곱 번째 사운드는 '바람에 나뭇잎에서 떨어지는 소리'입니다. 이 소리가 전달하는 느낌은?",
        sound: "q17.mp3",
        options: ["나뭇가지가 꺾이는 강한 소리", "바람 때문에 잎이 나무에서 분리되어 떨어지는 소리", "땅에 떨어진 잎을 주워 모으는 소리", "나무에 매달린 열매가 떨어지는 소리"],
        answerIndex: 1 
    },
    {
        q: "열여덟 번째 사운드는 '바람이 나뭇잎 스치는 소리'입니다. 이 소리의 특징은?",
        sound: "q18.mp3",
        options: ["잔잔한 바람에 잎들이 마찰하며 나는 '쉬익' 소리", "나뭇가지가 부러지는 소리", "천둥번개가 치는 소리", "새가 빠르게 날아가는 소리"],
        answerIndex: 0 
    },
    {
        q: "열아홉 번째 사운드는 '시냇물' 소리입니다. 이 소리는?",
        sound: "q19.mp3",
        options: ["바닷물이 철썩이는 소리", "흐름이 빠르지 않고 얕은 물이 흐르는 소리", "파이프가 터지는 소리", "비가 지붕에 떨어지는 소리"],
        answerIndex: 1 
    },
    {
        q: "스무 번째 사운드는 '자갈 길 걷는 소리'입니다. 이 소리를 낼 수 있는 상황은?",
        sound: "q20.mp3",
        options: ["푹신한 모래사장 위를 걷는 소리", "잔디밭 위를 걷는 소리", "단단한 자갈이 깔린 길을 발로 밟을 때 나는 소리", "눈 위를 걷는 소리"],
        answerIndex: 2 
    }
];

// 현재 퀴즈 상태
let currentQuizIndex = 0;
let score = 0;
let selectedOptionIndex = null;

function initQuizPage() {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return; // 페이지가 quiz.html이 아니면 종료

    loadQuiz(currentQuizIndex);

    // 사운드 재생 버튼 이벤트
    document.getElementById('sound-btn').onclick = playCurrentSound;
    
    // 선택 완료 버튼 이벤트
    document.getElementById('complete-selection-button').onclick = handleSelectionComplete;
}

// -------------------- 퀴즈 로드 및 UI 업데이트 --------------------

function loadQuiz(index) {
    if (index >= QUIZ_TOTAL_COUNT) {
        // 20문제 완료
        localStorage.setItem(LS_FINAL_SCORE, score);
        window.location.href = `result_video.html?video_id=${YOUTUBE_VIDEO_ID_2}&next_page=info_image.html`;
        return;
    }
    
    const currentQuiz = quizData[index];
    currentQuizIndex = index;
    selectedOptionIndex = null;

    // 상태 표시 업데이트
    document.getElementById('quiz-status').textContent = `문제 ${index + 1} / ${QUIZ_TOTAL_COUNT}`;
    document.getElementById('question-text').textContent = currentQuiz.q;

    // 보기 버튼 업데이트
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    currentQuiz.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => handleOptionSelection(button, i);
        optionsContainer.appendChild(button);
    });

    // 선택 완료 버튼 비활성화
    document.getElementById('complete-selection-button').disabled = true;
    
    // 사운드 재생
    playCurrentSound();
}

// -------------------- 이벤트 처리 --------------------

function playCurrentSound() {
    const soundPath = `assets/sounds/${quizData[currentQuizIndex].sound}`;
    const audio = new Audio(soundPath);
    // 버튼 UI 업데이트는 선택 사항입니다. 간단히 소리만 재생합니다.
    audio.play().catch(e => console.error("Sound play failed:", e));
}

function handleOptionSelection(selectedButton, index) {
    // 모든 버튼의 'selected' 클래스 제거
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // 선택된 버튼에 'selected' 클래스 추가
    selectedButton.classList.add('selected');
    selectedOptionIndex = index;

    // 선택 완료 버튼 활성화
    document.getElementById('complete-selection-button').disabled = false;
}

function handleSelectionComplete() {
    if (selectedOptionIndex === null) {
        alert('보기를 선택해주세요.');
        return;
    }

    // 1. 점수 계산
    const currentQuiz = quizData[currentQuizIndex];
    if (selectedOptionIndex === currentQuiz.answerIndex) {
        score++;
    }

    // 2. 다음 문제로 이동
    loadQuiz(currentQuizIndex + 1);
}

document.addEventListener('DOMContentLoaded', () => {
    // quiz.html에서만 실행
    if (window.location.pathname.split('/').pop() === 'quiz.html') {
        // 퀴즈 데이터가 20개인지 확인 (개발 편의를 위한 임시 검사)
        if (quizData.length !== QUIZ_TOTAL_COUNT) {
             console.warn(`[경고] 퀴즈 데이터가 ${QUIZ_TOTAL_COUNT}개가 아닙니다. 현재: ${quizData.length}개`);
        }
        
        // 이름이 없으면 인트로로 이동 (강제성 부여)
        if (!localStorage.getItem(LS_USER_NAME)) {
            alert('이름 정보가 없어 인트로 페이지로 이동합니다.');
            window.location.href = 'index.html';
            return;
        }
        
        initQuizPage();
    }

});
