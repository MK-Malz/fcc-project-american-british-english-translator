'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log("######")
      console.log(req.body)
      //{ text: 'dd', locale: 'american-to-british' }
      if (req.body.text === "") {
        res.json({ "error": "No text to translate" })
      } else if (req.body.locale != "british-to-american" && req.body.locale != "american-to-british" && req.body.locale) {
        res.json({ "error": "Invalid value for locale field" })
      } else if (!req.body.text || !req.body.locale) {
        res.json({ "error": "Required field(s) missing" })
      } else  {
       let translated = translator.translate(req.body.text, req.body.locale)
        if (translated.includes("span")) {
          console.log({"text": req.body.text, "translation": translated })
          res.json({"text": req.body.text, "translation": translated })
        } else {
          console.log({"text": req.body.text, "translation": "Everything looks good to me!" })
          res.json({"text": req.body.text, "translation": "Everything looks good to me!" })
        }
      }
    });
};
