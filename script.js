let myLibrary = [];

function Book(id, title, author, pages, read) {
    // Constructor
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    // Create a book then store it in the array
    const uuid = crypto.randomUUID();
    const new_book = new Book(uuid, title, author, pages, read);
    myLibrary.push(new_book);

    displayBooks();
}

function displayBooks() {
    const booksGrid = document.querySelector(".books-grid");
    booksGrid.replaceChildren();

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = book.id;

        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";

        const cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        cardTitle.textContent = book.title;

        const delButton = document.createElement("button");
        delButton.className = "del-btn"; 
        delButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
        `;
        delButton.onclick = () => removeBook(book.id);

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(delButton);

        const cardAuthor = document.createElement("div");
        cardAuthor.className = "card-author";
        cardAuthor.textContent = `by ${book.author}`;

        const pages = document.createElement("div");
        pages.className = "pages";
        pages.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" /></svg>
        `;

        const pageSpan = document.createElement("span");
        pageSpan.textContent = `${book.pages} pages`;
        pages.appendChild(pageSpan);

        const statusButton = document.createElement("button");
        statusButton.className = "status";
        if (book.read) {
            statusButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>
            `;
        } else {
            statusButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            `;
        }
        const statusSpan = document.createElement("span");
        statusSpan.textContent = book.read ? "Finished" : "Mark as read";
        if (book.read) {
            statusButton.classList.add("success");
        } else {
            statusButton.classList.add("failure");
        }

        statusButton.appendChild(statusSpan);

        card.appendChild(cardHeader);
        card.appendChild(cardAuthor);
        card.appendChild(pages);
        card.appendChild(statusButton);

        booksGrid.appendChild(card);
    })
}

window.onload = () => {
    addBookToLibrary("12 Rules for Life: An antidote to chaos", "Jordan Peterson", 451, false);
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
}

// Functionality of add button
const addButton = document.querySelector(".add-button");
const dialog = document.getElementById("dialog");
const closeBtn = document.querySelector(".close-btn");
const sendBtn = document.querySelector(".submit-btn");

// Form data
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("no-pages");
const formCheckBox = document.querySelector(".inp-cbx");
const form = document.querySelector("form");


//Show modal
addButton.addEventListener("click", () => {
    dialog.showModal();
});

// CLose modal
closeBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

sendBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formCheckBox.checked);
    dialog.close();
    form.reset();
});

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id != id);
    console.log(`id is ${id}`);

    displayBooks();
}
