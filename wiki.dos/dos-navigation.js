// dOS0 Navigation Script - Handles URL updates and internal navigation

// Notify parent window of current URL for address bar
function notifyParentOfUrl() {
    const currentPath = window.location.pathname;
    const dosPath = currentPath.split('/wiki.dos/')[1] || 'index.html';
    const friendlyUrl = 'wiki.dos/' + dosPath.replace('/index.html', '').replace('.html', '');
    
    window.parent.postMessage({
        type: 'urlUpdate',
        url: friendlyUrl
    }, '*');
}

// Notify on page load
window.addEventListener('load', notifyParentOfUrl);

// Handle link clicks for internal navigation
document.addEventListener('click', function(e) {
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
