// ✅ 統計功能
function initStats() {
  if (!localStorage.getItem('totalVisits')) {
    localStorage.setItem('totalVisits', 0);
  }
  if (!localStorage.getItem('articleViews')) {
    localStorage.setItem('articleViews', JSON.stringify({
      'v1a_home': 0,
      'about_me': 0,
      'comments': 0
    }));
  }
  if (!localStorage.getItem('likes')) {
    localStorage.setItem('likes', JSON.stringify({
      'v1a_home': 0,
      'about_me': 0,
      'comments': 0
    }));
  }
}

function updateStats() {
  let visits = parseInt(localStorage.getItem('totalVisits')) + 1;
  localStorage.setItem('totalVisits', visits);
  const visitEl = document.getElementById('totalVisits');
  if (visitEl) visitEl.innerText = visits;

  let views = JSON.parse(localStorage.getItem('articleViews'));
  let likes = JSON.parse(localStorage.getItem('likes'));

  for (let key in views) {
    const viewEl = document.getElementById(`views_${key}`);
    const likeEl = document.getElementById(`likes_${key}`);
    if (viewEl) viewEl.innerText = views[key];
    if (likeEl) likeEl.innerText = likes[key];
  }
}

function simulateView(article) {
  let views = JSON.parse(localStorage.getItem('articleViews'));
  views[article]++;
  localStorage.setItem('articleViews', JSON.stringify(views));
  updateStats();
}

function simulateLike(article) {
  let likes = JSON.parse(localStorage.getItem('likes'));
  likes[article]++;
  localStorage.setItem('likes', JSON.stringify(likes));
  updateStats();
}

// ✅ 留言板功能
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  const list = document.getElementById('commentsList');
  if (!list) return;
  list.innerHTML = '';
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.className = 'comment-box';
    div.innerHTML = `<strong>${comment.name}</strong> 說：<br>${comment.message}`;
    list.appendChild(div);
  });
}

function handleCommentSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (name && message) {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ name, message });
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('commentForm').reset();
    loadComments();
  }
}

// ✅ 搜尋功能
function loadKeywords() {
  const keywords = JSON.parse(localStorage.getItem('searchKeywords') || '[]');
  const list = document.getElementById('keywordList');
  if (!list) return;
  list.innerHTML = '';
  keywords.slice(-10).reverse().forEach(keyword => {
    const span = document.createElement('span');
    span.className = 'keyword-tag';
    span.textContent = keyword;
    list.appendChild(span);
  });
}

function showResults(keyword) {
  const results = document.getElementById('searchResults');
  if (results) {
    results.innerHTML = `<p>您搜尋的是：<strong>${keyword}</strong><br>（這裡可顯示相關文章或連結）</p>`;
  }
}

function handleSearchSubmit(e) {
  e.preventDefault();
  const keyword = document.getElementById('searchInput').value.trim();
  if (keyword) {
    let keywords = JSON.parse(localStorage.getItem('searchKeywords') || '[]');
    keywords.push(keyword);
    localStorage.setItem('searchKeywords', JSON.stringify(keywords));
    document.getElementById('searchInput').value = '';
    loadKeywords();
    showResults(keyword);
  }
}

// ✅ 自動判斷頁面並執行對應功能
window.onload = function() {
  const path = window.location.pathname;

  if (path.includes('stats.html')) {
    initStats();
    updateStats();
  }

  if (path.includes('comments.html')) {
    loadComments();
    const form = document.getElementById('commentForm');
    if (form) form.addEventListener('submit', handleCommentSubmit);
  }

  if (path.includes('search.html')) {
    loadKeywords();
    const form = document.getElementById('searchForm');
    if (form) form.addEventListener('submit', handleSearchSubmit);
  }
};
