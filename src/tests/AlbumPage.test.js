import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import * as musicsAPI from '../services/musicsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser, musicAPIDefaultResponse } from './mocks';

describe('Lista de músicas do álbum selecionado', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se o nome da banda ou artista e o nome do álbum são exibidos', async () => {
    jest.spyOn(musicsAPI, 'default').mockImplementation(
      () => Promise.resolve(musicAPIDefaultResponse),
    );

    renderPath("/album/12");

    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 3000 },
    );

    const artistNameElement = screen.getByTestId('artist-name'); 
    expect(artistNameElement).toBeInTheDocument();
    expect(artistNameElement).toHaveTextContent("Artist Name");

    const albumNameElement = screen.getByTestId('album-name'); 
    expect(albumNameElement).toBeInTheDocument();
    expect(albumNameElement).toHaveTextContent("Collection Name");
  });

  it('Será validado se todas músicas retornadas pela API são listadas', async () => {
    jest.spyOn(musicsAPI, 'default').mockImplementation(
      () => Promise.resolve(musicAPIDefaultResponse),
    );

    renderPath("/album/12");

    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 3000 },
    );

    expect(screen.getByText('Track Name 1')).toBeInTheDocument();
    expect(screen.getByText('Track Name 2')).toBeInTheDocument();
    expect(screen.getByText('Track Name 3')).toBeInTheDocument();
    expect(screen.getByText('Track Name 4')).toBeInTheDocument();
    expect(screen.getAllByTestId('audio-component')).toHaveLength(4);
  });
});
