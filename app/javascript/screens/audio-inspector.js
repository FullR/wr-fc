const React = require("react");
const _ = require("lodash");
const SoundManager = require("sound/sound-manager");
const {Link} = require("react-router");
const {words, parts} = window.dictionary;

const AudioInspector = React.createClass({
    getInitialState() {
        return {filter: ""};
    },

    play(path, extention) {
        const sound = SoundManager.get(path, {extention});
        sound.load().then(() => sound.play());
    },

    updateFilter(event) {
        this.setState({
            filter: event.target.value.trim()
        });
    },

    render() {
        let _words;
        let _parts;
        if(this.state.filter.length) {
            let filterFn = (part) => part.id.match(this.state.filter);
            _words = words.filter(filterFn);
            _parts = parts.filter(filterFn);
        } else {
            _words = words;
            _parts = parts;
        }

        return (
            <div style={{overflow: "auto", height: "100%", padding: 30, fontSize: 18, lineHeight: "20px"}}>
                <div><a href="#splash">Back</a></div>
                <input value={this.state.filter} onChange={this.updateFilter}/>
                <table>
                    <thead></thead>
                    <tfoot></tfoot>
                    <tbody>
                    {_words.map((word) => {
                        return (
                            <tr key={word.key}>
                                <td>{word.id} [{word.type}]</td>
                                <td><button onClick={this.play.bind(this, word.soundFile, "ogg")}>Play OGG</button></td>
                                <td><button onClick={this.play.bind(this, word.soundFile, "mp3")}>Play MP3</button></td>
                            </tr>
                        );
                    })}
                    {_parts.map((word) => {
                        return (
                            <tr key={word.key}>
                                <td>{word.id} [{word.type}]</td>
                                <td><button onClick={this.play.bind(this, word.soundFile, "ogg")}>Play OGG</button></td>
                                <td><button onClick={this.play.bind(this, word.soundFile, "mp3")}>Play MP3</button></td>
                                <td><button onClick={this.play.bind(this, word.definitionSoundFile, "ogg")}>Play Definition OGG</button></td>
                                <td><button onClick={this.play.bind(this, word.definitionSoundFile, "mp3")}>Play Definition MP3</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AudioInspector;
