const admin = require('firebase-admin')

var serviceAccount = require("../../app-web-shop-999-firebase-adminsdk-ba7n5-c7b3d822a7.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://app-web-shop-999.firebaseio.com/'
});

const db = admin.database();

const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        data = snapshot.val();
        res.render('index', { contacts: data })
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;