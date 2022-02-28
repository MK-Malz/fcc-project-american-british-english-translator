const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    let translatedText = text
    if (locale == 'american-to-british') {
      let arrayOfSpecialWords = Object.keys(americanToBritishSpelling)
      let arrayOfSpecialWords2 = Object.keys(americanOnly)
      let arrayOfSpecialWords3 = Object.values(britishOnly)
      let arrayOfSpecialTitles = Object.keys(americanToBritishTitles)

      for (let i = 0; i < arrayOfSpecialWords.length; i++) {
        if (translatedText.toLowerCase().includes(arrayOfSpecialWords[i])) {
          translatedText = translatedText.replace(arrayOfSpecialWords[i], '<span class="highlight">' + Object.values(americanToBritishSpelling).find(value => americanToBritishSpelling[arrayOfSpecialWords[i]] == value) + "</span>")
        }
      }
      for (let j = 0; j < arrayOfSpecialWords2.length; j++) {
        if (translatedText.toLowerCase().includes(arrayOfSpecialWords2[j])) {
          translatedText = translatedText.replace(arrayOfSpecialWords2[j], '<span class="highlight">' + Object.values(americanOnly).find(value => americanOnly[arrayOfSpecialWords2[j]] == value) + "</span>")
        }
      }
       for (let i = 0; i < arrayOfSpecialWords3.length; i++) {
        if (translatedText.includes(arrayOfSpecialWords3[i])) {
          translatedText = translatedText.replace(arrayOfSpecialWords3[i], '<span class="highlight">' + Object.keys(britishOnly).find(key => britishOnly[key] == arrayOfSpecialWords3[i]) + "</span>")
        }
      }
      for (let k = 0; k < arrayOfSpecialTitles.length; k++) {
        if (translatedText.includes(arrayOfSpecialTitles[k])) {
          translatedText = translatedText.replace(arrayOfSpecialTitles[k], '<span class="highlight">' + Object.values(americanToBritishTitles).find(value => americanToBritishTitles[arrayOfSpecialTitles[k]] == value) + "</span>")
        }
      }
      let translateArray = translatedText.split(' ')
      for (let m = 0; m < translateArray.length; m++) {
        if ((/\d\d\:\d\d/).test(translateArray[m])) {
          translateArray[m] =  '<span class="highlight">' + translateArray[m].replace(":", ".") + "</span>"
        }
      }
      translatedText = translateArray.join(" ")
      translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);


    } else if (locale == 'british-to-american') {

      let arrayOfSpecialWords = Object.values(americanToBritishSpelling)
      let arrayOfSpecialWords2 = Object.keys(britishOnly)
      let arrayOfSpecialWords3 = Object.values(americanOnly)
      let arrayOfSpecialTitles = Object.values(americanToBritishTitles)
     
      for (let j = 0; j < arrayOfSpecialWords2.length; j++) {
        if (translatedText.toLowerCase().includes(arrayOfSpecialWords2[j])) {
          translatedText = translatedText.replace(arrayOfSpecialWords2[j], '<span class="highlight">' + Object.values(britishOnly).find(value => britishOnly[arrayOfSpecialWords2[j]] == value) + "</span>")
        }
      }
       for (let i = 0; i < arrayOfSpecialWords.length; i++) {
        if (translatedText.toLowerCase().includes(arrayOfSpecialWords[i])) {
          translatedText = translatedText.replace(arrayOfSpecialWords[i], '<span class="highlight">' + Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == arrayOfSpecialWords[i]) + "</span>")
        }
      }
       for (let i = 0; i < arrayOfSpecialWords3.length; i++) {
        if (translatedText.includes(arrayOfSpecialWords3[i])) {
          translatedText = translatedText.replace(arrayOfSpecialWords3[i], '<span class="highlight">' + Object.keys(americanOnly).find(key => americanOnly[key] == arrayOfSpecialWords3[i]) + "</span>")
        }
      }
      for (let i = 0; i < arrayOfSpecialTitles.length; i++) {
        if (translatedText.includes(arrayOfSpecialTitles[i])) {
          translatedText = translatedText.replace(arrayOfSpecialTitles[i], '<span class="highlight">' + Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == arrayOfSpecialTitles[i]) + "</span>")
        }
      }
      let translateArray = translatedText.split(' ')
      for (let m = 0; m < translateArray.length; m++) {
        if ((/\d\.\d\d/).test(translateArray[m])) {
          translateArray[m] = '<span class="highlight">' + translateArray[m].replace(".", ":") + "</span>"
        }
      }

      translatedText = translateArray.join(" ")
      if(translatedText[0] == "<") {
          translatedText = '<span class="highlight">' + translatedText.charAt(24).toUpperCase() + translatedText.slice(25);
      } else {
          translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
      }
      
    }

    else {
      console.log("locale not correct")
      return false
    }



    return translatedText

  }
}

module.exports = Translator;