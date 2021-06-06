import { html } from './lib.js';
import { getAllListings, getCollectionSize } from '../api/data.js';


const template = (listings, page, pages) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        <div>Page ${page} / ${pages}
            ${page > 1 ? html`<a class="button-list" href="/allListings?page=${page - 1}">&lt; Prev</a>` : ''}
            ${page < pages ? html`<a class="button-list" href="/allListings?page=${page + 1}">Next &gt;</a>` : ''}
        </div>
        <!-- Display all records -->
        ${listings.length != 0 ? listings.map(listingTemplate) : html`<p class="no-cars">No cars in database.</p>`}


    </div>
</section>`

const listingTemplate = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.brand} ${listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${Number(listing.year)}</h3>
            <h3>Price: ${Number(listing.price)} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`


export async function allListings(ctx) {
    const page = Number(ctx.querystring.split('=')[1]) || 1;
    const count = await getCollectionSize();
    const pages = Math.ceil(count / 2);

    const listings = await getAllListings(page);

    ctx.render(template(listings, page, pages));
}