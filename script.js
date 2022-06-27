var myLibrary = [];

if(!localStorage.getItem('myLibArray')) {
	localStorage.setItem('myLibArray', JSON.stringify(myLibrary));
  } else {
	var obj = localStorage.getItem('myLibArray');
	myLibrary =  JSON.parse(obj);
  }

const mainFeed = document.getElementById('main-feed');
const mainForm = document.getElementsByName('submitBook')[0];

class Book {

    constructor( title, author, pages, readStatus ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

}

function addBookToLibrary( book ) {
	myLibrary.push( book );
	localStorage.setItem('myLibArray', JSON.stringify(myLibrary));
	render();
}

function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
	localStorage.setItem('myLibArray', JSON.stringify(myLibrary));
	render();
}

function toggleRead(index) {
	myLibrary[index]['readStatus'] = !myLibrary[index]['readStatus'];
	localStorage.setItem('myLibArray', JSON.stringify(myLibrary));
	render();
}

function submitForm() {
	let title = document.getElementById('book-title').value;
	let author = document.getElementById('book-author').value;
	let pages = document.getElementById('book-pages').value;
	let readStatus;
	if(document.getElementById('book-read').checked) {
		readStatus = true;
	  }else if(document.getElementById('book-not-read').checked) {
		readStatus = false;
	  }

    let newBook = new Book( title, author, pages, readStatus );

	addBookToLibrary( newBook );

	mainForm.reset();
	return false;
}


function render() {

	mainFeed.innerHTML = '';

	for (let i = myLibrary.length-1; i >= 0; i--) {
		let div = document.createElement('div');
		div.setAttribute('class', 'col-sm-6 col-md-4 ');
		div.innerHTML = `
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">${myLibrary[i].title}</h5>
					<ul>
						<li>Author: ${myLibrary[i].author}</li>
						<li>Pages: ${myLibrary[i].pages}</li>
						<li>Status: ${ (myLibrary[i].readStatus) ? 'Read' : 'Not read' }</li>
					</ul>
					<div class="dflex justify-content-between">
					<div class="btn btn-outline-${ (myLibrary[i].readStatus) ? 'secondary' : 'success' } toggleRead card-button" data-index="${i}">${(myLibrary[i].readStatus) ? 'Mark as unread' : 'Mark as read'}</div>
					<div class="btn btn-outline-danger remove-btn card-button" data-index="${i}">Remove book</div>
					</div>
				</div>
			</div>
		`;
		mainFeed.appendChild(div);	
	}

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach( (button) => {
        button.addEventListener('click', (e) => {
            removeBookFromLibrary(e.target.dataset.index);
        });
    });

    const toggleReadBtns = document.querySelectorAll('.toggleRead');
    toggleReadBtns.forEach( (button) => {
        button.addEventListener('click', (e) => {
            toggleRead(e.target.dataset.index);
        });
    });
}

render();