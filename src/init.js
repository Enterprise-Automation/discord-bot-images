
const {connect, seed} = require('./utils/db')

const main = async () => {
    await connectDB()
    await seed()
}

main()
