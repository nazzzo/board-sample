const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
let boardList = [];



const writeHandler = (req, res) => {
  const boardItem = req.body;
  boardList.push(boardItem);

  const getTimeNow = (date) => {
    let mm = date.getMonth() + 1; // 0 ~ 11
    mm = (mm > 9 ? "" : "0") + mm; // 01 02...09 10 11
    let dd = date.getDate(); // 1 ~ 31
    dd = (dd > 9 ? "" : "0") + dd;
    let yy = date.getFullYear();

    let hr = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return [yy, mm, dd].join("-")+"."+[hr, min, sec].join(".")
  };

  boardItem.date = getTimeNow(new Date());
  boardItem.hit = -1;
  boardItem.idx = boardList.length - 1;

  res.redirect(`/view?index=${boardItem.idx}`);
};

const modifyHandler = (req, res) => {
  const index = req.query.index;
  const boardItem = boardList[index];
  boardItem.subject = req.body.subject;
  boardItem.writer = req.body.writer;
  boardItem.content = req.body.content;
  
  // 객체 속성을 rest로 선택하는 신문법 (index는 제외됩니다)
  // const {index, ...rest} = req.body
  // boardList[index] = rest

  res.redirect("/view?index=" + index);
};

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const name = req.query.name;
  res.render("index.html", { name });
});

app.post("/list", (req, res) => {
  res.redirect("/list");
});

app.get("/list", (req, res) => {
  //검색 기능 구현
  const searchType  = req.query.searchType || 'writer';
  const search  = req.query.search
  const result = req.query.searchType === undefined 
  ? boardList
  : boardList.filter(obj => obj[searchType].includes(search));

  const reversedList = [...result].reverse();
  res.render("list.html", { boardList: reversedList });
  // nunjucks 내장 기능으로 화면 그리기
  // loop.index는 nunjucks의 내장 변수
  // {% for item in Arr %}
  // {{ loop.index0 }}: {{ item }}
  // {% endfor %}
});

app.get("/write", (req, res) => {
  res.render("write.html");
});

app.post("/write", writeHandler);

app.get("/view", (req, res) => {
  const index = req.query.index;
  if (index < 0 || index >= boardList.length) {
    // 에러 방지용 빈 페이지 띄우기
    return res.render("view.html", { boardItem: {} });
  }
  const boardItem = boardList[index];
  boardItem.hit += 1;
  res.render("view.html", { boardItem, boardList });
});

app.post("/modify", modifyHandler);

app.get("/modify", (req, res) => {
  const index = req.query.index;
  const boardItem = boardList[index];

  res.render("modify.html", { boardItem, index });
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  boardList.splice(index, 1);
  res.redirect("/list");
});

app.listen(PORT, () => {
  console.log("server start");
});
