// dOS0 Navigation Script - Handles URL updates and internal navigation

// Notify parent window of current URL for address bar
function notifyParentOfUrl() {
    const currentPath = window.location.pathname;
    console.log('📍 Current path:', currentPath);
    
    // Extract the page name from the path (handles both /wiki.dos/page.html and /dos-sites/wiki.dos/page.html)
    let pageName = 'index.html';
    if (currentPath.includes('/wiki.dos/')) {
        pageName = currentPath.split('/wiki.dos/')[1] || 'index.html';
    } else if (currentPath.endsWith('.html')) {
        pageName = currentPath.split('/').pop();
    }
    
    // Build friendly URL
    const friendlyUrl = pageName === 'index.html' ? 'wiki.dos' : 'wiki.dos/' + pageName.replace('.html', '');
    
    console.log('📨 Sending urlUpdate:', friendlyUrl);
    window.parent.postMessage({
        type: 'urlUpdate',
        url: friendlyUrl
    }, '*');
}

// Notify on page load
window.addEventListener('load', notifyParentOfUrl);

// Handle link clicks for internal navigation
document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (link && link.href) {
        const href = link.getAttribute('href');
        // If it's a relative link
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript:')) {
            e.preventDefault();
            console.log('🔗 Navigating to:', href);
            window.location.href = href;
        }
    }
});
