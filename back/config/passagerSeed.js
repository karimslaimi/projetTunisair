const fs = require('fs');
const Vol = require('../models/Vol.model');
const Passager = require('../models/Passager.model');
const mongoose = require('mongoose');

fs.readFile('config/Passager.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
   // Connect to the MongoDB database
   await mongoose.connect('mongodb://localhost:27017/tunisair', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const jsonData = JSON.parse(data);

    for (const item of jsonData) {
        const vol = await Vol.findOne({
            num_vol: item.VOL,
            compagnie: item.CIE,
            origine: item.ORIGINE,
            destination: item.DESTINATION
          });

      console.log(vol);

      if (vol) {
        const passager = {
          name: item.PAX,
          vol: vol._id // Assuming the 'vol' object has an '_id' property
        };

        try {
          const newPassager = new Passager(passager);
          const savedPassager = await newPassager.save();
          
          await Vol.findByIdAndUpdate(vol._id, {
            $push: { passagers: savedPassager._id }
          });
        } catch (passagerError) {
          console.error('Error saving Passager:', passagerError);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
