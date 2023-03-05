let inputs = document.querySelectorAll("input"); //Uzimamo sve impute
// errors je objekat u koji ubacujemo sve greske koje se mogu pojaviti u formi. [] u njima pisemo nizove
let errors = {
  ime_prezime: [],
  email: [],
  lozinka: [],
  ponovi_lozinku: [],
};

//Prolazimo kroz sva poolja da bi utvrdili koja je njihova vrednost
inputs.forEach((element) => {
  element.addEventListener("change", (e) => {
    let currentInput = e.target; //pomocu targeta izaberemo koje polje (input) zelimo da korisitmo
    let inputValue = currentInput.value; //value korisitmo da bi uzeli vrednost koju unesemo u polje

    //getAttribute korisitmo da bi iz inputa uzeli njegov atribut 'name'
    let inputName = currentInput.getAttribute("name");

    if (inputValue.length > 4) {
      errors[inputName] = [];
      switch (inputName) {
        case "ime_prezime":
          let validation = inputValue.trim();
          validation = validation.split(" ");
          if (validation.length < 2) {
            errors[inputName].push("Moras napisati i ime i prezime");
          }
          break;

        case "email":
          if (!validationEmail(inputValue)) {
            errors[inputName].push("Neispravna email adresa");
          }
          break;
        case "ponovi_lozinku":
          let lozinka = document.querySelector('input[name="lozinka"]').value;
          if (inputValue !== lozinka) {
            errors[inputName].push("Lozinke se ne poklapaju");
          }
          break;
      }
    } else {
      errors[inputName] = ["Polje ne moze imati manje od 5 karaktera"];
    }

    populateErrors();
    // document.querySelector(
    //   "div"
    // ).innerHTML = `<ul><li>${errors[inputName][0]}</li></ul>`;
  });
});

//funkcija koja popunjava i ispisuje greske
const populateErrors = () => {
  for (let elem of document.querySelectorAll("ul")) {
    elem.remove();
  }

  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`input[name="${key}"]`);
    let parentElement = input.parentElement;
    let errorsElement = document.createElement("ul");
    parentElement.appendChild(errorsElement);

    errors[key].forEach((error) => {
      let li = document.createElement("li");
      li.innerText = error;
      errorsElement.appendChild(li);
    });
  }
};

const validationEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
};
