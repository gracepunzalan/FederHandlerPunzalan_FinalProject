function readWordCSV() {
    d3.text("words.csv", function(text) {
        words = d3.csv.parseRows(text);
        parseWords(words);
    });
}

function parseWords(words) {
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
    parseFingerprint(moralWords, hashtagWords, generalWords, allWords);
}

function readFingerPrintCSV(curFile, moralWords, hashtagWords, generalWords, allWords, monthName, i) {
    d3.text(curFile, function(text) {
        fingerpint = d3.csv.parseRows(text);
        var curMonthObject = createMonth(fingerpint, moralWords, hashtagWords, generalWords, allWords, monthName, i);
        temp(curMonthObject, i, monthName);
    });
}

var monthArray = new Array();
var allMonthMoral = 0.0;
var allMonthGeneral = 0.0;
var allMonthHashtag = 0.0;
var allMonthWordArray = new Array();
var curFreq = 0.0;

function temp(curMonthObject, i, monthName) {
    test(monthArray, i, curMonthObject);
    var myJsonString = JSON.stringify(monthArray);
}

function test(monthArray, i, curMonthObject) {
    //var lastMonthMoral
    //console.log(allMonthMoral);
    //console.log(curMonthObject.totalMoral);
    allMonthMoral += parseInt(curMonthObject.totalMoral, 10);
    allMonthGeneral += parseInt(curMonthObject.totalGeneral, 10);
    allMonthHashtag += parseInt(curMonthObject.totalHashtag, 10);
    curMonthObject.allMonthMoral = allMonthMoral;
    curMonthObject.allMonthGeneral = allMonthGeneral;
    curMonthObject.allMonthHashtag = allMonthHashtag;

    for (var x = 0; x < 124; x++) {
        curFreq += parseInt(curMonthObject.words[x].frequency);
        var curWordOfInterest = {
            word: curMonthObject.words[x].word,
            type: curMonthObject.words[x].type,
            frequency: curFreq
        };
        allMonthWordArray[x] = curWordOfInterest;
    }
    curMonthObject.allMonthWords = allMonthWordArray;
    monthArray[i] = curMonthObject;
    console.log(monthArray);
}

function parseFingerprint(moralWords, hashtagWords, generalWords, allWords) {
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

    for (var i = 0; i < numMonths; i++) {
        var curFile = monthlyFiles[i];
        var curMonthObject = readFingerPrintCSV(curFile, moralWords, hashtagWords, generalWords, allWords, monthNames[i], i);
        console.log(monthNames[i]);
    }


}

function createMonth(fingerprint, moralWords, hashtagWords, generalWords, allWords, monthName, i) {
    var oneMonth = {};
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
    if (i > 14) {
        console.log("SDFSDFKJSF" + monthName + "\n");
        return oneMonth;
    }
    for (var j = 1; j < fingerprintLength; j++) { // number of users
        var numWords = 124;
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



function main() {
    readWordCSV();
}

main();
