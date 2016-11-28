

/* THIS SECTION PARSES DATA INTO THE RIGHT FORMAT FOR THE LINE GRAPH */

var monthlyFiles = ["MonthlyTweets2/2015-08-01-tweets.csv", "MonthlyTweets2/2015-09-01-tweets.csv",
                    "MonthlyTweets2/2015-10-01-tweets.csv", "MonthlyTweets2/2015-11-01-tweets.csv",
                    "MonthlyTweets2/2015-12-01-tweets.csv", "MonthlyTweets2/2016-01-01-tweets.csv",
                    "MonthlyTweets2/2016-02-01-tweets.csv", "MonthlyTweets2/2016-03-01-tweets.csv",
                    "MonthlyTweets2/2016-04-01-tweets.csv", "MonthlyTweets2/2016-05-01-tweets.csv",
                    "MonthlyTweets2/2016-06-01-tweets.csv", "MonthlyTweets2/2016-07-01-tweets.csv",
                    "MonthlyTweets2/2016-08-01-tweets.csv", "MonthlyTweets2/2016-09-01-tweets.csv",
                    "MonthlyTweets2/2016-10-01-tweets.csv"];
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

/*

Reads in monthly fingerprint files, list of words of interest, and cleans up the data
REFERENCE: http://stackoverflow.com/questions/13870265/read-csv-tsv-with-no-header-line-in-d3

*/
for (var i = 0; i < numFiles; i++) {
  var curFile = monthlyFiles[i];
  d3.text(curFile, function(text) {
    var curDataset = d3.csv.parseRows(text);
    dataset.push(curDataset);
  });
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

/* THIS SECTION MAKES THE ACTUAL LINE GRAPH */
