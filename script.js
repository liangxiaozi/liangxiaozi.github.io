(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('#language');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-category]')];
  let activeFilter = 'all';
  function announceResults() {
    const count = projects.filter(project => !project.hidden).length;
    document.querySelector('#filter-status').textContent = root.dataset.language === 'en' ? `${count} projects shown` : `显示 ${count} 个项目`;
  }
  function setLanguage(language) {
    const english = language === 'en';
    root.dataset.language = english ? 'en' : 'zh';
    root.lang = english ? 'en' : 'zh-CN';
    languageButton.innerHTML = `${english ? '中文 / EN' : 'EN / 中文'}`;
    languageButton.setAttribute('aria-label', english ? '切换为中文' : 'Switch to English');
    document.title = english ? 'Xiao Liang | Personal Homepage' : '梁潇 Xiao Liang | Personal Homepage';
    announceResults();
  }
  try { setLanguage(localStorage.getItem('xiao-language') || 'zh'); } catch { setLanguage('zh'); }
  languageButton.addEventListener('click', () => {
    const language = root.dataset.language === 'en' ? 'zh' : 'en';
    setLanguage(language);
    try { localStorage.setItem('xiao-language', language); } catch { /* Browsing remains available without storage. */ }
  });
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    projects.forEach(project => { project.hidden = activeFilter !== 'all' && project.dataset.category !== activeFilter; });
    announceResults();
  }));
})();
