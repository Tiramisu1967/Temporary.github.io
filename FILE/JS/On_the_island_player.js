let player;
let isPlaying = false; // 재생 상태 추적
let currentRotation = 0; // 현재 회전 각도 추적
let rotateInterval; // 회전 애니메이션 setInterval ID
let scrollInterval; // 가사 스크롤 애니메이션 setInterval ID
let lyricsPosition = 0; // 가사 위치 추적
let lyricsSpeed = 0.38; // 가사 스크롤 속도 (값이 클수록 빠름)
const lyricsElement = document.querySelector('.lyrics'); // 가사 요소 선택

// YouTube API가 로드되었을 때 호출되는 함수
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 플레이어가 준비되었을 때 호출되는 함수
function onPlayerReady(event) {
    const cdElement = document.querySelector('.cd');
    
    document.getElementById('playButton').addEventListener('click', function() {
        if (isPlaying) {
            player.pauseVideo(); // 동영상 일시정지
            this.textContent = '▷'; // 버튼 텍스트 변경

            // 회전 애니메이션 및 가사 스크롤 중지
            clearInterval(rotateInterval);
            clearInterval(scrollInterval);
        } else {
            player.playVideo(); // 동영상 재생
            this.textContent = '❚❚'; // 버튼 텍스트 변경

            // 저장된 각도와 위치에서부터 애니메이션 시작
            startRotation(cdElement);
            startScrolling();
        }

        isPlaying = !isPlaying; // 상태 토글
    });
}

// 회전 애니메이션 함수
function startRotation(element) {
    clearInterval(rotateInterval); // 이전 회전 애니메이션 중지
    const rotationSpeed = 0.5; // 속도 조정 (값이 클수록 빠름)

    rotateInterval = setInterval(() => {
        currentRotation += rotationSpeed; // 현재 각도에 속도 누적
        element.style.transform = `rotate(${currentRotation}deg)`;
    }, 16); // 약 60 FPS로 실행
}

// 가사 스크롤 애니메이션 함수
function startScrolling() {
    clearInterval(scrollInterval); // 이전 스크롤 애니메이션 중지
    scrollInterval = setInterval(() => {
        lyricsPosition -= lyricsSpeed; // 위로 이동
        lyricsElement.style.transform = `translateY(${lyricsPosition}px)`;
    }, 16); // 약 60 FPS로 실행
}

// 동영상 상태 변경 이벤트 핸들러
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) { // 동영상이 끝났을 때
        resetPlayerAndScroll();
    }
}

// 동영상 및 스크롤 위치 초기화 함수
function resetPlayerAndScroll() {
    player.seekTo(0); // 동영상 처음으로 되돌림
    player.pauseVideo(); // 동영상 일시정지
    document.getElementById('playButton').textContent = '▷'; // 버튼 텍스트 초기화
    
    // 스크롤 위치 초기화
    lyricsPosition = 0;
    lyricsElement.style.transform = `translateY(${lyricsPosition}px)`;
    
    // 회전 애니메이션 및 스크롤 애니메이션 중지
    clearInterval(rotateInterval);
    clearInterval(scrollInterval);

    // 회전 각도 초기화
    currentRotation = 0;
    document.querySelector('.cd').style.transform = `rotate(${currentRotation}deg)`;
    
    isPlaying = false;
}

// YouTube API 스크립트 로드
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
