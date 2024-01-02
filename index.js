/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        "message":"Enter your URL!",
        "name":"URL"
        //here taking the url of the website
    },
    {
        "name":"urlname",
        "message":"Name of URL"
        //here taking the name of the url with which name it get save in the file system
    }
  ])
  .then((answers) => {
    const url= answers.URL;
    const name= answers.urlname;
    var qr_img = qr.image(url, { type: 'png' });// generating the qr image with name qr_img in png format
    qr_img.pipe(fs.createWriteStream(`${name}.png`)); // save the qr_img in the file system using native fs module
    
    fs.appendFile("URL.txt", "\n" + url, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log(`Data written to ${"URL.txt"}`);
        }
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("error");
    } else {
      // Something else went wrong
      console.log("Something went wrong");
    }
  });
