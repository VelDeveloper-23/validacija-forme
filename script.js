//Uzimamo sve impute. tj polja ime, kor ime, email, lozinka itd
let inputs = document.querySelectorAll("input");
// errors je objekat u koji ubacujemo sve greske koje se mogu pojaviti u formi. [] u njima pisemo nizove.inout name: ime_prezime
let errors = {
  /* key: */ ime_prezime: [], //value:
  korisnicko_ime: [],
  email: [],
  lozinka: [],
  ponovi_lozinku: [],
};

//Prolazimo kroz sva poolja da bi utvrdili koja je njihova vrednost. Prosli smo kroz NoodeList
inputs.forEach((element) => {
  //za svako polje dodjaemo Event...da se svako polje trigeruje kada nesto unesemo
  element.addEventListener("change", (e) => {
    let currentInput = e.target; //pomocu targeta izaberemo koje polje (input) zelimo da korisitmo
    let inputValue = currentInput.value; //value korisitmo da bi uzeli vrednost koju unesemo u polje

    //getAttribute korisitmo da bi iz inputa uzeli njegov atribut 'name'
    let inputName = currentInput.getAttribute("name");

    //proveravamo za svao polje... Polje ne sme imati manje od 5 karaktera(slova);
    if (inputValue.length > 4) {
      //za svaki input ispraznimo greske, da ne bi ostajale nakon sto se pojave...123
      errors[inputName] = [];
      //za svaki inputName je drugacija validacija, zato koristimo switch
      switch (inputName) {
        //slucaj ime_preime, validiramo unetu vrednost
        case "ime_prezime":
          //ukljanjamo razmak sa leve ili desne strane koje je korisnik uneo
          let validation = inputValue.trim();
          //split- razmak koji mora imati kao uslov jer unosimo ime i prezime
          validation = validation.split(" ");
          if (validation.length < 2) {
            //ako ne valja dodajemo to u error Objekat. [inputName] - za koji je to input error. Pomocu PUSH a ubacujemo ovaj tekst dole u niz...errors je errors[key] pogledaj kod dole
            errors[inputName].push("Moras napisati i ime i prezime");
          }
          break;

        case "email":
          //ono sto mi napisemo (inputValue), prolazi kroz funkciju za validaciju maia...ako je validacija false ispisuje se greska
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
  //Zbog stekovanja(nagomilavanja teksta sa greskama, prvo moramo obrisati listu gresaka)... elem se nigde pre nije pominjalo!
  for (let elem of document.querySelectorAll("ul")) {
    elem.remove(); //brisanje elemenata UL
  }

  //za key(ime) od Objekta.imena(varijabl- objekat Errors)
  for (let key of Object.keys(errors)) {
    //imput smo uzeli preko njegovog imena(key)
    let input = document.querySelector(`input[name="${key}"]`);
    //pozivamo parent(roditelja) od svakog inputa. u ovom slucaju je to DIV
    let parentElement = input.parentElement;
    //pravimo listu sa greskama... Pravimo element UL u kom ce pisati greske
    let errorsElement = document.createElement("ul");
    //DIV u kojeg smo pozvali kao roditelja od imput-a dodajemo ul(errorsElement) na kraju pomocu appendChild
    parentElement.appendChild(errorsElement);

    //petlja kojom prolazimo kroz greske. Objekat(ime)
    errors[key].forEach((error) => {
      //pravimo novi element LI
      let li = document.createElement("li");
      //LI dodaje tekst error-u (parametru). To je parametar od liste (ime, korisnicko ime, mail, lozinka)
      li.innerText = error;
      //listi sa greskama koja sadrzi UL. Njoj na kraju dodajemo Li pomocu appenChild
      errorsElement.appendChild(li);
    });
  }
};

//funkcija za validaciju mail a
const validationEmail = (email) => {
  //ovo dole se gugla... Java Script email validacija - redziks
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
};
