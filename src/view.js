import validator from './validator.js';

const addUlListener = (state) => () => {
    const ul = document.getElementById('posts').querySelector('ul');
    ul.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;
      const btn = e.target;
      const selectedId = btn.getAttribute('data-id');
      state.openPost = selectedId;
      const selectedPost = state.posts.filter(({ id }) => id === selectedId);
      selectedPost[0].wasRead = true;
      const { title, description, url } = selectedPost[0]; // [0] Из-за proxy
  
      const modal = document.getElementById('modal');
      const [modalTitle, modalContent] = [
        modal.querySelector('.modal-title'),
        modal.querySelector('#modal-content'),
      ];
      const a = modal.querySelector('a');
      a.href = url;
      modalTitle.textContent = title;
      modalContent.textContent = description;
    });
  };

const formBlocked = (state) => {state.readonly = true}

const formUnlocked = (state, res) => {
    state.readonly = false;
    return res;
  };

const observUpdate = (state, url) => Promise.resolve(url)
  .then(() => makeRequest(url))
  .then(parser)
  .then((parsedData) => extractUpdatedPosts(state, parsedData))
  .then(setTimeout(() => observUpdate(state, url), 5000));  

const view = (state, elements) => {
    elements.form.addEventListener('sumbit', async(e) => {
        const url = elements.input.value;
        e.preventDefault();
        validator(state)
            .validator(url)
            .then(() => formBlocked(state))
            .then(() => makeRequest(url))
            .then((res) => formUnlocked(state, res))
            .then(parser)
            .then((parsedData) => updateState(state, url, parsedData))
            .then(addUlListener(state))
            .then(setTimeout(() => observUpdate(state, url), 5000))
            .catch((err) => {
                state.error = i18next.t(err.message);
            });
    })
} 

export default view