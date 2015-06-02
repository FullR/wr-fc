module.exports = {
    fill() {
        return {
            display: "block",
            width: "100%",
            height: "100%"
        };
    },

    backgroundImage(url, xSize="100%", ySize="100%") {
        return {
            backgroundImage: `url('${url}')`,
            backgroundSize: `${xSize} ${ySize}`
        };
    },

    size(width="auto", height="auto") {
        return {width, height};
    }
};
