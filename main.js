class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    static displayBooks() {
        // const books = [
        //     { title: 'Good Guy', author: 'Henry Bravestone', isbn:'12345' },
        //     { title: 'Bad Guy', author: 'Stacy Clavert', isbn: '1234' }
        // ];
        const kitab = store.getBook();
        console.log(kitab);
        kitab.forEach((book)=>UI.addBooktoList(book))
    }
    static addBooktoList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
        <td><a href="#" class="btn btn-primary btn-md update">U</a></td>
                        ` ;("+")
        list.appendChild(row);
    }
    static showAlertMessage(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }
    static clearField(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";    
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            if(confirm("Are you sure you want to delete this?")){
                el.parentElement.parentElement.remove();
                UI.showAlertMessage('Books deleted successfully','danger');
            }
        }
    
    }
    static updateBook(el){
       if(el.classList.contains('update')){
        if(confirm("Are yo sure you want to make changes? Your current progress will be lost!")){
            let isbn = el.parentElement.previousElementSibling.previousElementSibling.textContent;
            let author = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            let title = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            console.log(el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
            document.getElementById("title").value = title;
            document.getElementById("author").value = author;
            document.getElementById("isbn").value = isbn;
            el.parentElement.parentElement.remove();
            UI.showAlertMessage('Books Update successfully','info');
        }
        }
    }
}

class store{
    static getBook(){
        let b;
        if(localStorage.getItem('book')===null){
            b = [];
        }
        else{
            b = JSON.parse(localStorage.getItem('book'));
        }
        return b;
    }
    static addBook(localbook){
        const books = store.getBook();
        console.log(books);
        books.push(localbook);
        localStorage.setItem("book",JSON.stringify(books));
    }
    static removeBook(isbn1){
        const kitab = store.getBook();
        console.log("kitab"+kitab);
        kitab.forEach((books,index)=>{
            // console.log(books.isbn+"--"+isbn1);
            if(books.isbn === isbn1){
                kitab.splice(index,1);
            }
        })
        localStorage.setItem('book',JSON.stringify(kitab));
    }
}

// document.addEventListener('DOMContentLoaded', UI.displayBooks());
// console.log('hello');
document.querySelector("#book-form").addEventListener('submit',function (p) {
    p.preventDefault();
//    console.log('hello sir');
    const title = document.getElementById("title").value;
//    console.log(title);
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    if(title==""||author==""||isbn=="")
        UI.showAlertMessage('Please fill all the fields!','primary')
   
   else{
    // console.log(title+"--"+author+"--"+isbn);
    const book = new Book(title,author,isbn);
    UI.addBooktoList(book);
    store.addBook(book);
    UI.clearField();
    UI.showAlertMessage('Books added successfully','success');}
})
document.querySelector("#book-list").addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    console.log(e.target.parentElement.previousElementSibling.innerText);
    UI.updateBook(e.target);
    console.log(e.target);                       
    //UI.showMessage();
})


