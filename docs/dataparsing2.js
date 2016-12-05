var monthArray = [];

function dataparsing() {

    var wordFile = "words.csv";
    wordsOfInterestParsing(wordFile);

    var classesFile = "classes.csv";
    var classes = [];
    var numUsers;

    var classNames = ["Class1", "Class2", "Class3", "Class4", "Class5", "AllClasses"];
    var numClasses = classNames.length;

    function wordsOfInterestParsing(wordFile) {
        var words = []; // all words in their original format, which means some include a _M or _H at the end
        var allWords = []; // all words with suffixes removed as necessary
        var moralWords = []; // all words designated as moral (originally having _M at the end, but it has been removed)
        var hashtagWords = []; // all words designated as hashtags (originally having _H at the end, but it has been removed)
        var generalWords = []; // all words designated as general
        var numWords = 0; // total number of words
        var numHashtag = 0; // total number of moral words
        var numGeneral = 0; // total number of general words
        var numMoral = 0; // total number of moral words
        d3.text(wordFile, function(text) {
            var words = d3.csv.parseRows(text);
            var numWords = words[0].length;
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
            fingerPrintParsing(moralWords, hashtagWords, generalWords, allWords);
        });
    }

    function fingerPrintParsing(moralWords, hashtagWords, generalWords, allWords) {
        var monthlyFiles = ["2015-08-01-tweets.csv", "2015-09-01-tweets.csv",
            "2015-10-01-tweets.csv", "2015-11-01-tweets.csv",
            "2015-12-01-tweets.csv", "2016-01-01-tweets.csv",
            "2016-02-01-tweets.csv", "2016-03-01-tweets.csv",
            "2016-04-01-tweets.csv", "2016-05-01-tweets.csv",
            "2016-06-01-tweets.csv", "2016-07-01-tweets.csv",
            "2016-08-01-twee
            ts.csv", "2016-09-01-tweets.csv",
            "2016-10-01-tweets.csv"
        ];
        var monthNames = ["August2015", "September2015", "October2015", "November2015",
            "December2015", "January2016", "February2016", "March2016",
            "April2016", "May2016", "June2016", "July2016", "August2016",
            "September2016", "October2016", "AllMonths"
        ];
        var numMonths = monthNames.length;

        for (var i = 0; i < 15; i++) { //for every month

            var curFile = monthlyFiles[i];

            //var x = oneMonthParse(curFile, moralWords, hashtagWords, generalWords, allWords, monthNames[i]);
            oneMonthParse(curFile, moralWords, hashtagWords, generalWords, allWords, monthNames[i], i);
            //console.log(monthArray[i]);


        }


    }
    console.log(monthArray);
    jsonCreation(monthArray, moralWords, hashtagWords, generalWords, allWords);

    function jsonCreation(monthArray, moralWords, hashtagWords, generalWords, allWords) {
        //console.log(monthArray);

    }

    function oneMonthParse(curFile, moralWords, hashtagWords, generalWords, allWords, monthName, i) {
        console.log(i);
        /*oneMonth = {
            totalMoral: 0,
            totalGeneral: 0,
            totalHashtag: 0,
            month: "",
            words: ""
        };*/
        oneMonth = {
            totalMoral: 0,
            totalGeneral: 0,
            totalHashtag: 0,
            month: "",
            words: ""
        };
        //var oneMonth;
        var wordArray = new Array(124);
        d3.text(curFile, function(text) {

            curDataset = d3.csv.parseRows(text);
            console.log(curDataset);
            // for every word
            //console.log(curDataset);

            //console.log(curDataset);
            curLength = curDataset.length;
            nHashtag = 0.0;
            nMoral = 0.0;
            nGeneral = 0.0;

            for (var j = 1; j < 125; j++) {
                wordArray[j - 1] = 0;
                // for every user
                var curWordSum = 0.0;
                //console.log(curLength);
                for (var k = 0; k < curLength; k++) {
                    curWordSum += parseInt(curDataset[k][j], 10);
                    var curType;
                    if (moralWords.indexOf(allWords[j - 1]) > -1) {
                        curType = "moral";
                        nMoral += parseInt(curDataset[k][j], 10);
                    } else if (generalWords.indexOf(allWords[j - 1]) > -1) {
                        curType = "general";
                        nGeneral += parseInt(curDataset[k][j], 10);
                    } else {
                        curType = "hashtag";
                        nHashtag += parseInt(curDataset[k][j], 10);
                    }
                }

                var wordOfInterest = {
                    word: allWords[j - 1],
                    type: curType,
                    frequency: curWordSum
                };
                wordArray[j - 1] = wordOfInterest;
                //console.log("ksjfsldj " + nMoral);
                oneMonth.totalMoral = nMoral;
                oneMonth.totalGeneral = nGeneral;
                oneMonth.totalHashtag = nHashtag;
                oneMonth.words = wordArray;
                oneMonth.month = monthName;
                //monthArray[i] = oneMonth;
                //console.log(oneMonth);
                //monthArray[i] = oneMonth;
                //console.log(oneMonth);
                //console.log(tempArray);
                monthArray.push(oneMonth);
                return oneMonth;
                //monthArray.push(oneMonth);
            }
            //console.log(oneMonth);

            //monthArray.push(oneMonth);
            //console.log(monthArray);
            //return monthArray;

            //return oneMonth;
            //console.log(monthArray);
            //console.log(monthNames[i]);
        });

    }

}
dataparsing();
