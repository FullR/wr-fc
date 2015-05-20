var React = require("react");
var _ = require("lodash");
var Footer = require("components/info/footer");
var getVars = require("components/info/variables");
var WebLink = require("components/utility/web-link");
var colors = require("colors");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var Credits = React.createClass({
    render: function() {
        var vars = getVars();
        var linePadding = bp({
            [small]: 10,
            [medium]: 15,
            defaults: 20
        });

        var contentStyle = {
            overflow: "auto",
            position: "absolute",
            width: "100%",
            top: 0,
            bottom: vars.FOOTER_HEIGHT,
            background: colors.CREDITS_BG,
            textAlign: "center",
            fontSize: bp({
                [small]: 19,
                [medium]: 22,
                defaults: 25
            }),
            lineHeight: bp({
                [small]: "20px",
                [medium]: "25px",
                defaults: "30px"
            })
        };

        var headerStyle = {
            fontWeight: 700,
            marginTop: "3%"
        };

        var roleStyle = {
            marginTop: linePadding,
            color: colors.CREDITS_ROLE
        };

        var nameStyle = {
            color: "#000000"
        };

        var isbnStyle = {
            marginTop: 40,
            marginBottom: "3%"
        };

        return (
            <div>
                <div style={contentStyle}>
                    <div style={headerStyle}>Credits</div>
                    <div style={roleStyle}></div>
                    <div style={roleStyle}>Written by</div>
                    <div style={nameStyle}>Cherie A. Plant</div>
                    <div style={roleStyle}>Software Created by</div>
                    <div style={nameStyle}>James Meyers</div>
                    <div style={roleStyle}>Software Edited by</div>
                    <div style={nameStyle}>Patricia Gray</div>
                    <div style={nameStyle}>Abbey J. Hunt</div>
                    <div style={nameStyle}>Sarah Rigney</div>
                    <div style={roleStyle}>Graphic Design by</div>
                    <div style={nameStyle}>Scott Slyter</div>
                    <div style={roleStyle}>Audio by</div>
                    <div style={nameStyle}>Julianna Seldon</div>
                    <div style={roleStyle}>Recorded & Edited by</div>
                    <div style={nameStyle}>Scott Todd</div>
                    <div style={nameStyle}>Terry McDonald</div>
                    <div style={nameStyle}>Jesse Spinella</div>
                    <div style={isbnStyle}>ISBN {window.level.ISBN}</div>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = Credits;
