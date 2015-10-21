const React = require("react");
const _ = require("lodash");
const Header = require("components/info/header");
const Footer = require("components/info/footer");
const getVars = require("components/info/variables");
const WebLink = require("components/utility/web-link");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const Product = require("components/info/other-products/product");
const ProductTitle = require("components/info/other-products/product-title");
const ProductGrade = require("components/info/other-products/product-grade");

const OtherProducts = React.createClass({
    render() {
        const vars = getVars();
        const contentStyle = {
            position: "absolute",
            overflow: "auto",
            width: "100%",
            top: vars.HEADER_HEIGHT,
            bottom: vars.FOOTER_HEIGHT
        };

        const awardsStyle = {
            width: "80%",
            //maxWidth: 1000,
            margin: "50px 0 50px 0"
        };

        const productBoxStyle = {
            margin: "0 10% 50px 10%"
        };

        const textContainerStyle = {
            position: "relative",
            width: "70%",
            left: "15%",
            marginBottom: 50,
            fontSize: bp({
                [small]: 18,
                [medium]: 20,
                defaults: 24
            })
        };

        const paragraphStyle = {
            fontSize: 24,
            lineHeight: "32px"
        };

        const magazineStyle = {
            fontStyle: "italic"
        };

        return (
            <div>
                <Header>Other Products</Header>
                <div style={contentStyle} className="other-products">
                    <div style={{width: "100%", textAlign: "center"}}>
                        <img src="assets/images/other-products/awards.png" style={awardsStyle}/>
                    </div>
                    <div style={textContainerStyle}>
                        <div style={paragraphStyle}>The Critical Thinking Co.&trade; is recommended by <span style={magazineStyle}>Learning® Magazine</span>, <span style={magazineStyle}>The Well-Trained Mind</span>, <span style={magazineStyle}>College Prep Genius</span>, <span style={magazineStyle}>Creative Child Magazine</span>, <span style={magazineStyle}>Dr. Toy</span>, and used by <span style={magazineStyle}>Sylvan Learning® Centers</span>, <span style={magazineStyle}>Club Z In-Home Tutoring</span>, leading U.S. public schools, and gifted and talented programs in 57 countries throughout the world.</div>
                    </div>
                    <div style={productBoxStyle}>
                        <Product src="assets/images/other-products/asg.png" href="http://www.criticalthinking.com/alphabet-song-game.html">
                            <ProductTitle>Alphabet Song Game</ProductTitle>&nbsp;
                            <ProductGrade>Toddler – Grade 1</ProductGrade>
                            <br/>
                            The easy, fun way to teach the alphabet!  Students learn upper and lowercase letter names and shapes and how to distinguish similar, mirrored, and reverse letters.
                        </Product><hr/>
                        <Product src="assets/images/other-products/lssg.png" href="http://www.criticalthinking.com/letter-sounds-song-and-game.html">
                            <ProductTitle>Letter Sounds Song and Game</ProductTitle>&nbsp;
                            <ProductGrade>PreK – Grade 1</ProductGrade>
                            <br/>
                            Students learn letter sounds by singing the Letter Sounds Song&trade; and playing fun, simple games.  The fast, fun, and effective way to learn phonics!
                        </Product><hr/>
                        <Product src="assets/images/other-products/vssg.png" href="http://www.criticalthinking.com/vowel-sounds-song-and-game.html">
                            <ProductTitle>Vowel Sounds Song and Game</ProductTitle>&nbsp;
                            <ProductGrade>PreK – Grade 2</ProductGrade>
                            <br/>
                            The fun, easy way to teach long and short vowel sounds!  Students sing the Vowel Sounds Song&trade; and play games to master short and long vowels.
                        </Product><hr/>
                        <Product src="assets/images/other-products/rtr.png" href="http://www.criticalthinking.com/fun-time-phonics-series.html">
                            <ProductTitle>Fun-Time Phonics!</ProductTitle>&nbsp;
                            <ProductGrade>PreK – Grade 2</ProductGrade>
                            <br/>
                            <div style={{fontSize: 22, fontWeight: 700, margin: "8px 0 8px 0"}}>The Simplest, Most Effective Way to Learn to Read!</div>
                            These colorful, fun lessons and games use phonemic awareness and phonics to teach early learners to read.  Students listen, think, and speak to master the basics of reading.
                        </Product><hr/>
                        <Product src="assets/images/other-products/rr.png" href="http://www.criticalthinking.com/riddle-rabbit.html">
                            <ProductTitle>Riddle Rabbit</ProductTitle>&nbsp;
                            <ProductGrade>PreK or Grades K – 1</ProductGrade>
                            <br/>
                            This fun, mind-building collection of short, colorful riddles teaches
                            math, logic, letter sounds, and science.&nbsp; Each colorful riddle requires 
                            identification of two or more clues to deduce the answer.
                        </Product><hr/>
                        <Product src="assets/images/other-products/mind-benders.png" href="http://www.criticalthinking.com/mind-benders.html">
                            <ProductTitle noTrademark={true}>Mind Benders&reg;</ProductTitle>&nbsp;
                            <ProductGrade>6 levels:&nbsp; Grades PreK – 12+</ProductGrade>
                            <br/>
                            Students analyze each story and its clues, identifying logical associations between people, places, and things, and using their powers of deduction to solve the puzzles.
                        </Product><hr/>
                        <Product src="assets/images/other-products/eic-beginning-1.png" href="http://www.criticalthinking.com/editor-in-chief.html">
                            <ProductTitle noTrademark={true}>Editor in Chief&reg; Beginning</ProductTitle>&nbsp;
                            <ProductGrade>2 levels:&nbsp; Grades 2 – 4</ProductGrade>
                            <br/>
                            Students learn grammar, punctuation, spelling, capitalization, and critical reading using a standards-based thinking approach rather than drill and practice.  After a concise lesson, students carefully analyze and edit stories, letters, and articles.  This approach helps students master concepts that are necessary to become skilled writers.
                        </Product><hr/>
                        <Product src="assets/images/other-products/eic-a1.png" href="http://www.criticalthinking.com/editor-in-chief.html">
                            <ProductTitle noTrademark={true}>Editor in Chief&reg;</ProductTitle>&nbsp;
                            <ProductGrade>6 levels:&nbsp; Grades 4 – 12+</ProductGrade>
                            <br/>
                            Students learn grammar, punctuation, spelling, capitalization, and critical reading using a standards-based thinking approach rather than drill and practice.  After a concise lesson, students carefully analyze and edit stories, letters, and articles.  This approach helps students master concepts that are necessary to become skilled writers.
                        </Product><hr/>
                        <Product src="assets/images/other-products/science-det.png" href="http://www.criticalthinking.com/science-detective.html">
                            <ProductTitle>Science Detective</ProductTitle>&nbsp;
                            <ProductGrade>2 levels:&nbsp; Grades 3 – 6</ProductGrade>
                            <br/>
                            Students analyze and synthesize the information from the text and the charts, tables, and graphs to answer critical thinking questions to improve their understanding of physical, life, and Earth science concepts.  Students also practice reading comprehension and inferential and deductive thinking skills.
                        </Product><hr/>
                        <Product src="assets/images/other-products/reading-det.png" href="http://www.criticalthinking.com/reading-detective.html">
                            <ProductTitle>Reading Detective</ProductTitle>&nbsp;
                            <ProductGrade>3 levels:&nbsp; Grades 3 – 8</ProductGrade>
                            <br/>
                            Students read and analyze literature passages and use analysis,
                            synthesis, and vocabulary skills to answer the reading comprehension
                            questions.&nbsp; The activities help students understand reading concepts such as
                            drawing inferences, making conclusions, determining cause-and-effect, and using context clues.
                        </Product><hr/>
                        <Product src="assets/images/other-products/md.png" href="http://www.criticalthinking.com/math-detective.html">
                            <ProductTitle noTrademark={true}>Math Detective&reg;</ProductTitle>&nbsp;
                            <ProductGrade>3 levels:&nbsp; Grades 3 – 8</ProductGrade>
                            <br/>
                            Students analyze and synthesize the information from the text and the charts, tables, and graphs to answer critical thinking questions to improve their understanding of the math concepts and develop reading comprehension.
                        </Product><hr/>
                        <Product src="assets/images/other-products/wrfc.png" href="http://www.criticalthinking.com/word-roots.html">
                            <ProductTitle>Word Roots Flashcards</ProductTitle>&nbsp;
                            <ProductGrade>4 levels:&nbsp; Grades 4 – 12+</ProductGrade>
                            <br/>
                            These can be used to supplement our Word Roots books/software or as an independent teaching tool.  Students learn the meanings of word parts (prefixes, roots, suffixes) to decode the meaning and spelling of new vocabulary.
                        </Product><hr/>
                        <Product src="assets/images/other-products/wr.png" href="http://www.criticalthinking.com/word-roots.html">
                            <ProductTitle>Word Roots</ProductTitle>&nbsp;
                            <ProductGrade>3 levels:&nbsp; Grades 3 – 12+</ProductGrade>
                            <br/>
                            Students learn Greek and/or Latin word parts (prefixes, roots, suffixes), assemble words from parts, and apply words in context.&nbsp; These activities will add words to their vocabulary and greater depth to their thinking and writing.
                        </Product>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = OtherProducts;
