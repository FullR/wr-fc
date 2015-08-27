const React = require("react");
const hasher = require("hasher");

const ActivityContainer = require("screens/activity-container");
const Splash = require("screens/splash");
const Menu = require("screens/menu");
const Login = require("screens/create-user");
const About = require("screens/info/about");
const License = require("screens/info/license");
const Products = require("screens/info/other-products");
const Credits = require("screens/info/credits");

const Activities = {
  "1": require("activities/1/component"),
  "2": require("activities/2/component"),
  "3": require("activities/3/component"),
  "4": require("activities/4/component"),
  "5": require("activities/5/component"),
  "6": require("activities/6/component"),
  "7": require("activities/7/component"),
  "8": require("activities/8/component"),
  "9": require("activities/9/component"),
  "10": require("activities/10/component"),
  "11": require("activities/11/component"),
  "12": require("activities/12/component")
};

const Router = React.createClass({
  mixins: [require("utility/bp").mixin],

  getInitialState() {
    hasher.init();
    return {
      hash: hasher.getHash()
    };
  },

  componentDidMount() {
    hasher.changed.add(this.onHashChanged);
  },

  onHashChanged() {
    this.setState({
      hash: hasher.getHash()
    });
  },

  renderRoute() {
    const [routeName, activityId] = this.state.hash.split("/");
    switch(routeName) {
      case "splash": return (<Splash/>);
      case "menu": return (<Menu/>);
      case "login": return (<Login/>);
      case "about": return (<About/>);
      case "license": return (<License/>);
      case "products": return (<Products/>);
      case "credits": return (<Credits/>);

      case "activity": 
        const Activity = Activities[activityId];
        return (
          <ActivityContainer>
            <Activity/>
          </ActivityContainer>
        );
      default: return (<Splash/>);
    }
  },

  render() {
    const App = require("screens/application");
    return (
      <App>{this.renderRoute()}</App>
    );
  }
});

module.exports = Router;
