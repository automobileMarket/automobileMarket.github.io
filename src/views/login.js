import { html } from '../lib.js';
import { login as apiLogin } from '../api/data.js'

const template = (onSubmit, err) => html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            ${err ? html`<span class="error">${err}</span>` : ``}
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`


export async function login(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const username = formData.get('username');
        const password = formData.get('password');

        try {
            if (username == '' || password == '') {
                throw new Error('All fields are required!');
            }

            await apiLogin(username, password);

            ctx.setUserNav();
            ctx.page.redirect('/allListings')

        } catch (err) {
            ctx.render(template(onSubmit, err));
        }

    }
}