console.log("JS connected to blog!");
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}

function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Navbar search
  const navSearch = document.getElementById("navSearch");
  const navSearchBtn = document.getElementById("navSearchBtn");
  if (navSearch && navSearchBtn) {
    navSearchBtn.addEventListener("click", () => {
      const q = (navSearch.value || "").trim();
      window.location.href = `blogs.html?q=${encodeURIComponent(q)}`;
    });
    navSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        navSearchBtn.click();
      }
    });
  }

  const id = getQueryParam("id");
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    document.body.innerHTML = `<h2>Blog not found.</h2><a href="blogs.html">Back</a>`;
    return;
  }

  document.getElementById("blogTitle").textContent = blog.title;
  document.getElementById("blogMeta").textContent =
    `Created: ${new Date(blog.createdAt).toLocaleString()} | Updated: ${new Date(blog.updatedAt).toLocaleString()}`;
  document.getElementById("blogContent").textContent = blog.content;

  document.getElementById("editBtn").addEventListener("click", () => {
    window.location.href = `edit.html?id=${encodeURIComponent(blog.id)}`;
  });

  document.getElementById("deleteBtn").addEventListener("click", () => {
    const ok = confirm("Delete this blog? This cannot be undone.");
    if (!ok) return;

    const next = blogs.filter(b => b.id !== blog.id);
    saveBlogs(next);
    window.location.href = "blogs.html";
  });
});
