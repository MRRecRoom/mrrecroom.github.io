function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs") || "[]");
}

// Extract keywords from content
function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length >= 4); // ignore small words
}

function buildSuggestions() {
  const blogs = getBlogs();
  const set = new Set();

  blogs.forEach(blog => {
    if (blog.title) {
      set.add(blog.title.trim());
    }

    if (blog.content) {
      extractKeywords(blog.content).forEach(word => {
        set.add(word);
      });
    }
  });

  return Array.from(set).slice(0, 50); // limit for UX
}

document.addEventListener("DOMContentLoaded", () => {
  const datalist = document.getElementById("blogSuggestions");
  if (!datalist) return;

  const suggestions = buildSuggestions();

  datalist.innerHTML = suggestions
    .map(s => `<option value="${s}"></option>`)
    .join("");
});
