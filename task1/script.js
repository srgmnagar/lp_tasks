const url = 'https://dummyjson.com/posts?limit=10';
const postForm = document.querySelector("#postForm");
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const likes = document.querySelector("#likes");
const dislikes = document.querySelector("#dislikes");
const views = document.querySelector("#views");
const userId = document.querySelector("#userId");
let currentPostId = null;
// Fetch posts
axios.get(url)
    .then(response => {
        const data = response.data.posts;
        console.log(data);
        displayEvents(data);
    })
    .catch(error => {
        console.error(error);
    });

// Display
function displayEvents(data) {
    const main = document.querySelector("main");
    data.forEach(data => {
        const card = `
            <div data-id="${data.id}" class="card bg-gradient-to-b from-[#fff0f0] via-[#ffbfbd] to-[#ffb1d9] hover:scale-105 transition duration-300 ease-in-out rounded-2xl p-5 flex flex-col gap-1 justify-between">
          <h1 class="IDC  font-medium text-slate-800 ">ID: ${data.id}</h1>
          <h1 class="titleC font-medium text-lg text-blue-900 "> ${data.title} </h1>
          <h1 class="bodyC font-medium text-slate-600 ">${data.body} </h1>
          <p class="likesC font-medium text-blue-900">Likes: ${data.reactions.likes}</p>
          <p class="dislikesC font-medium text-blue-900">Dislikes: ${data.reactions.dislikes}</p>
          <p class="viewsC font-medium  text-blue-900">Views: ${data.views}</p>
          <p class="userIdC font-medium  text-blue-900">User ID: ${data.userId}</p>
          <div class="py-2 font-medium text-slate-900 flex gap-2 md:gap-4">
              <button data-id="${data.id}" class="update btn-primary transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 md:px-2 rounded-lg">Update</button>
              <button data-id="${data.id}" class="delete btn-primary transition duration-300 ease-in-out bg-[rgb(255,43,43)] hover:bg-[#ff0e0e] text-slate-100 font-medium py-1 px-2 md:px-2 rounded-lg">Delete</button>
          </div>
      </div>
        `;
        main.innerHTML += card;
    });

    // Delete
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = e.target.getAttribute('data-id');
            const postCard = e.target.closest('.card');
            fetch(`https://dummyjson.com/posts/${postId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    postCard.remove();
                });
        });
    });

    // Update
    document.querySelectorAll('.update').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            currentPostId = e.target.getAttribute('data-id');
            const postCard = e.target.closest('.card');
            const titleC = postCard.querySelector(".titleC").textContent;
            const bodyC = postCard.querySelector(".bodyC").textContent;
            const likesC = parseInt(postCard.querySelector(".likesC").textContent.split(": ")[1]);
            const dislikesC = parseInt(postCard.querySelector(".dislikesC").textContent.split(": ")[1]);
            const viewsC = parseInt(postCard.querySelector(".viewsC").textContent.split(": ")[1]);
            const userIdC = postCard.querySelector(".userIdC").textContent.split(": ")[1];

            console.log(titleC);
            title.value = titleC;
            body.value = bodyC;
            likes.value = likesC;
            dislikes.value = dislikesC;
            views.value = viewsC;
            userId.value = userIdC;
        });
    });
}

// Post or Update
postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postData = {
        title: title.value,
        body: body.value,
        reactions: {
            likes: likes.value,
            dislikes: dislikes.value,
        },
        views: views.value,
        userId: userId.value,
    };

    if (currentPostId) {
        fetch(`https://dummyjson.com/posts/${currentPostId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        })
            .then(res => res.json())
            .then(data => {
                alert("Post Updated");
                const updatedCard = document.querySelector(`div[data-id="${currentPostId}"]`);
                updatedCard.querySelector(".titleC").textContent = data.title;
                updatedCard.querySelector(".bodyC").textContent = data.body;
                updatedCard.querySelector(".likesC").textContent = `Likes: ${data.reactions.likes}`;
                updatedCard.querySelector(".dislikesC").textContent = `Dislikes: ${data.reactions.dislikes}`;
                updatedCard.querySelector(".viewsC").textContent = `Views: ${data.views}`;
                updatedCard.querySelector(".userIdC").textContent = `User ID: ${data.userId}`;
                currentPostId = null;
            });
    } else {
        fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                displayEvents([data]);
                alert("Post Added");
            });
    }

    title.value = '';
    body.value = '';
    likes.value = '';
    dislikes.value = '';
    views.value = '';
    userId.value = '';
});




// Post
// postForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(title.value);

//     fetch('https://dummyjson.com/posts/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             title: title.value,
//             body: body.value,
//             tags: ["angry"],
//             reactions: {
//                 likes: likes.value,
//                 dislikes: dislikes.value
//             },
//             views: views.value,
//             userId: userId.value
//         })
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             displayEvents([data]);
//             alert("Post Added");
//             title.value = '';
//             body.value = '';
//             likes.value = '';
//             dislikes.value = '';
//             views.value = '';
//             userId.value = '';
//         });
// });

