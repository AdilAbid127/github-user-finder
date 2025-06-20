function findUser() {
    const username = document.getElementById("username").value.trim();
    const output = document.getElementById("output");

    if (!username) {
        alert("Please enter a GitHub username.");
        return;
    }

    // Show loading state
    output.classList.remove("d-none");
    output.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Searching for user...</p>
        </div>
    `;

    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) throw new Error("User not found");
            return res.json();
        })
        .then(user => {
            output.innerHTML = `
                <div class="text-center">
                    <img src="${user.avatar_url}" alt="${user.login}" class="mb-3" />
                    <h4>${user.name || "No name provided"}</h4>
                    <p class="text-muted">@${user.login}</p>
                    <p class="lead">${user.bio || ""}</p>
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="p-3 border rounded">
                                <i class="fas fa-users mb-2"></i>
                                <h5>${user.followers}</h5>
                                <small class="text-muted">Followers</small>
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3 border rounded">
                                <i class="fas fa-user-friends mb-2"></i>
                                <h5>${user.following}</h5>
                                <small class="text-muted">Following</small>
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3 border rounded">
                                <i class="fas fa-code-branch mb-2"></i>
                                <h5>${user.public_repos}</h5>
                                <small class="text-muted">Repos</small>
                            </div>
                        </div>
                    </div>
                    <a href="${user.html_url}" target="_blank" class="btn btn-outline-primary">
                        <i class="fas fa-external-link-alt me-2"></i>View Profile
                    </a>
                </div>
            `;
        })
        .catch(() => {
            output.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    User not found
                </div>
            `;
        });
}