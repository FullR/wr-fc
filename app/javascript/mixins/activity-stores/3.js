const _ = require("lodash");
const completeActivity = require("actions/complete-activity");
const activityStoreMixin = require("mixins/activity-store");
const dictionary = window.dictionary;

function isChoiceGroupCorrect(choiceGroup) {
    return !choiceGroup.some((choice) => choice.selected && !choice.correct);
}

module.exports = function(baseWordList) {
    return _.extend({
        getCorrectWordId() {
            return this.getCurrentChoiceGroup().correctWordId;
        },

        getCorrectWordSound() {
            return dictionary.get(this.getCorrectWordId()).soundFile;
        },

        createNewAttempt(wordList) {
            this.soundPlaying = false;
            let unusedChoiceGroups = (wordList || baseWordList)
                .filter((part) => {
                    const id = +this.activityId;
                    if(!window.level.demo) {
                        return true;
                    }
                    return window.level.demoChoices[id >= 10 ? "4" : "3"].indexOf(part.key) !== -1;
                })
                .map((correctWord) => {
                    const incorrectChoice = {
                        partId: _.sample(correctWord.choosableParts, 1)[0],
                        correct: false,
                        selected: false
                    };

                    const correctChoices = [...correctWord.prefixes, ...correctWord.roots, ...correctWord.suffixes].map((wordPartId) => {
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

        nextGroup() {
            const {usedChoiceGroups, unusedChoiceGroups} = this.data.currentAttempt;
            const currentGroup = unusedChoiceGroups.shift();
            if(currentGroup) {
                usedChoiceGroups.push(currentGroup);
            }
            if(this.isShowingFeedback()) {
                this.recordScore();
            }
        },

        recordScore() {
            const {usedChoiceGroups, isReview} = this.data.currentAttempt;
            const score = usedChoiceGroups
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

        getCurrentChoiceGroup() {
            return this.data.currentAttempt.unusedChoiceGroups[0];
        },

        getCorrectChoices() {
            return this.getCurrentChoiceGroup().choices.filter((choice) => choice.correct);
        },

        getIncorrectChoices() {
            return this.getCurrentChoiceGroup().choices.filter((choice) => !choice.correct);
        },

        getIndex() {
            return this.data.currentAttempt.usedChoiceGroups.length + 1;
        },

        getCount() {
            return this.data.currentAttempt.unusedChoiceGroups.length + this.data.currentAttempt.usedChoiceGroups.length;
        },

        isWaiting() {
            return this.getIncorrectChoices().some((choice) => choice.selected) || // any incorrect selected
                this.getCorrectChoices().every((choice) => choice.selected); // or all correct selected
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
                    return !isChoiceGroupCorrect(choiceGroup.choices);
                })
                .map((choiceGroup) => {
                    return choiceGroup.correctWordId;
                })
                .map(dictionary.get);

            this.data.currentAttempt = this.createNewAttempt(incorrectWords);
        },

        replay() {
            this.data.currentAttempt = this.createNewAttempt();
        }
    }, activityStoreMixin);
};
