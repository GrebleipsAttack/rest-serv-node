const mongoose =  require('mongoose');

const dbConnection = async() => {

    try{
        mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB connection online')

    } catch(err) {
        console.log(err);
        throw new Error('Cannot Connect to database...')
    }
}

module.exports = {
    dbConnection
}