/*
FILE: LinkCollection.js
*/

import System.IO;

var fakeLinks = new Array();

/*
Reads file and puts all the links
in an array called fakeLinks
*/
function ReadFiles(file : String){

  fakeLinks = new Array();

  let sr = new File.OpenText(file);
  let input = "";
  let counter = 0;

  while(input != null){
    input = sr.ReadLine();
    fakeLinks[counter] = input;
    counter++;
  }

  sr.Close();

}

/*
input a link
returns whether or not it is fake
whether or not it is in the fakeLinks array
*/
function isLinkFake(link : String){
  let output = new Boolean();
  let counter = 0;

  while((counter < fakeLinks.length) && (output == false)){
    output = link.includes(fakeLinks[counter]);
    counter++;
  }
  return output;
}
