document.addEventListener('DOMContentLoaded', formUpload);
const socket = io('http://localhost:3000');

function formUpload() {
  const preview = document.getElementById('preview');
  const imgInput = document.getElementById('file');
  const result = document.getElementById('result');
  const form = document.forms.uploadForm;

  function imagePreview() {
    const reader = new FileReader();
    const file = imgInput.files[0];
    reader.addEventListener('load', () => {
      preview.style.display = 'block';
      preview.src = reader.result;
    });
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      alert('wrong file type!');
    }
  }

  imgInput.addEventListener('change', imagePreview);

  function uploadImage(e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        result.innerHTML += '<div>OK</div>';
        socket.emit('uploadFile', { res });
      })
      .catch(err => result.innerHTML += `<div>${err}</div>`);
  }

  form.addEventListener('submit', uploadImage);
}
