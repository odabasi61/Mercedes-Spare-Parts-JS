"use strict";

// change the display image
window.addEventListener("load", function () {
  changePic();
});

const myMercedes = document.getElementById("my-mercedes");
let randomPic = 0;

const carPics = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
];

function changePic() {
  let randomPic = Math.floor(Math.random() * carPics.length);
  myMercedes.src = carPics[randomPic];
}
setInterval(changePic, 5000);

// shopping side
const container = document.querySelector(".container");

const taxRate = 0.18;
const shippingPrice = 50;
const shippingFreePrice = 15000;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);
  accountTotal();
});

container.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("minus")) {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      account(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".spare").querySelector("h3").innerText
          } will be removed!`
        )
      ) {
        e.target.closest(".spare").remove();
      }
    }
    accountTotal();
  } else if (e.target.classList.contains("plus")) {
    e.target.previousElementSibling.innerText++;
    account(e.target);
    accountTotal();
  } else if (e.target.classList.contains("remove")) {
    if (
      confirm(
        `${
          e.target.closest(".spare").querySelector("h3").innerText
        } will be removed!`
      )
    ) {
      e.target.closest(".spare").remove();
    }
    accountTotal();
  }
});

const account = (target) => {
  const spare = target.closest(".spare");
  const price = spare.querySelector("p").children[0].innerText;
  const quantity = spare.querySelector("span#quantity").innerText;
  spare.querySelector(".stotal").innerText = (price * quantity).toFixed(2);
};

const accountTotal = () => {
  const allStotals = document.querySelectorAll(".stotal");
  let subTotal = 0;
  allStotals.forEach((a) => {
    subTotal += parseFloat(a.innerText);
  });
  const taxPrice = subTotal * localStorage.getItem("taxRate");
  const shippingPrice = parseFloat(
    subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );
  const totalPrice = subTotal + taxPrice + shippingPrice;

  document.querySelector(".subt").innerText = subTotal.toFixed(2);
  document.querySelector(".tax").innerText = taxPrice.toFixed(2);
  document.querySelector(".ship").innerText = shippingPrice.toFixed(2);
  document.querySelector(".total").innerText = totalPrice.toFixed(2);
};
