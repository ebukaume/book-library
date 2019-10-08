/* eslint-disable no-use-before-define */
/* eslint-disable arrow-parens */
const myLibrary = [];
const BOOK_PROPERTIES = ['title', 'author', 'pages', 'status'];
const READ_COLOR = 'blue accent-4';
const UNREAD_COLOR = 'blue accent-1';
const DELETE_COLOR = 'red darken-2';

// App Logic

function Book(title, author, pages, status = 'Unread') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = function toggleStatus() {
  this.status = this.status === 'Unread' ? 'Read' : 'Unread';
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
}

// populate temporarily

addBookToLibrary(new Book('The Denial of Death', 'Ernest Becker', 336, 'Read'));
addBookToLibrary(new Book('Meditations', 'Marcus Aurelius', 200));


// Dom Manipulation

function renderBook(book, index) {
  let html = '<tr>';
  BOOK_PROPERTIES.forEach((data) => {
    if (data === 'status') {
      const status = book[data];
      const color = status === 'Read' ? READ_COLOR : UNREAD_COLOR;
      html += `<td><a class="update waves-effect waves-light btn ${color}" id=${index}>${status}</a></td>`;
    } else {
      html += `<td>${book[data]}</td>`;
    }
  });

  const deleteBookButton = `<td><a class="delete waves-effect waves-light btn ${DELETE_COLOR}" id=${index}>Delete Book</a></td>`;
  return `${html + deleteBookButton}</tr>`;
}

function render() {
  let html = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    html += renderBook(myLibrary[i], i);
  }
  document.getElementById('table').innerHTML = html;

  bookListen();
}

function updateStatusListener() {
  const updateButtons = Array.from(document.getElementsByClassName('update'));
  updateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      myLibrary[button.id].toggleStatus();
      render();
    });
  });
}

function delteBookListener() {
  const deleteButtons = Array.from(document.getElementsByClassName('delete'));
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      deleteBookFromLibrary(button.id);
      render();
    });
  });
}

function bookListen() {
  updateStatusListener();
  delteBookListener();
}

function newBookListener() {
  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    // eslint-disable-next-line no-undef
    M.Modal.init(elems);
  });
}

function submitFormListener() {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = [...form.elements].map(element => element.value);
    addBookToLibrary(new Book(...values));
    form.reset();
    // eslint-disable-next-line no-undef
    M.Modal.getInstance(document.getElementById('new-book')).close();
    render();
  });


  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('select');
    // eslint-disable-next-line no-undef
    M.FormSelect.init(elems);
  });
}
newBookListener();
submitFormListener();

render();
