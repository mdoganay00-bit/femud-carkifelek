const API_URL = "BURAYA_YENİ_APPS_SCRIPT_URL_YAZILACAK";

// Ödüller (TL)
const prizes = [2, 3, 5, 10, 0, 0, 1, 2, 3];

let kazihakki = 0;

// Sayfada hakkı göster
function updateHakki(){
    document.getElementById("hakkim").textContent = kazihakki;
}

// Davet → +1 hak
document.getElementById("refBtn").onclick = () => {
    kazihakki++;
    updateHakki();
    alert("1 kazı hakkı kazandınız!");
    document.getElementById("useBtn").disabled = false;
};

// Kazı kazana başla
document.getElementById("useBtn").onclick = () => {
    if(kazihakki <= 0){
        alert("Kazı hakkın yok.");
        return;
    }

    kazihakki--;
    updateHakki();

    startScratch();
};

// Canvas çizimi
function startScratch(){
    const canvas = document.getElementById("scratch");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    ctx.fillStyle = "#9e9e9e";
    ctx.fillRect(0,0,300,300);

    const selectedPrize = prizes[Math.floor(Math.random()*prizes.length)];
    document.getElementById("prizeText").textContent = selectedPrize === 0 ? "Boş" : selectedPrize + " TL";

    let scratched = 0;

    canvas.addEventListener("mousemove", (e)=>{
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x,y,20,0,Math.PI*2);
        ctx.fill();

        scratched++;

        if(scratched > 400){
            finishPrize(selectedPrize);
        }
    });
}

// Ödül kazanınca çalışır
function finishPrize(amount){
    alert("Kazandığınız: " + amount + " TL");

    fetch(API_URL, {
        method:"POST",
        body:JSON.stringify({
            game:"KazıKazan",
            amount:amount,
            ig:"KULLANICI_ADI_YAZILACAK"
        })
    });

    if(amount > 0){
        checkWalletLimit(amount);
    }
}

// 30 TL sınırı
let currentWallet = 0;

function checkWalletLimit(gelen){
    currentWallet += gelen;

    if(currentWallet >= 30){
        alert("🎉 Büyük Ödüle Ulaştınız! 30 TL İndiriminiz Hazır.\nLütfen 24 saat içinde kullanın.");
        currentWallet = 0;
    }
}