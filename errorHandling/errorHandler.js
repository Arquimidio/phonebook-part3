const errorHandler = (error, req, res, next) => {
	if(error.name === 'CastError'){
		return res.status(400).send({ error: 'malformatted id' });
	}else if(error.name === 'ValidationError'){
		return res.status(400).json({ message: error.message });
	}
	next(error);
};

const unknownEndPoint = (req, res) => {
	res.status(404).json({ error: 'unknown endpoint' });
};

module.exports = {
	errorHandler,
	unknownEndPoint
};