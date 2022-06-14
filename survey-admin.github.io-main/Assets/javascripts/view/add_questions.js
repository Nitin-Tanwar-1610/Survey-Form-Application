import { db } from "../firebase.js";
window.addEventListener("load", bindEvents);
function bindEvents() {
  document.querySelector("#add").addEventListener("click", myFunction);
  document.querySelector("#read").addEventListener("click", () => {
    location.href = "./view_all_questions.html";
  });
}

function myFunction() {
  var question = document.getElementById("question").value;
  var type =
    document.querySelector("#typ").value + (Math.random() * 100).toString();
  var opt1 = document.getElementById("opt1").value;
  var opt2 = document.getElementById("opt2").value;
  var opt3 = document.getElementById("opt3").value;
  var opt4 = document.getElementById("opt4").value;

  if (
    question != "" &&
    type != "" &&
    opt1 != "" &&
    opt2 != "" &&
    opt3 != "" &&
    opt4 != ""
  ) {
    var survey_ques = {
      question: question,
      type: type,
      answers: [
        {
          option: opt1,
          voted_by: [],
        },
        {
          option: opt2,
          voted_by: [],
        },
        {
          option: opt3,
          voted_by: [],
        },
        {
          option: opt4,
          voted_by: [],
        },
      ],
    };
    add(survey_ques);
    function add(ques) {
      db.collection("Survey-questions")
        .add(ques)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById("question").value = "";
          document.querySelector("#typ").value = "";
          document.getElementById("opt1").value = "";
          document.getElementById("opt2").value = "";
          document.getElementById("opt3").value = "";
          document.getElementById("opt4").value = "";
          Swal.fire({
            title: "Adding question to the database",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then((result) => {
            document.getElementById("link").innerText =
              "https://mohitleo03.github.io/survey-user.github.io/show_question.html?type=" +
              type;
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          Swal.fire({
            icon: "error",
            title: "OOPS...",
            text: "Something Went Wrong!",
          });
        });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Failed...",
      text: "All Fields are necessary",
    });
  }
}
