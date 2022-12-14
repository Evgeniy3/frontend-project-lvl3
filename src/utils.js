/* eslint-disable no-param-reassign */
import _ from 'lodash';
import axios from 'axios';
import parserRss from './parser.js';

export const loadUrl = (link) => {
  const mainUrl = new URL('/get?', 'https://allorigins.hexlet.app');
  mainUrl.searchParams.append('disableCache', true);
  mainUrl.searchParams.append('charset', 'utf-8');
  mainUrl.searchParams.append('url', link);
  return axios.get(mainUrl.toString());
};

export const updateRss = (state) => {
  Promise.all(state.urlForm.loadedUrl)
    .then(() => state.urlForm.loadedUrl.map((link) => {
      const handleEachFeed = loadUrl(link)
        .then((data) => {
          const posts = parserRss(data);
          const diff = _.differenceBy(posts, state.posts, 'title');
          const addIdtodiff = diff.map((item) => ({ ...item, id: _.uniqueId() }));
          state.posts.push(...addIdtodiff);
        });
      return handleEachFeed;
    }))
    .finally(() => setTimeout(() => updateRss(state), 5000));
};
