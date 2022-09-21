import * as yup from 'yup';

export const validateUrl = (urlForm) => {
  yup.setLocale({
    string: {
      url: 'urlError',
    },
    mixed: {
      notOneOf: 'urlExist',
    },
  });
  const schema = yup.object({
    url: yup.string().url().notOneOf(urlForm.loadedUrl),
  });
  return schema.validate(urlForm, { abortEarly: false });
};
