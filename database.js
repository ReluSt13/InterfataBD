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
app.get("/views/cautacarte.ejs", function(req, res) {
    var genuri = [];
    var categorii = [];
    var limbi = [];
    var locații = [];
    con.query('SELECT idGen, numeGen FROM proiectbd.gen order by idGen', function(err, result, fields) {
        if(err) throw err;
        result.forEach(function (element) {
            genuri.push({
                idGen: element.idGen,
                numeGen: element.numeGen
            });
        }, this);
        console.log(genuri);
        con.query('SELECT idCategorie, numeCategorie FROM proiectbd.categorie order by idCategorie', function(err, result, fields) {
            if(err) throw err;
            result.forEach(function (element) {
                categorii.push({
                    idCategorie: element.idCategorie,
                    numeCategorie: element.numeCategorie
                });
            }, this);
            console.log(categorii);
            con.query('SELECT idLimbă, numeLimbă FROM proiectbd.limbă order by idLimbă', function(err, result, fields) {
                if(err) throw err;
                result.forEach(function (element) {
                    limbi.push({
                        idLimbă: element.idLimbă,
                        numeLimbă: element.numeLimbă
                    });
                }, this);
                console.log(limbi);
                con.query('SELECT idLocație, Cameră FROM proiectbd.locație order by idLocație', function(err, result, fields) {
                    if(err) throw err;
                    result.forEach(function (element) {
                        locații.push({
                            idLocație: element.idLocație,
                            Cameră: element.Cameră
                        });
                    }, this);
                    console.log(locații);
                    res.render("views/cautacarte.ejs", {cauta_ui: null, gen_ui: genuri, categ_ui: categorii, limba_ui: limbi, locație_ui: locații});
                });
            });
        });  
    }); 
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

app.post("/adaugaCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;

    if(fields.idCategorie == '') {
        sql = "INSERT INTO proiectbd.carte " +
        "values ('" + fields.idCarte + "', '" + fields.Titlu + "', null);";
    }
    else {
        sql = "INSERT INTO proiectbd.carte " +
        "values ('" + fields.idCarte + "', '" + fields.Titlu + "', '" + fields.idCategorie + "');";
    }

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Carte adaugata!");
        res.redirect('/views/carte.ejs');
      });
    });
});

app.post("/updateCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;

    if(fields.idCategorie == '') {
        sql = "UPDATE proiectbd.carte " +
        "SET idCarte = '" + fields.idCarte + "', Titlu = '" + fields.Titlu + "', idCategorie = null WHERE idCarte = '" + 
        fields.idCarteV + "';";
    }
    else {
        sql = "UPDATE proiectbd.carte " +
        "SET idCarte = '" + fields.idCarte + "', Titlu = '" + fields.Titlu + "', idCategorie = '" + fields.idCategorie + "'" +
        "WHERE idCarte = '" + fields.idCarteV + "';"; 
        
    }

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(sql);
  
        console.log("Carte updatata!");
        res.redirect('/views/carte.ejs');
      });
    });
});

app.post("/deleteCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql = "DELETE FROM proiectbd.carte WHERE idCarte = '" + fields.idCarteV + "';";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(sql);
  
        console.log("Carte stearsa!");
        res.redirect('/views/carte.ejs');
      });
    });
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

app.post("/adaugaAutor", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;

    if(fields.DataNașterii == '') {
        sql = "INSERT INTO proiectbd.autor " +
        "values ('" + fields.idAutor + "', '" + fields.Nume + "', '" + fields.Prenume + "', null);";
    }
    else {
        sql = "INSERT INTO proiectbd.autor " +
        "values ('" + fields.idAutor + "', '" + fields.Nume + "', '" + fields.Prenume + "', '" +
        fields.DataNașterii + "');";
    }

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Autor adaugat!");
        res.redirect('/views/autor.ejs');
      });
    });
});

