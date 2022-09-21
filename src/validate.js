import * as yup from 'yup';

const validateUrl = (urlForm) => {
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

export default validateUrl;
