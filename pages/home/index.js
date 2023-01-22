const form = document.querySelector("form");
const input = document.querySelector(".input");
const smallForm = document.querySelector("form small");
const button = document.querySelector("form button");

let recentUsers = JSON.parse(localStorage.getItem("recent")) || [];

async function renderRecent() {
  const list = document.querySelector(".recent-users");

  list.innerHTML = "";

  recentUsers.forEach((recentUser) => {
    const user = renderImgRecentUsers(recentUser);
    list.appendChild(user);
  });
}

renderRecent();

function renderImgRecentUsers(user) {
  const li = document.createElement("li");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const small = document.createElement("small");

  li.dataset.userName = user.login;

  figure.classList = "img-wrapper";
  img.src = user.avatar_url;
  small.innerText = "Acessar este perfil";

  figure.append(img);
  li.append(figure, small);

  li.addEventListener('click', (event) => {
    const user = event.currentTarget.dataset.userName
    localStorage.setItem("user", user);
    window.location.pathname = "/gitSearch/pages/profile/";
  })

  return li;
}

input.addEventListener("input", () => {
  if (input.value) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
});

form.addEventListener("submit", handleEventForm);

async function handleEventForm(event) {
  event.preventDefault();
  const user = input.value;

  button.innerHTML = spinner();

  const url = `https://api.github.com/users/${user}`;
  const data = await fetch(url);
  const dataJson = await data.json();

  button.innerHTML = "Ver perfil do github";

  if (data.status === 404) {
    input.classList.add("border-brand-2");
    smallForm.classList.remove("hidden");
    input.value = "";
    button.setAttribute('disabled', '')

    setTimeout(() => {
      input.classList.remove("border-brand-2");
      smallForm.classList.add("hidden");
    }, 10000);
  } else {
    input.value = "";

    localStorage.setItem("user", user);

    if (recentUsers.length >= 3) {
      recentUsers.pop();

      recentUsers = [dataJson, ...recentUsers];

      const recentUsersToJson = JSON.stringify(recentUsers);

      localStorage.setItem("recent", recentUsersToJson);
    } else {
      recentUsers = [dataJson, ...recentUsers];

      const recentUsersToJson = JSON.stringify(recentUsers);

      localStorage.setItem("recent", recentUsersToJson);
    }

    window.location.pathname = "pages/profile/";
  }
}
