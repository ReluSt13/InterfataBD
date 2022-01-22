function showEdit(i) {
    document.getElementById("idCarteE" + i).style.display = "block";
    document.getElementById("TitluE" + i).style.display = "block";
    document.getElementById("idCategorieE" + i).style.display = "block";
    document.getElementById("idCarte" + i).style.display = "none";
    document.getElementById("Titlu" + i).style.display = "none";
    document.getElementById("idCategorie" + i).style.display = "none";
    document.getElementById("saveB" + i).style.display = "block";
    document.getElementById("cancelB" + i).style.display = "block";
    document.getElementById("editB" + i).style.display = "none";
}

function closeEdit(i) {
    document.getElementById("idCarteE" + i).style.display = "none";
    document.getElementById("TitluE" + i).style.display = "none";
    document.getElementById("idCategorieE" + i).style.display = "none";
    document.getElementById("idCarte" + i).style.display = "block";
    document.getElementById("Titlu" + i).style.display = "block";
    document.getElementById("idCategorie" + i).style.display = "block";
    document.getElementById("saveB" + i).style.display = "none";
    document.getElementById("cancelB" + i).style.display = "none";
    document.getElementById("editB" + i).style.display = "block";
}

function showEditA(i) {
    
    document.getElementById("idAutorE" + i).style.display = "block";
    document.getElementById("NumeE" + i).style.display = "block";
    document.getElementById("PrenumeE" + i).style.display = "block";
    document.getElementById("DataNașteriiE" + i).style.display = "block";
    document.getElementById("idAutor" + i).style.display = "none";
    document.getElementById("Nume" + i).style.display = "none";
    document.getElementById("Prenume" + i).style.display = "none";
    if(document.getElementById("DataNașterii" + i) != null) {
        document.getElementById("DataNașterii" + i).style.display = "none";
    }
    document.getElementById("saveB" + i).style.display = "block";
    document.getElementById("cancelB" + i).style.display = "block";
    document.getElementById("editB" + i).style.display = "none";
    
}

function closeEditA(i) {
    document.getElementById("idAutorE" + i).style.display = "none";
    document.getElementById("NumeE" + i).style.display = "none";
    document.getElementById("PrenumeE" + i).style.display = "none";
    document.getElementById("DataNașteriiE" + i).style.display = "none";
    document.getElementById("idAutor" + i).style.display = "block";
    document.getElementById("Nume" + i).style.display = "block";
    document.getElementById("Prenume" + i).style.display = "block";
    if(document.getElementById("DataNașterii" + i) != null) {
        document.getElementById("DataNașterii" + i).style.display = "block";
    }
    document.getElementById("saveB" + i).style.display = "none";
    document.getElementById("cancelB" + i).style.display = "none";
    document.getElementById("editB" + i).style.display = "block";
}