/* eslint-disable */
import "./style.css";

//constantes
const originalCardSection = document.getElementById("original-cards");
const logCardsSection = document.getElementById("card-container");
const drawButton = document.getElementById("send");
const sortButton = document.getElementById("sort");
const cardsQuantity = document.getElementById("cards-quantity");

function randomData() {
  const cardSymbols = ["♦", "♥", "♠", "♣"];
  const cardNumbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const cardColors = ["red", "black"];

  const randomSymbol =
    cardSymbols[Math.floor(Math.random() * cardSymbols.length)];
  const randomNumber =
    cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  return { symbol: randomSymbol, number: randomNumber, color: randomColor };
}

//Dibujar carta
function Card(symbol, number, color) {
  return `
    <div class="card" style="color: ${color};">
      <div class="top">${symbol}</div>
      <div class="center">${number}</div>
      <div class="bottom">${symbol}</div>
    </div>
  `;
}

//Generar carta aleatoria
let arrayNumbers = [];
let originalCards = [];

function randomCards(quantity) {
  originalCardSection.innerHTML = "";
  arrayNumbers = [];
  originalCards = [];
  for (let i = 0; i < quantity; i++) {
    const randomCardData = randomData();
    const cardHtml = Card(
      randomCardData.symbol,
      randomCardData.number,
      randomCardData.color
    );
    originalCardSection.innerHTML += cardHtml;
    arrayNumbers.push(randomCardData.number);
    originalCards.push(randomCardData);
  }
}

//Mostrar cartas generadas
drawButton.addEventListener("click", () => {
  const quantityDraw = cardsQuantity.value;
  randomCards(quantityDraw);
});

//Ordenar dartas
function sortingCards(arr) {
  logCardsSection.innerHTML = "";
  let wall = arr.length - 1;

  while (wall > 0) {
    let index = 0;

    while (index < wall) {
      if (
        getCardValue(arr[index].number) > getCardValue(arr[index + 1].number)
      ) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      actualStateArray(arr);
      index++;
    }
    wall--;
  }
}

//Obtener numero de carta
function getCardValue(number) {
  if (number === "A") return 1;
  if (number === "J") return 11;
  if (number === "Q") return 12;
  if (number === "K") return 13;
  return parseInt(number);
}

//Mostrar estado actual del array
function actualStateArray(arr) {
  let cardsHtml = "";
  for (let i = 0; i < arr.length; i++) {
    const cardData = arr;
    cardsHtml += Card(
      cardData[i].symbol,
      cardData[i].number,
      cardData[i].color
    );
  }
  logCardsSection.innerHTML += `<div class="sort-div">${cardsHtml}<div>`;
}

//Mostrar cartas ordenadas
sortButton.addEventListener("click", () => {
  sortingCards(originalCards);
});
