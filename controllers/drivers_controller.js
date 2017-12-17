const Driver = require('../models/Driver');

module.exports = {
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates:[lng, lat] },
      { spherical: true, maxDistance: 200000 }
    );
  },
  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
    .then(driver => {
      res.send(driver);
    })
    .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps, { new: true })
    .then((driver) => res.send(driver))
    .catch(next);
  },
  delete(req, res, next) {
    const driverId = req.params.id;
    
    Driver.findByIdAndRemove({ _id: driverId })
    .then(driver => res.status(204).send(driver));
  }
};