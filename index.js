const frontPage = document.querySelector("#front-page");
const nextBtn = document.querySelector("#next-btn");
const gamePage = document.querySelector("#game-page");
const layout = document.querySelectorAll(".boxes");
const winDeclare = document.querySelector("#win-declare");
const winner = document.querySelector("#winner-name");
const winnerIcon = document.querySelector("#winner-icon");
const darken = document.querySelector("#darken");
const p1 = document.querySelector("#name1");
const p2 = document.querySelector("#name2");
const gp1 = document.querySelector("#gp-name1");
const gp2 = document.querySelector("#gp-name2");
const p1Img = document.querySelector("#p1-img");
const p2Img = document.querySelector("#p2-img");

let p1ImgPath = "./images/icons/cross.png";
let p2ImgPath = "./images/icons/circle.png";

let player1 = "Player 1";
let player2 = "Player 2";

const listofIcons = [
  "cross.png",
  "circle.png",
  "flower.png",
  "heart-bio.png",
  "heart.png",
  "rose.png",
  "rupee-symbol.png",
];

const displayIcons = (from = "", remove = "") => {
  const av1 = document.querySelector("#avatar1");
  const av2 = document.querySelector("#avatar2");

  if (from === "1") {
    for (const icon of listofIcons) {
      if (remove === icon) continue;
      const dispIcon = `<img src="./images/icons/${icon}" alt="${icon}">`;
      av1.insertAdjacentHTML("beforeend", dispIcon);
    }
  }

  if (from === "2") {
    for (const icon of listofIcons) {
      if (remove === icon) continue;
      const dispIcon = `<img src="./images/icons/${icon}" alt="${icon}">`;
      av2.insertAdjacentHTML("beforeend", dispIcon);
    }
    // listofIcons.forEach((icon) => {
    //     if(remove === icon) continue;
    //     const dispIcon = `<img src="./images/icons/${icon}" alt="${icon}">`;
    //     av2.insertAdjacentHTML("beforeend", dispIcon);
    //   });
  }
};

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let player1Choices = [];
let player2Choices = [];

let player1Active = true;

const checkIfWin = (playerChoices) => {
  let val = false;
  winCases.forEach((winCase) => {
    // console.log(winCase);

    let flag = true;

    for (let i = 0; i < 3; i++) {
      if (!playerChoices.includes(winCase[i])) {
        flag = false;
        break;
      }
    }

    if (flag) {
      val = flag;
      //   console.log(flag);
    }
  });

  return val;
  //   console.log(val);
};

const declareWinner = (player, imgPath) => {
  console.log(`${player} wins`);
  winDeclare.style.display = "flex";
  darken.style.display = "block";
  winner.innerHTML = player === "Draw" ? "It is a Draw" : `${player} Wins!`;
  winnerIcon.src = imgPath === "" ? "./images/tic-tac-toe-icon.png" : imgPath;
};

const showLayout = () => {
  const active1 = document.querySelector("#active1");
  const active2 = document.querySelector("#active2");

  active1.style.backgroundColor = "red";
  active2.style.backgroundColor = "transparent";

  layout.forEach((box) => {
    box.addEventListener("click", () => {
      // console.log(box.id);

      let winStatus = false;

      if (
        !player1Choices.includes(Number(box.id)) &&
        !player2Choices.includes(Number(box.id))
      ) {
        box.style.backgroundImage = player1Active
          ? `url("${p1ImgPath}")`
          : `url("${p2ImgPath}")`;
        // box.style.backgroundColor = player1Active ? "red" : "blue";
        // box.innerHTML = player1Active ? "X" : "O";

        if (player1Active) {
          player1Choices.push(Number(box.id));

          winStatus = checkIfWin(player1Choices);

          if (winStatus) {
            declareWinner(player1, p1ImgPath);
            active1.style.backgroundColor = "red";
            active2.style.backgroundColor = "transparent";
          }
        } else {
          player2Choices.push(Number(box.id));

          winStatus = checkIfWin(player2Choices);

          if (winStatus) {
            declareWinner(player2, p2ImgPath);
            active1.style.backgroundColor = "red";
            active2.style.backgroundColor = "transparent";
          }
        }

        if (
          player1Choices.length + player2Choices.length === 9 &&
          winStatus === false
        ) {
          declareWinner("Draw", "");
        }

        player1Active = !player1Active;

        if (player1Active) {
          active1.style.backgroundColor = "red";
          active2.style.backgroundColor = "transparent";
        } else {
          active1.style.backgroundColor = "transparent";
          active2.style.backgroundColor = "red";
        }
      }
    });
  });
};

nextBtn.addEventListener("click", () => {
  frontPage.style.display = "none";
  gamePage.style.display = "flex";

  player1 = p1.value === "" ? player1 : p1.value;
  player2 = p2.value === "" ? player2 : p2.value;

  gp1.innerHTML = player1;
  gp2.innerHTML = player2;

  showLayout();
});

const darkenFunction = () => {
  darken.style.display = "none";
  winDeclare.style.display = "none";
  gamePage.style.display = "none";
  frontPage.style.display = "flex";
  layout.forEach((box) => (box.style.backgroundImage = ""));
  player1Choices = [];
  player2Choices = [];
  player1Active = true;
};

darken.addEventListener("click", () => {
  darkenFunction();
});

window.addEventListener("keydown", (k) => {
  if (k.key === "Escape" && winDeclare.style.display === "flex")
    darkenFunction();
});
