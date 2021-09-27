var body = document.querySelector("body");
var current_datetime = new Date();
var formatted_date =
  current_datetime.getFullYear() +
  "-" +
  (current_datetime.getMonth() + 1) +
  "-" +
  current_datetime.getDate() +
  " " +
  current_datetime.getHours() +
  ":" +
  current_datetime.getMinutes() +
  ":" +
  current_datetime.getSeconds(); //insert loading message

body.insertAdjacentHTML(
  "afterbegin",
  '<div class="loading" style="margin: 50vh auto; text-align:center;">Loading....</div>'
); //generate form from JSON data

var generateForm = function generateForm(data) {
  //remove loading message
 document.querySelector("body").removeChild(document.querySelector(".loading")); //insert basic form layout onto page

  body.insertAdjacentHTML(
  "afterbegin",
  '\n        <form method="post" action="https://hcpconnects4.com/pub/rf"> \n        <input type="hidden" id="DATE_TIME" name="DATE_TIME" required value=>  \n        <input type="submit" value="SUBMIT">\n       <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlTQGiFLcI5zcE9k1NbzaFzeuN9S8k5M6azaqzbtIgngt8RVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlTQGoFfEmOizeb1uI3aKBAuaqoG5M6azaqzbtIgngt8R">\n <input type="hidden" name="_ei_" value="EpBuMQsH7kSutDBZoqheBU0"><input type="hidden" name="_di_" value="ddhkkqg279qc3cjtfgdvst5qlg0jo10timt7vbs3jumufjjn9u70">\n            </form>\n    '
);
 // loop through data for form and insert to page

  data.form[0].fields
    .slice()
    .reverse()
    .forEach(function (field) {
      // check if its a select box
      if (field.type === "select") {
        document
          .querySelector("form")
          .insertAdjacentHTML(
            "afterbegin",
            '\n                <select name="'
              .concat(field.name, '" id="')
              .concat(
                field.id,
                '" required>\n                <option value="" disabled selected>-- Please Select a '
              )
              .concat(
                field.label,
                " --</option>\n                </select><br><br>\n            "
              )
          );
        field.options.map(function (option) {
          document
            .querySelector("select#".concat(field.name))
            .insertAdjacentHTML(
              "beforeend",
              '\n                    <option value="'
                .concat(option, '">')
                .concat(option, "</option>\n                ")
            );
        }); // else insert as input
      } else {
        document
          .querySelector("form")
          .insertAdjacentHTML(
            "afterbegin",
            '\n                <input type="text" id="'
              .concat(field.id, '" name="')
              .concat(field.name, '" placeholder="')
              .concat(field.label, '" required><br><br>\n            ')
          );
      }
    }); //set date time field value to formatted_date

  document.querySelector("#DATE_TIME").value = formatted_date;
}; // call in the data file to create the form

// call in the data file to create the form
fetch(
  "https://raw.githubusercontent.com/stevenduval/registration_form/main/js/data.js"
)
  .then(function (response) {
    return response.json();
  })
  .then(generateForm)
    ["catch"](function (error) {
    return body.insertAdjacentHTML(
      "afterbegin",
      '<div class="loading" style="margin-top: 50vh; text-align: center;">Oops something went wrong. Please try again!</div>'
    );
  });
