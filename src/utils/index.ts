export function currencyFormat(price: number) {
  const currencyFormat = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });
  const newPrice = Number(price.toString().slice(0, -2));

  return currencyFormat.format(newPrice).split(".00");
}

export function getBaseUrl() {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://furniturex.netlify.app";

  return url;
}
