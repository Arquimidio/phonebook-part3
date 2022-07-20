const mongoose = require('mongoose');

if(process.argv.length < 3){
	return process.exit(1);
}

const [,, password, name, number] = process.argv;

const URL = 
    `mongodb+srv://Arquimidio:${password}@cluster0.p8zhv.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log('Connecting to database...');

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
				return /^\d{8,}$|^\d{2,}-\d{6,}$|^\d{3,}-\d{5,}$/.test(value);
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	}
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Person = mongoose.model('person', personSchema);


mongoose.connect(URL)
	.then(() => {
		if(name && number){
			return new Person({
				name,
				number
			}).save()
				.then(() => console.log(`Added ${name} number ${number} to the phonebook`))
				.then(() => mongoose.connection.close());
		}else if(process.argv.length === 3){
			Person.find({}).then(data => {
				const stringStart = 'phonebook:\n';
				const peopleArr = data.map(person => `${person.name} ${person.number}`).join('\n');
				console.log(`${stringStart} ${peopleArr}`);
			})
				.then(() => mongoose.connection.close());
		}
	})
	.catch(error => console.log(error));