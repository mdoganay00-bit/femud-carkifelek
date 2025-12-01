const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

const prizes = [
  "10₺ indirim kazandın!",
  "Femud sürpriz hediyesi!",
  "Siparişinde ücretsiz kargo!",
  "5₺ indirim çekin hazır!",
  "Bu seferlik sadece teşekkürler 😊",
  "%10 indirim fırsatı!",
  "Femud mini hediye!",
  "Tekrar çevirme hakkı!"
];

let currentRotation = 0;
const segmentCount = prizes.length;
const segmentAngle = 360 / segmentCount;

spinBtn.addEventListener("click", () => {
  // Butonu kilitle
  spinBtn.disabled = true;
  resultDiv.textContent = "Çark dönüyor...";

  // Rastgele bir dilim seç
  const randomIndex = Math.floor(Math.random() * segmentCount);

  // 5 tur + seçilen dilime denk gelecek açı
  const extraTurns = 360 * 5;
  const targetAngle =
    extraTurns +
    (360 - (randomIndex * segmentAngle + segmentAngle / 2)); // ok üstte kalsın

  currentRotation = targetAngle;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Animasyon bitince sonucu göster (4 sn)
  setTimeout(() => {
    resultDiv.textContent = prizes[randomIndex];
    spinBtn.disabled = false;
  }, 4100);
});
