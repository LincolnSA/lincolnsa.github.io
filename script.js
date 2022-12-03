const GITHUB_URL = "https://api.github.com/users/lincolnsa";

const renderCard = (data) => {
  const { name, html_url, description, created_at, language } = data;
  const title = name.replaceAll("-", " ");
  const date = new Date(created_at).toLocaleString().split(" ")[0];

  return `
    <div class="col mb-4">
      <div class="card text-center">
        <div class="card-header">${language || ""}</div>
        <div class="card-body">
          <h5 class="card-title">${title || ""}</h5>
          <p class="card-text">${description || ""}</p>
          <a
            class="btn text-white btn-lg btn-floating"
            style="background-color: #333333"
            href="${html_url}"
            target="_blank"
            role="button"
          >
            <i class="fab fa-github"></i>
          </a>
        </div>
        <div class="card-footer text-muted">Criado em ${date}</div>
      </div>
    </div>
  `;
};

const renderCards = (repos) => {
  const cardContainer = document.querySelector("#card-container");

  const cards = repos.map((repo) => {
    return renderCard(repo);
  });

  cardContainer.innerHTML = cards.join("");
};

const listRepositories = async (reposUrl) => {
  const response = await fetch(reposUrl);

  return await response.json();
};

const main = async () => {
  const response = await fetch(GITHUB_URL);
  const { name, avatar_url, repos_url } = await response.json();

  const nameApp = document.querySelector("#name");
  const avatarUlApp = document.querySelector("#avatar-url");

  nameApp.innerHTML = name;
  avatarUlApp.src = avatar_url;

  const repositories = await listRepositories(repos_url);

  renderCards(repositories);
};

main();

document.querySelector("#scroll-btn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
