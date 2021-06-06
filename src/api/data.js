import * as api from './api.js';

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    }
}

function addOwner(object) {
    const userId = sessionStorage.getItem('userId');
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', userId);
    return result;
}

export async function getAllListings() {
    return (await api.get(host + `/classes/Car`)).results;
}

export async function getListingById (id) {
    return await api.get(host + `/classes/Car/${id}?include=owner`);
}

export async function getListingsByUserId (userId) {
    const query = JSON.stringify({
        owner: createPointer('_User', userId)
    });
    const response = await api.get(host + '/classes/Car?where=' + encodeURIComponent(query));
    return response.results;
}

export async function searchByYear (year) {
    return (await api.get(host + `/classes/Car?where={"year": ${year}}`)).results;
}

export async function createListing (car) {
    
    const body = addOwner(car);
    let result = await api.post(host + '/classes/Car', body);
    return result
}

export async function editListing (id, car) {
    let result = await api.put(host + '/classes/Car/' + id, car);
    return result;
}

export async function deleteListing (id) {
    return await api.del(host + '/classes/Car/' + id)
}