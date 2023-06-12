let myLibrary = [];
let libraryIndex = 0;
//create books
addBookToLibrary(
  "That Guy",
  "How to win friends and influence people",
  libraryIndex,
  false
);
addBookToLibrary(
  "Scary Man",
  "Things that go bump in the night",
  libraryIndex,
  false
);
addBookToLibrary("Mark Ransom", "Never to be told", libraryIndex, false);

console.log(myLibrary);

function Book(author, title, index, isRead) {
  this.author = author;
  this.title = title;
  this.index = index;
  this.isRead = isRead;

  this.toggleRead = function () {
    console.log("index is : " + this.index);
    let book = myLibrary[this.index];
    book.isRead = !book.isRead;
    let isReadHeading = document.getElementById(String(this.index) + "isRead");
    isReadHeading.textContent = this.isRead;
  };

  this.createBookDiv = function () {
    let bookDiv = document.createElement("div");
    bookDiv.id = index;
    bookDiv.className = "book";
    let title = document.createElement("div");
    let author = document.createElement("div");
    let isReadDiv = document.createElement("div");
    let bookTitle = document.createElement("h3");
    let bookAuthor = document.createElement("h4");
    let isRead = document.createElement("h4");
    isRead.id = String(this.index) + "isRead";

    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    isRead.textContent = String(this.isRead);
    title.append(bookTitle);
    author.append(bookAuthor);
    isReadDiv.append(isRead);
    bookDiv.append(bookTitle);
    bookDiv.append(bookAuthor);
    bookDiv.append(isReadDiv);

    removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";
    removeBook.addEventListener("click", removeBookFromLibrary);
    bookDiv.append(removeBook);

    isRead = document.createElement("button");
    isRead.textContent = "Read Toggle";
    isRead.addEventListener("click", toggleRead);
    bookDiv.append(isRead);

    return bookDiv;
  };
}

function toggleRead(event) {
  let bookDiv = event.srcElement.parentNode;
  let book = myLibrary[bookDiv.id];
  console.log("ISREAD: " + book.isRead);
  book.toggleRead();
  console.log("Ran Toggle, now book isread: " + book.isRead);
}

function removeBookFromLibrary(event) {
  console.log(event);
  // let parent = event.srcElement.parentNode;
  console.log(event.srcElement.parentNode);
  let content = document.getElementById("content");
  content.removeChild(event.srcElement.parentNode);
  // console.log(parent);
}

function addBookToLibrary(author, title, index, isRead) {
  let newBook = new Book(author, title, index, isRead);
  myLibrary.push(newBook);
  console.log(libraryIndex);
  libraryIndex = ++libraryIndex;
  console.log(libraryIndex);
}

function addBookButtonDiv() {
  let addBookButton = document.createElement("button");
  addBookButton.textContent = "add book";
  libraryViewer.append(addBookButton);
}

function createBook(event) {
  console.log(event);
  event.preventDefault();
  const form = document.getElementById("addBookForm");
  const formData = new FormData(form);
  let title = "";
  let author = "";
  for (const pair of formData.entries()) {
    if (pair[0] == "author") {
      author = pair[1];
    }
    if (pair[0] == "bookTitle") {
      title = pair[1];
    }
  }

  let newBook = new Book(author, title, libraryIndex, false);
  console.log(newBook);
  addBookToLibrary(newBook);
  libraryContent.appendChild(newBook.createBookDiv());
}

function createAddBookForm() {
  let addBookForm = document.createElement("form");
  addBookForm.id = "addBookForm";

  let title = document.createElement("p");
  title.textContent = "Add New Book Form";

  let author = document.createElement("input");
  author.setAttribute("type", "text");
  author.setAttribute("name", "author");
  author.setAttribute("placeholder", "Author");

  let bookTitle = document.createElement("input");
  bookTitle.setAttribute("type", "text");
  bookTitle.setAttribute("name", "bookTitle");
  bookTitle.setAttribute("placeholder", "Book Title");

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  submit.id = "bookSubmit";

  addBookForm.append(title);
  addBookForm.append(author);
  addBookForm.append(bookTitle);
  addBookForm.append(submit);

  //add the event listener
  addBookForm.addEventListener("submit", createBook);
  console.log("STUFF");

  libraryViewer.append(addBookForm);
}

const libraryViewer = document.getElementById("library");
const libraryContent = document.getElementById("content");

// create the div for the book, appending the title and author
for (let i = 0; i < myLibrary.length; i++) {
  console.log(myLibrary[i]);
  libraryContent.appendChild(myLibrary[i].createBookDiv());
}

addBookButtonDiv();
createAddBookForm();
