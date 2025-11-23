// js/main.js
const YOUTUBE_VIDEO_ID_1 = "2xxNtPi_-Sw"; // 📍 인트로 후 재생할 유튜브 영상 ID
const YOUTUBE_VIDEO_ID_2 = "2xxNtPi_-Sw"; // 📍 퀴즈 결과 후 재생할 유튜브 영상 ID

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
