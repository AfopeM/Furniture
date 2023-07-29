export function currencyFormat(price: number) {
  const currencyFormat = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });

  return currencyFormat.format(price).split(".00");
}
