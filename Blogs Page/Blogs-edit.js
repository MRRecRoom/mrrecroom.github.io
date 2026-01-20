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
  const id = getQueryParam("id");
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    document.body.innerHTML = `<h2>Blog not found.</h2><a href="blogs.html">Back</a>`;
    return;
  }

  const titleEl = document.getElementById("title");
  const contentEl = document.getElementById("content");

  titleEl.value = blog.title;
  contentEl.value = blog.content;

  document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = `Blogs-blog.html?id=${encodeURIComponent(id)}`;
  });

  document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();

    blog.title = titleEl.value.trim();
    blog.content = contentEl.value.trim();
    blog.updatedAt = Date.now();

    saveBlogs(blogs);
    window.location.href = `Blogs-blog.html?id=${encodeURIComponent(id)}`;
  });
});
