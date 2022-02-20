import {
  fetchGET
} from '../src/common/common';

import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
jest.mock('node-fetch');


describe('fetchGET', () => {

  it('fetchs the URL', async () => {
    await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3', 'abcd');

    expect(fetch.mock.lastCall[0]).toBe('https://dwec-tres-en-raya.herokuapp.com/player/3');
  })

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
    const data = await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3', 'abcd');

    expect(data.name).toBe('Player 3');
  })

  it('includes the authorization token', async () => {
    await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3', 'abcd');
    const callInfo = fetch.mock.lastCall[1];

    expect(callInfo.headers.authorization).toBe('Bearer abcd');

  })

  describe('when the api returns an error', () => {
    it('returns the error', async () => {
      const response = {
        status: 500
      }

      fetch.mockResolvedValueOnce(response);

      try {
        await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3333', 'abcd');
      } catch (error) {
        expect(error).toBe(500);
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

      await fetchGET('https://dwec-tres-en-raya.herokuapp.com/player/3333', 'abcd');

      //expect(window.location.href).toEqual(url);

    });
  });


});