// module.exports
module.exports = {

    map: function map(user){
        return {
            name : user.firstName + ' ' + user.lastName,
            email : user.email,
            age: user.age,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip
        }
    }

}

