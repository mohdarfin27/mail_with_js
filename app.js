// Import Package
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Set Package
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// Server Start Notification
app.listen(process.env.PORT || 3000, () => console.log("Server Started on port 3000..."));

// Get Index Page Request
app.get('/', function (req, res) {
    res.sendFile('Mail.html', { root: __dirname });
});

// POST route from contact form
app.post('/contact', (req, res) => {
	
	// Email Template
    const output = `
        <h1>You have a message  &#9993;</h1>
       
        <p>Subject: ${req.body.name}</p>
       
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    user: "Sender Email ID", // Sender email username
    pass: "Sender email password, not the normal one.", // Sender email password, not the normal one. for password you can go through readme documentation for generating it
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: '"Quick-mail" <sender mail>', //Sender mail
    to:  `${req.body.email}`,					// Recever mail
	subject: `${req.body.name}`,
    html: output
  }

    // Send mail with defined transport object
    smtpTrans.sendMail(mailOpts, (error, info) => {
            if (error) {
                    res.send('<h1 style="color:red" > Something Wrong. </h1>');
            }
            res.send('<h1 style="color: green" >Thank You, Message has been Sent.');
    });
	
})
