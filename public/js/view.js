const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const searchParams = new URLSearchParams(window.location.search);
const index = searchParams.get("index");
const listBtn = document.querySelector(".list");
const totalList = document.querySelector(".total_article");
const totalNumber = totalList.textContent;

function prevHandler(e) {
  if (index > 0) {
    window.location.href = `http://127.0.0.1:3000/view?index=${
      Number(index) - 1
    }`;
  } else {
    return alert("마지막 글입니다.");
  }
}

function nextHandler(e) {
  if (index < totalNumber - 1) {
    window.location.href = `http://127.0.0.1:3000/view?index=${
      Number(index) + 1
    }`;
  } else {
    return alert("최신 글입니다.");
  }
}

prev.addEventListener("click", prevHandler);
next.addEventListener("click", nextHandler);

listBtn.addEventListener("click", (e) => {
  console.log(2);
  window.location.href = `http://127.0.0.1:3000/list?index=0`;
});


const dlt = document.querySelector(".delete");

dlt.addEventListener("click", (e) => {
  if (confirm("정말 삭제하시습니까 ?") == true) {
  } else return e.preventDefault();
});

const timeLine = document.querySelector(".article_date")
timeLine.innerHTML = timeLine.innerHTML.split('.')[0];


