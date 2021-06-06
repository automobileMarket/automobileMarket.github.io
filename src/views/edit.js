import { html } from '../lib.js';
import { editListing, getListingById } from '../api/data.js';


const template = (listing, onSubmit, err) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${listing.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${listing.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${listing.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${Number(listing.year)}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${listing.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${Number(listing.price)}>
            ${err ? html`<span class="error">${err}</span>` : ``}

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`

export async function edit(ctx) {
    const listingId = ctx.params.id
    const listing = await getListingById(listingId)

    ctx.render(template(listing, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const car = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            description: formData.get('description'),
            year: Number(formData.get('year')),
            imageUrl: formData.get('imageUrl'),
            price: Number(formData.get('price'))
        }

        try {
            if (Number.isNaN(car.year) || Number.isNaN(car.price)) {
                throw new Error('Year and Price must be numbers!');
            }

            if (car.brand == '' || car.model == '' || car.description == '' || car.imageUrl == '') {
                throw new Error('All fields are required!');
            }

            await editListing(listingId, car);
            ev.target.reset();
            ctx.page.redirect(`/details/${listingId}`)

        } catch (err) {
            ctx.render(template(listing, onSubmit, err));

        }


    }
}