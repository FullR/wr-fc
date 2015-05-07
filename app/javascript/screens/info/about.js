var React = require("react");
var Header = require("components/info/header");
var Footer = require("components/info/footer");
var getVars = require("components/info/variables");
var WebLink = require("components/utility/web-link");
var Title = require("components/info/title");
var colors = require("colors");
var dictionary = window.dictionary;

var About = React.createClass({
    render: function() {
        var vars = getVars();
        var contentStyle = {
            position: "absolute",
            top: vars.HEADER_HEIGHT,
            bottom: vars.FOOTER_HEIGHT,
            overflow: "auto",
            width: "100%",
            background: colors.ABOUT_BG,
            padding: "16px 80px 16px 80px"
        };

        var headerStyle = {
            width: "100%",
            fontSize: "24",
            textAlign: "center",
            fontWeight: 700
        };

        var paragraphStyle = {
            fontSize: 22,
            marginTop: 16,
            lineHeight: "26px"
        };

        return (
            <div>
                <Header>
                    About <Title/>
                </Header>
                <div style={contentStyle}>
                    <div style={headerStyle}>The Building Blocks of Better Spelling and Vocabulary</div>
                    <div style={paragraphStyle}><Title/> can be used with our award-winning Word Roots books/software products or as an independent teaching tool.&nbsp; The 12 flashcard games in this software teach students the meanings of word parts (prefixes, roots, and suffixes) so they can decode the meaning and spelling of new vocabulary by breaking a word into its word parts.&nbsp; This set of games includes all of the {dictionary.prefixes.length} prefixes, {dictionary.roots.length} roots, {dictionary.suffixes.length} suffixes, and {dictionary.words.length} vocabulary words that are in the corresponding book or software.</div>
                    <div style={paragraphStyle}>
                        The games are numbered 1-12.&nbsp; Games 1-6 are Study Games to learn the word parts and their definitions.&nbsp; Games 1-3 and 4-6 can be switched, and the prefixes, roots, or suffixes can be played in any order.&nbsp; Games 7-12 are Practice Games using the word parts to form words to show that students know the definitions of the word parts.&nbsp; Games 7, 8, and 9 may be switched with games 10, 11, and 12.
                    </div>
                    <div style={paragraphStyle}>
                        We have numbered the games in what we consider the optimal learning order, but you also have the option to create your own order to meet your needs.&nbsp; For example, rather than do all of the flashcards by identifying the definition or word part, you may choose to focus on studying prefixes, then suffixes, then roots.
                    </div>
                    <div style={paragraphStyle}>
                        To see our full line of Word Roots products, please visit: <WebLink href="http://www.CriticalThinking.com/word-roots.html">{"http://www.CriticalThinking.com/word-roots.html"}</WebLink>
                        <br/>
                        To find a full list of all our award-winning products, please visit: <WebLink href="http://www.CriticalThinking.com">{"http://www.CriticalThinking.com"}</WebLink>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = About;