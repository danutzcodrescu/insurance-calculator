const Mailgun = require('mailgun-js');

const sendMail = (recipient, name, carMake, value, price) => {
	const mailgun = new Mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

    const data = {
      from: "insurance@qover.me",
      to: recipient,  
      subject: 'Qover insurance contract',
      html: `<p>Dear ${name},</p>
	  <p>We confirm that you have bought an insurance contract for your ${carMake} which value is ${value.toLocaleString('en-US', {minimumFractionDigits: 2,
  maximumFractionDigits: 2})}.</p>
	  <p>The price to be paid is ${price.toLocaleString('en-US', {minimumFractionDigits: 2,
  maximumFractionDigits: 2})}.</p>
	  <p>Best regards,</p>
	  <p>QOVER</p>
	  `
    }

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            console.log("got an error: ", err);
        } else {
            console.log(body);
        }
    });
}

module.exports = sendMail;