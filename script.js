const apiKey = "7278bdefd5584696960c15fccd92eb1c";

const newsContainer = document.getElementById("newsContainer");
const loader = document.getElementById("loader");

async function getNews() {

    loader.style.display = "block";
    newsContainer.innerHTML = "";

    try {

        const category =
        document.getElementById("category").value;

        const country =
        document.getElementById("country").value;

        const url =
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }

        const data = await response.json();

        loader.style.display = "none";

        if (data.articles.length === 0) {
            newsContainer.innerHTML =
            "<p>No news found</p>";
            return;
        }

        data.articles.forEach(article => {

            const newsCard = document.createElement("div");

            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
                
                <h2>${article.title}</h2>
                
                <p>${article.description || "No description available"}</p>
                
                <a href="${article.url}" target="_blank">
                    Read More
                </a>
            `;

            newsContainer.appendChild(newsCard);
        });

    } catch (error) {

        loader.style.display = "none";

        newsContainer.innerHTML =
        `<p>Error loading news</p>`;

        console.error(error);
    }
}

getNews();