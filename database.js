var mysql = require('mysql');
const port = 5000; 
const express = require("express");
const formidable = require('formidable');
var path = require('path');

const app = express();
app.set("view engine", "ejs");
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass",
    port: 3306
  });
  

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", function (req, res) {
    res.render("views/index.ejs");
});

app.get("/views/index.ejs", function (req, res) {
    res.render("views/index.ejs");
});

app.get("/views/carte.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.carte order by idCarte', function(err, result, fields) {
        if(err) throw err;

        var carti = [];
        
        result.forEach(function (element) {
            carti.push({
                idCarte: element.idCarte,
                Titlu: element.Titlu,
                idCategorie: element.idCategorie
            });
        }, this);

        console.log(carti);

        res.render("views/carte.ejs", {carti_ui: carti});
    })
});

app.get("/views/autor.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.autor', function(err, result, fields) {
        if(err) throw err;

        var autori = [];
        
        result.forEach(function (element) {
            autori.push({
                idAutor: element.idAutor,
                Nume: element.Nume,
                Prenume: element.Prenume,
                DataNașterii: element.DataNașterii
            });
        }, this);

        console.log(autori);

        res.render("views/autor.ejs", {autori_ui: autori});
    })
});

app.get("/views/categorie.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.categorie order by idCategorie;', function(err, result, fields) {
        if(err) throw err;

        var categorii = [];
        
        result.forEach(function (element) {
            categorii.push({
                idCategorie: element.idCategorie,
                numeCategorie: element.numeCategorie
            });
        }, this);

        console.log(categorii);

        res.render("views/categorie.ejs", {categorii_ui: categorii});
    })
});

app.get("/views/gen.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.gen order by idGen', function(err, result, fields) {
        if(err) throw err;

        var genuri = [];
        
        result.forEach(function (element) {
            genuri.push({
                idGen: element.idGen,
                numeGen: element.numeGen
            });
        }, this);

        console.log(genuri);

        res.render("views/gen.ejs", {genuri_ui: genuri});
    })
});

app.get("/views/editura.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.editură;', function(err, result, fields) {
        if(err) throw err;

        var edituri = [];
        
        result.forEach(function (element) {
            edituri.push({
                idEditură: element.idEditură,
                numeEditură: element.numeEditură,
                Oraș: element.Oraș
            });
        }, this);

        console.log(edituri);

        res.render("views/editura.ejs", {edituri_ui: edituri});
    })
});

app.get("/views/locatie.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.locație order by idLocație', function(err, result, fields) {
        if(err) throw err;

        var locații = [];
        
        result.forEach(function (element) {
            locații.push({
                idLocație: element.idLocație,
                Cameră: element.Cameră
            });
        }, this);

        console.log(locații);

        res.render("views/locatie.ejs", {locații_ui: locații});
    })
});

app.get("/views/limba.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.limbă order by idLimbă', function(err, result, fields) {
        if(err) throw err;

        var limbi = [];
        
        result.forEach(function (element) {
            limbi.push({
                idLimbă: element.idLimbă,
                numeLimbă: element.numeLimbă
            });
        }, this);

        console.log(limbi);

        res.render("views/limba.ejs", {limbi_ui: limbi});
    })
});


app.get("/views/autorcarte.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.autorcarte', function(err, result, fields) {
        if(err) throw err;

        var autorcarte = [];
        
        result.forEach(function (element) {
            autorcarte.push({
                idCarte: element.idCarte,
                idAutor: element.idAutor,
                pozAutor: element.pozAutor
            });
        }, this);

        console.log(autorcarte);

        res.render("views/autorcarte.ejs", {autorcarte_ui: autorcarte});
    })
});

app.get("/views/gencarte.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.gencarte', function(err, result, fields) {
        if(err) throw err;

        var gencarte = [];
        
        result.forEach(function (element) {
            gencarte.push({
                idCarte: element.idCarte,
                idGen: element.idGen,
                pozGen: element.pozGen
            });
        }, this);

        console.log(gencarte);

        res.render("views/gencarte.ejs", {gencarte_ui: gencarte});
    })
});

app.get("/views/instantacarte.ejs", function (req, res) {
    con.query('SELECT * FROM proiectbd.instanțăcarte', function(err, result, fields) {
        if(err) throw err;

        var instantacarte = [];
        
        result.forEach(function (element) {
            instantacarte.push({
                ISBN: element.ISBN,
                idCarte: element.idCarte,
                idEditură: element.idEditură,
                idLocație: element.idLocație,
                idLimbă: element.idLimbă,
                nrPagini: element.nrPagini
            });
        }, this);

        console.log(instantacarte);

        res.render("views/instantacarte.ejs", {instantacarte_ui: instantacarte});
    })
});

app.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong!", error);
    }
    else {
        console.log("Server is on port " + port);
    }
});