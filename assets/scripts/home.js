// Scroll capture (desktop)
let scrollPos = 0;
let scrollDelta = 0;
let prevScrollDelta = 0;
let threshold = 50;
document.addEventListener('wheel', (event) => {
	scrollPos += event.deltaY;
	scrollDelta = Math.floor((scrollPos / threshold)) * threshold;
	if (window.innerWidth > 1030) {
		if (!menuOpen) {
			if (prevScrollDelta != scrollDelta) {
				if (event.deltaY > 0) {
					scrollDown();
				} else {
					scrollUp();
				}
			}
		}
		prevScrollDelta = scrollDelta;
	}
});

// Detect scroll directions
function scrollDown() {
	let direction = false; // alternate scroll directions
	for (const column of document.querySelectorAll('.home-column')) {
		direction = !direction;
		if (direction) {
			scrollColumnDown(column);
		} else {
			scrollColumnUp(column);
		}
	}
}
function scrollUp() {
	let direction = true; // alternate scroll directions
	for (const column of document.querySelectorAll('.home-column')) {
		direction = !direction;
		if (direction) {
			scrollColumnDown(column);
		} else {
			scrollColumnUp(column);
		}
	}
}

// Scroll individual column
function scrollColumnUp(column) {
	const divs = column.querySelectorAll('.home-cell-text div');
	let overflowStore;
	for (let i = 0; i < divs.length; i++) {
		let currentSpan = divs[i];
		let currentSpanContent = currentSpan.innerHTML;
		if (i == 0) {
			overflowStore = currentSpanContent;
		} else {
			divs[i - 1].innerHTML = currentSpanContent;
		}
	}
	divs[divs.length - 1].innerHTML = overflowStore;
}
function scrollColumnDown(column) {
	const divs = column.querySelectorAll('.home-cell-text div');
	let overflowStore;
	for (let i = divs.length - 1; i >= 0; i--) {
		let currentSpan = divs[i];
		let currentSpanContent = currentSpan.innerHTML;
		if (i == divs.length - 1) {
			overflowStore = currentSpanContent;
		} else {
			divs[i + 1].innerHTML = currentSpanContent;
		}
	}
	divs[0].innerHTML = overflowStore;
}

// Random entry picker helper function
function getRandomEntries(arr) {
	let copy = [...arr]; // Create a copy to avoid modifying the original
	let result = [];

	for (let i = 0; i < arr.length; i++) {
		let index = Math.floor(Math.random() * copy.length);
		result.push(copy.splice(index, 1)[0]); // Remove and store item
	}

	return result;
}

// Pick videos
function pickVideos() {
	let randomVideos = getRandomEntries(homeVideos);
	console.log(randomVideos);

	let i = 0;
	for (let video of document.querySelectorAll('video')) {
		videoSource = video.querySelector('source');
		videoSource.src = '/assets/thumbnails/' + randomVideos[i][1];
		video.poster = `/assets/thumbnails/${randomVideos[i][0]}`;
		video.load();
		video.play();
		i++;
	}
}
pickVideos();

// Mobile text animation
let groups = ['group1', 'group2', 'group3', 'group4', 'group5', 'group6', 'group7', 'group8'];
function animateMobile() {
	for (let group of groups) {
		let elements = document.querySelectorAll(`[data-mobile="${group}"] div`);
		let i = 0;
		let temp = '';
		for (let i = 0; i < elements.length; i++) {
			if (i == 0) {
				temp = elements[i].innerText;
			}
			if (i == elements.length - 1) {
				elements[i].innerText = temp;
			} else {
				elements[i].innerText = elements[i + 1].innerText;
			}
		}
	}
}
setInterval(animateMobile, 200);