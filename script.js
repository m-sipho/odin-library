const myLibrary = [];

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
}