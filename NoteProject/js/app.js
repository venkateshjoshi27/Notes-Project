console.log('Welcome to app.js');
showNotes();

// If user add a note, add it to the localStorage.

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (notes == null || titles == null) {
        notesObj = [];
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    titleObj.push(addTitle.value);
    localStorage.setItem("titles", JSON.stringify(titleObj));
    addTitle.value = "";
    console.log(titleObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    if (notes == null || titles == null) {
        notesObj = [];
        titleObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 card mx-2" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${titleObj[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger btn-sm">Delete Node</button>
                <hr>
                <button type="button" id="markImportant" onclick="markImp(this.id)" class="btn btn-outline-warning btn-sm">Mark Important</button>
                </div>
            </div>
        `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h4>Nothing To Show!!!<h4>`
    }
}

//Function to delete Note

function deleteNote(index) {
    console.log('We are deleting', index);

    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles")
    if (notes == null || titles == null) {
        notesObj = [];
        titleObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
        titleObj = JSON.parse(titles);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    titleObj.splice(index, 1);
    localStorage.setItem("titles", JSON.stringify(titleObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        if ((cardTxt.toLowerCase()).includes(inputVal) || (cardTitle.toLowerCase()).includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})

function markImp(index){
    let impNote = document.getElementById("markImportant");
    let impNoteClass = impNote.className;
    let classImp = "btn-outline-warning";
    let classNotImp = "btn-warning";
    if(impNoteClass.includes(classImp)){
        document.getElementById("markImportant").className="btn btn-warning btn-sm";
        document.getElementById("markImportant").innerText="Unmark";
    }
    else if(impNoteClass.includes(classNotImp)){
        document.getElementById("markImportant").className="btn btn-outline-warning btn-sm";
        document.getElementById("markImportant") .innerText = "Mark Important";
    }
}