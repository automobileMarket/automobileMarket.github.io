import { html } from './lib.js';
import { searchByYear } from '../api/data.js';



const template = (listings, onSearch, year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input type="text" name="search" placeholder="Enter desired production year" .value=${year || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${listings.length != 0 ? listings.map(listingTemplate) : html`<p class="no-cars"> No results.</p>`}
    </div>
</section>`

const listingTemplate = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.make} ${listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listing.year}</h3>
            <h3>Price: ${listing.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`


export async function search(ctx) {
    const year = Number(ctx.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await searchByYear(year)
    ctx.render(template(cars, onSearch, year));


    function onSearch() {
        const searchInput = Number(document.querySelector('[name="search"]').value);
        if(Number.isNaN(searchInput) == false) {
            ctx.page.redirect('/search?query=' + searchInput);
        }
    }

}
