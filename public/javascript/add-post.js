const addPostBtn = document.querySelector('#add-post')

function addPost() {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'POST'
    });
    
    if (response.ok) {
        document.location.replace('/homepage/');
    } else {
        alert(response.statusText);
    }
    
    
    document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);


}

