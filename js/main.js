// js/main.js
const YOUTUBE_VIDEO_ID_1 = "hY7m5Mj6w3A"; // 📍 인트로 후 재생할 유튜브 영상 ID
const YOUTUBE_VIDEO_ID_2 = "hY7m5Mj6w3A"; // 📍 퀴즈 결과 후 재생할 유튜브 영상 ID

// 로컬 스토리지 키
const LS_USER_NAME = 'quizUserName';
const LS_START_TIME = 'quizStartTime';

document.addEventListener('DOMContentLoaded', () => {
    const introPage = document.getElementById('intro-page');
    const nameInput = document.getElementById('name-input');
    const startButton = document.getElementById('start-button');

    if (introPage) { // 인트로 페이지일 경우
        // 이름 입력 필드에 입력이 있을 때만 시작 버튼 활성화
        if (nameInput && startButton) {
            nameInput.addEventListener('input', () => {
                startButton.disabled = nameInput.value.trim() === '';
            });

            startButton.addEventListener('click', () => {
                const userName = nameInput.value.trim();
                if (userName) {
                    localStorage.setItem(LS_USER_NAME, userName);
                    // Smore 인터랙티브 페이지로 이동
                    window.location.href = 'smore_intro.html';
                }
            });
        }
    }
});


// js/main.js 파일 맨 끝에 추가

// -------------------- 영상 페이지 처리 --------------------

// 쿼리스트링에서 특정 파라미터 값을 가져오는 함수
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// result_video.html에서 영상 재생 완료 후 호출될 함수
function handleVideoComplete() {
    // 쿼리스트링에서 'nextPage' 값을 가져옵니다.
    const nextPage = getQueryParam('nextPage');
    
    if (nextPage) {
        // 지정된 페이지로 이동합니다.
        console.log(`영상 재생 완료. 다음 페이지로 이동: ${nextPage}`);
        window.location.href = nextPage;
    } else {
        console.error("다음 페이지(nextPage)가 지정되지 않았습니다.");
    }
}

// -------------------- 퀴즈 시작 및 랭킹 처리 --------------------

// 퀴즈 시작 버튼 처리 (smore_intro.html 용)
function handleQuizStart() {
    // 퀴즈 시작 시간 기록
    localStorage.setItem(LS_START_TIME, Date.now());
    window.location.href = 'quiz.html';
}

// 랭킹 저장 및 가져오기 로직 (outro.html 용)
const LS_RANKING_DATA = 'quizRankingData';

function loadAndDisplayRanking() {
    // 1. 현재 사용자 점수 및 시간 로드
    const userName = localStorage.getItem(LS_USER_NAME) || '익명';
    const finalScore = parseInt(localStorage.getItem('userScore') || '0');
    const startTime = parseInt(localStorage.getItem(LS_START_TIME) || '0');
    const endTime = Date.now();
    const elapsedTimeMs = endTime - startTime;
    
    // 밀리초를 '분 초' 문자열로 변환하는 함수
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}분 ${seconds}초`;
    };

    // 2. 최종 결과 표시
    const timeFormatted = formatTime(elapsedTimeMs);
    document.getElementById('user-name-display').textContent = `${userName} 님, 축하합니다!`;
    document.getElementById('final-score-display').textContent = `최종 점수: ${finalScore} / 20`;
    document.getElementById('time-taken-display').textContent = `소요 시간: ${timeFormatted}`;

    // 3. 랭킹 데이터 로드
    let rankingData = JSON.parse(localStorage.getItem(LS_RANKING_DATA) || '[]');

    // 4. 현재 사용자 점수를 랭킹에 추가 (이미 있으면 업데이트 방지)
    const newEntry = {
        name: userName,
        score: finalScore,
        time: elapsedTimeMs
    };
    
    rankingData.push(newEntry);

    // 5. 랭킹 정렬 (점수 내림차순, 시간이 짧은 순으로 오름차순)
    rankingData.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 점수 내림차순
        }
        return a.time - b.time; // 시간 오름차순
    });

    // 6. 랭킹 데이터 저장 (최대 10개만 저장)
    rankingData = rankingData.slice(0, 10);
    localStorage.setItem(LS_RANKING_DATA, JSON.stringify(rankingData));

    // 7. 랭킹 테이블 업데이트
    const tableBody = document.getElementById('ranking-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        rankingData.forEach((item, index) => {
            const row = tableBody.insertRow();
            // 순위
            row.insertCell().textContent = index + 1;
            // 이름
            row.insertCell().textContent = item.name;
            // 점수
            row.insertCell().textContent = `${item.score} / 20`;
            // 시간
            row.insertCell().textContent = formatTime(item.time);

            // 현재 사용자 강조 (선택 사항)
            if (item.name === userName && item.time === elapsedTimeMs) {
                 row.style.backgroundColor = '#FFF8E1'; // 연한 노란색 배경
            }
        });
    }
}

// js/main.js 파일 맨 끝에 추가

// 각 페이지가 로드될 때 실행할 함수
document.addEventListener('DOMContentLoaded', () => {
    // (기존 introPage 처리 로직은 여기에 유지)

    // Smore 인트로 페이지: 퀴즈 시작 버튼 이벤트 연결
    if (window.location.pathname.includes('smore_intro.html')) {
        const startQuizButton = document.getElementById('start-quiz-button');
        if (startQuizButton) {
            startQuizButton.onclick = handleQuizStart;
        }
    }

    // 결과 영상 페이지: 영상 완료 후 다음 페이지로 이동
    if (window.location.pathname.includes('result_video.html')) {
        // result_video.html의 비디오 플레이어 로직에서 handleVideoComplete()를 호출해야 합니다.
        // 이 함수를 전역에서 접근할 수 있도록 준비해 둡니다.
        window.handleVideoComplete = handleVideoComplete;
        
        // 🚨 중요: result_video.html에서 YouTube Player API를 사용하여 
        // 영상이 끝났을 때 handleVideoComplete()를 호출하도록 구현해야 합니다.
    }

    // 최종 결과 페이지: 랭킹 표시
    if (window.location.pathname.includes('outro.html')) {
        loadAndDisplayRanking();
        
        // 다시 시작 버튼 이벤트 연결
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.onclick = () => {
                localStorage.removeItem(LS_START_TIME); // 시간 초기화
                window.location.href = 'index.html';
            };
        }
    }
});

