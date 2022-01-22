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