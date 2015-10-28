var EmployeeContainer = React.createClass({
    getInitialState: function(){
        return{
            company: 'Euricom',
            employees: ['Peter', 'Frederik', 'Kevin'],
            newEmployee: ''
        }
    },
    render: function() {
        return (
            <div>
                <h2>{this.state.company}</h2>

            </div>
        )
    }
});
