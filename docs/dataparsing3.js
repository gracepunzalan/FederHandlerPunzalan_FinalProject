function readWordCSV(classes) {
    d3.text("words.csv", function(text) {
        words = d3.csv.parseRows(text);
        parseWords(words, classes);
    });
}

function parseWords(words, classes) {
    var numWords = words[0].length;
    var moralWords = [];
    var hashtagWords = [];
    var generalWords = [];
    var allWords = [];
    var numMoral = 0.0;
    var numHashtag = 0.0;
    var numGeneral = 0.0;
    for (var i = 0; i < numWords; i++) {
        var curWord = words[0][i];
        var curWordLength = curWord.length;
        var curWordSuffix = curWord.substring(curWordLength - 2, curWordLength);
        if (curWordSuffix === "_M") {
            numMoral = numMoral + 1;
            curWord = curWord.substring(0, curWordLength - 2);
            moralWords.push(curWord);
        } else if (curWordSuffix === "_H") {
            numHashtag = numHashtag + 1;
            curWord = curWord.substring(0, curWordLength - 2);
            hashtagWords.push(curWord);
        } else {
            numGeneral = numGeneral + 1;
            generalWords.push(curWord);
        }
        allWords.push(curWord);
    }
    parseFingerprint(moralWords, hashtagWords, generalWords, allWords, classes);
}

function readFingerPrintCSV(curFile, moralWords, hashtagWords, generalWords, allWords, monthName, i, classes, c) {
    d3.text(curFile, function(text) {
        fingerpint = d3.csv.parseRows(text);
        var curMonthObject = createMonth(fingerpint, moralWords, hashtagWords, generalWords, allWords, monthName, i, classes, c);
        temp(curMonthObject, i, monthName, c);
    });
    test();
}

function readClassCSV() {
    d3.text("classes.csv", function(text) {
        classes = d3.csv.parseRows(text);
        classParsing(classes);
    });
}

function classParsing(classes) {
    var numClasses = 5;
    var length = classes.length;
    var userClasses = [];

    for (var i = 0; i < numClasses; i++) {
        var curClass = {
            classNum: i + 1,
            users: []
        }
        for (var k = 0; k < length; k++) {
            if (classes[k][1] == i) {
                curClass.users.push(classes[k][0]);
            }
        }
    }
    readWordCSV(classes);
}

var monthArray = {};

function temp(curMonthObject, i, monthName, c) {
    monthArray[i] = curMonthObject;
    monthArray[i].month = monthName;
    //classArray[c] = monthArray[i];

    if (i === 14) {
      test(monthArray, c);
    }
    //console.log(monthArray);
    // ALL MONTHS
}

var classArray = {};
function test(monthArray, c) {
  var oneClass = {
    classNum : (c+1),
    monthArray : monthArray
  };
  classArray[c] = oneClass;
  var json = JSON.stringify(classArray);
  console.log(json);
}

function parseFingerprint(moralWords, hashtagWords, generalWords, allWords, classes) {
    var monthlyFiles = ["2015-08-01-tweets.csv", "2015-09-01-tweets.csv",
        "2015-10-01-tweets.csv", "2015-11-01-tweets.csv",
        "2015-12-01-tweets.csv", "2016-01-01-tweets.csv",
        "2016-02-01-tweets.csv", "2016-03-01-tweets.csv",
        "2016-04-01-tweets.csv", "2016-05-01-tweets.csv",
        "2016-06-01-tweets.csv", "2016-07-01-tweets.csv",
        "2016-08-01-tweets.csv", "2016-09-01-tweets.csv",
        "2016-10-01-tweets.csv"
    ];
    var monthNames = ["August2015", "September2015", "October2015", "November2015",
        "December2015", "January2016", "February2016", "March2016",
        "April2016", "May2016", "June2016", "July2016", "August2016",
        "September2016", "October2016", "AllMonths"
    ];
    var numMonths = monthNames.length;
    var numClasses = 4; //for all classes

    for (var c = 0; c < numClasses; c++) {
        for (var i = 0; i <= numMonths; i++) {
            var curFile = monthlyFiles[i];
            var curMonthObject = readFingerPrintCSV(curFile, moralWords, hashtagWords, generalWords, allWords, monthNames[i], i, classes, c); //all months
        }
    }
}

function createMonth(fingerprint, moralWords, hashtagWords, generalWords, allWords, monthName, i, classes, c) {
    var oneMonth = {};
    var monthArray = [];
    var wordOfInterest = {};
    var wordArray = [];
    var nMoral = 0.0;
    var nGeneral = 0.0;
    var nHashtag = 0.0;
    var fingerprintLength = fingerprint.length;
    var curDataset = fingerprint;
    var all = allWords;
    var moral = moralWords;
    var general = generalWords;
    var hashtag = hashtagWords;

    for (var j = 1; j < fingerprintLength; j++) { // number of users
        var numWords = 124;
        for (var x = 0; x < classes.length; x++) {
            if (classes[x][0] === curDataset[j][0]) {
                for (var k = 1; k < numWords + 1; k++) { // number of workds
                    var curWordSum = parseInt(curDataset[k][j], 10);
                    var curType;
                    if (moral.indexOf(all[k]) > -1) {
                        curType = "moral";
                        nMoral += parseInt(curDataset[k][j], 10);
                    } else if (general.indexOf(all[k]) > -1) {
                        curType = "general";
                        nGeneral += parseInt(curDataset[k][j], 10);
                    } else {
                        curType = "hashtag";
                        nHashtag += parseInt(curDataset[k][j], 10);
                    }
                    var wordOfInterest = {
                        word: all[k],
                        type: curType,
                        frequency: curWordSum
                    };
                    wordArray.push(wordOfInterest);
                }

                oneMonth.totalMoral = nMoral;
                oneMonth.totalHashtag = nHashtag;
                oneMonth.totalGeneral = nGeneral;
                oneMonth.month = monthName;
                oneMonth.words = wordArray;
                return oneMonth;
            }
        }
    }
}

function main() {
    readClassCSV();
}

main();
