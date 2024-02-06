let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  const darkModeToggle = document.querySelector('#darkModeToggle');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    if (window.innerWidth <= 767) { // Only hide the button on mobile
      darkModeToggle.style.transform = 'translateY(100%)';
      darkModeToggle.style.opacity = '0';
    }
  } else {
    // Scrolling up
    darkModeToggle.style.transform = 'translateY(0)';
    darkModeToggle.style.opacity = '1';
  }

  // Update the last scroll top value
  lastScrollTop = scrollTop;
});

let hasPanelBeenExpanded = false;

function openSidePanel() {
  const pane = document.querySelector('.collapsible-pane');
  pane.style.width = window.innerWidth < 768 ? '100%' : 'calc(1 / 3 * 100%)';
  pane.style.height = window.innerWidth < 768 ? '50%' : '100%';
  pane.style.transform = 'translateX(0)'; // Reset the transform property when the side panel is expanded
  hasPanelBeenExpanded = true;
  const textWrapper = document.querySelector('.text-wrapper');
  
  if (window.innerWidth > 2000) {
    textWrapper.style.marginRight = 'auto';
    textWrapper.style.marginLeft = 'auto';
  }
}

function closeSidePanel() {
  const pane = document.querySelector('.collapsible-pane');
  pane.style.width = '0px';
  pane.style.height = '0px';
  pane.style.transform = window.innerWidth < 768 ? 'translateY(100%)' : 'translateX(calc(1 / 3 * 100%))'; // Apply the transform property when the side panel is collapsed
  const textWrapper = document.querySelector('.text-wrapper');
  
  if (window.innerWidth > 2000) {
    textWrapper.style.marginRight = 'auto';
    textWrapper.style.marginLeft = 'auto';
  }
}

let isCollapsed = window.innerWidth < 768; // If the screen width is less than 768px, set isCollapsed to true

document.getElementById('toggleButton').addEventListener('click', function() {
  const pane = document.querySelector('.collapsible-pane');
  if (isCollapsed) {
    openSidePanel();
    isCollapsed = false;
  } else {
    closeSidePanel();
    isCollapsed = true;
  }
  updateButtonPosition();
});

document.getElementById('sidePanelButton').addEventListener('click', function() {
  const pane = document.querySelector('.collapsible-pane');
  if (pane.style.height === '0px' || pane.style.height === '') {
    pane.style.width = window.innerWidth < 768 ? '100%' : 'calc(1 / 3 * 100%)';
    pane.style.height = window.innerWidth < 768 ? '50%' : '100%';
  } else {
    pane.style.width = '0px';
    pane.style.height = '0px';
  }
});

const images = document.querySelectorAll('.collapsible-pane img');

images.forEach(img => {
  img.addEventListener('mouseover', function() {
    const ids = this.dataset.highlightIds.split(',');
    ids.forEach(id => {
      document.getElementById(id).classList.add('highlight');
    });
  });

  img.addEventListener('mouseout', function() {
    const ids = this.dataset.highlightIds.split(',');
    ids.forEach(id => {
      document.getElementById(id).classList.remove('highlight');


    });
  });
});

function addGlowingOutline(element) {
  element.classList.add('glowing-outline');
  setTimeout(() => {
    element.classList.remove('glowing-outline');
  }, 1500);
  hasPanelBeenExpanded = true;
  updateButtonPosition();
}

