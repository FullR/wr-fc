module.exports = {
    fill: function() {
        return {
            display: "block",
            width: "100%",
            height: "100%"
        };
    },

    backgroundImage: function(url, xSize="100%", ySize="100%") {
        return {
            backgroundImage: `url('${url}')`,
            backgroundSize: `${xSize} ${ySize}`
        };
    },

    size: function(width="auto", height="auto") {
        return {width, height};
    }
};
