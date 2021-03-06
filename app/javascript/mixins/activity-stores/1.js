const _ = require("lodash");
const completeActivity = require("actions/complete-activity");
const activityStoreMixin = require("mixins/activity-store");
const dictionary = window.dictionary;

function isChoiceGroupCorrect(choiceGroup) {
    return !choiceGroup.some((choice) => choice.selected && !choice.correct);
}

module.exports = function(basePartList) {
    return _.extend({
        getCorrectSound() {
            let soundPath;
            try {
                const partId = this.getCorrectChoice().partId;
                soundPath = dictionary.get(partId).soundFile;
            } catch(error) {
                console.log("Failed to get correct sound path",error.stack);
            }
            return soundPath;
        },

        getCorrectDefinitionSound() {
            let soundPath;
            try {
                const partId = this.getCorrectChoice().partId;
                soundPath = dictionary.get(partId).definitionSoundFile;
            } catch(error) {
                console.log("Failed to get correct definition sound path:",error.stack);
            }
            return soundPath;
        },

        createExampleWordId(correctPartId) {
            const available = dictionary.getWordsWithPart(correctPartId);
            if(!available.length) {
                console.warn("No words found with part: " + correctPartId);
            }
            return _.sample(available, 1)[0];
        },

        createNewAttempt(partList) {
            let unusedChoiceGroups = (partList || basePartList)
                .filter((part) => {
                    if(!window.level.demo) {
                        return true;
                    }
                    return window.level.demoChoices["1"].indexOf(part.key) !== -1;
                })
                .map((correctPart) => {
                    let incorrectChoices = _(dictionary.parts)
                        .filter((part) => {
                            let passes = part.key !== correctPart.key 
                                && part.definition.slice(0, 10) !== correctPart.definition.slice(0, 10);
                            if(passes && correctPart.blacklist) {
                                passes = correctPart.blacklist.indexOf(part.key) === -1; // make sure the part isn't on the correct part's blacklist
                            }
                            return passes;
                        })
                        .shuffle()
                        // can't use a simple sample because multiple incorrect parts might have the same definitions
                        .reduce((incorrectParts, part) => {
                            if(incorrectParts.length < 2) {
                                const defNotFound = incorrectParts.every(({definition}) => definition !== part.definition);
                                if(defNotFound) {
                                    incorrectParts.push(part);
                                }
                            }
                            return incorrectParts;
                        }, [])
                        .map((part) => {
                            return {
                                partId: part.key,
                                correct: false,
                                selected: false
                            };
                        });

                    return [
                        {partId: correctPart.key, correct: true, selected: false},
                        ...incorrectChoices
                    ];
                });
            let correctPartId;

            unusedChoiceGroups = _.shuffle(unusedChoiceGroups).map(_.shuffle);
            correctPartId = unusedChoiceGroups[0].filter((choice) => choice.correct)[0].partId;
            return {
                usedChoiceGroups: [],
                unusedChoiceGroups: unusedChoiceGroups,
                exampleWordId: this.createExampleWordId(correctPartId),
                isReview: !!partList
            };
        },

        nextGroup() {
            const {usedChoiceGroups, unusedChoiceGroups} = this.data.currentAttempt;
            const currentGroup = unusedChoiceGroups.shift();
            if(currentGroup) {
                usedChoiceGroups.push(currentGroup);
            }
            if(this.isShowingFeedback()) {
                this.recordScore();
            } else {
                this.data.currentAttempt.exampleWordId = this.createExampleWordId(this.getCorrectChoice().partId);
            }
        },

        recordScore() {
            const {usedChoiceGroups, isReview} = this.data.currentAttempt;
            const score = usedChoiceGroups.reduce((score, choiceGroup) => {
                if(isChoiceGroupCorrect(choiceGroup)) {
                    score.correct++;
                }
                return score;
            }, {correct: 0, max: usedChoiceGroups.length, isReview: isReview});

            completeActivity(this.activityId);
            this.data.scores.unshift(score);
        },

        getCorrectChoice() {
            return this.getCurrentChoiceGroup().filter((choice) => choice.correct)[0]; //TODO: Check for falsy value
        },

        getCorrectChoices() {
            return [this.getCorrectChoice()];
        },

        isWaiting() {
            return this.getCurrentChoiceGroup().some((choice) => choice.selected);
        },

        isShowingFeedback() {
            return this.data.currentAttempt.unusedChoiceGroups.length === 0;
        },

        onSelectChoice(choice) {
            choice.selected = true;
            this.trigger(this);
        },

        onReview() {
            this.review();
            this.trigger(this);
        },

        onReplay() {
            this.replay();
            this.trigger(this);
        },

        review() {
            const currentAttempt = this.data.currentAttempt;
            const incorrectWords = currentAttempt.usedChoiceGroups
                .filter((choiceGroup) => {
                    return !isChoiceGroupCorrect(choiceGroup);
                })
                .map((choiceGroup) => {
                    return choiceGroup.filter((choice) => choice.correct)[0].partId;
                })
                .map(dictionary.get);

            this.data.currentAttempt = this.createNewAttempt(incorrectWords);
        },

        replay() {
            this.data.currentAttempt = this.createNewAttempt();
        }
    }, activityStoreMixin);
};
