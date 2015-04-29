var dictionary = window.dictionary;

module.exports = {
    getInitialStorage: function() {
        return {
            scores: [],
            currentAttempt: this.createNewAttempt()
        };
    },

    getInitialState: function() {
        return this;
    },

    getHighscore: function() {
        if(!this.data.scores.length) {
            return {correct: 0, max: 0};
        }
        return this.data.scores.reduce((highscore, score) => 
            !score.isReview && score.correct > highscore.correct
        );
    },

    getCurrentChoiceGroup: function() {
        return this.data.currentAttempt.unusedChoiceGroups[0];
    },

    getIndex: function() {
        return this.data.currentAttempt.usedChoiceGroups.length + 1;
    },

    getCount: function() {
        return this.data.currentAttempt.unusedChoiceGroups.length + this.data.currentAttempt.usedChoiceGroups.length;
    }
};