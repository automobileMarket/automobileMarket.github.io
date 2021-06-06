import { html } from './lib.js';
import {register as apiRegister} from '../api/data.js'

const template = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`


export async function register (ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit (ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPass');

        try {
            if(username == '' || password == ''){
                throw new Error ('All fields are required!');
            }
            if(password != repeatPass) {
                throw new Error ('Passwords don\'t match!');
            }

            await apiRegister (username, password);

            ctx.setUserNav();
            ctx.page.redirect('/allListings')
  
        } catch (err) {
            window.alert(err);
        }
        
    }
}