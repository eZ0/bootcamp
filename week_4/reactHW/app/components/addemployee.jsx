var React = require('react');

var AddEmployee = React.createClass({
    propTypes: {
        newEmployee: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    componentWillUpdate: function(){
        console.log('In Component WILL Update');
    },
    render: function(){
        return (
            <div>
                <h3>Add new employee</h3>
                <input type="text" value={this.props.newEmployee} onChange={this.props.onChange} />
                <button onClick={this.props.onSave}>Add New</button>
                <div style={{'color':'red'}}>{this.props.errors.newEmployee}</div>
            </div>
        )
    },
    // Invoked whenever there is a prop change
    // Called BEFORE render
    componentWillReceiveProps: function(nextProps){
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an additional re-render
        console.log('In Component Will Receive Props');
    },
    shouldComponentUpdate: function(){
        console.log('In Should Component Update');
        return true;
    }
});

module.exports = AddEmployee;
