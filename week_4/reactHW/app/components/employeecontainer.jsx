var React = require('react');
var EmployeeList = require('./employeelist.jsx');
var AddEmployee = require('./addemployee.jsx');

var employeeStore = require('../stores/employeestore.js');
var employeeActions = require('../actions/employeeactions.js');

var EmployeeContainer = React.createClass({
    getInitialState: function(){
        return{
            company: employeeStore.getCompany(),
            employees: employeeStore.getEmployees(),
            newEmployee: '',
            errors: {}
        }
    },

    // Invoked once after the first render
    componentDidMount: function(){
        // You now have access to this.getDOMNode()
        employeeStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function(){
        employeeStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function(){
        this.setState({
            company: employeeStore.getCompany(),
            employees: employeeStore.getEmployees()
        });
    },
    render: function() {
        return (
            <div>
                <h2>{this.state.company}</h2>
                <AddEmployee newEmployee={this.state.newEmployee}
                             onChange={this._handleChange}
                             onSave={this._addNewEmployee}
                             errors={this.state.errors}/>
                <EmployeeList employees={this.state.employees}/>
            </div>
        )
    },
    _handleChange: function(e) {
        this.setState({
            newEmployee: e.target.value
        })
    },
    _addNewEmployee: function(){
        if(this._isInputValid()){
            employeeActions.addEmployee(this.state.newEmployee);
            this.setState({
                //employees: this.state.employees.concat(this.state.newEmployee),
                newEmployee: ''
            })
        }
    },
    _isInputValid: function(){
        var isValid = true;
        var errors = {};

        if(this.state.newEmployee.length<3){
            isValid = false;
            errors.newEmployee = 'New employee must be at least 3 chars';
        }
        this.setState({
            errors: errors
        });

        return isValid;
    }
});


module.exports = EmployeeContainer;
