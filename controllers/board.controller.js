const boardList = []

exports.getIndex = (req, res)=>{
    const name = req.query.name;
    res.render("index.html", { name });
}

exports.getList = (req, res) => {
    const searchType  = req.query.searchType || 'writer';
    const search  = req.query.search
    const result = req.query.searchType === undefined 
    ? boardList
    : boardList.filter(obj => obj[searchType].includes(search));

    const reversedList = [...result].reverse();
    res.render("z-board/list.html", { boardList: reversedList });
}

exports.getWrite = (req, res)=>{
    console.log('getwrite실행')
    res.render("/z-board/write.html");
}

exports.getView = (req, res)=>{
    const index = req.query.index;
    if (index < 0 || index >= boardList.length) {
      // 에러 방지용 빈 페이지 띄우기
      return res.render("/z-board/view.html", { boardItem: {} });
    }
    const boardItem = boardList[index];
    boardItem.hit += 1;
    res.render("/z-board/view.html", { boardItem, boardList });
}

exports.getModify = (req, res) =>{
    const index = req.query.index;
    const boardItem = boardList[index];

    res.render("/z-board/modify.html", { boardItem, index });
}

exports.postList = (req, res)=>{
    res.redirect("/board/z-board/list");
}

exports.postWrite = (req,res)=>{
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

    res.redirect(`/board/z-board/view?index=${boardItem.idx}`);
}

exports.postView = (req, res) =>{

}

exports.postModify = (req, res) =>{
    const index = req.query.index;
    const boardItem = boardList[index];
    boardItem.subject = req.body.subject;
    boardItem.writer = req.body.writer;
    boardItem.content = req.body.content;

    res.redirect("/board/z-board/view?index=" + index);
}

exports.postDelete = (req, res) =>{
    const index = req.body.index;
    boardList.splice(index, 1);
    res.redirect("/board/z-board/list");
}
