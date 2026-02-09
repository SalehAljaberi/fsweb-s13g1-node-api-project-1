// SUNUCUYU BU DOSYAYA KURUN
const express = require('express');
const User = require('./users/model');

const server = express();


server.use(express.json());


server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});


server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});


server.post('/api/users', async (req, res) => {
  const { name, bio } = req.body;
  
  if (!name || !bio) {
    res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    return;
  }

  try {
    const newUser = await User.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});


server.put('/api/users/:id', async (req, res) => {
  const { name, bio } = req.body;
  const { id } = req.params;

  if (!name || !bio) {
    res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    return;
  }

  try {
    const updatedUser = await User.update(id, { name, bio });
    if (!updatedUser) {
      res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});


server.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});


module.exports = server; // SERVERINIZI EXPORT EDİN {}
