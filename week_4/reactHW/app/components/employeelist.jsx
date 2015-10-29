var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var EmployeeList = React.createClass({
    getDefaultProps: function(){
        return { employees: ['Ksenia']}
    },
    render: function(){
        return (
            <ul>
                {this._renderEmployees()}
            </ul>
        )
    },
    _renderEmployees: function(){
        //console.log(this.props.employees);
        return this.props.employees.map(function(employee, index){
            return <li key={index}>
                        <Link to={`/employees/${employee}`}>{employee}</Link>
                    </li>
        })
    },
    componentDidUpdate: function(){
        console.log('In Component DID Update');
    }
});

module.exports = EmployeeList;
