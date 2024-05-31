document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id;

    remove(id).then(() => {
      target.closest('li').remove();
    });
  } else if (target.dataset.type === 'edit') {
    const id = target.dataset.id;
    const title = target.dataset.title;

    const newTitle = prompt('Введите новое название', title);

    if (newTitle) {
      edit({ id, title: newTitle }).then(
        () => (target.closest('li').querySelector('span').innerText = newTitle)
      );
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(updateNote) {
  await fetch(`/${updateNote.id}`, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(updateNote),
  });
}
