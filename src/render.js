const renderPosts = (state, postsList, elements, i18next) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  postsList.forEach((item) => {
    const { id, title, link } = item;

    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );

    const a = document.createElement('a');
    a.textContent = title;
    a.setAttribute('href', link);
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    if (state.idVisitedPosts.includes(id)) {
      a.classList.add('fw-normal');
    } else {
      a.classList.add('fw-bold');
    }

    const button = document.createElement('button');
    button.textContent = i18next.t('renderPosts.button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');

    li.append(a);
    li.append(button);

    ul.append(li);
  });

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = i18next.t('renderPosts.header');
  cardTitle.classList.add('card-title', 'h4');

  cardBody.prepend(cardTitle);

  card.prepend(cardBody);

  card.append(ul);

  const { posts } = elements;
  posts.textContent = '';
  posts.prepend(card);
};

const renderFeeds = (feedsList, elements, i18next) => {
  const ul = document.createElement('div');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  feedsList.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const header = document.createElement('h3');
    header.classList.add('h6', 'm-0');
    header.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    li.prepend(description);
    li.prepend(header);

    ul.prepend(li);
  });

  const title = document.createElement('h2');
  title.classList.add('card-title', 'h4');
  title.textContent = i18next.t('renderFeeds.header');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.prepend(title);

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  card.prepend(cardBody);
  card.append(ul);

  const { feeds } = elements;
  feeds.textContent = '';
  feeds.prepend(card);
};

const renderModal = (state, postId) => {
  const currentPost = state.posts.find((p) => p.id === postId);
  const {
    id, title, description, link,
  } = currentPost;

  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.modal-link');

  modal.setAttribute('data-id', id);
  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalLink.setAttribute('href', link);
};

export { renderPosts, renderFeeds, renderModal };
