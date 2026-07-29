import { posts } from "./posts.js";

const archiveList = document.getElementById("archive-list") || document.getElementById("post-list");
const pagination = document.getElementById("pagination");
const filterContainer = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");

const sortTrigger = document.getElementById("sort-trigger");
const sortMenu = document.getElementById("sort-menu");
const sortContainer = sortTrigger?.parentElement;
const sortLabel = document.getElementById("sort-label");

const POSTS_PER_PAGE = 9; 

let currentPage = getPageFromURL();
let currentCategory = null;
let searchQuery = "";
let currentOrder = "recent";

if (!archiveList) {
  console.warn("No se encontró un contenedor para los posts (#archive-list o #post-list)");
} else {
  initBlog();
}

function initBlog() {
  const allCategories = [...new Set(posts.flatMap(p => p.categories || []))];

  if (filterContainer) {
    filterContainer.innerHTML = `
      <button class="filter-btn active" data-category="">Todos</button>
      ${allCategories
        .map(cat => `<button class="filter-btn" data-category="${cat}">${cat}</button>`)
        .join("")}
    `;
    filterContainer.addEventListener("click", handleFilterClick);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      currentPage = 1;
      updateURL(currentPage);
      renderPosts();
    });
  }

  if (sortTrigger && sortMenu && sortContainer) {
    sortTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      sortContainer.classList.toggle("active");
    });

    sortMenu.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;

      currentOrder = li.dataset.value;
      if (sortLabel) sortLabel.textContent = li.textContent;

      sortMenu.querySelectorAll("li").forEach(item => item.classList.remove("selected"));
      li.classList.add("selected");

      sortContainer.classList.remove("active");
      currentPage = 1;
      updateURL(currentPage);
      renderPosts();
    });

    document.addEventListener("click", () => {
      sortContainer.classList.remove("active");
    });
  }

  renderPosts();
}

function handleFilterClick(e) {
  if (!e.target.matches(".filter-btn")) return;
  currentCategory = e.target.dataset.category || null;
  currentPage = 1;
  updateActiveFilter(e.target);
  updateURL(currentPage);
  renderPosts();
}

function updateActiveFilter(activeBtn) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

function sortPosts(postsArray) {
  return [...postsArray].sort((a, b) => {
    return currentOrder === "recent" ? b.id - a.id : a.id - b.id;
  });
}

function formatDisplayDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const dateObj = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(dateObj);
}

function renderPosts() {
  const sortedPosts = sortPosts(posts);

  let filteredPosts = sortedPosts.filter(p => {
    const matchesCategory = !currentCategory || (p.categories && p.categories.includes(currentCategory));
    
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery) || 
      p.excerpt.toLowerCase().includes(searchQuery) || 
      (p.categories && p.categories.some(cat => cat.toLowerCase().includes(searchQuery)));
      
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(start, end);

  if (visiblePosts.length === 0) {
    archiveList.innerHTML = `
    <div style="display: contents">
    <p class="no-results">No se encontraron entradas que coincidan con tu búsqueda.</p>
    </div>
    `;
    if (pagination) pagination.innerHTML = "";
    return;
  }

  archiveList.innerHTML = visiblePosts.map((post, index) => {
    const postUrl = post.link ? `./${post.link}` : `./single-post-${post.id}.html`;
    const cleanDate = formatDisplayDate(post.date);

    const isFeatured = index === 0 && currentPage === 1 && !searchQuery && !currentCategory;

    return `
      <article class="archive-card ${isFeatured ? "featured" : ""}">
        <a href="${postUrl}">
          ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
          <div class="archive-info">
            ${cleanDate ? `
            <time datetime="${post.date}" style="display: flex; align-items: center; gap: 0.75rem; font-size: 1rem; margin: 0.5rem 0 0.5rem 1rem; color: var(--text-secondary);">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9 4.20001V9.00001L12.2 10.6" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg> 
              <span>${cleanDate}</span>
            </time>
            ` : ""}
            <h4>${post.title}</h4>
            <p>${post.excerpt}</p>
            <span class="archive-meta">${post.categories ? post.categories.join(" • ") : ""}</span>
          </div>
        </a>
      </article>
    `;
  }).join("");

  if (pagination) renderPagination(filteredPosts.length);
}

function renderPagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const maxVisible = 5;
  let pages = [];

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  if (totalPages <= maxVisible + 2) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const firstPage = 1;
    const lastPage = totalPages;
    const rangeStart = Math.max(currentPage - 2, 2);
    const rangeEnd = Math.min(currentPage + 2, totalPages - 1);

    pages = [firstPage];
    if (rangeStart > 2) pages.push("...");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < totalPages - 1) pages.push("...");
    pages.push(lastPage);
  }

  pagination.innerHTML = `
    <button class="page-btn prev" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="Página anterior">◀</button>
    ${pages
      .map(p =>
        p === "..."
          ? `<span class="dots" aria-hidden="true">...</span>`
          : `<button class="page-btn ${currentPage === p ? "active" : ""}" data-page="${p}" aria-label="Página ${p}">${p}</button>`
      )
      .join("")}
    <button class="page-btn next" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Página siguiente">▶</button>
  `;

  pagination.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const page = parseInt(e.target.dataset.page);
      if (!isNaN(page) && page !== currentPage) {
        changePage(page);
      }
    });
  });
}

function changePage(page) {
  currentPage = page;
  updateURL(page);
  renderPosts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateURL(page) {
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  history.pushState({ page }, "", url);
}

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page"));
  return isNaN(page) || page < 1 ? 1 : page;
}

window.addEventListener("popstate", e => {
  currentPage = e.state?.page || getPageFromURL();
  renderPosts();
});