function submit() {
  var userName = document.getElementById("email").value;
  var userPassword = document.getElementById("pwd").value;

  if (userName == "Amit-Srivastava" && userPassword == "brainmentors") {
    Swal.fire({
      title: "Login Successful",
      html: "Redirecting to add question page",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      location.href = "./add_question.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed...",
      text: "Invalid Cridential!",
    });
  }
}
