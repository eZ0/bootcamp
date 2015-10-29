var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Home = require('./components/home.jsx');
var About = require('./components/about.jsx');
var EmployeeContainer = require('./components/employeecontainer.jsx');
var Navbar = require('./components/navbar.jsx');
var Employee = require('./components/employee.jsx');

var createBrowserHistory = require('history/lib/createBrowserHistory');

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
            <Route path="about" component={About}></Route>
            <Route path="employees" component={EmployeeContainer}></Route>
            <Route path="employees/:name" component={Employee}></Route>
        </Route>
    </Router>
), document.getElementById('app'));
