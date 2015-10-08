'use strict';

class User{

    getById(id){
        return {
            id: 123,
            name: 'ksenia'
        }
    }

    getAll(){
        return [
            {id: 123, name: 'ksenia'},
            {id: 124, name: 'anna'},
            {id: 125, name: 'kitty'}
        ]
    }
}


module.exports = new User();
