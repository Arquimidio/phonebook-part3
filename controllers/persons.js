let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => Math.floor(Math.random() * 100000)

const getInfo = (req, res) => {
    const personsCount = persons.length;
    const date = new Date();
    res.status(200).send(`
        <p>Phonebook has info for ${ personsCount } people</p>
        <p>${ date }</p>
    `)
}

const getAll = (req, res) => {
    res.status(200).json(persons);
}

const getSingle = (req, res) => {
    const id = Number(req.params.id);
    const found = persons.find(person => person.id === id);
    if(found){
        res.status(200).json(found);
    }else{
        res.status(404).end();
    }
}

const create = (req, res) => {
    const { body } = req;
    const duplicate = persons.find(person => person.name === body.name);

    if(!body.name || !body.number){
        res.status(400).json({ error: "please provide name and number" });
    }else if(duplicate){
        res.status(400).json({ error: "name must be unique" });
    }else{
        const newPerson = {
            ...body,
            id: generateId()
        }
        persons = persons.concat(newPerson);
        res.status(200).json(newPerson);
    }
}

const deleteSingle = (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
}

module.exports = {
    getInfo,
    getAll,
    getSingle,
    create,
    deleteSingle
}