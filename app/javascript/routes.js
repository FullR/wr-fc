const React = require("react");
const {Route, DefaultRoute, NotFoundRoute} = require("react-router");

module.exports = (
    <Route handler={require("screens/application")}>
        <DefaultRoute handler={require("screens/splash")}/>
        <NotFoundRoute handler={require("screens/splash")}/>

        <Route name="about" handler={require("screens/info/about")}/>
        <Route name="license" handler={require("screens/info/license")}/>
        <Route name="products" handler={require("screens/info/other-products")}/>
        <Route name="credits" handler={require("screens/info/credits")}/>

        <Route name="menu" handler={require("screens/menu")}/>
        <Route name="login" handler={require("screens/create-user")}/>
        <Route name="activity" handler={require("screens/activity-container")}>
            <Route name="activity-1" path="1" handler={require("activities/1/component")}/>
            <Route name="activity-2" path="2" handler={require("activities/2/component")}/>
            <Route name="activity-3" path="3" handler={require("activities/3/component")}/>

            <Route name="activity-4" path="4" handler={require("activities/4/component")}/>
            <Route name="activity-5" path="5" handler={require("activities/5/component")}/>
            <Route name="activity-6" path="6" handler={require("activities/6/component")}/>

            <Route name="activity-7" path="7" handler={require("activities/7/component")}/>
            <Route name="activity-8" path="8" handler={require("activities/8/component")}/>
            <Route name="activity-9" path="9" handler={require("activities/9/component")}/>

            <Route name="activity-10" path="10" handler={require("activities/10/component")}/>
            <Route name="activity-11" path="11" handler={require("activities/11/component")}/>
            <Route name="activity-12" path="12" handler={require("activities/12/component")}/>
        </Route>

        <Route name="sounds" handler={require("screens/audio-inspector")}/>
    </Route>
);
