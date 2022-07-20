import bcrypt from 'bcryptjs';
const users = [
    {
        name: 'sahajanand',
        email :'sahajanand@sarvopari.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'gunatit',
        email :'gunatit@sarvopari.com',
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: 'gopalanand',
        email :'gopalanand@sarvopari.com',
        password: bcrypt.hashSync('123456',10)
    }
]

export default users;