import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllListings(page = 1) {
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page-1)*2}&pageSize=2`);
}

export async function getCollectionSize() {
    return await api.get(host + '/data/cars?count');
}

export async function getListingById (id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function getListingsByUserId (userId) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function searchByYear (year) {
    return await api.get(host + `/data/cars?where=year%3D${year}`);
}

export async function createListing (car) {
    return await api.post(host + '/data/cars', car);
}

export async function editListing (id, car) {
    return await api.put(host + '/data/cars/' + id, car);
}

export async function deleteListing (id) {
    return await api.del(host + '/data/cars/' + id)
}