const addbtn = document.querySelector('#add');

addbtn.addEventListener('click', () => addnewnote(""));

function addnewnote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    const editbtn = note.querySelector('.edit');
    const deletebtn = note.querySelector('.delete');
    const textareab = note.querySelector('textarea');
    const main = note.querySelector('.main');

    // Initial content if any
    textareab.value = text;
    main.innerHTML = marked.parse(text);

    // Delete button functionality
    deletebtn.addEventListener('click', () => {
        note.remove();
    });

    // Edit button functionality
    editbtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textareab.classList.toggle('hidden');
    });

    // Update text live
    textareab.addEventListener('input', (event) => {
        const value = event.target.value;
        main.innerHTML = marked.parse(value);
    });

    document.body.appendChild(note);
}

