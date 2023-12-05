import onChange from 'on-change';
import { renderPosts, renderFeeds, renderModal } from './render';

const clear = (elements) => {
  const { input, feedback, button } = elements;
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-warning');
  feedback.classList.remove('text-success');
  input.classList.remove('is-invalid');

  input.disabled = false;
  button.disabled = false;
};

const handleError = (errorMessage, elements, i18next) => {
  const { feedback } = elements;
  feedback.textContent = i18next.t(`errors.${errorMessage}`);
  feedback.classList.add('text-danger');
};

const handleForm = (state, elements, i18next) => {
  const { feedback } = elements;
  const { valid } = state.form;

  switch (valid) {
    case true: {
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t('successValidation');
      break;
    }
    case false: {
      feedback.classList.add('text-danger');
      feedback.textContent = i18next.t(`errors.${[state.form.error]}`);
      break;
    }
    default:
      break;
  }
};

const handleLoading = (state, elements, i18next) => {
  const {
    input, feedback, form, button,
  } = elements;
  const { status } = state.loadingProcess;
  clear(elements);

  switch (status) {
    case 'loading': {
      feedback.classList.add('text-warning');
      feedback.textContent = i18next.t(`status.${status}`);
      input.disabled = true;
      button.disabled = true;
      break;
    }
    case 'success': {
      form.reset();
      input.focus();
      handleForm(state, elements, i18next);
      break;
    }
    case 'failed': {
      input.classList.add('is-invalid');
      break;
    }
    default:
      break;
  }
};

const renderVisitedPosts = (idVisitedPosts) => {
  idVisitedPosts.forEach((id) => {
    const link = document.querySelector(`a[data-id="${id}"]`);
    link.classList.remove('fw-bold');
    link.classList.add('fw-normal', 'link-secondary');
  });
};

const watch = (state, elements, i18nextInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'loadingProcess.status': {
      handleLoading(state, elements, i18nextInstance);
      break;
    }
    case 'form.error': {
      handleError(value, elements, i18nextInstance);
      break;
    }
    case 'posts': {
      renderPosts(state, value, elements, i18nextInstance);
      break;
    }
    case 'feeds': {
      renderFeeds(value, elements, i18nextInstance);
      break;
    }
    case 'idVisitedPosts': {
      renderVisitedPosts(value);
      break;
    }
    case 'idCurrentPost': {
      renderModal(state, value);
      break;
    }
    default:
      break;
  }
});

export default watch;
