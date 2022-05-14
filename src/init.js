require('dotenv').config()
const {connect, seed} = require('./utils/db')

const main = async () => {
    await connect()
    await seed()
}

main()
