var _ = require("lodash");
var completeActivity = require("actions/complete-activity");
var activityStoreMixin = require("mixins/activity-store");
var dictionary = window.dictionary;

function isChoiceGroupCorrect(choiceGroup) {
    return !choiceGroup.some((choice) => choice.selected && !choice.correct);
}

module.exports = function(baseWordList) {
    return _.extend({
        getCorrectWordId: function() {
            return this.getCurrentChoiceGroup().correctWordId;
        },

        getCorrectWordSound: function() {
            return dictionary.get(this.getCorrectWordId()).soundFile;
        },

        createNewAttempt: function(wordList) {
            this.soundPlaying = false;
            var unusedChoiceGroups = (wordList || baseWordList)
                .filter((part) => {
                    var id = +this.activityId;
                    if(!window.level.demo) {
                        return true;
                    }
                    return window.level.demoChoices[id >= 10 ? "4" : "3"].indexOf(part.key) !== -1;
                })
                .map((correctWord) => {
                    var incorrectChoice = {
                        partId: _.sample(correctWord.choosableParts, 1)[0],
                        correct: false,
                        selected: false
                    };

                    var correctChoices = [...correctWord.prefixes, ...correctWord.roots, ...correctWord.suffixes].map((wordPartId) => {
                        return {
                            partId: wordPartId,
                            correct: true,
                            selected: false
                        };
                    });

                    return {
                        correctWordId: correctWord.key,
                        choices: _.shuffle([
                            ...correctChoices,
                            incorrectChoice
                        ])
                    }
                });

            unusedChoiceGroups = _.shuffle(unusedChoiceGroups);

            return {
                usedChoiceGroups: [],
                unusedChoiceGroups: unusedChoiceGroups,
                isReview: !!wordList
            };
        },

        nextGroup: function() {
            var {usedChoiceGroups, unusedChoiceGroups} = this.data.currentAttempt;
            usedChoiceGroups.push(unusedChoiceGroups.shift());
            if(this.isShowingFeedback()) {
                this.recordScore();
            }
        },

        recordScore: function() {
            var {usedChoiceGroups, isReview} = this.data.currentAttempt;
            var score = usedChoiceGroups
                .map((choiceGroup) => choiceGroup.choices)
                .reduce((score, choiceGroup) => {
                    if(isChoiceGroupCorrect(choiceGroup)) {
                        score.correct++;
                    }
                    return score;
                }, {correct: 0, max: usedChoiceGroups.length, isReview: isReview});
            completeActivity(this.activityId);
            this.data.scores.unshift(score);
        },

        getCurrentChoiceGroup: function() {
            return this.data.currentAttempt.unusedChoiceGroups[0];
        },

        getCorrectChoices: function() {
            return this.getCurrentChoiceGroup().choices.filter((choice) => choice.correct);
        },

        getIncorrectChoices: function() {
            return this.getCurrentChoiceGroup().choices.filter((choice) => !choice.correct);
        },

        getIndex: function() {
            return this.data.currentAttempt.usedChoiceGroups.length + 1;
        },

        getCount: function() {
            return this.data.currentAttempt.unusedChoiceGroups.length + this.data.currentAttempt.usedChoiceGroups.length;
        },

        isWaiting: function() {
            return this.getIncorrectChoices().some((choice) => choice.selected) || // any incorrect selected
                this.getCorrectChoices().every((choice) => choice.selected); // or all correct selected
        },

        isShowingFeedback: function() {
            return this.data.currentAttempt.unusedChoiceGroups.length === 0;
        },

        // Action handlers
        onContinueActivity: function() {
            this.nextGroup();
            this.trigger(this);
        },

        onSelectChoice: function(choice) {
            choice.selected = true;
            this.trigger(this);
        },

        onReview: function() {
            this.review();
            this.trigger(this);
        },

        onReplay: function() {
            this.replay();
            this.trigger(this);
        },

        review: function() {
            var currentAttempt = this.data.currentAttempt;
            var incorrectWords = currentAttempt.usedChoiceGroups
                .filter((choiceGroup) => {
                    return !isChoiceGroupCorrect(choiceGroup.choices);
                })
                .map((choiceGroup) => {
                    return choiceGroup.correctWordId;
                })
                .map(dictionary.get);

            this.data.currentAttempt = this.createNewAttempt(incorrectWords);
        },

        replay: function() {
            this.data.currentAttempt = this.createNewAttempt();
        }
    }, activityStoreMixin);
};
