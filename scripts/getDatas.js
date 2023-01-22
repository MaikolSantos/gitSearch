async function getDatasUser(user) {
  try {
    const url = `https://api.github.com/users/${user}`;

    const data = await fetch(url);

    const dataJson = await data.json();

    return dataJson;
  } catch (error) {
    return error;
  }
}

async function getReposUser(user) {
  try {
    const url = `https://api.github.com/users/${user}/repos`;

    const data = await fetch(url);
    const dataJson = await data.json();

    return dataJson;
  } catch (error) {
    return error;
  }
}
