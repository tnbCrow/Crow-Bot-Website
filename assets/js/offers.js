const offersRow = document.getElementById('offers-row');

fetch('https://tnbcrow-bot.commandokoala.com/trade-offers?format=json').then(response => response.json()).then(offers => {
    console.log(offers);
    if(offers.length > 0) {
        offers.forEach(offer => {
            offersRow.innerHTML += `<div class="col-md-4 pt-2 d-flex align-items-stretch">
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
        </div>`
        })
    }
}).catch(error => {
    console.error(error);
})