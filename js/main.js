// js/main.js
const YOUTUBE_VIDEO_ID_1 = "2xxNtPi_-Sw"; // 📍 여기에 인트로 후 재생할 유튜브 영상 ID
const YOUTUBE_VIDEO_ID_2 = "2xxNtPi_-Sw"; // 📍 여기에 퀴즈 결과 후 재생할 유튜브 영상 ID

// 로컬 스토리지 키
const LS_USER_NAME = 'quizUserName';
const LS_START_TIME = 'quizStartTime';

// -------------------- 인트로 및 이름 입력 처리 --------------------

function initIntroPage() {
    const introPage = document.getElementById('intro-page');
    const nameInputContainer = document.getElementById('name-input-container');
    const startButton = document.getElementById('start-quiz-button');
    const nameInput = document.getElementById('userName');
    const completeButton = document.getElementById('complete-name-button');

    if (!introPage) return; // 페이지가 index.html이 아니면 종료

    // 인트로 클릭 이벤트 (배경 이미지 클릭 또는 버튼 클릭)
    function showNameInput() {
        introPage.style.backgroundImage = 'none';
        introPage.style.backgroundColor = '#f4f4f9';
        if (startButton) startButton.style.display = 'none';
        
        // 인트로 텍스트 숨기기/변경
        const introTitle = document.getElementById('intro-title');
        const introSubtitle = document.getElementById('intro-subtitle');
        if (introTitle) introTitle.textContent = '이름을 입력해주세요';
        if (introSubtitle) introSubtitle.style.display = 'none';

        // 이름 입력 컨테이너 표시
        if (nameInputContainer) nameInputContainer.style.display = 'flex';
        if (nameInput) nameInput.focus();
    }

    if (startButton) {
        startButton.onclick = showNameInput;
    }
    // 인트로 페이지 전체를 클릭해도 이름 입력 창이 나오도록
    introPage.onclick = (e) => {
        // 이름 입력 창이나 버튼 클릭이 아닌 배경 클릭일 때만
        if (e.target === introPage || e.target.tagName === 'H1' || e.target.tagName === 'P') {
            showNameInput();
        }
    };
    

    // 이름 입력 완료 버튼 이벤트
    if (completeButton) {
        completeButton.onclick = () => {
            const userName = nameInput.value.trim();
            if (userName.length < 1) {
                alert('이름을 한 글자 이상 입력해주세요.');
                return;
            }
            
            // 이름 및 퀴즈 시작 시간 저장
            localStorage.setItem(LS_USER_NAME, userName);
            localStorage.setItem(LS_START_TIME, Date.now());

            // 다음 페이지로 이동
            window.location.href = `result_video.html?video_id=${YOUTUBE_VIDEO_ID_1}&next_page=quiz.html`;
        };
    }
}

// -------------------- 유튜브 영상 재생 및 자동 이동 처리 --------------------

function initVideoPage() {
    // result_video.html의 경우, video_id와 next_page 파라미터를 사용합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('video_id');
    const nextPage = urlParams.get('next_page');

    if (!videoId) return;

    // 1. YouTube Iframe API 로드 (필수)
    if (!window.YT) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
    window.onYouTubeIframeAPIReady = function() {
        const player = new YT.Player('player', {
            videoId: videoId,
            playerVars: {
                'autoplay': 1,      // 자동 재생
                'controls': 1,      // 컨트롤 표시
                'modestbranding': 1 // YouTube 로고 축소
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        // 플레이어 준비 완료
    }

    function onPlayerStateChange(event) {
        // 2. 영상이 끝났을 때 (YT.PlayerState.ENDED = 0)
        if (event.data === YT.PlayerState.ENDED) {
            console.log('Video Ended. Redirecting in 3 seconds...');
            setTimeout(() => {
                // 파라미터로 받은 다음 페이지로 이동
                window.location.href = nextPage;
            }, 3000); // 3초 딜레이 후 이동
        }
    }
}

// -------------------- 초기화 --------------------

document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지 URL을 확인하여 적절한 함수 실행
    const pathname = window.location.pathname.split('/').pop();

    if (pathname === 'index.html' || pathname === '') {
        initIntroPage();
    } else if (pathname === 'result_video.html') {
        initVideoPage();
    } else if (pathname === 'info_image.html') {
        // 4) 정보 이미지 페이지 처리
        document.getElementById('info-page').onclick = () => {
            window.location.href = 'outro.html';
        };
    }
    // quiz.js와 outro.js에서 각 페이지를 초기화합니다.
});