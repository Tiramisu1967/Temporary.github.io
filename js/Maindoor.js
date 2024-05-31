document.addEventListener('DOMContentLoaded', function() {
  const outer = document.querySelector('.outer2');
  const innerList = document.querySelector('.inner-list2');
  const inners = document.querySelectorAll('.inner2');
  let currentIndex = 0; // 현재 슬라이드 화면 인덱스

  // Set the width of each inner element to match the outer element's width
  inners.forEach((inner) => {
      inner.style.width = `${outer.clientWidth}px`;
  });

  // Set the width of the inner list to the combined width of all inner elements
  innerList.style.width = `${outer.clientWidth * inners.length}px`;

  /*
    주기적으로 화면 넘기기
  */
  const getInterval = () => {
      return setInterval(() => {
          currentIndex++;
          currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
          innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
      }, 3000);
  };

  let interval = getInterval(); // interval 등록

  // Optional: Log messages to verify everything is working
  console.log('Slideshow initialized');
  console.log('Outer width:', outer.clientWidth);
  console.log('Number of slides:', inners.length);
});
