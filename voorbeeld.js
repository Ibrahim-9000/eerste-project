import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const userInput = readline.createInterface({ input, output });

let totaalPrijs = 0;



function toonMenu() {
    console.log(`
        MENU:
        1. Friet - €3
        2. Hamburger - €5
        3. Frikandel - €4
        4. Stop bestelling
    `);
}


function berekenPrijs(keuze){
    switch(keuze){
        case '1':
            return 3
         case '2':
            return 5
         case '3':
            return 4;
    default:
      return 0;
    }
   
}

function checkGratisSaus() {
  const kans = Math.floor(Math.random() * 5);
  if (kans === 0) {
    console.log(" Je saus is vandaag GRATIS!");
    return 0;
  } else {
    console.log("Saus kost €1");  
    return 1;
  }
}

function berekenKorting(totaalPrijs, kortingscode){
 if (kortingscode == "IBRA10"){
   console.log(" Geldige kortingscode! 10% korting toegepast.");
    return totaalPrijs * 0.9;
  } else {
    console.log(" Ongeldige code, geen korting.");
  }

  return totaalPrijs;
}

function toonTotaalPrijs(totaalPrijs) {
  console.log(` Je moet betalen: €${totaalPrijs.toFixed(2)}`);
}


async function startBestelling() {
  let keuze = "";

  while (keuze !== "4") {
    toonMenu();
    keuze = await userInput.question("Wat wil je bestellen? (1-4): ");

    if (["1", "2", "3"].includes(keuze)) {
      totaalPrijs += berekenPrijs(keuze);

      const saus = await userInput.question("Wil je saus? (j/n): ");
      if (saus.toLowerCase() === "j") {
        totaalPrijs += checkGratisSaus();
      }

      console.log(`Huidig totaal: €${totaalPrijs.toFixed(2)}\n`);
    }

    else if (keuze === "4") {
      console.log(`Totaal zonder korting: €${totaalPrijs.toFixed(2)}`);
      const code = await userInput.question("Heb je een kortingscode? (druk Enter als je geen hebt): ");
      totaalPrijs = berekenKorting(totaalPrijs, code);
      toonTotaalPrijs(totaalPrijs);
      break;
    }

    else {
      console.log("Ongeldige keuze, probeer opnieuw.\n");
    }
  }

  userInput.close();
}


await startBestelling();

process.exit();