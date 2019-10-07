const myLibrary = [];


// App Logic

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// populate temporarily

for (let i = 0; i <= 10; i++) {
    let book = new Book(`title ${i}`, `author ${i}`, `pages ${i}`)
    addBookToLibrary(book)
}

// Dom Manipulation

function render() {
    for (let book of myLibrary) {
        document.getElementById('table').innerHTML = renderBook(book)
    }
}

function renderBook(book) {
    return `title: ${book.title} author: ${book.author} 
    pages: ${book.pages} read: ${book.read}`
}

render()