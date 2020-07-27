let connection = require('../config/db.js');
let apiController = {};

apiController.getListaCoches = (req, res) =>{    
    let queryAllCars = `select * from coche `;

    connection.query(queryAllCars, (err, dataCars) => {
        if (err) res.status(500).send(err);
        if (dataCars.length == 0) res.status(404).send('Not found');
        res.status(200).json(dataCars);
    });
};

apiController.getCoche = (req, res) =>{
    let queryOneCar = `select * from coche  where coche_id = ${req.params.id}`;

    connection.query(queryOneCar, (err, dataCar) => {
        if (err) res.status(500).send(err);
        if (dataCar.length == 0) res.status(404).send('Not found');
        res.status(200).json(dataCar);
    });
};

apiController.addCoche = (req, res) =>{
    let queryAddCar = `INSERT INTO coche(marca, modelo, color, potencia, puertas) VALUES(?,?,?,?,?)`;
    let {marca, modelo, color, potencia, puertas} = req.body;
    let dataValues = [marca, modelo, color, potencia, puertas];
    connection.query(queryAddCar, dataValues, (err, result) =>{
        if (err) throw err;
        let cocheId = result.insertId;

        let queryOneCar = `select * from coche  where coche_id = ${cocheId}`;
        connection.query(queryOneCar, (err, dataCar) => {
            if (err) res.status(500).send(err);
            if (dataCar.length == 0) res.status(404).send('Not found');
            res.status(200).json(dataCar);
        });

    })
};

apiController.updateCoche = (req, res) =>{
    let coche_id = req.params.id;
    let {marca, modelo, color, potencia, puertas} = req.body;
    let queryUpdate = `UPDATE coche SET marca = '${marca}', modelo = '${modelo}', 
                        color = '${color}', potencia = ${potencia}, puertas = ${puertas} 
                        WHERE coche_id = ${coche_id} `;
                        
    connection.query(queryUpdate, (err, result) => {
        if (err) res.status(500).send(err);
        if (result.length == 0) res.status(404).send('Not found');
        
        let queryOneCar = `select * from coche  where coche_id = ${coche_id}`;
        connection.query(queryOneCar, (err, dataCar) => {
            if (err) res.status(500).send(err);
            if (dataCar.length == 0) res.status(404).send('Not found');
            res.status(200).json(dataCar);
        });
    })

};

apiController.deleteCoche = (req, res) =>{
    let queryOneCar = `delete from coche  where coche_id = ${req.params.id}`;

    connection.query(queryOneCar, (err, dataCar) => {
        if (err) res.status(500).send(false);
        if (dataCar.length == 0) res.status(404).send('Not found')
        res.status(200).send(true);
    });
};

apiController.getListaCochesFiltrada = (req, res) => {

	const modelo = req.query.modelo;
	const marca = req.query.marca;

	let queryAllCars = `SELECT * from coche`;

	if (modelo) {
        queryAllCars += ` WHERE modelo = '${modelo}'`;        
        if (marca) {
            queryAllCars += ` AND marca = '${marca}'`;
        }
	} else if (marca) {
        if (marca) {
            queryAllCars += ` WHERE marca = '${marca}'`;
        }
    }

	connection.query(queryAllCars, (err, dataCars) => {
		if (err) res.status(500).send(err);
		if (dataCars.length == 0) res.status(404).send('Not found');
		res.status(200).json(dataCars);
	});
};

module.exports = apiController;