/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import i18n from 'i18next';
import onChange from 'on-change';
import { render } from './view.js';
import { updateRss } from './utils.js';
import { mainListener, modalListener } from './controllers.js';
import ru from './locale/ru.js';

const app = (i18) => {
  const elements = {
    mainForm: document.querySelector('form'),
    errorPlace: document.querySelector('.feedback'),
    mainFormUrlInput: document.querySelector('#url-input'),
    addFeedButton: document.querySelector('[aria-label="add"]'),
    postsPlace: document.querySelector('.posts'),
    feedsPlace: document.querySelector('.feeds'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalReadButton: document.querySelector('[role="button"]'),
  };

  const state = {
    urlForm: {
      status: '',
      loadedUrl: [],
      url: '',
      errors: '',
    },
    modalForm: {
      postData: [],
    },
    feeds: [],
    posts: [],
    uiState: new Set(),
  };

  const watchedState = onChange(state, render(state, elements, i18));
  mainListener(watchedState, elements);
  modalListener(watchedState, elements);
  updateRss(watchedState);
};

const runApp = () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources: { ru },
  }).then(() => app(i18nextInstance));
};

export default runApp;
