const READ_COLOR = 'blue accent-4';
const UNREAD_COLOR = 'blue accent-1';
const DELETE_COLOR = 'red darken-2';

const myLibrary = [];
const BOOK_PROPERTIES = ['title', 'author', 'pages', 'status'];

function Book(title, author, pages, status = 'Unread') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// local storage

const populateLocalstorage = () => {
  const tmp = [];
  tmp.push(new Book('The Denial of Death', 'Ernest Becker', 336, 'Read'));
  tmp.push(new Book('Meditations', 'Marcus Aurelius', 200));
  localStorage.myLibrary = JSON.stringify(tmp);
};

if (!localStorage.getItem('myLibrary')) {
  populateLocalstorage();
}

const storeLocal = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

const fetchLocal = () => {
  JSON.parse(localStorage.myLibrary).forEach((bookDetails) => {
    myLibrary.push(new Book(...Object.values(bookDetails)));
  });
};

// App Logic

fetchLocal();

Book.prototype.toggleStatus = function toggleStatus() {
  this.status = this.status === 'Unread' ? 'Read' : 'Unread';
  storeLocal();
};

const addBookToLibrary = (book) => {
  myLibrary.push(book);
  storeLocal();
};
const deleteBookFromLibrary = (bookIndex) => {
  myLibrary.splice(bookIndex, 1);
  storeLocal();
};

// Dom Manipulation

const renderBook = (book, index) => {
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
};

const render = () => {
  let html = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    html += renderBook(myLibrary[i], i);
  }
  document.getElementById('table').innerHTML = html;
  // eslint-disable-next-line no-use-before-define
  bookListen();
};

const updateStatusListener = () => {
  const updateButtons = Array.from(document.getElementsByClassName('update'));
  updateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      myLibrary[button.id].toggleStatus();
      render();
    });
  });
};

const delteBookListener = () => {
  const deleteButtons = Array.from(document.getElementsByClassName('delete'));
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      deleteBookFromLibrary(button.id);
      render();
    });
  });
};

const bookListen = () => {
  updateStatusListener();
  delteBookListener();
};

const newBookListener = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    // eslint-disable-next-line no-undef
    M.Modal.init(elems);
  });
};

const submitFormListener = () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const values = [...form.elements].map((element) => element.value);
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
};
newBookListener();
submitFormListener();

render();
