const url = 'https://dummyjson.com/posts';
const postForm = document.querySelector("#postForm");
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const likes = document.querySelector("#likes");
const dislikes = document.querySelector("#dislikes");
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

function displayEvents(data) {
    const main = document.querySelector("main");
    data.forEach(data => {
        const card = `
            <div data-id="${data.id}" class="card bg-gradient-to-b from-[#ffe1e1] via-[#ffbfbd] to-[#ffb1d0] hover:scale-105 transition duration-300 ease-in-out rounded-2xl p-5 flex flex-col gap-1 justify-between">
                <h1 class="IDC font-medium text-slate-800">ID: ${data.id}</h1>
                <h1 class="titleC font-medium text-lg text-blue-900">${data.title}</h1>
                <h1 class="bodyC font-medium text-slate-600">${data.body}</h1>
                <p class="likesC font-medium text-blue-900">Likes: ${data.reactions.likes}</p>
                <p class="dislikesC font-medium text-blue-900">Dislikes: ${data.reactions.dislikes}</p>
                <p class="userIdC font-medium text-blue-900">User ID: ${data.userId}</p>
                <div class="py-2 font-medium text-slate-900 flex gap-2 md:gap-4">
                    <button data-id="${data.id}" class="update btn-primary transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 md:px-2 rounded-lg">Update</button>
                    <button data-id="${data.id}" class="delete btn-primary transition duration-300 ease-in-out bg-[rgb(255,43,43)] hover:bg-[#ff0e0e] text-slate-100 font-medium py-1 px-2 md:px-2 rounded-lg">Delete</button>
                </div>
            </div>
        `;
        main.innerHTML += card;
    });

    // Delegate Delete Event
    main.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.preventDefault();
            const postId = e.target.getAttribute('data-id');
            const postCard = e.target.closest('.card');

            axios.delete(`https://dummyjson.com/posts/${postId}`)
                .then(({ data }) => {
                    console.log(data);
                    postCard.remove();
                })
                .catch(error => {
                    console.error(error);
                });
        }

        // Delegate Update Event
        if (e.target.classList.contains('update')) {
            e.preventDefault();
            currentPostId = e.target.getAttribute('data-id');
            const postCard = e.target.closest('.card');
            const titleC = postCard.querySelector(".titleC").textContent;
            const bodyC = postCard.querySelector(".bodyC").textContent;
            const likesC = parseInt(postCard.querySelector(".likesC").textContent.split(": ")[1]);
            const dislikesC = parseInt(postCard.querySelector(".dislikesC").textContent.split(": ")[1]);
            const userIdC = postCard.querySelector(".userIdC").textContent.split(": ")[1];

            console.log(titleC);
            title.value = titleC;
            body.value = bodyC;
            likes.value = likesC;
            dislikes.value = dislikesC;
            userId.value = userIdC;
            e.preventDefault();
            
        }
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
        userId: userId.value,
    };
    console.log("Attempting to add post:", postData);  // Debug log

    if (currentPostId) {
        axios.put(`https://dummyjson.com/posts/${currentPostId}`, postData)
    .then(({ data }) => {
        alert("Post Updated");
        const updatedCard = document.querySelector(`div[data-id="${currentPostId}"]`);
        updatedCard.querySelector(".titleC").textContent = data.title;
        updatedCard.querySelector(".bodyC").textContent = data.body;
        updatedCard.querySelector(".likesC").textContent = `Likes: ${data.reactions.likes}`;
        updatedCard.querySelector(".dislikesC").textContent = `Dislikes: ${data.reactions.dislikes}`;
        updatedCard.querySelector(".userIdC").textContent = `User ID: ${data.userId}`;
        currentPostId = null;
    })
    .catch(error => {
        console.error(error);
    });

    } else {

        axios.post('https://dummyjson.com/posts/add', postData)
            .then(({ data }) => {
                console.log(data);
                displayEvents([data]);
                alert("Post Added");
            })
            .catch(error => {
                console.error(error);
                alert("Failed to add post. Please try again.");
            });

    }

    title.value = '';
    body.value = '';
    likes.value = '';
    dislikes.value = '';
    userId.value = '';
});