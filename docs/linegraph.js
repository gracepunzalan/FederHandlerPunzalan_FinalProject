var monthlyFiles = ["2015-08-01-tweets.csv", "2015-09-01-tweets.csv",
                    "2015-10-01-tweets.csv", "2015-11-01-tweets.csv",
                    "2015-12-01-tweets.csv", "2016-01-01-tweets.csv",
                    "2016-02-01-tweets.csv", "2016-03-01-tweets.csv",
                    "2016-04-01-tweets.csv", "2016-05-01-tweets.csv",
                    "2016-06-01-tweets.csv", "2016-07-01-tweets.csv",
                    "2016-08-01-tweets.csv", "2016-09-01-tweets.csv",
                    "2016-10-01-tweets.csv"];
var numFiles = monthlyFiles.length;
var dataset = new Array();
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

var monthNames = ["August2015", "September2015", "October2015", "November2015",
              "December2015", "January2016", "February2016", "March2016",
              "April2016", "May2016", "June2016", "July2016", "August2016",
              "September2016", "October2016", "AllMonths"];
var numMonths = monthNames.length;
var classNames = ["Class1", "Class2", "Class3", "Class4", "Class5", "AllClasses"];
var numClasses = classNames.length;


/*

Reads in monthly fingerprint files, list of words of interest, and cleans up the data
REFERENCE: http://stackoverflow.com/questions/13870265/read-csv-tsv-with-no-header-line-in-d3

*/
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

var monthArray = new Array(15);
var oneClass = {
  class: "",
  months: []
}

  for (var i = 0; i < numFiles; i++) { //for every month
    wordArray = new Array(124);
    var curFile = monthlyFiles[i];
    var nMoral = 0.0;
    var nGeneral = 0.0;
    var nHashtag = 0.0;
    var oneMonth = new Object();
    d3.text(curFile, function(text) {
      var curDataset = d3.csv.parseRows(text);
      var curLength = curDataset.length;
      // for every word
      for (var j = 1; j < 125; j++) {
        window.wordArray[j-1] = 0;
        // for every user
        var curWordSum = 0.0;
        for (var k = 0; k < curLength; k++) {
          curWordSum += parseInt(curDataset[k][j], 10);
        var curType;
        if (moralWords.indexOf(allWords[j-1]) > -1) {
          curType = "moral";
          window.nMoral += parseInt(curDataset[k][j], 10);
        } else if (generalWords.indexOf(allWords[j-1]) > -1) {
          curType = "general";
          window.nGeneral += parseInt(curDataset[k][j], 10);
        } else {
          curType = "hashtag";
          window.nHashtag += parseInt(curDataset[k][j], 10);
        }}
        window.oneMonth.totalMoral = window.nMoral;
        window.oneMonth.totalGeneral = window.nGeneral;
        window.oneMonth.totalHashtag = window.nHashtag;

        var wordOfInterest = {
          word: allWords[j-1],
          type: curType,
          frequency: curWordSum
        };
        window.wordArray[j-1] = wordOfInterest;
      }
      window.oneMonth.words = window.wordArray;
        window.oneMonth.month = monthNames[i];
        window.oneMonth.words = window.wordArray;
window.monthArray[i] = window.oneMonth;

    });
      console.log(window.monthArray);

  }


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
