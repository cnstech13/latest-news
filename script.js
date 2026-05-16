const apiKey = "a3EdzVkMKtxX4j2xLGzN6O9Jqg0dU5D1loAqeumz";

const newsContainer = document.getElementById("newsContainer");
const loader = document.getElementById("loader");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");


// FETCH NEWS
async function fetchNews(category = "general", query = "") {

    loader.style.display = "flex";
    newsContainer.innerHTML = "";

    try {

        let url = "";

        if(query){
            url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;
        }else{
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        loader.style.display = "none";

        if(data.articles.length === 0){
            newsContainer.innerHTML = `
                <h2>No news found.</h2>
            `;
            return;
        }

        data.articles.forEach(article => {

            const card = document.createElement("div");
            card.classList.add("news-card");

            card.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/400x250'}" class="news-image">

                <div class="news-content">
                    <h2>${article.title}</h2>

                    <p>
                        ${article.description || 'No description available'}
                    </p>

                    <a href="${article.url}" target="_blank">
                        Read More
                    </a>
                </div>
            `;

            newsContainer.appendChild(card);
        });

    } catch(error){
        loader.style.display = "none";

        newsContainer.innerHTML = `
            <h2>Error loading news.</h2>
        `;

        console.log(error);
    }
}


// CATEGORY BUTTONS
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".category-btn.active")
        .classList.remove("active");

        button.classList.add("active");

        const category = button.dataset.category;

        fetchNews(category);
    });
});


// SEARCH NEWS
searchBtn.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if(query !== ""){
        fetchNews("general", query);
    }
});


// LOAD DEFAULT NEWS
fetchNews();