const Person = require('../models/person');

const getInfo = async (req, res) => {
	const persons = await Person.find({});
	const personsCount = persons.length;
	const date = new Date();
	res.status(200).send(`
        <p>Phonebook has info for ${ personsCount } people</p>
        <p>${ date }</p>
    `);
};

const getAll = async (req, res) => {
	const persons = await Person.find({});
	res.status(200).json(persons);
};

const getSingle = async (req, res, next) => {
	try{
		const { id } = req.params;
		const singlePerson = await Person.find({ _id: id });
		if(singlePerson.length){
			res.status(200).json(singlePerson);
		}else{
			res.status(404).end();
		}
	}catch(err){
		next(err);
	}
};

const create = async (req, res, next) => {
	try{
		const { body } = req;
		const newPerson = await new Person({...body}).save();
		res.status(200).json(newPerson);
	}catch(error){
		next(error);
	}
    
};

const update = async (req, res, next) => {
	const { id } = req.params;
	const { name, number } = req.body;
	const updatedPerson = { name, number };
	try{
		const returnedPerson = await Person.findByIdAndUpdate(
			id, 
			updatedPerson, 
			{ new: true, runValidators: true, context: 'query' }
		);
		res.status(200).json(returnedPerson);
	}catch(error){
		next(error);
	}
};

const deleteSingle = async (req, res) => {
	const { id } = req.params;
	await Person.findByIdAndRemove(id);
	res.status(204).end();
};

module.exports = {
	getInfo,
	getAll,
	getSingle,
	create,
	update,
	deleteSingle
};