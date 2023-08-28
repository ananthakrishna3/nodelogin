// const express = require('express');
// const app = express();
// const path=require('path');
// app.set("view engine", "ejs");



// app.use(express.static(path.join(__dirname,'static')))
// app.use('/',require(path.join(__dirname,'router/page.js')))



// const PORT = process.env.PORT || 5000;
// app.listen(PORT,()=>console.log(`This server is running on port : ${PORT}`))

// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host : 'db',
//     user : 'qwert',
//     password : '12345',
//     database : 'nodejs'
// });

// db.connect(err => {
//     if(err)
//     {
//         console.error('error connecting to database : ', err);
//     }
//     else
//     {
//         console.log('connected to the database');
//     }
// });

// //  let items = [
// //     {id : 1, name : 'item 1'},
// //     {id : 2, name : 'item 2'},
// // ]

// app.get('/items', (req, res) => {
//     db.query('SELECT * FROM items', (err, results) => {
//         if(err)
//         {
//             console.error('Error retrieving data:', err);
//             res.status(500).json({error : "error getting the data"});
//         }
//         else
//         {
//             res.json(results);
//         }
//     });
// });

// app.post('/items', (req, res) => {
//     const ipitem = req.body;
//     db.query('INSERT INTO items SET ?', ipitem, (err, result) => {
//         if (err) 
//         {
//             res.status(500).json({error : 'error adding the data'});    
//         }
//         else
//         {
//             ipitem.id = result.insertId;
//             res.status(201).json(ipitem);
//         }
//     });
// });

// app.patch('/items/:id', (req, res) => {
//     const idToUpdate = parseInt(req.params.id);
//     const updatedData = req.body;
//     db.query('UPDATE items SET ? WHERE id = ?', [updatedData, idToUpdate], (err) => {
//         if (err) 
//         {
//             res.status(500).json({ error: 'error updating the data' });
//         } else 
//         {
//             res.json(updatedData);
//         }
//     });
// });


// app.delete('/items/:id', (req, res) => {
//     const idToDelete = parseInt(req.params.id);
//     db.query('DELETE FROM items WHERE id = ?', idToDelete, err => {
//         if (err) 
//         {
//             res.status(500).json({ error: 'error deleting the data' });
//         } 
//         else 
//         {
//             res.sendStatus(204);
//         }
//     });
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based version

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const db = mysql.createPool({
    host: 'db',
    user: 'qwert',
    password: '12345',
    database: 'nodejs1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function startApp() {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

app.get('/items', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM items');
        res.json(rows);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: "Error getting the data" });
    }
});

app.post('/items', async (req, res) => {
    const newItem = req.body;
    try {
        const [result] = await db.query('INSERT INTO items SET ?', newItem);
        newItem.id = result.insertId;
        res.status(201).json(newItem);
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Error adding the data' });
    }
});

app.patch('/items/:id', async (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedData = req.body;
    try {
        await db.query('UPDATE items SET ? WHERE id = ?', [updatedData, idToUpdate]);
        res.json(updatedData);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating the data' });
    }
});

app.delete('/items/:id', async (req, res) => {
    const idToDelete = parseInt(req.params.id);
    try {
        await db.query('DELETE FROM items WHERE id = ?', idToDelete);
        res.sendStatus(204);
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Error deleting the data' });
    }
});

startApp();



