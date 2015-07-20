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
            const soundPath = dictionary.get(this.getCorrectChoice().partId).soundFile;
            return soundPath;
        },

        getCorrectDefinitionSound() {
            const soundPath = dictionary.get(this.getCorrectChoice().partId).definitionSoundFile;
            return soundPath;
        },

        getExampleSoundPath() {
            const soundPath = dictionary.get(this.data.currentAttempt.exampleWordId).soundFile;
            return soundPath;
        },

        createExampleWordId(correctPartId) {
            const available = dictionary.getWordsWithPart(correctPartId);
            return _.sample(available, 1)[0];
        },

        createNewAttempt(partList) {
            this.soundPlaying = false;
            let unusedChoiceGroups = (partList || basePartList)
                .filter((part) => {
                    if(!window.level.demo) {
                        return true;
                    }
                    return window.level.demoChoices["2"].indexOf(part.key) !== -1;
                })
                .map((correctPart) => {
                    let incorrectChoices = _(dictionary.parts)
                        .filter((part) => {
                            let passes = part.key !== correctPart.key && 
                                         part.definition !== correctPart.definition &&
                                         part.type === correctPart.type;
                            
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
            }
            else {
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
            return this.getCurrentChoiceGroup().filter((choice) => choice.correct)[0];
        },

        getCorrectChoices() {
            return [this.getCorrectChoice()];
        },

        getIndex() {
            return this.data.currentAttempt.usedChoiceGroups.length + 1;
        },

        getCount() {
            return this.data.currentAttempt.unusedChoiceGroups.length + this.data.currentAttempt.usedChoiceGroups.length;
        },

        isWaiting() {
            const currentChoiceGroup = this.getCurrentChoiceGroup();
            return currentChoiceGroup && currentChoiceGroup.some((choice) => choice.selected);
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
