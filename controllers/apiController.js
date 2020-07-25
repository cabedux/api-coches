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
    res.send('updateCoche');
};

apiController.deleteCoche = (req, res) =>{
    let queryOneCar = `delete from coche  where coche_id = ${req.params.id}`;

    connection.query(queryOneCar, (err, dataCar) => {
        if (err) res.status(500).send(false);
        if (dataCar.length == 0) res.status(404).send('Not found')
        res.status(200).send(true);
    });
};

module.exports = apiController;