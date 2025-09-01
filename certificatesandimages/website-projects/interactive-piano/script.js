document.addEventListener('DOMContentLoaded', function() {
  const keys = document.querySelectorAll('.key');
  const notesContainer = document.getElementById('notes-container');
  
  // Add click event to each key
  keys.forEach(key => {
    key.addEventListener('click', function() {
      const syllable = this.getAttribute('data-syllable');
      const note = this.getAttribute('data-note');
      
      // Add playing class for visual feedback
      this.classList.add('playing');
      setTimeout(() => {
        this.classList.remove('playing');
      }, 200);
      
      // Create and display note
      createNoteElement(syllable);
    });
  });
  
  // Function to create a note element at random position
  function createNoteElement(syllable) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.textContent = syllable;
    
    // Random position within the notes container
    const maxLeft = notesContainer.offsetWidth - 40;
    const randomLeft = Math.floor(Math.random() * maxLeft);
    
    note.style.left = `${randomLeft}px`;
    
    notesContainer.appendChild(note);
    
    // Remove note after animation completes
    setTimeout(() => {
      if (notesContainer.contains(note)) {
        notesContainer.removeChild(note);
      }
    }, 2000);
  }
  
  // Home button functionality (you can customize the link later)
  document.getElementById('home-button').addEventListener('click', function(e) {
    e.preventDefault();
     window.location.href = "../../../index.html";
  });
});