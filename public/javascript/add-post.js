function addPost(event) {
  event.preventDefault();
 
  const title = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('input[name="post-body"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      postContent
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/homepage');
  } else {
    alert(response.statusText);
  }


document.querySelector('#post-submit').addEventListener('submit', addPost);
  
};
