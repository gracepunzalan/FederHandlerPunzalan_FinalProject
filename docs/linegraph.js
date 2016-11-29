var monthlyFiles = ["2015-08-01-tweets.csv", "2015-09-01-tweets.csv",
                    "2015-10-01-tweets.csv", "2015-11-01-tweets.csv",
                    "2015-12-01-tweets.csv", "2016-01-01-tweets.csv",
                    "2016-02-01-tweets.csv", "2016-03-01-tweets.csv",
                    "2016-04-01-tweets.csv", "2016-05-01-tweets.csv",
                    "2016-06-01-tweets.csv", "2016-07-01-tweets.csv",
                    "2016-08-01-tweets.csv", "2016-09-01-tweets.csv",
                    "2016-10-01-tweets.csv"];
var numFiles = monthlyFiles.length;
var dataset = [];
var wordFile = "words.csv";
var words = []; // all words in their original format, which means some include a _M or _H at the end
var allWords = []; // all words with suffixes removed as necessary
var moralWords = []; // all words designated as moral (originally having _M at the end, but it has been removed)
var hashtagWords = []; // all words designated as hashtags (originally having _H at the end, but it has been removed)
var generalWords = []; // all words designated as general
var numWords = 0; // total number of words
var numHashtag = 0; // total number of moral words
var numGeneral = 0; // total number of general words
var numMoral = 0; // total number of moral words
var classesFile = "classes.csv";
var classes = [];
var numUsers;

/*

Reads in monthly fingerprint files, list of words of interest, and cleans up the data
REFERENCE: http://stackoverflow.com/questions/13870265/read-csv-tsv-with-no-header-line-in-d3

*/

function readMonthCSV() {
  console.log("BEGINNING MONTH CSV\n");
  for (var i = 0; i < numFiles; i++) {
    var curFile = monthlyFiles[i];
    d3.text(curFile, function(text) {
      var curDataset = d3.csv.parseRows(text);
      dataset.push(curDataset);
    });
  }
  console.log("ENDING MONTH CSV\n");
}

function readWordCSV() {
  console.log("BEGINNING WORD CSV\n");
  d3.text(wordFile, function(text) {
    words = d3.csv.parseRows(text);
    numWords = words[0].length;
    for (var i = 0; i < numWords; i++) {
      var curWord = words[0][i];
      var curWordLength = curWord.length;
      var curWordSuffix = curWord.substring(curWordLength-2, curWordLength);
      if (curWordSuffix === "_M") {
        numMoral = numMoral + 1;
        curWord = curWord.substring(0, curWordLength-2);
        moralWords.push(curWord);
      } else if (curWordSuffix === "_H") {
        numHashtag = numHashtag + 1;
        curWord = curWord.substring(0, curWordLength-2);
        hashtagWords.push(curWord);
      } else {
        numGeneral = numGeneral + 1;
        generalWords.push(curWord);
      }
      allWords.push(curWord);
    }
  });
  console.log("ENDING WORD CSV");
}

function createJSON(dataset, wordset) {
  console.log("BEGINNING JSON");
  var class1 = [];
  var class2 = [];
  var class3 = [];
  var class4 = [];
  var class5 = [];
  classes.push(class1);
  classes.push(class2);
  classes.push(class3);
  classes.push(class4);
  classes.push(class5);

  d3.text(classesFile, function(text) {
    var classData = words = d3.csv.parseRows(text);
    numUsers = classData.length;
    for (var i = 0; i < numUsers; i++) {
      var index = classData[i][1];
      classes[index].push(classData[i][0]);
    }
  });

  var months = ["August2015", "September2015", "October2015", "November2015",
                "December2015", "January2016", "February2016", "March2016",
                "April2016", "May2016", "June2016", "July2016", "August2016",
                "September2016", "October2016", "AllMonths"];
  var numMonths = months.length;
  var classNames = ["Class1", "Class2", "Class3", "Class4", "Class5", "AllClasses"];
  var numClasses = classNames.length;
  // words is called allWords
  for (var m = 0; m < numMonths; m++) {
    var tempClasses = [];
    for (var c = 0; c < numClasses; c++) {
      var tempWords = [];
      for (var w = 0; w < 1; w++) {
      }
    }

      /*monthsJSON.push({
        month : months[m],
        classes : classJSON
      })*/
  }
  console.log("ENDING JSON\n");
}

readMonthCSV();
readWordCSV();
createJSON();
