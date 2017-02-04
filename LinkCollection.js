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

  var sr = new File.OpenText(file);
  var input = "";
  var counter = 0;

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
  var output = new Boolean();
  var counter = 0;

  while((counter < fakeLinks.length) && (output == false)){
    output = link.includes(fakeLinks[counter]);
    counter++;
  }
  return output;
}
