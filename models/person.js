const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

console.log('Connecting to database...');
mongoose.connect(URL)
    .then(() => console.log('DB connection successful'))
    .catch(err => console.log('Error on connecting to database', err.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(value){
                return /^\d{8,}$|^\d{2,}-\d{6,}$|^\d{3,}-\d{5,}$/.test(value)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);