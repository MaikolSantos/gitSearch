async function renderDatasUser(user) {
  const data = await getDatasUser(user)
  const reposUser = await getReposUser(user)

  const userHeader = document.querySelector('.user__header')
  const listCards = document.querySelector('.cards')

  userHeader.insertAdjacentHTML('beforeend', 
  `
    <div class="user">
      <figure class="user__img__wrapper">
        <img src="${data.avatar_url}" alt="${data.name}">
      </figure>
      <div class="user__description">
        <h2 class="title-2-bold">
          ${data.name}
        </h2>
        <small class="text-2-medium">
          ${data.bio}
        </small>
      </div>
    </div>
    <div class="user__buttons">
      <a href="mailto:${data.email}"><button class="button button-1">Email</button></a>
      <a href="/pages/home"><button class="button button-2">Trocar de usuário</button></a>
    </div>
  `
  )

  reposUser.forEach((repo) => {
    listCards.insertAdjacentHTML('beforeend', 
    `
      <li class="card">
        <h3 class="title-3-medium ">${repo.name}</h3>
        <p class="text-3-regular">${repo.description}</p>
        <div class="cards__buttons">
          <a href="${repo.html_url}" target="_blank"><button class="button button-card">Repositório</button></a>
          <a href="https://${data.login.toLowerCase()}.github.io/${repo.name}/" target="_blank"><button class="button button-card">Demo</button></a>
        </div>
      </li>
    `
    )
  });
}

const hasUser = localStorage.getItem('user')

if(hasUser) {
  renderDatasUser(hasUser)
}

