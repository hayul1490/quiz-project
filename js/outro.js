// js/outro.js
const LS_USER_NAME = 'quizUserName';
const LS_START_TIME = 'quizStartTime';
const LS_FINAL_SCORE = 'quizFinalScore';
const LS_RANKING = 'quizRanking';
const QUIZ_TOTAL_COUNT = 20;

function initOutroPage() {
    const outroPage = document.getElementById('outro-page');
    if (!outroPage) return;

    const userName = localStorage.getItem(LS_USER_NAME);
    const score = parseInt(localStorage.getItem(LS_FINAL_SCORE) || 0);
    const startTime = parseInt(localStorage.getItem(LS_START_TIME) || Date.now());
    
    // 1. 걸린 시간 계산
    const totalTimeMs = Date.now() - startTime;
    const totalTimeSec = Math.floor(totalTimeMs / 1000);
    const minutes = Math.floor(totalTimeSec / 60);
    const seconds = totalTimeSec % 60;
    const timeString = `${minutes}분 ${seconds}초`;

    // 2. 결과 요약 표시
    document.getElementById('user-name-display').textContent = userName || '이름 없음';
    document.getElementById('score-display').textContent = `${score} / ${QUIZ_TOTAL_COUNT}`;
    document.getElementById('time-display').textContent = timeString;

    // 3. 랭킹 저장 및 표시
    updateRanking(userName, score, totalTimeSec);
}

function updateRanking(name, score, time) {
    // 3-1. 기존 랭킹 로드
    let ranking = JSON.parse(localStorage.getItem(LS_RANKING) || '[]');

    // 3-2. 현재 사용자 정보가 이미 랭킹에 있는지 확인 (중복 방지 및 업데이트)
    // 간단한 구현을 위해, 매번 새로운 기록으로 추가합니다. 
    // 동일 이름으로 최고 점수만 기록하려면 추가 로직이 필요합니다. 
    const newRecord = { name, score, time };
    ranking.push(newRecord);

    // 3-3. 랭킹 정렬: 점수(내림차순) -> 시간(오름차순) 순
    ranking.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 점수가 높은 순
        }
        return a.time - b.time; // 점수가 같으면 시간이 짧은 순
    });
    
    // 3-4. 상위 10개만 유지 (선택 사항)
    ranking = ranking.slice(0, 10);

    // 3-5. 로컬 스토리지에 저장
    localStorage.setItem(LS_RANKING, JSON.stringify(ranking));

    // 4. 랭킹 테이블 업데이트
    const tableBody = document.getElementById('ranking-body');
    tableBody.innerHTML = '';

    ranking.forEach((record, index) => {
        const row = tableBody.insertRow();
        const timeStr = `${Math.floor(record.time / 60)}분 ${record.time % 60}초`;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.name}</td>
            <td>${record.score} / ${QUIZ_TOTAL_COUNT}</td>
            <td>${timeStr}</td>
        `;
        
        // 현재 사용자 기록 강조
        if (record.name === name && record.score === score && record.time === time) {
            row.style.backgroundColor = '#ffe0b2'; // 주황색 계열로 강조
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.split('/').pop() === 'outro.html') {
        initOutroPage();
    }
});