// js/main.js
const YOUTUBE_VIDEO_ID_1 = "DvP6qr1u5ac"; // 📍 인트로 후 재생할 유튜브 영상 ID (유효 ID 적용)
const YOUTUBE_VIDEO_ID_2 = "DvP6qr1u5ac"; // 📍 퀴즈 결과 후 재생할 유튜브 영상 ID (유효 ID 적용)

// 로컬 스토리지 키 (다른 파일과 중복 선언 금지)
const LS_USER_NAME = 'quizUserName';
const LS_START_TIME = 'quizStartTime';
const LS_RANKING_DATA = 'quizRankingData'; // 랭킹 키도 main.js에서만 정의

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
    const userNameDisplay = document.getElementById('user-name-display');
    const finalScoreDisplay = document.getElementById('final-score-display');
    const timeTakenDisplay = document.getElementById('time-taken-display');

    if(userNameDisplay) userNameDisplay.textContent = `${userName} 님, 축하합니다!`;
    if(finalScoreDisplay) finalScoreDisplay.textContent = `최종 점수: ${finalScore} / 20`;
    if(timeTakenDisplay) timeTakenDisplay.textContent = `소요 시간: ${timeFormatted}`;

    // 3. 랭킹 데이터 로드
    let rankingData = JSON.parse(localStorage.getItem(LS_RANKING_DATA) || '[]');

    // 4. 현재 사용자 점수를 랭킹에 추가 또는 업데이트 (중복 방지 및 최고 기록 반영)
    const newEntry = {
        name: userName,
        score: finalScore,
        time: elapsedTimeMs
    };
    
    // 🚨 [수정된 핵심] 랭킹에 최종적으로 반영된 기록 (최고 기록)을 저장할 변수
    let finalRankedEntry = newEntry; 

    const existingIndex = rankingData.findIndex(item => item.name === userName);

    if (existingIndex > -1) {
        const existingEntry = rankingData[existingIndex];
        // 점수가 더 높거나, 점수는 같지만 시간이 더 짧은 경우에만 업데이트 (최고 기록 갱신)
        if (finalScore > existingEntry.score || 
            (finalScore === existingEntry.score && elapsedTimeMs < existingEntry.time)) {
            rankingData[existingIndex] = newEntry; // 💥 최고 기록으로 업데이트
            finalRankedEntry = newEntry; // 갱신된 새 기록을 최종 기록으로 설정
        } else {
            // 최고 기록 갱신 실패. 기존 최고 기록을 최종 기록으로 설정
            finalRankedEntry = existingEntry; 
        }
    } else {
        // 존재하지 않는 경우: 새로운 항목으로 추가
        rankingData.push(newEntry);
        finalRankedEntry = newEntry; 
    }

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

            // 🚨 [최종 수정] 랭킹에 반영된 최종 기록과 일치할 때 강조
            // 이름과 시간(최고 기록의 시간)을 비교하여 해당 사용자의 최고 기록을 강조합니다.
            if (item.name === finalRankedEntry.name && item.time === finalRankedEntry.time) {
                row.style.backgroundColor = '#FFF8E1'; // 현재 반영된 최고 기록 강조
            }
        });
    }
}

// 각 페이지가 로드될 때 실행할 함수
document.addEventListener('DOMContentLoaded', () => {
    
    // Smore 인트로 페이지: 퀴즈 시작 버튼 이벤트 연결
    if (window.location.pathname.includes('smore_intro.html')) {
        const startQuizButton = document.getElementById('start-quiz-button');
        if (startQuizButton) {
            startQuizButton.onclick = handleQuizStart;
        }
    }

    // 결과 영상 페이지: 영상 완료 후 다음 페이지로 이동
    if (window.location.pathname.includes('result_video.html')) {
        window.handleVideoComplete = handleVideoComplete;
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



