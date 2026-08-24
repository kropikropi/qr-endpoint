export default function handler(req, res) {

  const bic  = "AIRACZPP";
  const name = "Mgr. Hana Kropackova";
  const iban = "CZ4930300000003496321046";

  let amount = req.query.amount || "0";
  let vs     = req.query.vs || "";

  amount = amount.replace(",", ".");
  amount = parseFloat(amount).toFixed(2);

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
