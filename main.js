document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('add');
    const notesContainer = document.getElementById('notes-container');

    // Load notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Add existing notes on load
    if (notes.length > 0) {
        notes.forEach(note => addNewNote(note));
    } else {
        // Show placeholder if no notes
        notesContainer.innerHTML = `
                    <div class="note">
                        <div class="placeholder">
                            <i class="fas fa-sticky-note"></i>
                            <h3>No Notes Yet</h3>
                            <p>Click "Add Note" to create your first note</p>
                        </div>
                    </div>
                `;
    }

    // Add new note button event
    addBtn.addEventListener('click', () => {
        // Remove placeholder if present
        if (notes.length === 0) {
            notesContainer.innerHTML = '';
        }
        addNewNote("");
    });

    function addNewNote(text = '') {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');

        noteEl.innerHTML = `
                    <div class="tools">
                        <button class="edit"><i class="fas fa-edit"></i></button>
                        <button class="delete"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class="${text ? "hidden" : ""}" placeholder="Start typing your note here...">${text}</textarea>
                `;

        const editBtn = noteEl.querySelector('.edit');
        const deleteBtn = noteEl.querySelector('.delete');
        const textarea = noteEl.querySelector('textarea');
        const main = noteEl.querySelector('.main');

        // Set initial content
        textarea.value = text;
        main.innerHTML = marked.parse(text);

        // Delete button functionality
        deleteBtn.addEventListener('click', () => {
            noteEl.remove();
            updateLocalStorage();
            // Show placeholder if no notes left
            if (document.querySelectorAll('.note').length === 0) {
                notesContainer.innerHTML = `
                            <div class="note">
                                <div class="placeholder">
                                    <i class="fas fa-sticky-note"></i>
                                    <h3>No Notes Yet</h3>
                                    <p>Click "Add Note" to create a new note</p>
                                </div>
                            </div>
                        `;
            }
        });

        // Edit button functionality
        editBtn.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textarea.classList.toggle('hidden');

            // Change icon based on state
            const icon = editBtn.querySelector('i');
            if (textarea.classList.contains('hidden')) {
                icon.classList.remove('fa-save');
                icon.classList.add('fa-edit');
            } else {
                icon.classList.remove('fa-edit');
                icon.classList.add('fa-save');
            }
        });

        // Update text live
        textarea.addEventListener('input', (e) => {
            const value = e.target.value;
            main.innerHTML = marked.parse(value);
            updateLocalStorage();
        });

        notesContainer.appendChild(noteEl);
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const textAreas = document.querySelectorAll('textarea');
        const notes = [];

        textAreas.forEach(textarea => {
            notes.push(textarea.value);
        });

        localStorage.setItem("notes", JSON.stringify(notes));
    }
});