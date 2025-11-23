const QUIZ_TOTAL_COUNT = 20; // 📍 총 문제 수
let currentAudio = null; // 📍 현재 재생 중인 오디오 객체를 저장할 변수

// 🚨 [수정] ReferenceError 해결을 위해 LS 키를 다시 선언합니다.
const LS_USER_NAME = 'quizUserName'; 
const LS_START_TIME = 'quizStartTime';

// 🚨 [수정] main.js의 변수 이름(YOUTUBE_VIDEO_ID_2)을 사용하도록 통일하고 ID를 정의합니다.
const YOUTUBE_VIDEO_ID_2 = "DvP6qr1u5ac"; 

const quizData = [
    {
        q: "첫 번째 사운드는 '굵은 나뭇가지가 서로 부딪히는 소리'입니다. 이 소리를 나타내는 가장 적절한 상황은 무엇일까요?",
        sound: "q1.mp3", 
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
        options: ["땅 속에서 풀이 솟아나는 소리", "작은 막대가 '똑' 하고 부러지는 소리", "시냇물이 졸졸 흐르는 소리", "굵은
