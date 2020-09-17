'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const server = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { body, validationResult } = require('express-validator');

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render("pages/index");
});
server.get('/hugues-capet',  (req, res) => {
    res.render('pages/hugues-capet');
});
server.get('/louisix',  (req, res) => {
    res.render('pages/louisix');
});
server.get('/philippe-le-bel',  (req, res) => {
    res.render('pages/philippe-le-bel');
});
server.get('/philippe-auguste',  (req, res) => {
    res.render('pages/philippe-auguste');
});
server.get('/contact',  (req, res) => {
    res.render('pages/contact');
});
server.post(
  "/contact",
  urlencodedParser,
  [
    body("last_name")
      .isAlpha()
      .withMessage("Le Nom ne doit comporter que des lettres."),
    body("first_name")
      .isAlpha()
      .withMessage("Le Prénom ne doit comporter que des lettres."),
    body("address")
      .matches(/^[a-zA-Z0-9 -]*$/)
      .withMessage("L'Adresse ne doit comporter que des lettres, des chiffres, des espaces ou des tirets."),
    body("zipcode")
      .isPostalCode("FR")
      .withMessage("Le Code postal doit être valable en France."),
    body("city")
      .isAlpha()
      .withMessage("La Ville ne doit comporter que des lettres."),
    body("email").isEmail().withMessage("L'Email doit être valide."),
  ],
  (req, res) => {
    // console.log(req.body);
    const result = validationResult(req);
    var errors = result.errors;

    for (let i in errors) {
      console.log(errors[i].value);
    }
    if (!result.isEmpty()) {
      console.log(errors);
      res.render("pages/contact", { errors: errors });

      //res.status(422).jsonp(errors.array());
    } else {
      res.render("pages/contact");
      writeData(req.body);
    }
  }
);

//Serving static files
server.use(express.static(__dirname + '/public'));

//writing data on file
const writeData = (element) => {
  if (fs.existsSync("result.json")) {
     fs.readFile("result.json", "utf8", (err, data) => {
       if (err) throw err;
      //console.log(data);
       let contacts = JSON.parse(data);
       contacts.push(element);
      //  console.log(contacts);
       let contactsString = JSON.stringify(contacts, null, 2);
       fs.writeFile("result.json", contactsString, (err) => {
         if (err) throw err;
         console.log("Results saved on existing file");
       });
    });
  } else {
    let content = [];
    content.push(element);
    // console.log(content);
    let data = JSON.stringify(content, null, 2);
    fs.writeFile("result.json", data, (error) => {
       if (error) throw error;
       console.log("New file created and data saved");
    });
  }
}

server.use((req, res, next) => {
    res.setHeader('Content-Type', 'text-plain');
    res.status(404).send('Page introuvable');
})

server.listen(8050, () => {
    console.log('Server listening on port 8050');
});