import onChange from 'on-change';
import view from './view.js';

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
        feeds: [],
        posts: [],
        urls: [],
        error: null,
        readonly: false,
        openPost: null,
    }

    const watchedState = onChange(state, render(elements), {
        ignoreKeys: ['urls'],
      });
    
    view(watchedState, elements);
}

export default app