const searchParams = new URLSearchParams(window.location.search);
const pageIndex = searchParams.get("index");
const totalList = document.querySelector(".total_article");
const totalNumber = totalList.textContent;

let items = document.querySelectorAll("tbody > tr");
const paging = document.querySelector(".paging");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//paging
let lastPage = 0;
if (totalNumber % 10 == 0) {
  lastPage = parseInt(totalNumber / 10);
} else if (totalNumber % 10 != 0) {
  lastPage = parseInt(totalNumber / 10 + 1);
}

function pageTemplate() {
  let pageArr = [];
  for (let i = 0; i < lastPage; i++) {
    pageArr.push(
      `<a href="http://127.0.0.1:3000/board/z-board/list?index=${i}" class="pageMove">${
        i + 1
      }</a>`
    );
  }
  return pageArr;
}
paging.innerHTML += pageTemplate().join("");

function prevHandler(e) {
  if (pageIndex > 0) {
    location.href =
      "http://127.0.0.1:3000/board/z-board/list?index=" + (Number(pageIndex) - 1);
  } else return alert("최신 페이지입니다.");
}

function nextHandler(e) {
  if (pageIndex < lastPage - 1) {
    location.href =
      "http://127.0.0.1:3000/board/z-board/list?index=" + (Number(pageIndex) + 1);
  } else return alert("마지막 페이지입니다.");
}
prev.addEventListener("click", prevHandler);
next.addEventListener("click", nextHandler);

let startList = Number(pageIndex) * 10;
let lastList = startList + 9;

for (let i = 0; i < items.length; i++) {
  if (i >= startList && i <= lastList) {
    items[i].style.display = "";
  } else {
    items[i].style.display = "none";
  }
}

// 방금전 몇분전 구현

const getTimeNow = (date) => {
  let mm = date.getMonth() + 1; // 0 ~ 11
  mm = (mm > 9 ? "" : "0") + mm; // 01 02...09 10 11
  let dd = date.getDate(); // 1 ~ 31
  dd = (dd > 9 ? "" : "0") + dd;
  let yy = date.getFullYear();

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  return [yy, mm, dd].join("-") + "." + [hr, min, sec].join(".");
};

const timeLines = document.querySelectorAll(".timeLine");
const timeLine = document.querySelector(".timeLine");
const thisTime = getTimeNow(new Date());

timeLines.forEach((timeLine) => {
  const uploadedTime = timeLine.textContent;
  // console.log("timeA : " + thisTime.split('.'))
  // console.log("timeB : " + uploadedTime.split('.'))

  if (
    thisTime.split(".")[0] === uploadedTime.split(".")[0] &&
    thisTime.split(".")[1] === uploadedTime.split(".")[1] &&
    thisTime.split(".")[2] === uploadedTime.split(".")[2]
  ) {
    timeLine.innerHTML = "방금전";
  } else if (
    thisTime.split(".")[0] === uploadedTime.split(".")[0] &&
    thisTime.split(".")[1] === uploadedTime.split(".")[1] &&
    thisTime.split(".")[2] !== uploadedTime.split(".")[2]
  ) {
    timeLine.innerHTML = `${
      thisTime.split(".")[2] - uploadedTime.split(".")[2]
    }분전`;
  } else if (
    thisTime.split(".")[0] === uploadedTime.split(".")[0] &&
    thisTime.split(".")[1] - uploadedTime.split(".")[1] < 7
  ) {
    timeLine.innerHTML = `${
      thisTime.split(".")[1] - uploadedTime.split(".")[1]
    }시간전`;
  } else timeLine.innerHTML = uploadedTime.split(".")[0];
});

// 검색 기능
const searchBtn = document.querySelector("#searchBox > form > button");
const searchResult = document.querySelectorAll("#btnBox > p");

const queryString = window.location.search;
if (queryString.includes('&search')) {
  // 쿼리스트링이 &search를 포함하고 있으면 스타일 바꾸기
  searchResult[0].style.display = 'none';
  searchResult[1].style.display = 'block';
}