app.post("/updateAutor", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;

    if(fields.DataNașterii == '') {
        sql = "UPDATE proiectbd.autor " +
        "SET idAutor = '" + fields.idAutor + "', Nume = '" + fields.Nume + "', Prenume = '" + fields.Prenume + "', DataNașterii = null WHERE idAutor = '" + 
        fields.idAutorV + "';";
    }
    else {
        sql = "UPDATE proiectbd.autor " +
        "SET idAutor = '" + fields.idAutor + "', Nume = '" + fields.Nume + "', Prenume = '" + fields.Prenume + "', DataNașterii = '" + fields.DataNașterii +
        "' WHERE idAutor = '" + fields.idAutorV + "';";
        
    }

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(sql);
  
        console.log("Autor updatat!");
        res.redirect('/views/autor.ejs');
      });
    });
});

app.post("/deleteAutor", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "DELETE FROM proiectbd.autor WHERE idAutor = '" + fields.idAutorV + "';";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Autor sters!");
        res.redirect('/views/autor.ejs');
      });
    });
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

app.post("/adaugaCategorie", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "INSERT INTO proiectbd.categorie values ('" + fields.idCategorie + "', '" + fields.numeCategorie + "');";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Categorie adaugata!");
        res.redirect('/views/categorie.ejs');
      });
    });
});

app.post("/deleteCategorie", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "DELETE FROM proiectbd.categorie WHERE idCategorie = '" + fields.idCategorieV + "';";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Categorie stearsa!");
        res.redirect('/views/categorie.ejs');
      });
    });
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

app.post("/adaugaGen", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "INSERT INTO proiectbd.gen values ('" + fields.idGen + "', '" + fields.numeGen + "');";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Gen adaugat!");
        res.redirect('/views/gen.ejs');
      });
    });
});

app.post("/deleteGen", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "DELETE FROM proiectbd.gen WHERE idGen = '" + fields.idGenV + "';";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Gen sters!");
        res.redirect('/views/gen.ejs');
      });
    });
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

app.post("/adaugaEditura", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "INSERT INTO proiectbd.editură " +
        "values ('" + fields.idEditură + "', '" + fields.numeEditură + "', '" + fields.Oraș + "');";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Editură adaugată!");
        res.redirect('/views/editura.ejs');
      });
    });
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

app.post("/adaugaLocatie", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "INSERT INTO proiectbd.locație values ('" + fields.idLocație + "', '" + fields.Cameră + "');";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Cameră adaugată!");
        res.redirect('/views/locatie.ejs');
      });
    });
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

app.post("/adaugaLimba", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

    var sql = "INSERT INTO proiectbd.limbă values ('" + fields.idLimbă + "', '" + fields.numeLimbă + "');";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        console.log("Limbă adaugată!");
        res.redirect('/views/limba.ejs');
      });
    });
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

app.post("/adaugaAutorCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;
    if(fields.pozAutor == '') {
        sql = "INSERT INTO proiectbd.autorcarte " +
            "values ('" + fields.idAutor + "', '" + fields.idCarte + "', null);";
    }else {
        sql = "INSERT INTO proiectbd.autorcarte " +
            "values ('" + fields.idAutor + "', '" + fields.idCarte + "', '" + fields.pozAutor + "');";
    }
    
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        res.redirect('/views/autorcarte.ejs');
      });
    });
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

app.post("/adaugaGenCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;
    if(fields.pozGen == '') {
        sql = "INSERT INTO proiectbd.gencarte " +
            "values ('" + fields.idGen + "', '" + fields.idCarte + "', null);";
    }else {
        sql = "INSERT INTO proiectbd.gencarte " +
            "values ('" + fields.idGen + "', '" + fields.idCarte + "', '" + fields.pozGen + "');";
    }
    
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        res.redirect('/views/gencarte.ejs');
      });
    });
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

app.post("/adaugaInstantaCarte", function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var sql;
    if(fields.nrPagini == '') {
        sql = "INSERT INTO proiectbd.instanțăcarte " +
            "values ('" + fields.ISBN + "', '" + fields.idCarte +
            "', '" + fields.idEditură + "', '" + fields.idLocație +
            "', '" + fields.idLimbă + "', null);";
    }else {
        sql = "INSERT INTO proiectbd.instanțăcarte " +
            "values ('" + fields.ISBN + "', '" + fields.idCarte +
            "', '" + fields.idEditură + "', '" + fields.idLocație +
            "', '" + fields.idLimbă + "', '" + fields.nrPagini + "');";
    }
    
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
  
        res.redirect('/views/instantacarte.ejs');
      });
    });
});


