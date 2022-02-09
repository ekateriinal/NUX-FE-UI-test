//Dropdown
const dropContent = document.getElementById('switcher-content');

window.addEventListener('click', hideContent);
window.addEventListener('keydown', outsideDrop);

function showToggle() {
    dropContent.classList.toggle('show');
}

function hideContent(e) {
    if (!e.target.matches('.dropdown-btn')) {
        if (dropContent.classList.contains('show')) {
            dropContent.classList.remove('show');
        }
    }
}

function outsideDrop(e) {
    if (e.key === 'Escape') {
        if (dropContent.classList.contains('show')) {
            dropContent.classList.remove('show');
        }
    }
}

//Tabs
const tabItems = document.querySelectorAll('[role="tab"]');
const tabContent = document.querySelector('[role="tablist"]');

/* tabItems.forEach(item => item.addEventListener('click', selectItem)); */
tabItems.forEach(tab => {
    tab.addEventListener('click', changeTabs);
});

let tabFocus = 0;

tabContent.addEventListener('keydown', e => { 
    if (e.keyCode === 39 || e.keyCode === 37) {
        tabItems[tabFocus].setAttribute('tabindex', -1);
        if (e.keyCode === 39) {
            tabFocus++;
            // If at the end --> go to the start
            if (tabFocus >= tabItems.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === 37) {
            tabFocus--;
            //// If at the start --> go to the end
            if (tabFocus < 0) {
                tabFocus = tabItems.length - 1
            }
        }

        tabItems[tabFocus].setAttribute('tabindex', 0);
        tabItems[tabFocus].focus()
    }
   /*  removeActiveState();
    removeShow();

    this.classList.add('tab-active');

    const tabContentItem = document.querySelector(`#${this.id}-content`);

    tabContentItem.classList.add('show'); */
});

/* function removeActiveState() {
    tabItems.forEach(item => item.classList.remove('tab-active'));
}

function removeShow() {
    tabContent.forEach(item => item.classList.remove('show'));
} */

//Remove all selected tabs
function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

 // Remove all current selected tabs
    parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach(t => t.setAttribute('aria-selected', false));

    // Set this tab as selected
    target.setAttribute('aria-selected', true);

    // Hide all tab panels
     grandparent
     .querySelectorAll('[role="tabpanel"]')
     .forEach(p => p.setAttribute('hidden', true));

    // Show the selected panel
     grandparent.parentNode
     .querySelector(`#${target.getAttribute('aria-controls')}`)
     .removeAttribute('hidden');
}

// Modal
const modal = document.querySelector('.modal');
const loginBtn = document.querySelector('.login-btn');
const closeBtn = document.querySelector('.close');

loginBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
window.addEventListener('keydown', escapeClick);

function openModal() {
    modal.style.display = 'block';
    modal.style.overflow = 'scroll';
    document.querySelector('body').style.overflow = 'hidden';
    trapped = trapFocus(modal);
}

function closeModal() {
    modal.style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
    trapped.onClose();
}

function outsideClick(event) {
    if (event.target == modal) {
        closeModal()
    }
}

function escapeClick(event) {
    if (event.key === 'Escape') {
        closeModal()
    }
}


const trapFocus = (element, prevFocusElm = document.activeElement) => {
    const focusEls = Array.from(element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="password"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
    );
    const firstFocusElm = focusEls[0];
    const lastFocusElm = focusEls[focusEls.length - 1];
    let currentFocus = null;

    firstFocusElm.focus();
    currentFocus = firstFocusElm;

    const handleFocus = e => {
        e.preventDefault();
        if (focusEls.includes(e.target)) {
            currentFocus = e.target;
        } else {
            if (currentFocus === firstFocusElm) {
                lastFocusElm.focus();
            } else {
                firstFocusElm.focus();
            }
            currentFocus = document.activeElement;
        }
    };

    document.addEventListener('focus', handleFocus, true);

    return {
        onClose: () => {
            document.removeEventListener('focus', handleFocus, true);
            prevFocusElm.focus();
        }
    }
}
