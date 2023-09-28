const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3001;

  app.use(cors());
  app.use(helmet());
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

app.post('/sil', (req, res) => {
  const { id } = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Belirtilen ID ile öğe bulunamadı' });
  }

  data.splice(index, 1);

  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
  res.json({ message: 'Öğe başarıyla silindi' });
});

app.get('/veriler', (req, res) => {
  res.json(data);
});

app.get('/indir', (req, res) => {
  res.download(jsonFilePath);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı porta başarıyla başlatıldı.`);
});