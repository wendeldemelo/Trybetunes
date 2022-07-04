import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as searchAlbumsAPI from '../services/searchAlbumsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser, searchAlbumDefaultResponse } from './mocks';

describe('Formulário para pesquisar artistas', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(defaultUser));
    jest.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());
  
  it('Será validado se ao navegar para a rota /search, o input e o botão estão presentes na tela',
    async () => {
      renderPath("/search");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getByTestId('search-artist-input')).toBeInTheDocument();
      expect(screen.getByTestId('search-artist-button')).toBeInTheDocument();
    });

  it('Será validado se o botão está habilitado somente se o input de nome tiver 2 ou mais caracteres',
    async () => {
      renderPath("/search");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      const searchArtistInput = screen.getByTestId('search-artist-input');
      expect(searchArtistInput).toBeInTheDocument();
      expect(searchArtistInput.value).toBe('');

      const searchArtistButton = screen.getByTestId('search-artist-button');
      expect(searchArtistButton).toBeInTheDocument();
      expect(searchArtistButton).toBeDisabled();

      userEvent.type(searchArtistInput, 'U');
      expect(searchArtistInput.value).toBe('U');
      expect(searchArtistButton).toBeDisabled();

      userEvent.type(searchArtistInput, '2');
      expect(searchArtistInput.value).toBe('U2');
      expect(searchArtistButton).toBeEnabled();
    });
});

describe('Requisição para pesquisar artistas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
  });
  
  afterEach(() => localStorage.clear());

  it('Será validado se ao clicar no botão, o texto Resultado de álbuns de: <artista> aparece na tela',
  async () => {
    jest.spyOn(searchAlbumsAPI, 'default').mockImplementation(
      () => Promise.resolve(searchAlbumDefaultResponse),
    );
    renderPath("/search");

    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 3000 },
    );

    const searchArtistInput = screen.getByTestId('search-artist-input');

    userEvent.type(searchArtistInput, 'U2');
    userEvent.click(screen.getByTestId('search-artist-button'));

    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 3000 },
    );

    const searchMessage = screen.getByText('Resultado de álbuns para: U2');

    expect(searchMessage).toBeInTheDocument();
    expect(screen.getByTestId('search-artist-input').value).toBe('');
  });

  it('Será validado se ao receber o retorno da API, os álbuns são listados na tela',
    async () => {
      jest.spyOn(searchAlbumsAPI, 'default').mockImplementation(
        () => Promise.resolve(searchAlbumDefaultResponse),
      );
      renderPath("/search");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.type(screen.getByTestId('search-artist-input'), 'Artist Name');
      userEvent.click(screen.getByTestId('search-artist-button'));

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 1000 },
      );

      expect(screen.getByText('Album Name 1')).toBeInTheDocument();
      expect(screen.getByText('Album Name 2')).toBeInTheDocument();
      expect(screen.queryByText('Nenhum álbum foi encontrado')).not.toBeInTheDocument();
    });

  it('Será validado se caso a API não retorne nenhum álbum, a mensagem Nenhum álbum foi encontrado é exibida',
    async () => {
      jest.spyOn(searchAlbumsAPI, 'default').mockImplementation(
        () => Promise.resolve([]),
      );
      renderPath("/search");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.type(screen.getByTestId('search-artist-input'), 'Artist Name');
      userEvent.click(screen.getByTestId('search-artist-button'));

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 1000 },
      );

      expect(screen.queryByText('Nenhum álbum foi encontrado')).toBeInTheDocument();
    });

  it('Será validado se existe um link para cada álbum listado que redirecione para a rota /album/:id',
    async () => {
      jest.spyOn(searchAlbumsAPI, 'default').mockImplementation(
        () => Promise.resolve(searchAlbumDefaultResponse),
      );
      renderPath("/search");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.type(screen.getByTestId('search-artist-input'), 'Artist Name');
      userEvent.click(screen.getByTestId('search-artist-button'));

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 1000 },
      );

      expect(screen.getByTestId('link-to-album-101')).toBeInTheDocument();
      expect(screen.getByTestId('link-to-album-102')).toBeInTheDocument();

      userEvent.click(screen.getByTestId('link-to-album-101'));

      expect(window.location.pathname).toBe('/album/101');
    });
});

