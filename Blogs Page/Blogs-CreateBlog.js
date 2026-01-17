console.log("JS connected to CreateBlog!");
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}

function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

document.addEventListener("DOMContentLoaded", () => {
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

  const form = document.getElementById("blogForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) return;

    const blogs = getBlogs();
    const blog = {
      id: makeId(),
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    blogs.unshift(blog);
    saveBlogs(blogs);

    window.location.href = `blog.html?id=${encodeURIComponent(blog.id)}`;
  });
});
