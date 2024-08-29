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
            <div data-id="${data.id}" style="justify-content: space-between;" class="card bg-gray-800 hover:scale-105 rounded-2xl p-5 flex flex-col gap-1 ">
                <h1 class="IDC font-small text-white ">ID: ${data.id}</h1>
                <h1 class="titleC font-medium text-lg text-gray-200 pt-1"> ${data.title} </h1>
                <h1 class="bodyC font-medium text-gray-400 pt-1">${data.body} </h1>
                <p class="likesC font-small pt-1 text-white">Likes: ${data.reactions.likes}</p>
                <p class="dislikesC font-small pt-1 text-white">Dislikes: ${data.reactions.dislikes}</p>
                <p class="viewsC font-small pt-1 text-white">Views: ${data.views}</p>
                <p class="userIdC font-small pt-1 text-white">User ID: ${data.userId}</p>
                <div class="py-2 font-medium pt-1 text-white flex gap-2 md:gap-4">
                    <button data-id="${data.id}" class="update btn-primary pt-1 transition duration-300 ease-in-out bg-[#fcee52] hover:bg-[#ffd51b] text-slate-950 font-medium py-1 px-1 md:px-2 rounded">Update</button>
                    <button data-id="${data.id}" class="delete btn-primary pt-1 transition duration-300 ease-in-out bg-[#ff1414] hover:bg-[#ff4949] text-slate-100 font-medium py-1 px-1 md:px-2 rounded">Delete</button>
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

