const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Alle Felder sind erforderlich.' });
    }

    const lead = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    const leadsFilePath = path.join(__dirname, 'api', 'leads.json');
    
    fs.readFile(leadsFilePath, 'utf8', (err, data) => {
        let leads = [];
        if (!err && data) {
            try {
                leads = JSON.parse(data);
            } catch (e) {
                leads = [];
            }
        }
        
        leads.push(lead);

        fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ success: false, message: 'Serverfehler beim Speichern.' });
            }
            res.json({ success: true, message: 'Nachricht erfolgreich gespeichert.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});