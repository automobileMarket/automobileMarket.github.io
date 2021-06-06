import { html } from '../lib.js';
import { getAllListings } from '../api/data.js';


const template = (listings) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        
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
            <a href="/details/${listing.objectId}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`


export async function allListings(ctx) {

    const listings = await getAllListings();

    ctx.render(template(listings));
}