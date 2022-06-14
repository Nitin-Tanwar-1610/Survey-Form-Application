import { db } from "../firebase.js";
window.addEventListener("load", ViewResult);
function ViewResult() {
  db.collection("Survey-questions")
    .get()
    .then((querySnapshot) => {
      var dataSet = [];
      var i = 1;
      querySnapshot.forEach((doc) => {
        var object = doc.data();
        var options = [];
        object.answers.forEach((option) => {
          options.push(option.option);
        });
        var dataItem = [i, object.question, ...options];
        dataSet.push(dataItem);
        i++;
      });

      $(document).ready(function () {
        var table = $("#tableID").DataTable({
          data: dataSet,
          columnDefs: [
            {
              targets: -1,
              data: null,
              defaultContent: "<button>Click!</button>",
            },
          ],
          columns: [
            { title: "S. No." },
            { title: "Question Description" },
            { title: "Option 1" },
            { title: "Option 2" },
            { title: "Option 3" },
            { title: "Option 4" },
            { title: "Show Result" },
          ],
        });
        $("#tableID tbody").on("click", "button", function () {
          var data = table.row($(this).parents("tr")).data();
          var object = querySnapshot.docs[data[0] - 1].data();
          var yValues = [];
          object.answers.forEach((option) => {
            yValues.push(option.voted_by.length);
          });
          localStorage.setItem("yValues", JSON.stringify(yValues));
          location.href = "./view_result.html";
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
