var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

//ReactDOM.render(<UserContainer />, document.getElementById('app'));

var Home = require('./components/home.jsx');
var UserContainer = require('./components/UserContainer.jsx');
var Navbar = require('./components/navbar.jsx');
var AddUser = require('./components/userAdd.jsx');
var EditUser = require('./components/userEdit.jsx');

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
           <Route path="users" component={UserContainer}></Route>
           <Route path="users/add" component={AddUser}></Route>
           <Route path="users/:id" component={EditUser}></Route>
       </Route>
   </Router>
), document.getElementById('app'));
