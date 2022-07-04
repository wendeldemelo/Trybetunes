import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as musicsAPI from '../services/musicsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser, musicAPIDefaultResponse, favoriteSongsList } from './mocks';

describe('Adicionar músicas na lista de músicas favoritas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se existe um checkbox para cada música da lista',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/album/123");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getByTestId('checkbox-music-12')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-21')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-31')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-42')).toBeInTheDocument();
    });

  it('Será validado se a mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      
      renderPath("/album/123");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      expect(screen.getByText("Carregando...")).toBeInTheDocument();

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

  it('Será validado se o número de checkboxes marcados como checked aumenta quando um checkbox é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );
      

      renderPath("/album/123");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
      expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(4);

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(3);

      userEvent.click(screen.getByTestId('checkbox-music-31'));
      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(2);

    });
});

describe('Remover músicas na lista de músicas favoritas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongsList));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se a mensagem Carregando... é exibida após clicar no checkbox e removida depois do retorno da API',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/album/12");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.click(screen.getByTestId('checkbox-music-12'));

      expect(screen.getByText("Carregando...")).toBeInTheDocument();

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

  it('Será validado se o número de checkboxes marcados como checked diminui quando um checkbox marcado é clicado',
    async () => {
      jest.spyOn(musicsAPI, 'default').mockImplementation(
        () => Promise.resolve(musicAPIDefaultResponse),
      );

      renderPath("/album/12");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
      expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(2);

      userEvent.click(screen.getByTestId('checkbox-music-12'));
      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(3);

      userEvent.click(screen.getByTestId('checkbox-music-31'));
      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(4);
    });
});

describe('Lista de músicas favoritas', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se é exibida a lista de músicas favoritas',
    async () => {
      const favoriteSongs = [
        {
          trackId: '12',
          trackName: 'Track Name 1',
          previewUrl: 'preview-url-1',
        },
        {
          trackId: '21',
          trackName: 'Track Name 2',
          previewUrl: 'preview-url-2',
        },
      ];
      localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));

      renderPath("/favorites");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getByText('Track Name 1')).toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
    });

  it('Será validado se a lista de músicas favoritas é atualizada ao remover uma música da lista',
    async () => {
      const favoriteSongs = [
        {
          trackId: 12,
          trackName: 'Track Name 1',
          previewUrl: 'preview-url-1',
        },
        {
          trackId: 21,
          trackName: 'Track Name 2',
          previewUrl: 'preview-url-2',
        },
        {
          trackId: 30,
          trackName: 'Track Name 3',
          previewUrl: 'preview-url-3',
        },
      ];
      localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));

      renderPath("/favorites");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },

      );

      const checkboxes = screen.getAllByLabelText('Favoritar');

      expect(screen.getByText('Track Name 1')).toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getByText('Track Name 3')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(3);
      expect(checkboxes).toHaveLength(3);

      userEvent.click(checkboxes[0]);

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.queryByText('Track Name 1')).not.toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getByText('Track Name 3')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
      expect(screen.getAllByLabelText('Favoritar')).toHaveLength(2);
    });
});

