let connection = require('../config/db.js');
let apiController = {};

apiController.getListaCoches = (req, res) =>{
    res.send('getListaCoches');
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