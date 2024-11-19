import {ApiMessage} from '../interfaces/ApiMessage';

const url = '/api/books';

export const getBooks = async (): Promise<ApiMessage> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return {message: 'Error fetching books'};
  }
};

export const likeBook = async (id: string): Promise<ApiMessage> => {
  try {
    const response = await fetch(`${url}/like`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error liking book:', error);
    return {message: 'Error liking book'};
  }
};

export const searchBooks = async (query: string): Promise<ApiMessage> => {
  try {
    const response = await fetch(`${url}?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching books:', error);
    return {message: 'Error searching books'};
  }
};

export const addToWatchlist = async (id: string): Promise<ApiMessage> => {
  try {
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return {message: 'Error adding to watchlist'};
  }
};

export const getWatchlist = async (): Promise<ApiMessage> => {
  try {
    const response = await fetch('/api/watchlist');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return {message: 'Error fetching watchlist'};
  }
};

export const removeFromWatchlist = async (id: string): Promise<ApiMessage> => {
  try {
    const response = await fetch('/api/watchlist', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return {message: 'Error removing from watchlist'};
  }
};

export const getWatchlistItems = async (): Promise<ApiMessage> => {
  try {
    const response = await fetch('/api/watchlist/items');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching watchlist items:', error);
    return {message: 'Error fetching watchlist items'};
  }
};
