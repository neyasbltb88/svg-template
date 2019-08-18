let buttons = document.querySelectorAll('button');
let select = document.querySelector('select');
let img = document.querySelector('img');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        buttons.forEach(btn => btn.classList.remove('active'));

        e.target.classList.add('active');
        updateImg();
    });
})

select.addEventListener('change', updateImg);

function updateImg() {
    let color = select.value;
    let template = document.querySelector('button.active').textContent;

    img.src = window.icons.get(color, template);
}

updateImg();