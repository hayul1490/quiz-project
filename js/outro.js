// js/outro.js
// const LS_USER_NAME = 'quizUserName';
// const LS_START_TIME = 'quizStartTime';
const LS_RANKING = 'quizRanking';
const QUIZ_TOTAL_COUNT = 20; // quiz.js와 동일하게 유지

document.addEventListener('DOMContentLoaded', () => {
    const userFinalMessage = document.getElementById('user-final-message');
    const finalScore = document.getElementById('final-score');
    const finalTime = document.getElementById('final-time');
    const rankingBody = document.getElementById('ranking-body');
    const restartButton = document.getElementById('restart-button');

    const userName = localStorage.getItem(LS_USER_NAME) || '익명';
    const startTime = parseInt(localStorage.getItem(LS_START_TIME) || '0', 10);
    const endTime = Date.now();
    const elapsedTime = Math.floor((endTime - startTime) / 1000); // 초 단위

    const score = parseInt(localStorage.getItem('userScore') || '0', 10); // 퀴즈 페이지에서 저장된 점수

    userFinalMessage.textContent = `${userName}님, 수고하셨습니다!`;
    finalScore.textContent = `최종 점수: ${score} / ${QUIZ_TOTAL_COUNT}`;
    finalTime.textContent = `소요 시간: ${formatTime(elapsedTime)}`;

    // 랭킹 저장 및 표시
    saveAndDisplayRanking(userName, score, elapsedTime);

    // 다시 시작하기 버튼
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            localStorage.removeItem(LS_USER_NAME);
            localStorage.removeItem(LS_START_TIME);
            localStorage.removeItem('userScore'); // 사용자의 퀴즈 점수 초기화
            window.location.href = 'index.html'; // 인트로 페이지로 이동
        });
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
}

function saveAndDisplayRanking(userName, score, time) {
    let ranking = JSON.parse(localStorage.getItem(LS_RANKING) || '[]');

    // 새로운 사용자 기록 추가
    ranking.push({ name: userName, score: score, time: time });

    // 점수는 내림차순, 시간이 짧을수록 상위 랭크 (오름차순)
    ranking.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 점수 높은 순
        }
        return a.time - b.time; // 점수 같으면 시간 짧은 순
    });

    // 상위 10개만 유지
    ranking = ranking.slice(0, 10);

    localStorage.setItem(LS_RANKING, JSON.stringify(ranking));

    // 랭킹 테이블 업데이트
    const rankingBody = document.getElementById('ranking-body');
    rankingBody.innerHTML = ''; // 기존 내용 지우기

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
    });
}

