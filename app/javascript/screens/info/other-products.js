var React = require("react");
var _ = require("lodash");
var Header = require("components/info/header");
var Footer = require("components/info/footer");
var getVars = require("components/info/variables");
var WebLink = require("components/utility/web-link");

var Product = require("components/info/other-products/product");
var ProductTitle = require("components/info/other-products/product-title");
var ProductGrade = require("components/info/other-products/product-grade");

var OtherProducts = React.createClass({
    render: function() {
        var vars = getVars();
        var contentStyle = {
            position: "absolute",
            overflow: "auto",
            width: "100%",
            top: vars.HEADER_HEIGHT,
            bottom: vars.FOOTER_HEIGHT
        };

        var productBoxStyle = {
            margin: "0 10% 0 10%"
        };

        var headerStyle = {
            width: "100%",
            margin: "16px 0 16px 0",
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center"
        };

        var textContainerStyle = {
            position: "absolute",
            display: "inline-block",
            left: 200,
            right: 200,
            fontSize: 24
        };

        var marginImageStyle = {
            position: "absolute",
            left: 30,
            width: 80,
            height: 1150
        };

        var textHeaderStyle = {
            fontSize: 32,
            fontWeight: 700,
            width: "100%",
            textAlign: "center",
            margin: "48px 0 16px 0"
        };

        var paragraphStyle = {
            fontSize: 24,
            lineHeight: "32px",
            marginTop: 30
        };

        var guaranteeStyle = _.extend({}, paragraphStyle, {
            textAlign: "center",
            fontWeight: 700
        });

        var quoteStyle = {
            display: "inline-block",
            fontStyle: "italic",
            textAlign: "left"
        };

        var citationStyle = {
            textAlign: "right"
        };

        var magazineStyle = {
            fontStyle: "italic"
        };

        return (
            <div>
                <Header>Other Products</Header>
                <div style={contentStyle}>
                    <div style={headerStyle}>Preschool Products</div>
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
                            The easy, fun way to teach the alphabet!  Students learn upper and lowercase letter names and shapes and how to distinguish similar, mirrored, and reverse letters.
                        </Product><hr/>
                    </div>
                    <div>
                        <img src="assets/images/other-products/left.png" style={marginImageStyle}/>
                        <div style={textContainerStyle}>
                            <div style={textHeaderStyle}>150+ National Award-Winning Books and Software</div>
                            <div style={paragraphStyle}>For more than 50 years, our fun, award-winning products have helped students of all abilities achieve better grades and higher test scores with highly effective lessons that sharpen the mind as they teach reading, writing, mathematics, science, and history.  We do not teach through drill and memorization or teach to the tests - we empower the mind!</div>
                            <div style={paragraphStyle}>We design critical thinking into our products so students must carefully analyze what they are learning.  Deeper analysis produces deeper understanding, which results in better academic performance.  Over time, students who practice critical thinking learn to apply it throughout their education and life.</div>
                            <div style={_.extend({}, paragraphStyle, {textAlign: "center", width: "100%"})}>
                                <div style={quoteStyle}>
                                    “If we teach children everything we know, their knowledge is limited to ours.<br/>
                                    If we teach children to think, their knowledge is limitless.”<br/>
                                    <div style={citationStyle}>- Michael Baker, President</div>
                                </div>
                            </div>
                            <div style={paragraphStyle}>The Critical Thinking Co.&trade; is recommended by <span style={magazineStyle}>Learning® Magazine</span>, <span style={magazineStyle}>The Well-Trained Mind</span>, <span style={magazineStyle}>College Prep Genius</span>, <span style={magazineStyle}>Creative Child Magazine</span>, <span style={magazineStyle}>Dr. Toy</span>, and used by <span style={magazineStyle}>Sylvan Learning® Centers</span>, <span style={magazineStyle}>Club Z In-Home Tutoring</span>, leading U.S. public schools, and gifted and talented programs in 57 countries throughout the world.</div>
                            <div style={guaranteeStyle}>We guarantee better grades and higher test scores or your money back.</div>
                            <div style={paragraphStyle}>Children love our products and you’ll love what our products do for your child!</div>
                        </div>
                        <img src="assets/images/other-products/right.png" style={_.extend({}, marginImageStyle, {left: "auto", right: 30})}/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = OtherProducts;