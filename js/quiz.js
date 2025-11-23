// js/quiz.js (최종 수정본 - quiz (1).js 내용 적용)

const QUIZ_TOTAL_COUNT = 20; // 📍 총 문제 수
let currentAudio = null; // 📍 현재 재생 중인 오디오 객체를 저장할 변수

// 🚨 [제거] main.js와 중복되는 모든 상수 선언(LS_USER_NAME, LS_START_TIME 등)을 제거했습니다.

const quizData = [ 
    // ... (퀴즈 데이터는 그대로 유지)
     {
        q: "무슨 소리일까..?",
        sound: "q1.mp3", 
        options: ["굵은 나무 가지가 서로 부딪히는 소리", "굵은 나무를 톱으로 자르는 소리", "산신령이 관절 푼다고 힘껏 기지개 켜는 소리", "나무 기둥이 바람에 세게 흔들리며 마찰하는 소리"],
        answerIndex: 0 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q2.mp3",
        options: ["나뭇가지로 돌을 긁는 소리", "나무 긁는 소리", "선비가 나무통에다 벼루를 갈 때 나는 사각사각 소리", "아빠가 밤에 긁적긁적 자꾸 등 긁는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q3.mp3",
        options: ["나무를 망치로 가볍게 두드리는 소리", "나무 손톱으로 치는 소리", "참새가 지루해서 부리로 톡톡 리듬 타는 소리", "하늘에서 우박이 나무 지붕에 경쾌하게 떨어지는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q4.mp3",
        options: ["자갈 길을 걷는 소리", "저승사자가 퇴근길에 낙엽 밟는 줄 알았는데 돌 밟는 소리", "나무뿌리 밟는 소리", "마른 흙 위를 사박사박 걷는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q5.mp3",
        options: ["장작을 도끼로 쪼갤 때 나는 파열음", "나뭇가지 부러트리는 소리", "빼빼로가 부러지는 소리", "화장실 간 호랑이가 힘주는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q6.mp3",
        options: ["풀잎들이 바람에 세게 스치는 소리", "잔가지들이 광풍에 휘말려 신들린 무당처럼 춤추는 소리", "나뭇가지가 뒤엉켜 흔들리는 소리", "도둑이 담을 넘어 도망가다 빨랫줄에 걸리는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q7.mp3",
        options: ["나뭇가지로 나무통 긁는 소리", "손으로 나무통을 거칠게 긁는 소리", "심술 난 나무꾼이 막대기로 속 빈 나무통을 드르륵 화풀이하는 소리", "세신사가 타월로 나무인형 때 밀어주는 소리"],
        answerIndex: 0 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q8.mp3",
        options: ["쇠로 돌을 날카롭게 긁는 소리", "원시인이 나뭇가지로 화강암에 걸작 새기는 소리", "나뭇가지로 돌 긁는 소리", "마법사가 지팡이로 마법 주문을 바닥 돌에 쓰는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q9.mp3",
        options: ["옷자락이 풀밭을 스치는 소리", "나뭇가지로 풀잎 스치는 소리", "미어캣이 정찰 돌다 풀밭에서 비밀스럽게 지나가는 소리", "바람이 나뭇잎 스치는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q10.mp3",
        options: ["나뭇잎 떨어지는 소리", "무성한 숲 속에서 나무가 흔들리는 소", "거미가 공중에서 거미줄 놓치고 바닥에 떨어지는 소리", "시골 할매가 마당에서 팥 고르는 소리"],
        answerIndex: 0 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q11.mp3",
        options: ["마른 낙엽 위를 살살 걷는 소리", "나뭇잎 부스르는 소리 만지는 소리", "원시인이 나뭇잎 지폐를 세는 소리", "비닐 봉지를 구겨서 버리는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q12.mp3",
        options: ["바람이 푸른 잎을 부드럽게 스치는 소리", "나뭇잎 손으로 스치는 만지는 소리", "잎 굴러가는 소리", "선녀가 목욕 후 긴 머리를 풀잎으로 빗는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q13.mp3",
        options: ["마른 흙 위를 사박사박 걷는 소리", "가을의 정취에 취한 시인이 낙엽 이불 위를 사박사박 걷는 소리", "낙엽 밟는 소리", "자갈들이 발에 밟혀 “아야!” 소리치며 떼굴떼굴 도망가는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q14.mp3",
        options: ["자갈 길 걷는 소리", "옆집 아주머니가 화투 섞는 소리", "돌끼리 부딪히는 소리", "산지기가 돌 깨서 부싯돌 만든다고 탁 치는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q15.mp3",
        options: ["나뭇가지로 돌을 긁는 소리", "돌멩이로 돌멩이를 치는 소리", "마른 나뭇잎으로 돌을 긁고 치는 소리", "종이로 돌을 문지르는 소리"],
        answerIndex: 2 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q16.mp3",
        options: ["시냇물이 바위 사이를 지나는 소리", "물 흐르는 소리", "이무기가 1000년 만에 샤워한다고 물 트는 소리", "수도꼭지에서 물이 졸졸 떨어지는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q17.mp3",
        options: ["새가 나뭇잎을 쪼아 떨어트리는 소리", "바람에 나뭇잎에서 떨어지는 소리", "바람이 나무에게 딱밤 때려서 나뭇잎이 고공 낙하하는 소리", "나무에 매달린 열매가 떨어지는 소리"],
        answerIndex: 1 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q18.mp3",
        options: ["바람이 나뭇잎 스치는 소리", "풀잎들이 바람에 스치는 소리", "나뭇잎들이 바람의 간지럼에 못 이겨 킥킥 웃으며 스르륵거리는 소리", "도깨비가 풀잎들한테 휘파람으로 장난치는 소리"],
        answerIndex: 0 

    },

    {
        q: "무슨 소리일까..?",
        sound: "q19.mp3",
        options: ["계곡물이 급류를 이루며 흐르는 소리", "시냇물 소리", "시냇물이 조약돌 위를 졸졸 지나가며 사랑가 부르는 소리", "여름에 시원한 물을 컵에 따르는 소리" ],
        answerIndex: 1 

    },


    {
        q: "무슨 소리일까..?",
        sound: "q20.mp3",
        options: ["돌끼리 부딪히는 소리", "잔디밭 위를 걷는 소리", "자갈 길 걷는 소리", "아이가 콩으로 제기차기 하다가 바닥에 우르르 쏟는 소리"],
        answerIndex: 2 

    }
];

// 현재 퀴즈 상태
let currentQuizIndex = 0;
let score = 0;
let selectedOptionIndex = null;

function initQuizPage() {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return; 

    // 🚨 [수정] LS_START_TIME 대신 문자열 리터럴 'quizStartTime' 사용 (ReferenceError 해결)
    if (!localStorage.getItem('quizStartTime')) { 
        localStorage.setItem('quizStartTime', Date.now()); 
    }

    loadQuiz(currentQuizIndex);

    const soundButton = document.getElementById('sound-button');
    if (soundButton) {
        soundButton.onclick = playCurrentSound;
    }
    
    const completeButton = document.getElementById('complete-selection-button');
    if (completeButton) {
        completeButton.onclick = handleSelectionComplete;
    }
}

// -------------------- 퀴즈 로드 및 UI 업데이트 --------------------

function loadQuiz(index) {
    
    // 퀴즈 완료 조건 검사
    if (index >= QUIZ_TOTAL_COUNT) {
        
        // 1. 최종 점수를 로컬 스토리지에 저장 (문자열 'userScore' 사용)
        localStorage.setItem('userScore', score); 
        
        // 2. 🚨 [수정] YouTube ID (main.js에서 "DvP6qr1u5ac")를 문자열 리터럴로 직접 사용
        const YOUTUBE_ID = "DvP6qr1u5ac";
        window.location.href = `result_video.html?video=${YOUTUBE_ID}&nextPage=outro.html`;
        
        return; 
    }
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    const currentQuiz = quizData[index];
    currentQuizIndex = index;
    selectedOptionIndex = null;

    const statusElement = document.getElementById('quiz-status');
    if (statusElement) {
        statusElement.textContent = `문제 ${index + 1} / ${QUIZ_TOTAL_COUNT}`;
    }
    
    document.getElementById('question-text').textContent = currentQuiz.q;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    currentQuiz.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => handleOptionSelection(button, i);
        optionsContainer.appendChild(button);
    });

    const completeButton = document.getElementById('complete-selection-button');
    if (completeButton) {
        completeButton.disabled = true;
    }
    
    playCurrentSound();
}

// -------------------- 이벤트 처리 --------------------

function playCurrentSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // 🚨 [유지] GitHub Pages 경로에 맞추어 '/quiz-project'를 포함합니다. 
    const soundPath = `/quiz-project/assets/sounds/${quizData[currentQuizIndex].sound}`;
    const audio = new Audio(soundPath);
    
    currentAudio = audio;

    audio.play().catch(e => console.error("Sound play failed:", e));
}

function handleOptionSelection(selectedButton, index) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    selectedButton.classList.add('selected');
    selectedOptionIndex = index;

    const completeButton = document.getElementById('complete-selection-button');
    if (completeButton) {
        completeButton.disabled = false;
    }
}

function handleSelectionComplete() {
    if (selectedOptionIndex === null) {
        console.log('보기를 선택해주세요.');
        return;
    }

    const currentQuiz = quizData[currentQuizIndex];
    if (selectedOptionIndex === currentQuiz.answerIndex) {
        score++;
    }

    loadQuiz(currentQuizIndex + 1);
}

document.addEventListener('DOMContentLoaded', initQuizPage);

