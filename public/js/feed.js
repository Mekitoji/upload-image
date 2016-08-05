const feedContainer = document.getElementById('feed');
const socket = io('http://localhost:3000');

function createFeedDiv(data) {
  const parentDiv = document.createElement('div');
  const time = document.createElement('p');
  const comment = document.createElement('p');
  const img = document.createElement('img');
  time.innerHTML = `uploaded at ${data.uploadedAt}`;
  comment.innerHTML = data.comment;
  img.src = data.path.split('public/')[1];
  img.height = 200;
  parentDiv.appendChild(time);
  parentDiv.appendChild(img);
  parentDiv.appendChild(comment);
  return parentDiv;
}

socket.on('uploadFile', data => {
  const validData = {
    uploadedAt: 'right now',
    comment: data.res.comment,
    path: data.res.files.file.path,
  };
  const newData = createFeedDiv(validData);
  feedContainer.insertBefore(newData, feedContainer.firstChild);
  feedContainer.removeChild(feedContainer.lastChild);
});

function loadFeed() {
  fetch('/feed/last')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const div = createFeedDiv(data[i]);
        feedContainer.appendChild(div);
      }
    });
}

document.addEventListener('DOMContentLoaded', loadFeed);
