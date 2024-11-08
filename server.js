const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); 
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {user: 'legomaster047@gmail.com', pass: 'xhyktomyqhavwhqs'}
});

app.post('/contact', (req, res) => {
  const {name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'legomaster047@gmail.com', 
    subject: `Contact me submission from: ${name}`,
    text: `You've got mail!
    Name: ${name}
    Email: ${email}
    Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('There was an error sending the email. Try again later');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});