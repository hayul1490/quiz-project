// js/outro.js

// 🚨 [수정 완료] main.js와의 충돌을 피하기 위해 LS_USER_NAME, LS_START_TIME 선언은 제거합니다.
const LS_RANKING_DATA = 'quizRankingData'; // main.js와 랭킹 키 통일
const QUIZ_TOTAL_COUNT = 20; // 퀴즈 총 문제 수

document.addEventListener('DOMContentLoaded', () => {
    
    // 🚨 [수정] HTML ID와 일치하도록 요소를 가져옵니다.
    const userFinalMessage = document.getElementById('user-name-display');
    const finalScore = document.getElementById('final-score-display');
    const finalTime = document.getElementById('time-taken-display');
    const rankingBody = document.getElementById('ranking-body'); // 랭킹 업데이트용
    const restartButton = document.getElementById('restart-button');

    // 🚨 [수정] 충돌 방지를 위해 하드 코딩된 키 문자열을 사용합니다.
    const userName = localStorage.getItem('quizUserName') || '익명';
    const startTime = parseInt(localStorage.getItem('quizStartTime') || '0', 10);
    const endTime = Date.now();
    const elapsedTime = Math.floor((endTime - startTime) / 1000); // 초 단위

    const score = parseInt(localStorage.getItem('userScore') || '0', 10); // 퀴즈 페이지에서 저장된 점수

    // 🚨 [개선] Null 체크 후 textContent 설정 (오류 방지)
    if(userFinalMessage) userFinalMessage.textContent = `${userName}님, 수고하셨습니다!`;
    if(finalScore) finalScore.textContent = `최종 점수: ${score} / ${QUIZ_TOTAL_COUNT}`;
    if(finalTime) finalTime.textContent = `소요 시간: ${formatTime(elapsedTime)}`;

    // 랭킹 저장 및 표시
    saveAndDisplayRanking(userName, score, elapsedTime);

    // 다시 시작하기 버튼
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            // 로컬 스토리지에 저장된 임시 데이터 초기화
            localStorage.removeItem('quizUserName');
            localStorage.removeItem('quizStartTime');
            localStorage.removeItem('userScore'); 
            window.location.href = 'index.html';
        });
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
}

// 🚨 [개선] 중복 기록을 처리하고 최고 기록만 갱신하도록 로직 개선
function saveAndDisplayRanking(userName, score, time) {
    // 🚨 [수정] 통일된 키(LS_RANKING_DATA) 사용
    let ranking = JSON.parse(localStorage.getItem(LS_RANKING_DATA) || '[]');

    const newEntry = { name: userName, score: score, time: time };

    // 최고 기록 갱신 로직
    const existingIndex = ranking.findIndex(entry => entry.name === userName);

    if (existingIndex > -1) {
        const existingEntry = ranking[existingIndex];
        // 점수가 더 높거나, 점수는 같지만 시간이 더 짧은 경우에만 업데이트
        if (score > existingEntry.score || 
            (score === existingEntry.score && time < existingEntry.time)) {
            ranking[existingIndex] = newEntry; // 더 좋은 기록으로 업데이트
        }
    } else {
        ranking.push(newEntry); // 새로운 항목으로 추가
    }
    
    // 랭킹 정렬 (점수 내림차순, 시간이 짧을수록 상위 랭크)
    ranking.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 점수 높은 순
        }
        return a.time - b.time; // 점수 같으면 시간 짧은 순
    });

    // 상위 10개만 유지
    ranking = ranking.slice(0, 10);

    localStorage.setItem(LS_RANKING_DATA, JSON.stringify(ranking));

    // 랭킹 테이블 업데이트
    const rankingBody = document.getElementById('ranking-body');
    if (!rankingBody) return; // Null 체크

    rankingBody.innerHTML = ''; 

    if (ranking.length === 0) {
        rankingBody.innerHTML = '<tr><td colspan="4">아직 랭킹이 없습니다. 첫 주자가 되어보세요!</td></tr>';
        return;
    }

    ranking.forEach((entry, index) => {
        const row = rankingBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = entry.name;
        row.insertCell(2).textContent = `${entry.score} / ${QUIZ_TOTAL_COUNT}`;
        row.insertCell(3).textContent = formatTime(entry.time);

        // 현재 기록 강조 (이름과 시간이 일치하면 현재 시도 기록)
        if (entry.name === userName && entry.time === time) {
            row.style.backgroundColor = '#FFF8E1';
        }
    });
}
