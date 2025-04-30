export function initTheme() {
    const html = document.documentElement;
    
    // On first load, check localStorage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  export function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.querySelectorAll('.star').forEach(star => {
        star.style.filter = 'invert(0%) drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))';
      });
      
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      const newTheme = event.newValue;
      localStorage.setItem('theme', 'light');
      
    }
  });