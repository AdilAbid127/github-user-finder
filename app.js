function findUser() {
    const username = document.getElementById("username").value.trim();
    const output = document.getElementById("output");

    if (!username) return alert("Enter GitHub username.");

    output.classList.remove("d-none");
    output.innerHTML = `
    <div class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Searching...</p>
    </div>
  `;

    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(user => {
            output.innerHTML = `
        <div class="text-center">
          <img src="${user.avatar_url}" class="mb-3" width="100" />
          <h4>${user.name || "No name"}</h4>
          <p class="text-muted">@${user.login}</p>
          <p>${user.bio || ""}</p>
          <div class="row text-center">
            <div class="col"><strong>${user.followers}</strong><br/>Followers</div>
            <div class="col"><strong>${user.following}</strong><br/>Following</div>
            <div class="col"><strong>${user.public_repos}</strong><br/>Repos</div>
          </div>
          <a href="${user.html_url}" class="btn btn-outline-primary mt-3" target="_blank">View Profile</a>
        </div>
      `;
        })
        .catch(() => {
            output.innerHTML = `<div class="alert alert-danger">User not found</div>`;
        });
}