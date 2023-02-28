const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const content = document.querySelector('#content').value;
  const image = document.querySelector('#image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('content', content);
  formData.append('image', image);

  const response = await fetch('https://63fb27534e024687bf72db88.mockapi.io/products', {
    method: 'POST',
    mode: "no-cors",
    body: formData
  });

  if (response.ok) {
    alert('Article added successfully!');
  } else {
    alert('Error adding article.');
  }
}
