var React = require('react');

var employee = React.createClass({
    render: function(){
        console.log(this.props);
        return (
            <div>
                {this.props.params.name}
            </div>
        )
    }
});

module.exports = employee;
