const React = require("react");
const Header = require("components/info/header");
const Footer = require("components/info/footer");
const getVars = require("components/info/variables");
const WebLink = require("components/utility/web-link");
const Title = require("components/info/title");
const colors = require("colors");
const dictionary = window.dictionary;

const About = React.createClass({
    render() {
        const isBeginning = window.level.levelId === "beginning";
        const vars = getVars();
        const contentStyle = {
            position: "absolute",
            top: vars.HEADER_HEIGHT,
            bottom: vars.FOOTER_HEIGHT,
            overflow: "auto",
            width: "100%",
            background: colors.ABOUT_BG,
            padding: "16px 80px 16px 80px"
        };

        const headerStyle = {
            width: "100%",
            fontSize: "24",
            textAlign: "center",
            fontWeight: 700
        };

        const paragraphStyle = {
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
                    <div style={paragraphStyle}><Title/> can be used with our award-winning <span style={{fontStyle: "italic"}}>Word Roots</span> books/software products or as an independent teaching tool.&nbsp; The {isBeginning ? "10" : "12"} flashcard games in this software teach students the meanings of word parts (prefixes, roots, and suffixes) so they can decode the meaning and spelling of new vocabulary by breaking a word into its word parts.&nbsp; This set of games includes all of the {dictionary.prefixes.length} prefixes, {dictionary.roots.length} roots, {dictionary.suffixes.length} suffixes, and {dictionary.words.length} vocabulary words that are in the corresponding book or software.</div>
                    <div style={paragraphStyle}>
                        The games are numbered {isBeginning ? "1-10" : "1-12"}.&nbsp; Games 1-6 are Study Games to learn the word parts and their definitions.&nbsp; Games 1-3 and 4-6 can be switched, and the prefixes, roots, or suffixes can be played in any order.&nbsp; Games {isBeginning ? "7-10" : "7-12"} are Practice Games using the word parts to form words to show that students know the definitions of the word parts.&nbsp; Games {isBeginning ? "7 and 8" : "7, 8, and 9"} may be switched with games {isBeginning ? "9 and 10" : "10, 11, and 12"}.
                    </div>
                    <div style={paragraphStyle}>
                        We have numbered the games in what we consider the optimal learning order, but you also have the option to create your own order to meet your needs.&nbsp; For example, rather than do all of the flashcards by identifying the definition or word part, you may choose to focus on studying prefixes, then suffixes, then roots.
                    </div>
                    <div style={paragraphStyle}>
                        To see our full line of <span style={{fontStyle: "italic"}}>Word Roots</span> products, please visit: <WebLink href="http://www.CriticalThinking.com/word-roots.html">{"http://www.CriticalThinking.com/word-roots.html"}</WebLink>
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
