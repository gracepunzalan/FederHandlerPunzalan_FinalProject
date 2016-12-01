function dataparsing() {
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

  function fingerPrintParsing(moralWords, hashtagWords, generalWords, wordArray) {

    jsonCreation(monthArray, wordFile)
    return monthArray;
  }
  function wordsOfInterestParsing(wordFile) {
    d3.text(wordFile, function(text) {
      var words = d3.csv.parseRows(text);
      var numWords = words[0].length;
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
      fingerPrintParsing(moralWords, hashtagWords, generalWords, wordArray);
    });
  }
  var wordArray = wordsOfInterestParsing(wordFile);
  console.log(jsonCreation(monthArray, wordFile));
}

function jsonCreation(monthArray, wordArray) {

  return classArray;
}

var wordFile = "words.csv";
wordsOfInterestParsing(wordFile);
