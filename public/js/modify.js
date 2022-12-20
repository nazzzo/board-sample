const writeFrm = document.querySelector("#modifyFrm");

submitHandler = (event) => {
  const subject = event.target.subject.value;
  const writer = event.target.writer.value;
  const content = event.target.content.value;

  try {
    if (!subject || !writer || !content) {
      throw new Error("빈 칸에 내용을 입력해주세요");
    }
  } catch (e) {
    alert(e);
    event.preventDefault();
  }
}

writeFrm.addEventListener("submit", submitHandler);