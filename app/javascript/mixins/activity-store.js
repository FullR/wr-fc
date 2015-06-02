const dictionary = window.dictionary;

module.exports = {
    getInitialStorage() {
        return {
            scores: [],
            currentAttempt: this.createNewAttempt()
        };
    },

    getInitialState() {
        return this;
    },

    getHighscore() {
        if(!this.data.scores.length) {
            return {correct: 0, max: 0};
        }
        return this.data.scores.reduce((highscore, score) => 
            !score.isReview && score.correct > highscore.correct ? score : highscore
        );
    },

    getCurrentChoiceGroup() {
        return this.data.currentAttempt.unusedChoiceGroups[0];
    },

    getIndex() {
        return this.data.currentAttempt.usedChoiceGroups.length + 1;
    },

    getCount() {
        return this.data.currentAttempt.unusedChoiceGroups.length + this.data.currentAttempt.usedChoiceGroups.length;
    }
};
