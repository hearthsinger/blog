'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('https://ooooo.garden/integration/strawbs/LastFM', {
    method: 'GET',
  });

  if (!res.ok) {
    console.error('Failed to fetch nowlistening data');
  }

  const track = await res.json();

  let nowListening = 'Nothing!';
  let date = null;

  nowListening = `${track.artist} - ${track.name}`;

  // Parse last.fm format explicitly into UTC to avoid localtime conversion
  const parsed = new Date(`${track.date} UTC`);
  if (!isNaN(parsed)) {
    // Format for the browser in their timezone and date format!
    date = `At: ${parsed.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}`;
  }

  const textTarget = document.querySelector('#lastfm-nowlistening');
  const dateTarget = document.querySelector('#lastfm-date');

  const titleLink = document.createElement('a');
  titleLink.setAttribute('href', 'https://last.fm/user/hearthsinger');

  if (!textTarget) {
    console.error("Can't find target for nowlistening data");
  } else {
    titleLink.textContent = nowListening;
    textTarget.textContent = '';
    textTarget.append(titleLink);
  }

  if (dateTarget) {
    dateTarget.textContent = date;
  }
});
