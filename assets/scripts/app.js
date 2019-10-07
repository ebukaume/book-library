const myLibrary = [];


// App Logic

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read =Boolean(Number(read));
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// populate temporarily

for (let i = 0; i < 10; i++) {
    pages = [121, 232, 100, 200, 1342, 141, 3141, 123, 100, 109];
    let book = new Book(`title ${i}`, `author ${i}`, pages[i]);
    addBookToLibrary(book)
}

// Dom Manipulation

function render() {
    let html = "";
    for (let bookIndex in myLibrary) {
        html += renderBook(myLibrary[bookIndex], bookIndex);
    }
    document.getElementById('table').innerHTML = html;
}

function renderBook(book, index) {
    let html = "<tr>";
    for (let data in book) {
        html += `<td>${book[data]}</td>`;
    }
    html += `<td><button class='delete' data=${index}>Delete Book</button></td>`;
    return html + "</tr>"
}

function listen(){
    const addBook = document.getElementById('add-book');
    addBook.addEventListener("click", function(e) {
        document.getElementById("new-book").classList.toggle("hide")
    });

    const sumbitListner = document.getElementById("submit");
    sumbitListner.addEventListener("click", function(e) {
        e.preventDefault();
        submitBookData();
    })

    const deleteButtons = document.getElementsByClassName("delete");

    for(let button of deleteButtons) {
        // book = getBookByIndex(button)
        button.addEventListener("click", function() { deleteBookFromLibrary(button)});
    }
}

function deleteBookFromLibrary(button) {
    console.log(button.getAttributes
}

function submitBookData() {
    form = document.getElementById('form')
    values = [...form.elements].map(element => element.value)
    book = new Book(...values)
    addBookToLibrary(book);
    form.reset();
    render();
}

render()
listen()


