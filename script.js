const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");

let spinning = false;

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;

  const degree = Math.floor(Math.random() * 3600) + 360;

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${degree}deg)`;

  setTimeout(() => {
    spinning = false;

    const finalDegree = degree % 360;
    const segment = Math.floor(finalDegree / 45);

    const rewards = [
      "Tebrikler! %20 İndirim!",
      "Femud Şampuan Hediye!",
      "Kargo Bedava!",
      "Femud Krem Hediye!",
      "Bir Dahaki Sefere Şans!",
      "Femud Oda Parfümü!",
      "Sürpriz Hediye!",
      "Femud %30 İndirim!"
    ];

    result.innerText = rewards[segment];
  }, 5200);
});
