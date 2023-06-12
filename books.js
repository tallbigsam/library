let myLibrary = [];

//create books
let friendsBook = new Book(
  "That Guy",
  "How to win friends and influence people"
);
let scaryBook = new Book("Scary Man", "Things that go bump in the night");
let adviceBook = new Book("Mark Ransom", "Never to be told");
addBookToLibrary(friendsBook);
addBookToLibrary(scaryBook);
addBookToLibrary(adviceBook);

function Book(author, title) {
  this.author = author;
  this.title = title;

  this.createBookDiv = function () {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    let title = document.createElement("div");
    let author = document.createElement("div");
    let bookTitle = document.createElement("h3");
    let bookAuthor = document.createElement("h4");
    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    title.append(bookTitle);
    author.append(bookAuthor);
    bookDiv.append(bookTitle);
    bookDiv.append(bookAuthor);

    return bookDiv;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
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
  console.log(title);
  console.log(author);

  let newBook = new Book(author, title);
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
