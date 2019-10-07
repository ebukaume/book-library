const myLibrary = [];


// App Logic

function Book(title, author, pages, status='Unread') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function updateBookStatus(book) {
    book.status = book.status == 'Unread' ? 'Read' : 'Unread'
}

function deleteBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1)
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

    bookListen()
}

function renderBook(book, index) {
    let html = "<tr>";
    for (let data in book) {
        if (data == 'status'){
            html += `<td><button class='update' id=${index}>${book.status}</button></td>`
        }else {
            html += `<td>${book[data]}</td>`;
        }
    }
    delete_book_button = `<td><button class='delete' id=${index}>Delete Book</button></td>`;
    return html + delete_book_button + "</tr>"
}

function bookListen() {
    updateStatusListener()

    delteBookListener()
}

function updateStatusListener() {
    const updateButtons = document.getElementsByClassName("update");

    for (let button of updateButtons) {
        button.addEventListener("click", function () {
            updateBookStatus(myLibrary[button.id])
            render()
        });
    }
}

function delteBookListener() {
    const deleteButtons = document.getElementsByClassName("delete");

    for (let button of deleteButtons) {
        button.addEventListener("click", function () {
            deleteBookFromLibrary(button.id)
            render()
        });
    }
}

function addBookListener() {
    document.getElementById('add-book').addEventListener("click", function (e) {
        document.getElementById("new-book").classList.toggle("hide")
    });
}

function submitFormListener() {
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();
        form = document.getElementById('form')
        values = [...form.elements].map(element => element.value)
        book = new Book(...values)
        addBookToLibrary(book);
        form.reset();
        render();
    })
}

addBookListener()
submitFormListener()

render()
