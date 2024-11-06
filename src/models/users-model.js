const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const users = [
    { id: '1', name: 'admint', email:'admint@mail.com', password: '123' },
    { id: '2', name: 'a2', email:'a2@mail.com', password: '123' }
]

module.exports = {
    getAllUser: () => users,

    getUserById: (id) => users.find(user => user.id === id),
    
    getUserByEmail: (email) => users.find(user => user.email === email),

    createUser: (name, email, password) => {
        const newUser = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }
        users.push(newUser)
        return newUser
    }
}