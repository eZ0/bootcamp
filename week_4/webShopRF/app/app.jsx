var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var createBrowserHistory = require('history/lib/createBrowserHistory');

var Home = require('./components/home.jsx');
var Navbar = require('./components/navBar.jsx');
var Cart = require('./components/cartContainer.jsx');
var Details = require('./components/itemDetails.jsx');

var App = React.createClass({
    render: function(){
        return (
            <div>
                <Navbar />
                {this.props.children}
            </div>
        )
    }
});

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="/items/:id" component={Details}></Route>
            <Route path="/cart" component={Cart}></Route>
        </Route>
    </Router>
), document.getElementById('app'));
