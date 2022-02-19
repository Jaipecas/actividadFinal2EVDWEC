import {
  fetchGET
} from '../src/common/common';

import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
jest.mock('node-fetch');


describe('fetchGET', () => {

  /*  it('fetchs the URL') */

  it('returns the json data', async () => {
    const response = {
      status: 200,
      json: () => {
        return {
          "id": 3,
          "username": "player3",
          "name": "Player 3"
        }
      }
    }

    fetch.mockResolvedValueOnce(response);

    const data = await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3', '')
    expect(data.name).toBe('Player 3');
  })

  //it('includes the authorization token')

  describe('when the api returns an error', () => {
    it('returns the error', async () => {
      const response = {
        status: 500
      }

      fetch.mockResolvedValueOnce(response);

      try {
        await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3333', '');
      } catch (error) {
        expect(error).toBe(`Error: 500`);
      }
    });
  });

  describe('when the API returns 401', () => {
    it('redirects to login', async () => {
      const response = {
        status: 401
      }

      Object.defineProperty(window.location, 'href', {
        writable: true,
        value: 'https://dwec-tres-en-raya.herokuapp.com/player'
    });

      console.log(location.href);

      fetch.mockResolvedValueOnce(response);

      await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3333', '');

      //expect(window.location.href).toEqual(url);

    });
  });


});