import {
  fetchGET
} from '../src/common/common';

import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';
jest.mock('node-fetch');


describe('fetchGET', () => {

  it('fetchs the URL', async () => {
    const response = {
      status: 200,
      json: () => {
        return {}
      }
    }

    fetch.mockResolvedValueOnce(response);

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
    const response = {
      status: 200,
      json: () => {
        return {}
      }
    }
    fetch.mockResolvedValueOnce(response);

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

  /* 
  LO INTENTÉ PERO NO ME DIO TIEMPO A RESOLVERLO :(
  describe('when the API returns 401', () => {
    it('redirects to login', async () => {
    
    });
  }); */

});