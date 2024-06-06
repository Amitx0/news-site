const API_KEY = "d7b459a481db4264ab37e1fd90ea04eb";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardcontainer = document.getElementById("card-container");

  const template = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = template.content.cloneNode(true);
    fillDataincard(cardClone, article);
    cardcontainer.appendChild(cardClone);
  });
}

function fillDataincard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newstitle = cardClone.querySelector("#news-title");
  const newssource = cardClone.querySelector("#news-sorce");
  const newsdes = cardClone.querySelector("#news-discription");

  newsImg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newsdes.innerHTML = article.description;

  const date = Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "asia/delhi",
  });

  newssource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function OnNavClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  currentNavItem = navItem;
  curSelectedNav.classList.add("active");
}

const searchbutton = document.getElementById("search-button");
const searchtext = document.getElementById("input-text");

searchbutton.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
