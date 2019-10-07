const myLibrary = [];
const BOOK_PROPERTIES = ['title', 'author', 'pages', 'status'];
const READ_COLOR = 'blue accent-4'
const UNREAD_COLOR = 'blue accent-1'
const DELETE_COLOR = 'red darken-2'

// App Logic

function Book(title, author, pages, status = 'Unread') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
};
Book.prototype.toggleStatus = function () {
  this.status = this.status == 'Unread' ? 'Read' : 'Unread';
};

function addBookToLibrary(book) {
  myLibrary.push(book);
};

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1)
};
// populate temporarily

for (let i = 0; i < 10; i++) {
  pages = [121, 232, 100, 200, 1342, 141, 3141, 123, 100, 109];
  let book = new Book(`title ${i}`, `author ${i}`, pages[i]);
  addBookToLibrary(book)
};
// Dom Manipulation

function render() {
  let html = "";
  for (let bookIndex in myLibrary) {
    html += renderBook(myLibrary[bookIndex], bookIndex);
  };
  document.getElementById('table').innerHTML = html;

  bookListen()
};

function renderBook(book, index) {
  let html = "<tr>";
  for (let data of BOOK_PROPERTIES) {
    if (data == 'status') {
      status = book[data]
      color = status == 'Read' ? READ_COLOR : UNREAD_COLOR
      html += `<td><a class="update waves-effect waves-light btn ${color}" id=${index}>${status}</a></td>`
    } else {
      html += `<td>${book[data]}</td>`;
    };
  };
  delete_book_button = `<td><a class="delete waves-effect waves-light btn ${DELETE_COLOR}" id=${index}>Delete Book</a></td>`;
  return html + delete_book_button + "</tr>"
};

function bookListen() {
  updateStatusListener()

  delteBookListener()
};

function updateStatusListener() {
  const updateButtons = document.getElementsByClassName("update");

  for (let button of updateButtons) {
    button.addEventListener("click", function () {
      myLibrary[button.id].toggleStatus();
      render()
    });
  };
};

function delteBookListener() {
  const deleteButtons = document.getElementsByClassName("delete");

  for (let button of deleteButtons) {
    button.addEventListener("click", function () {
      deleteBookFromLibrary(button.id)
      render()
    });
  };
};

function newBookListener() {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
};

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


  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
};
newBookListener()
submitFormListener()

render()