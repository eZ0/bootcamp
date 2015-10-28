var React = require('react');
var EmployeeList = require('./employeelist.jsx');
var AddEmployee = require('./addemployee.jsx');

var EmployeeContainer = React.createClass({
    getInitialState: function(){
        return{
            company: 'Euricom',
            employees: ['Peter', 'Frederik', 'Kevin'],
            newEmployee: '',
            errors: {}
        }
    },

    // Invoked once before first render
    componentWillMount: function(){
        // Calling setState here does not cause a re-render
        console.log('In Component Will Mount');
    },
    // Invoked once after the first render
    componentDidMount: function(){
        // You now have access to this.getDOMNode()
        console.log('In Component Did Mount');
    },
    //// Invoked whenever there is a prop change
    //// Called BEFORE render
    //componentWillReceiveProps: function(nextProps){
    //    // Not called for the initial render
    //    // Previous props can be accessed by this.props
    //    // Calling setState here does not trigger an additional re-render
    //    console.log('In Component Will Receive Props');
    //},
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
        if(this._isInputValid(this.state.newEmployee)){
            this.setState({
                employees: this.state.employees.concat(this.state.newEmployee),
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