images.forEach(img => {
  const ids = img.dataset.highlightIds.split(':');
  const imgId = ids[0];
  const textIds = ids[1].split(',');

  img.addEventListener('mouseover', function() {
    textIds.forEach(id => {
      document.getElementById(id).classList.add('highlight');
    });
  });

  img.addEventListener('mouseout', function() {
    textIds.forEach(id => {
      document.getElementById(id).classList.remove('highlight');
    });
  });

  img.addEventListener('click', function() {
    const firstTextId = textIds[0];
    const firstTextElement = document.getElementById(firstTextId);
    firstTextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Apply the 'highlight' class and remove it after 3000ms
    firstTextElement.classList.add('highlight');
    setTimeout(() => {
      firstTextElement.classList.remove('highlight');
    }, 3000);
  });


    textIds.forEach(textId => {
      const textElement = document.getElementById(textId);

  // Add the highlighting functionality when hovering over the text
  textElement.addEventListener('mouseover', function () {
    textElement.classList.add('light-gray-highlight');
  });

  textElement.addEventListener('mouseout', function () {
    textElement.classList.remove('light-gray-highlight');
  });

      
      textElement.addEventListener('click', () => {
        if (isCollapsed) {
          openSidePanel();
          setTimeout(() => {
            const imageToScroll = document.getElementById(imgId);
            imageToScroll.scrollIntoView({ behavior: 'smooth', block:'center' });
            addGlowingOutline(imageToScroll);
          }, 810); // Wait for the side panel to fully expand
          isCollapsed = false; // Update the state of the side panel
          // Update the button position and text
          const button = document.getElementById('sidePanelButton');
          button.style.left = window.innerWidth < 768 ? 'calc(100% - 60px)' : 'calc(2 / 3 * 100% - 60px)';
          button.style.right = 'auto';
          button.innerHTML = '&rsaquo;';
        } else {
          const imageToScroll = document.getElementById(imgId);
          imageToScroll.scrollIntoView({ behavior: 'smooth', block:'center' });
          addGlowingOutline(imageToScroll);
        }
      });
    });
  });

function updateButtonPosition() {
  const button = document.getElementById('sidePanelButton');

  const andImageUrl = 'https://github.com/malenaohl/visualreader/blob/main/caret-up.png?raw=true';
  const orImageUrl = 'https://github.com/malenaohl/visualreader/blob/main/caret-down.png?raw=true';
  const lsaquoImageUrl = 'https://github.com/malenaohl/visualreader/blob/main/caret-left.png?raw=true';
  const rsaquoImageUrl = 'https://github.com/malenaohl/visualreader/blob/main/caret-right.png?raw=true';

  if (window.innerWidth < 768) {
    if (isCollapsed) {
      button.style.bottom = '20px';
      button.style.transform = 'translateY(-50)';
      button.innerHTML = `<img src="${andImageUrl}" alt="And" width="40" height="40" class="caret-icon">`;
      button.style.display = (isCollapsed && hasPanelBeenExpanded) || !isCollapsed ? 'block' : 'none';
      closeSidePanel();
    } else {
      button.style.bottom = '51%';
      button.style.transform = 'translateY(50%)';
      button.innerHTML = `<img src="${orImageUrl}" alt="Or" width="40" height="40" class="caret-icon">`;
      button.style.display = 'block';
    }
  } else {
    if (isCollapsed) {
      button.style.left = 'auto';
      button.style.right = '20px';
      button.innerHTML = `<img src="${lsaquoImageUrl}" alt="Lsaquo" width="40" height="40" class="caret-icon">`;
    } else {
      button.style.left = 'calc(2 / 3 * 100% - 60px)';
      button.style.right = 'auto';
      button.innerHTML = `<img src="${rsaquoImageUrl}" alt="Rsaquo" width="40" height="40" class="caret-icon">`;
      openSidePanel();
    }
  }
}

// Call the updateButtonPosition function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', updateButtonPosition());

document.getElementById('sidePanelButton').addEventListener('click', function () {
  const pane = document.querySelector('.collapsible-pane');
  if (isCollapsed) {
    pane.style.transform = 'translateY(0)';
  } else {
    pane.style.transform = window.innerWidth < 768 ? 'translateY(100%)' : 'translateX(calc(1 / 3 * 100%))';
  }
  isCollapsed = !isCollapsed;
  updateButtonPosition();
});

window.addEventListener('resize', updateButtonPosition);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  if (document.body.classList.contains('dark-mode')) {
    sunIcon.style.display = '';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = '';
  }
}
