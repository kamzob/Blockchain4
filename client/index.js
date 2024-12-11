import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.css';
import configuration from "../build/contracts/Bilietai.json";
import ticketImage from "./images/bilietas.png";

const CONTRACT_ADDRESS = configuration.networks["5777"].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);

let account;
const accountEl = document.getElementById("account");
// MetaMask connection logic
const connectMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = accounts[0];
      
      // Fetch the balance of the connected account
      const balanceInWei = await web3.eth.getBalance(account);
      const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether'); // Convert Wei to Ether
      
      // Update the DOM with the account and balance
      accountEl.innerText = `Klientas: ${account} (Balansas: ${balanceInEth} ETH)`;
      console.log("MetaMask prijungta", account);
      console.log("Balansas:", balanceInEth, "ETH");
  
      await rodytiBilietus();  // Fetch and display tickets after connecting
    } catch (error) {
      console.error("MetaMask prijungimas nepavyko:", error);
    }
  };
  async function rodytiBilietus() {
    const ticketsEl = document.getElementById("tickets");
    ticketsEl.innerHTML = ""; // Išvalome turinį

    for (let i = 0; i < 30; i++) { // Tarkime, kad yra 30 bilietų
        try {
            const bilietas = await contract.methods.bilietai(i).call();

            const bilietoKortele = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Bilietas #${bilietas.id}</h5>
                        <img src="${ticketImage}" alt="Bilietas" class="card-img-top">
                        <p class="card-text">
                            Kaina: ${web3.utils.fromWei(bilietas.kaina, "ether")} ETH<br>
                            Savininkas: ${bilietas.owner}<br>
                            Galiojantis: ${bilietas.galiojantis ? "Taip" : "Ne"}
                        </p>
                        ${bilietas.owner === "0x0000000000000000000000000000000000000000" ? 
                            `<button class="btn btn-primary" onclick="pirktiBilieta(${bilietas.id})">Pirkti</button>` : 
                            (bilietas.owner.toLowerCase() === account.toLowerCase() && bilietas.galiojantis ? 
                                `<button class="btn btn-danger" onclick="grazintiBilieta(${bilietas.id})">Grąžinti</button>
                                 <input type="text" class="form-control mb-2 mt-2" placeholder="Naujo savininko adresas" id="naujasSavininkas-${bilietas.id}">
                                 <button class="btn btn-warning" onclick="perleistiBilieta(${bilietas.id})">Perleisti</button>` : 
                                `<p class="text-muted">${bilietas.galiojantis ? "Jau nupirktas" : "Negaliojantis"}</p>`
                            )
                        }
                    </div>
                </div>
            `;
            ticketsEl.innerHTML += bilietoKortele;
        } catch (error) {
            console.error(`Klaida gaunant bilietą #${i}:`, error);
        }
    }
}

async function pirktiBilieta(id) {
    try {
        const bilietas = await contract.methods.bilietai(id).call();
        await contract.methods.pirktiBilieta(id).send({
            from: account,
            value: bilietas.kaina, // Bilieto kaina
        });

        alert(`Bilietas #${id} sėkmingai nupirktas!`);
        rodytiBilietus(); // Atnaujinkite bilietų sąrašą
        await atnaujintiBalansa();
    } catch (error) {
        console.error("Klaida perkant bilietą:", error);
        alert("Nepavyko nusipirkti bilieto.");
    }
}
async function grazintiBilieta(id) {
    try {
        await contract.methods.grazintiBilieta(id).send({ from: account });

        alert(`Bilietas #${id} sėkmingai grąžintas!`);
        rodytiBilietus(); // Atnaujinkite bilietų sąrašą
        await atnaujintiBalansa();
    } catch (error) {
        console.error("Klaida grąžinant bilietą:", error);
        alert("Nepavyko grąžinti bilieto.");
    }
}
async function perleistiBilieta(id) {
    try {
        // Gaukite naujo savininko adresą iš atitinkamo įvesties lauko
        const naujasSavininkas = document.getElementById(`naujasSavininkas-${id}`).value;

        // Patikrinkite, ar adresas nėra tuščias
        if (!web3.utils.isAddress(naujasSavininkas)) {
            alert("Prašome įvesti teisingą Ethereum adresą.");
            return;
        }

        // Iškvieskite perleidimo funkciją
        await contract.methods.perleistiBilieta(id, naujasSavininkas).send({ from: account });

        alert(`Bilietas #${id} sėkmingai perleistas naujam savininkui: ${naujasSavininkas}`);
        rodytiBilietus(); // Atnaujinkite bilietų sąrašą
    } catch (error) {
        console.error("Klaida perleidžiant bilietą:", error);
        alert("Nepavyko perleisti bilieto.");
    }
}
async function atnaujintiBalansa() {
    try {
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        accountEl.innerText = `Klientas: ${account} (Balansas: ${balanceInEth} ETH)`;
    } catch (error) {
        console.error("Nepavyko atnaujinti balanso:", error);
    }
}


// Kad funkcijos būtų prieinamos HTML
window.pirktiBilieta = pirktiBilieta;
window.grazintiBilieta = grazintiBilieta;
window.perleistiBilieta = perleistiBilieta;



window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log("MetaMask instaliuotas!");
      connectMetaMask();  // Connect on page load
    } else {
      console.log("Please install MetaMask!");
    }
  });



