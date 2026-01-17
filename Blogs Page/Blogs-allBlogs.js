console.log("JS connected to blogs!");
function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

function formatDate(ts) {
  return new Date(ts).toLocaleString();
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

function setQueryParam(name, value) {
  const url = new URL(window.location.href);
  if (!value) url.searchParams.delete(name);
  else url.searchParams.set(name, value);
  window.history.replaceState({}, "", url.toString());
}

function matches(blog, q) {
  const s = q.toLowerCase();
  return (
    blog.title.toLowerCase().includes(s) ||
    blog.content.toLowerCase().includes(s)
  );
}

function renderList(blogs, q) {
  const container = document.getElementById("blogsList");
  if (!container) return;

  const filtered = q ? blogs.filter(b => matches(b, q)) : blogs;

  if (filtered.length === 0) {
    container.innerHTML = q
      ? `<p>No results for "<b>${escapeHtml(q)}</b>".</p>`
      : `<p>No blogs yet. <a href="createblog.html">Create one</a>.</p>`;
    return;
  }

  container.innerHTML = filtered.map(b => {
    const preview = b.content.length > 160 ? b.content.slice(0, 160) + "..." : b.content;
    return `
      <div style="border:1px solid #ddd; padding:12px; border-radius:8px; margin-bottom:12px;">
        <h3 style="margin:0 0 6px 0;">${escapeHtml(b.title)}</h3>
        <small>Updated: ${formatDate(b.updatedAt)}</small>
        <p>${escapeHtml(preview)}</p>
        <a href="blog.html?id=${encodeURIComponent(b.id)}">Read</a>
        &nbsp;|&nbsp;
        <a href="edit.html?id=${encodeURIComponent(b.id)}">Edit</a>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Navbar search support
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

  const blogs = getBlogs();

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");

  // load from URL: blogs.html?q=...
  const qFromUrl = getQueryParam("q").trim();
  searchInput.value = qFromUrl;

  function doSearch() {
    const q = searchInput.value.trim();
    setQueryParam("q", q);
    renderList(blogs, q);
  }

  searchBtn.addEventListener("click", doSearch);
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    doSearch();
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });

  renderList(blogs, qFromUrl);
});