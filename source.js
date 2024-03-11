

function Book(title, author, pages, readBook){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
    Book.prototype.setID();
    this.BookId = Book.prototype.ID;
    this.info = () => {
        return {
            title : this.title,
            author : this.author,
            pages : this.pages,
            readBook : this.readBook,
            id : this.BookId
        };     
    }
    this.changeReadStatus = () =>{
        this.readBook = !this.readBook;
    }
}

Book.prototype.ID = 0;
Book.prototype.setID = () =>{
    Book.prototype.ID++;
}





let myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
    new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 500, true),
    new Book("The Two Towers", "J.R.R. Tolkien", 550, true),
    new Book("The Return of the King", "J.R.R. Tolkien", 475, true),
];

function addBookToLibrary(book){
    myLibrary.push(book);
}




const modal = document.querySelector("dialog");
const form = document.querySelector(".newBook");
const showDialogButton = document.querySelector(".show-modal");
const addBookButton = document.querySelector(".add-new-book");

showDialogButton.addEventListener("click", () =>{
    modal.showModal();
})

addBookButton.addEventListener("click", (event) =>{
    event.preventDefault();
    addBookToLibrary(new Book(form.elements["title"].value,form.elements["author"].value,form.elements["pageNumber"].value,form.elements["readBook"].checked));
    form.reset();

    modal.close();
    rerenderLibrary(myLibrary)
})

function rerenderLibrary(array, sortBy="title"){
    const library = document.querySelector(".library-container");
    library.innerHTML = "";
    array.forEach(book => {
        library.appendChild(createBookContainer(book.info()));
    });
}

function createBookContainer(book){
    const bookContainer = document.createElement("div");
    bookContainer.setAttribute("BookId", book.id);
    bookContainer.className = "book-container";
    const title = document.createElement("h4");
    title.className = "book-title";
    title.innerText = book.title;
    const author = document.createElement("h5");
    author.className = "author";
    author.innerText = `by ${book.author}`;
    const pages = document.createElement("p");
    pages.className = "pages";
    pages.innerText = `${book.pages} pages`;
    const read = document.createElement("p");
    read.className = "read-yet";
    read.innerText = book.readBook === true ? "You have read this book" : "You have not yet read this book";
    const readButton = createReadButton();
    const deleteButton = createDeleteBookButton();
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(readButton);
    bookContainer.appendChild(deleteButton);
    return bookContainer;
}

function createReadButton(){
    const readButton = document.createElement("button");
    readButton.innerText = "Change read status";
    readButton.className = "change-read-status";
    readButton.addEventListener("click", event =>{
        event.preventDefault();
        const bookNode = event.target.parentNode;
        console.log(bookNode);
        changeReadBook(bookNode.getAttribute("BookId"));
        if(bookNode.childNodes[3].innerText === "You have read this book"){
            bookNode.childNodes[3].innerText = "You have not yet read this book";
        }
        else{
            bookNode.childNodes[3].innerText = "You have read this book";
        }


    })
    return readButton;
}

function createDeleteBookButton(){
    const deleteButton = document.createElement("button");
    
    deleteButton.innerText = "Delete Book";
    deleteButton.className = "delete-book-button";
    deleteButton.addEventListener("click", event =>{
        event.preventDefault();
        const bookNode = event.target.parentNode;

        removeBook(bookNode.getAttribute("BookId"));
        bookNode.remove(bookNode);
    })
    return deleteButton;
}

function changeReadBook(id){
    myLibrary = myLibrary.map(book => {
        if(book.info().id == id){
            book.changeReadStatus();
            return book;
        }
        else{
            return book;
        }
    })
}

function removeBook(id){
    myLibrary = myLibrary.filter(book =>{
        return book.info().id != id;
        
    })

}

window.onload = rerenderLibrary(myLibrary);