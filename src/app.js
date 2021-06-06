import { page, render } from './lib.js';
import {logout as apiLogout} from './api/data.js'

import {home} from './views/home.js';
import {allListings} from './views/allListings.js';
import {myListings} from './views/myListings.js';
import {details} from './views/details.js';
import {create} from './views/create.js';
import {edit} from './views/edit.js';
import {search} from './views/search.js';
import {login} from './views/login.js';
import {register} from './views/register.js';


document.getElementById('logoutBtn').addEventListener('click', logout)

const main = document.getElementById('site-content');


page('/', decorateContext, home);
page('/allListings', decorateContext, allListings);
page('/myListings', decorateContext, myListings);
page('/details/:id', decorateContext, details);
page('/create', decorateContext, create);
page('/edit/:id', decorateContext, edit);
page('/search', decorateContext, search);
page('/login', decorateContext, login);
page('/register', decorateContext, register);

setUserNav();

page.start();



function decorateContext (ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav () {
    const token = sessionStorage.getItem('authToken');
    const username = sessionStorage.getItem('username');

    if(token != null) {
        document.querySelector('#profile>a').textContent = `Welcome ${username}`
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function logout () {
    await apiLogout()

    setUserNav();
    page.redirect('/');
}

