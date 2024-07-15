const inputs = document.querySelectorAll("input");
const submit = document.getElementById("submit");

let arrSites = [];
let arrVisits = [];

if (localStorage.getItem("visits")) {
  arrSites = JSON.parse(localStorage.getItem("Websites"));
  arrVisits = JSON.parse(localStorage.getItem("visits"));

  display();
}

let validInputs = [
  /[a-zA-Z0-9]{3,}/,
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
];

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    if (validInputs[i].test(inputs[i].value)) {
      inputs[i].classList.add("is-valid");
      inputs[i].classList.remove("is-invalid");
    } else {
      inputs[i].classList.add("is-invalid");
      inputs[i].classList.remove("is-valid");
    }
  });
}

document.querySelector(".close-icon").addEventListener("click", function () {
  document.querySelector(".layer").classList.add("d-none");
});
document.addEventListener("click", function (e) {
  if (e.target === document.querySelector(".layer")) {
    document.querySelector(".layer").classList.add("d-none");
  }
});

let flag = true;

submit.addEventListener("click", function (e) {
  let objForm = {
    namesite: inputs[0].value,
    urlsite: inputs[1].value,
  };
  for (let i = 0; i < inputs.length; i++) {
    if (validInputs[i].test(inputs[i].value)) {
      // console.log(inputs[i]);
      inputs[i].classList.add("is-valid");
      inputs[i].classList.remove("is-invalid");
      flag = true;
    } else {
      // console.log("noval");
      inputs[i].classList.add("is-invalid");
      inputs[i].classList.remove("is-valid");
      document.querySelector(".layer").classList.remove("d-none");
      flag = false;
      return;
    }
  }

  // console.log();
  if (arrVisits.includes(objForm.urlsite)) {
    document.querySelector(".alert").classList.remove("d-none");
    return;
  }

  if (flag) {
    inputs[0].value = "";
    inputs[1].value = "";
    arrSites.push(objForm);
    arrVisits.push(objForm.urlsite);
    document.querySelector(".alert").classList.add("d-none");
    localStorage.setItem("Websites", JSON.stringify(arrSites));
    localStorage.setItem("visits", JSON.stringify(arrVisits));
    display();
  }
});

function display() {
  let cartona = "";

  for (let i = 0; i < arrSites.length; i++) {
    cartona += `
    <tr>
              <td scope="row">${i + 1}</td>
              <td>${arrSites[i].namesite}</td>
              <td>
                <button class="visit">
                  <i class="fa-regular fa-eye"></i> Visit
                </button>
              </td>
              <td>
                <button class="delete">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
  `;
  }
  document.querySelector("tbody").innerHTML = cartona;
  // console.log(arrSites);
  const visits = document.querySelectorAll(".visit");
  const deletes = document.querySelectorAll(".delete");
  for (let i = 0; i < arrVisits.length; i++) {
    visits[i].addEventListener("click", function () {
      window.open(arrVisits[i], "_blank");
    });
    deletes[i].addEventListener("click", function (e) {
      arrSites.splice(i, 1);
      arrVisits.splice(i, 1);
      localStorage.setItem("Websites", JSON.stringify(arrSites));
      localStorage.setItem("visits", JSON.stringify(arrVisits));
      display();
    });
  }
}
