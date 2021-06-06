import { html } from '../lib.js';
import { getListingById, deleteListing } from '../api/data.js'

const template = (listing, onDelete, isOwner) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listing.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listing.brand}</li>
            <li><span>Model:</span>${listing.model}</li>
            <li><span>Year:</span>${Number(listing.year)}</li>
            <li><span>Price:</span>${Number(listing.price)}$</li>
        </ul>

        <p class="description-para">
            ${listing.description}
        </p>

        ${isOwner ? html`
        <div class="listings-buttons">
            <a href="/edit/${listing.objectId}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : ''}
    </div>
</section>`


export async function details(ctx) {
    const userId = sessionStorage.getItem('userId');
    const listingId = ctx.params.id;
    const listing = await getListingById(listingId)
    
    const isOwner = userId == listing.owner.objectId

    ctx.render(template(listing, onDelete, isOwner));

    async function onDelete() {
        await deleteListing(listingId);
        
        ctx.page.redirect('/allListings');
    }
}