const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const readFile = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Dosya okuma hatası:', error);
      return [];
    }
  };
  const jsonFilePath = 'data.json';
  let data = readFile(jsonFilePath) || [];


app.post('/kaydet', (req, res) => {
  const { lat, lng, datetime } = req.body;
  const id = data.length; // ID 

  const newData = { id, lat, lng, datetime };
  data.push(newData);

  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

  res.json(newData);
});

app.get('/indir', (req, res) => {
  res.download(jsonFilePath);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı porta başarıyla başlatıldı.`);
});
