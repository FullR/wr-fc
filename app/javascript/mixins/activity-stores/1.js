var _ = require("lodash");
var completeActivity = require("actions/complete-activity");
var activityStoreMixin = require("mixins/activity-store");
var dictionary = window.dictionary;

function isChoiceGroupCorrect(choiceGroup) {
    return !choiceGroup.some((choice) => choice.selected && !choice.correct);
}

module.exports = function(basePartList) {
    return _.extend({
        getCorrectSound: function() {
            try {
                var partId = this.getCorrectChoice().partId;
                var soundPath = dictionary.get(partId).soundFile;
            } catch(error) {
                console.log("Failed to get correct sound path",error);
            }
            return soundPath;
        },

        getCorrectDefinitionSound: function() {
            try {
                var partId = this.getCorrectChoice().partId;
                var soundPath = dictionary.get(partId).definitionSoundFile;
            } catch(error) {
                console.log("Failed to get correct definition sound path:",error);
            }
            return soundPath;
        },

        createExampleWordId: function(correctPartId) {
            var available = dictionary.getWordsWithPart(correctPartId);
            if(!available.length) {
                console.warn("No words found with part: " + correctPartId);
            }
            return _.sample(available, 1)[0];
        },

        createNewAttempt: function(partList) {
            var unusedChoiceGroups = (partList || basePartList).map((correctPart) => {
                var incorrectChoices = _(dictionary.parts)
                    .filter((part) => {
                        var passes = part.key !== correctPart.key && part.definition !== correctPart.definition;
                        if(passes && correctPart.blacklist) {
                            passes = correctPart.blacklist.indexOf(part.key) === -1; // make sure the part isn't on the correct part's blacklist
                        }
                        return passes;
                    })
                    .map((part) => {
                        return {
                            partId: part.key,
                            correct: false,
                            selected: false
                        };
                    })
                    .sample(2)
                    .value();

                return [
                    {partId: correctPart.key, correct: true, selected: false},
                    ...incorrectChoices
                ];
            });
            var correctPartId;

            unusedChoiceGroups = _.shuffle(unusedChoiceGroups).map(_.shuffle);
            correctPartId = unusedChoiceGroups[0].filter((choice) => choice.correct)[0].partId;
            return {
                usedChoiceGroups: [],
                unusedChoiceGroups: unusedChoiceGroups,
                exampleWordId: this.createExampleWordId(correctPartId),
                isReview: !!partList
            };
        },

        nextGroup: function() {
            var {usedChoiceGroups, unusedChoiceGroups} = this.data.currentAttempt;
            usedChoiceGroups.push(unusedChoiceGroups.shift());
            if(this.isShowingFeedback()) {
                this.recordScore();
            }
            else {
                this.data.currentAttempt.exampleWordId = this.createExampleWordId(this.getCorrectChoice().partId);
            }
        },

        recordScore: function() {
            var {usedChoiceGroups, isReview} = this.data.currentAttempt;
            var score = usedChoiceGroups.reduce((score, choiceGroup) => {
                if(isChoiceGroupCorrect(choiceGroup)) {
                    score.correct++;
                }
                return score;
            }, {correct: 0, max: usedChoiceGroups.length, isReview: isReview});
            completeActivity(this.activityId);
            this.data.scores.unshift(score);
        },

        getCorrectChoice: function() {
            return this.getCurrentChoiceGroup().filter((choice) => choice.correct)[0];
        },

        isWaiting: function() {
            return this.getCurrentChoiceGroup().some((choice) => choice.selected);
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
                    return !isChoiceGroupCorrect(choiceGroup);
                })
                .map((choiceGroup) => {
                    return choiceGroup.filter((choice) => choice.correct)[0].partId;
                })
                .map(dictionary.get);

            this.data.currentAttempt = this.createNewAttempt(incorrectWords);
        },

        replay: function() {
            this.data.currentAttempt = this.createNewAttempt();
        }
    }, activityStoreMixin);
};