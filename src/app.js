import onChange from 'on-change';
import view from './view.js';
import i18next from 'i18next';
import resources from './local.js';
import render from './render.js';

const app = () => {
    const elements = {
        form:document.getElementById('form'),
        input:document.getElementById('input'),
        addBtn: document.getElementById('addBtn'),
        feedback: document.getElementById('feedback'),
        feedNode: document.getElementById('feeds'),
        postsNode: document.getElementById('posts'),
    }

    const state = {
        lng: 'ru',
        feeds: [],
        posts: [],
        urls: [],
        error: null,
        readonly: false,
        openPost: null,
    }

    i18next.init({
        lng: state.lng,
        resources,
      });

    const watchedState = onChange(state, render(elements, i18next), {
        ignoreKeys: ['urls'],
      });
    
    view(watchedState, elements, i18next);
}

export default app