app.post("/cautaCarte", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var sql = 'select Titlu, Nume, Prenume, numeEditură, Cameră, numeLimbă, numeCategorie, numeGen, nrPagini ' +
            'from proiectbd.carte join proiectbd.instanțăcarte using(idCarte)' +
            ' join proiectbd.editură using(idEditură)' +
            ' join proiectbd.limbă using(idLimbă)' +
            ' join proiectbd.locație using(idLocație)' +
            ' join proiectbd.autorcarte using(idCarte)' +
            ' join proiectbd.autor using(idAutor)' +
            ' join proiectbd.gencarte using(idCarte)' +
            ' join proiectbd.gen using (idGen)' +
            ' join proiectbd.categorie using(idCategorie)' + 
            " where numeGen like '%" + fields.gen + "%' and numeCategorie like '%" + fields.categorie +
            "%' and numeLimbă like '%" + fields.limba + "%' and Cameră like '%" + fields.locatie +
            "%' and lower(Titlu) like '%" + fields.Titlu.toLowerCase() + "%' and lower(Nume) like '%" + fields.Nume.toLowerCase() +
            "%' and lower(Prenume) like '%" + fields.Prenume.toLowerCase() + "%' and lower(numeEditură) like '%" + fields.Editură.toLowerCase() + "%';" 
        
            con.query(sql, function(err, result, fields) {
                if(err) throw err;
        
                var cartiGasite = [];
                
                result.forEach(function (element) {
                    cartiGasite.push({
                        Titlu: element.Titlu,
                        Nume: element.Nume,
                        Prenume: element.Prenume,
                        numeEditură: element.numeEditură,
                        Cameră: element.Cameră,
                        numeLimbă: element.numeLimbă,
                        numeCategorie: element.numeCategorie,
                        numeGen: element.numeGen,
                        nrPagini: element.nrPagini
                    });
                }, this);
        
                console.log(sql);
                var genuri = [];
                var categorii = [];
                var limbi = [];
                var locații = [];
                con.query('SELECT idGen, numeGen FROM proiectbd.gen order by idGen', function(err, result, fields) {
                    if(err) throw err;
                    result.forEach(function (element) {
                        genuri.push({
                            idGen: element.idGen,
                            numeGen: element.numeGen
                        });
                    }, this);
                    console.log(genuri);
                    con.query('SELECT idCategorie, numeCategorie FROM proiectbd.categorie order by idCategorie', function(err, result, fields) {
                        if(err) throw err;
                        result.forEach(function (element) {
                            categorii.push({
                                idCategorie: element.idCategorie,
                                numeCategorie: element.numeCategorie
                            });
                        }, this);
                        console.log(categorii);
                        con.query('SELECT idLimbă, numeLimbă FROM proiectbd.limbă order by idLimbă', function(err, result, fields) {
                            if(err) throw err;
                            result.forEach(function (element) {
                                limbi.push({
                                    idLimbă: element.idLimbă,
                                    numeLimbă: element.numeLimbă
                                });
                            }, this);
                            console.log(limbi);
                            con.query('SELECT idLocație, Cameră FROM proiectbd.locație order by idLocație', function(err, result, fields) {
                                if(err) throw err;
                                result.forEach(function (element) {
                                    locații.push({
                                        idLocație: element.idLocație,
                                        Cameră: element.Cameră
                                    });
                                }, this);
                                console.log(locații);
                                res.render("views/cautacarte.ejs", {cauta_ui: cartiGasite, gen_ui: genuri, categ_ui: categorii, limba_ui: limbi, locație_ui: locații });
                            });
                        });
                    });  
                });
                
            })
        
    });
    
});

app.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong!", error);
    }
    else {
        console.log("Server is on port " + port);
    }
});