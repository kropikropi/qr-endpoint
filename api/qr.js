export default function handler(req, res) {

  const bic  = "AIRACZPP";
  const name = "Mgr. Hana Kropackova";
  const iban = "CZ4930300000003496321046";

  let amount = req.query.amount || "0";
  let vs     = req.query.vs || "";

  // Vyčištění částky:
  // 1) odstranit mezery (tisícový oddělovač i případné URL zbytky)
  // 2) odstranit tečky (tisícový oddělovač, např. "1.567,00")
  // 3) nahradit desetinnou čárku tečkou (pro parseFloat/EPC formát)
  amount = String(amount)
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsedAmount = parseFloat(amount);
  amount = isNaN(parsedAmount) ? "0.00" : parsedAmount.toFixed(2);

  // Vyčištění variabilního symbolu - jen čísla
  vs = String(vs).replace(/[^0-9]/g, '');

  const epc =
`BCD
002
1
SCT
${bic}
${name}
${iban}
EUR${amount}

${vs}`;

  const encoded = encodeURIComponent(epc);

  res.redirect(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`);
}
