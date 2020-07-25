let connection = require('../config/db.js');
let apiController = {};

apiController.getListaCoches = (req, res) =>{
    console.log('GET => /getListaCoches');
    
    let queryAllCars = `select * from coche `;

    connection.query(queryAllCars, (err, dataCar) => {
        if (err) res.status(500).send(err);
        if (dataCar.length == 0) res.status(404).send('Not found')
        res.status(200).json({dataCar});
    });
};

apiController.getCoche = (req, res) =>{
    res.send('getCoche');
};

apiController.addCoche = (req, res) =>{
    res.send('addCoche');
};

apiController.updateCoche = (req, res) =>{
    res.send('updateCoche');
};

apiController.deleteCoche = (req, res) =>{
    res.send('deleteCoche');
};
module.exports = apiController;