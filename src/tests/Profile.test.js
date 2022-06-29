import { 
  screen, 
  waitFor, 
  waitForElementToBeRemoved } 
from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as userAPI from '../services/userAPI';
import renderPath from './helpers/renderPath';
import { defaultUser } from './mocks';

describe('Exibição de perfil', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se as informações da pessoa logada são exibidas na tela',
    async () => {
      renderPath("/profile");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getAllByText('User Test')).toHaveLength(2);
      expect(screen.getByText('email@test.com')).toBeInTheDocument();
      expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
      expect(screen.getByTestId('profile-image')).toHaveAttribute('src', 'url-to-image');
    });

  it('Será validado se foi criado um link para a rota de edição de perfil com o texto Editar perfil',
    async () => {
      renderPath("/profile");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getByText("Editar perfil")).toBeInTheDocument();
    });

  it('Será validado se ao clicar no link Editar perfil, a navegação acontece corretamente',
    async () => {
      renderPath("/profile");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.click(screen.getByText("Editar perfil"));

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(window.location.pathname).toBe('/profile/edit');
    });

});

describe('Formulário de edição de perfil', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se o formulário é renderizado já preenchido com as informações da pessoa logada',
    async () => {
      renderPath("/profile/edit");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      expect(screen.getByTestId('edit-input-name')).toHaveValue('User Test');
      expect(screen.getByTestId('edit-input-email')).toHaveValue('email@test.com');
      expect(screen.getByTestId('edit-input-description')).toHaveValue('Lorem ipsum');
      expect(screen.getByTestId('edit-input-image')).toHaveValue('url-to-image');
      expect(screen.getByTestId('edit-button-save')).toBeInTheDocument();
    });

  it('Será validado se é possível alterar os valores dos campos',
    async () => {
      renderPath("/profile/edit");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      const nameInput = screen.getByTestId('edit-input-name');
      nameInput.setSelectionRange(0, nameInput.value.length);
      userEvent.type(nameInput, 'New user test');

      const emailInput = screen.getByTestId('edit-input-email');
      emailInput.setSelectionRange(0, emailInput.value.length);
      userEvent.type(emailInput, 'newemail@test.com');

      const descriptionInput = screen.getByTestId('edit-input-description');
      descriptionInput.setSelectionRange(0, descriptionInput.value.length);
      userEvent.type(descriptionInput, 'Dolor sit amet');

      const imageInput = screen.getByTestId('edit-input-image');
      imageInput.setSelectionRange(0, imageInput.value.length);
      userEvent.type(imageInput, 'new-url-to-image');

      expect(nameInput).toHaveValue('New user test');
      expect(emailInput).toHaveValue('newemail@test.com');
      expect(descriptionInput).toHaveValue('Dolor sit amet');
      expect(imageInput).toHaveValue('new-url-to-image');
    });

  it('Será validado se o botão salvar é habilitado somente se todos os campos estiverem válidos',
    async () => {
      localStorage.setItem('user', JSON.stringify({
        name: "User Test", 
        email: "",
        description: "",
        image: ""
      }));
      renderPath("/profile/edit");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      const saveButton = screen.getByTestId('edit-button-save');

      const nameInput = screen.getByTestId('edit-input-name');
      nameInput.setSelectionRange(0, nameInput.value.length);
      userEvent.type(nameInput, '');

      const emailInput = screen.getByTestId('edit-input-email');
      emailInput.setSelectionRange(0, emailInput.value.length);
      userEvent.type(emailInput, 'not-an-email');

      const descriptionInput = screen.getByTestId('edit-input-description');
      descriptionInput.setSelectionRange(0, descriptionInput.value.length);
      userEvent.type(descriptionInput, '');

      const imageInput = screen.getByTestId('edit-input-image');
      imageInput.setSelectionRange(0, imageInput.value.length);
      userEvent.type(imageInput, '');

      expect(saveButton).toBeDisabled();

      userEvent.type(nameInput, 'User test');
      emailInput.setSelectionRange(0, emailInput.value.length);
      userEvent.type(emailInput, 'valid@email.com');
      userEvent.type(descriptionInput, 'User description');
      userEvent.type(imageInput, 'image-url');

      expect(saveButton).toBeEnabled();
    });

  it('Será validado se após salvar as informações a pessoa é redirecionada para a página de exibição de perfil',
    async () => {
      renderPath("/profile/edit");

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3000 },
      );

      userEvent.click(screen.getByTestId('edit-button-save'));

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Carregando...'),
        { timeout: 3500 },
      );

      expect(screen.getByText('Editar perfil')).toBeInTheDocument();
      expect(window.location.pathname).toBe('/profile');
    });
});
