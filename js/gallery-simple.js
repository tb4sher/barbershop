// Einfache Gallery Load More Funktionalität
// Standalone Lösung ohne Konflikte

console.log('🎯 Gallery Simple JS Loading...');

function initGallery() {
    console.log('[Gallery] Initializing gallery...');
    
    const galleryContainer = document.querySelector('.gallery-grid');
    const showMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!galleryContainer) {
        console.error('[Gallery] Gallery grid not found');
        return;
    }
    
    if (!showMoreBtn) {
        console.error('[Gallery] Load more button not found');
        return;
    }
    
    console.log('[Gallery] Found gallery elements');
    
    // Get all gallery items
    const allItems = galleryContainer.querySelectorAll('.gallery-item');
    console.log('[Gallery] Found', allItems.length, 'gallery items');
    
    // Track current state
    let isExpanded = false;
    
    // Show first 9 items, hide the rest
    function showInitialItems() {
        console.log('[Gallery] Showing initial 9 items');
        allItems.forEach((item, index) => {
            if (index < 9) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        showMoreBtn.textContent = 'Mehr anzeigen';
        showMoreBtn.disabled = false;
        isExpanded = false;
    }
    
    // Show all items with animation
    function showAllItems() {
        console.log('[Gallery] Showing all items');
        const hiddenItems = galleryContainer.querySelectorAll('.gallery-item.hidden');
        
        hiddenItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                
                // Force reflow
                item.offsetHeight;
                
                // Animate in
                item.style.transition = 'opacity 0.5s ease';
                item.style.opacity = '1';
                
                console.log('[Gallery] Animated item', index + 1, 'of', hiddenItems.length);
            }, index * 150);
        });
        
        // Update button after animation
        setTimeout(() => {
            showMoreBtn.textContent = 'Weniger anzeigen';
            showMoreBtn.disabled = false;
            isExpanded = true;
            console.log('[Gallery] All items shown, button updated to "Weniger anzeigen"');
        }, hiddenItems.length * 150 + 500);
    }
    
    // Button click handler
    showMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('[Gallery] Button clicked, current state:', isExpanded ? 'expanded' : 'collapsed');
        
        showMoreBtn.disabled = true;
        
        if (isExpanded) {
            // Show less - go back to initial state
            showInitialItems();
        } else {
            // Show more - show all items
            showAllItems();
        }
    });
    
    // Initialize with first 9 items
    showInitialItems();
    
    // Add VIP client styling class for better browser compatibility
    allItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay h4');
        if (overlay && overlay.textContent.includes('VIP Client')) {
            item.classList.add('vip-client');
            console.log('[Gallery] Added VIP client styling to item');
        }
    });
    
    console.log('[Gallery] Gallery initialized successfully');
}

// Snapshots Gallery functionality
function initSnapshotsGallery() {
    console.log('[Snapshots] Initializing snapshots gallery...');
    
    const snapshotsContainer = document.querySelector('.snapshots-grid');
    const snapshotsBtn = document.getElementById('snapshotsLoadMoreBtn');
    
    if (!snapshotsContainer) {
        console.error('[Snapshots] Snapshots container not found');
        return;
    }
    
    if (!snapshotsBtn) {
        console.error('[Snapshots] Snapshots button not found');
        return;
    }
    
    console.log('[Snapshots] Found snapshots elements');
    
    // Get all snapshots items
    const allSnapshotsItems = snapshotsContainer.querySelectorAll('.snapshot-item.gallery-item');
    console.log('[Snapshots] Found', allSnapshotsItems.length, 'snapshots items');
    
    // Track current state
    let isSnapshotsExpanded = false;
    
    // Show first 6 items, hide the rest
    function showInitialSnapshotsItems() {
        console.log('[Snapshots] Showing initial 6 items');
        allSnapshotsItems.forEach((item, index) => {
            if (index < 6) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        snapshotsBtn.textContent = 'Mehr anzeigen';
        snapshotsBtn.disabled = false;
        isSnapshotsExpanded = false;
    }
    
    // Show all items with animation
    function showAllSnapshotsItems() {
        console.log('[Snapshots] Showing all items');
        const hiddenItems = snapshotsContainer.querySelectorAll('.snapshot-item.gallery-item.hidden');
        
        hiddenItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                
                // Force reflow
                item.offsetHeight;
                
                // Animate in
                item.style.transition = 'opacity 0.5s ease';
                item.style.opacity = '1';
                
                console.log('[Snapshots] Animated item', index + 1, 'of', hiddenItems.length);
            }, index * 150);
        });
        
        // Update button after animation
        setTimeout(() => {
            snapshotsBtn.textContent = 'Weniger anzeigen';
            snapshotsBtn.disabled = false;
            isSnapshotsExpanded = true;
            console.log('[Snapshots] All items shown, button updated to "Weniger anzeigen"');
        }, hiddenItems.length * 150 + 500);
    }
    
    // Button click handler
    snapshotsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('[Snapshots] Button clicked, current state:', isSnapshotsExpanded ? 'expanded' : 'collapsed');
        
        snapshotsBtn.disabled = true;
        
        if (isSnapshotsExpanded) {
            // Show less - go back to initial state
            showInitialSnapshotsItems();
        } else {
            // Show more - show all items
            showAllSnapshotsItems();
        }
    });
    
    // Initialize with first 6 items
    showInitialSnapshotsItems();
    
    console.log('[Snapshots] Snapshots gallery initialized successfully');
}

// Multiple initialization strategies
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Gallery] DOM loaded, initializing...');
    initGallery();
    initSnapshotsGallery();
});

window.addEventListener('load', function() {
    console.log('[Gallery] Window loaded, checking if gallery needs initialization...');
    // Check if gallery is already working
    const showMoreBtn = document.getElementById('loadMoreBtn');
    if (showMoreBtn && !showMoreBtn.dataset.initialized) {
        console.log('[Gallery] Gallery not initialized, initializing now...');
        initGallery();
        showMoreBtn.dataset.initialized = 'true';
    }
    
    // Check if snapshots gallery needs initialization
    const snapshotsBtn = document.getElementById('snapshotsLoadMoreBtn');
    if (snapshotsBtn && !snapshotsBtn.dataset.initialized) {
        console.log('[Snapshots] Snapshots gallery not initialized, initializing now...');
        initSnapshotsGallery();
        snapshotsBtn.dataset.initialized = 'true';
    }
});

// Backup initialization after 3 seconds
setTimeout(function() {
    console.log('[Gallery] Backup initialization check...');
    const showMoreBtn = document.getElementById('loadMoreBtn');
    if (showMoreBtn && !showMoreBtn.dataset.initialized) {
        console.log('[Gallery] Gallery still not initialized, forcing initialization...');
        initGallery();
        showMoreBtn.dataset.initialized = 'true';
    }
    
    const snapshotsBtn = document.getElementById('snapshotsLoadMoreBtn');
    if (snapshotsBtn && !snapshotsBtn.dataset.initialized) {
        console.log('[Snapshots] Snapshots gallery still not initialized, forcing initialization...');
        initSnapshotsGallery();
        snapshotsBtn.dataset.initialized = 'true';
    }
}, 3000);

console.log('🎯 Gallery Simple JS Loaded!'); 