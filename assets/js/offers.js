const offersRow = document.getElementById('offers-row');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 15;

fetch('https://tnbcrow-bot.commandokoala.com/trade-offers?format=json').then(response => response.json()).then(offers => {
    if(offers.length > 0) {
        DisplayList(offers, offersRow, rows, current_page);
        SetupPagination(offers, pagination_element, rows);
    } else {
        offersRow.innerHTML = '<div class="my-5">There are no offers made on the tnbCrow discord server!</div>'
    }
}).catch(error => {
    console.error(error);
});

function DisplayList (offers, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedOffers = offers.slice(start, end);

	paginatedOffers.forEach(offer => {

		let offer_element = `<div class="col-md-4 pt-2 d-flex align-items-stretch">
            <div class="card">
                <div class="card-header card-header-text card-header-primary">
                    <div class="card-text">
                        <h4 class="card-title">${offer.discord_username}</h4>
                        <h6 class="float-right">${new Date(offer.created_at).toLocaleString()}</h6>
                    </div>
                </div>
                <div class="card-body">
                    ${offer.message}
                    <div class="float-right font-weight-bold">Updated at ${new Date(offer.updated_at).toLocaleString()}</div>
                </div>
            </div>
        </div>`;
		wrapper.innerHTML += offer_element;
	});
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";
    if(items.length > rows_per_page) {
        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }
}

function PaginationButton (page, items) {
	let button = document.createElement('li');
    button.classList.add('page-item');
	button.innerHTML = `<a class="page-link" href="javascript:;">${page}</a>`;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, offersRow, rows, current_page);

		let current_btn = document.querySelector('.pagination li.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}