/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import axios from 'axios';
import { AxiosError } from 'axios';

import Post from '../pages/posts/Post';
import List from '../pages/posts/List';
import { renderWithProviders } from '../shared/utils/mock-test';
import Posts from '../pages/posts/Posts';

jest.mock('axios');

describe('UsersList component', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      address: {
        street: 'Douglas Extension',
        suite: 'Suite 847',
        city: 'McKenziehaven',
        zipcode: '59590-4157',
        geo: {
          lat: '-68.6102',
          lng: '-47.0653',
        },
      },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      company: {
        name: 'Romaguera-Jacobson',
        catchPhrase: 'Face to face bifurcated interface',
        bs: 'e-enable strategic applications',
      },
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      address: {
        street: 'Hoeger Mall',
        suite: 'Apt. 692',
        city: 'South Elvis',
        zipcode: '53919-4257',
        geo: {
          lat: '29.4572',
          lng: '-164.2990',
        },
      },
      phone: '493-170-9623 x156',
      website: 'kale.biz',
      company: {
        name: 'Robel-Corkery',
        catchPhrase: 'Multi-tiered zero tolerance productivity',
        bs: 'transition cutting-edge web services',
      },
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      address: {
        street: 'Skiles Walks',
        suite: 'Suite 351',
        city: 'Roscoeview',
        zipcode: '33263',
        geo: {
          lat: '-31.8129',
          lng: '62.5342',
        },
      },
      phone: '(254)954-1289',
      website: 'demarco.info',
      company: {
        name: 'Keebler LLC',
        catchPhrase: 'User-centric fault-tolerant solution',
        bs: 'revolutionize end-to-end systems',
      },
    },
  ];

  describe('List users', () => {
    test('Case list users success', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
      const { getByTestId, findByTestId, queryAllByText } = renderWithProviders(
        <List />
      );

      // loading
      expect(screen.getByText('LOADING')).toBeInTheDocument();
      // finish getting api
      const userList = await screen.findByTestId('user-list');
      // check data
      expect(userList).toBeInTheDocument();
      // check length
      expect(userList.children.length).toBe(mockUsers.length);

      const deleteUserButton = await waitFor(() =>
        screen.queryAllByText('Delete user')
      );
      expect(deleteUserButton.length).toBe(mockUsers.length);
    });

    test('Case list users failed', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));
      (axios.get as jest.Mock).mockRejectedValueOnce({ error: 'err' });

      const { getByTestId, findByTestId, queryAllByText, getByText } =
        renderWithProviders(<List />);

      const deleteUserButton = await waitFor(() =>
        screen.queryAllByText('Delete user')
      );
      expect(deleteUserButton.length).not.toBe(mockUsers.length);

      const errorMsg = await waitFor(() => getByText('ERROR'));
      expect(errorMsg).toBeInTheDocument();
    });
  });

  describe('Show user', () => {
    test('Case displays user details success', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: mockUsers[0],
      });
      const { getByText } = renderWithProviders(<Post />);

      // loading
      expect(screen.getByText('LOADING')).toBeInTheDocument();

      // get user Details
      const userId = await waitFor(() => getByText(`Id: ${mockUsers[0].id}`));
      const email = await waitFor(() =>
        getByText(`Email: ${mockUsers[0].email}`)
      );
      const phone = await waitFor(() =>
        getByText(`Phone: ${mockUsers[0].phone}`)
      );
      const website = await waitFor(() =>
        getByText(`Website: ${mockUsers[0].website}`)
      );
      const userName = await waitFor(() =>
        getByText(`Name: ${mockUsers[0].name}`)
      );

      expect(userId).toBeInTheDocument();
      expect(userName).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(phone).toBeInTheDocument();
      expect(website).toBeInTheDocument();
    });

    test('Case get user detail error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));
      (axios.get as jest.Mock).mockRejectedValueOnce({ error: 'err' });

      const { getByText } = renderWithProviders(<Post />);

      // loading
      expect(screen.getByText('LOADING')).toBeInTheDocument();

      const userName = screen.queryByText(`Name: ${mockUsers[0].name}`);

      const errorMsg = await waitFor(() => getByText('ERROR'));

      expect(errorMsg).toBeInTheDocument();
      expect(userName).not.toBeInTheDocument();
    });
  });

  test('deletes user', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    const { queryByText, getByText } = renderWithProviders(<Posts />);

    const deleteUserButton = await waitFor(() =>
      getByText(`Delete user ${mockUsers[0].id}`)
    );
    fireEvent.click(deleteUserButton);

    expect(screen.queryByText(`${mockUsers[0].name}`)).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Delete user ${mockUsers[0].id}`)
    ).not.toBeInTheDocument();
  });
});
