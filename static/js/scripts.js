 (function () {
	"use strict";

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	function spawnFloating(container, type, count) {
		for (let index = 0; index < count; index += 1) {
			const element = document.createElement("div");
			const size = Math.floor(random(14, 38));
			element.className = type === "heart" ? "floating-heart" : "floating-flower";
			element.style.width = `${size}px`;
			element.style.height = `${size}px`;
			element.style.left = `${random(2, 92)}%`;
			element.style.bottom = `${random(-10, 10)}%`;
			element.style.opacity = random(0.6, 1).toFixed(2);
			element.style.background = type === "heart"
				? "radial-gradient(circle at 30% 30%, #fff9f9, #ff6b6b)"
				: "radial-gradient(circle at 30% 30%, #fff9f9, #ffd3ea)";
			element.style.borderRadius = type === "heart" ? "30% 30% 10% 10%" : "50%";
			element.style.animation = `floatUp ${random(8, 18)}s linear forwards`;
			container.appendChild(element);
			setTimeout(() => element.remove(), 20000);
		}
	}

	function throwConfetti(container, count) {
		const colors = ["#ff6b6b", "#ffd166", "#9ad3bc", "#ffb3c6", "#c89bff"];
		for (let index = 0; index < count; index += 1) {
			const element = document.createElement("div");
			element.className = "confetti";
			element.style.left = `${random(5, 95)}%`;
			element.style.top = `${random(-10, 10)}%`;
			element.style.background = colors[Math.floor(random(0, colors.length))];
			element.style.animationDuration = `${random(2.6, 4.2)}s`;
			container.appendChild(element);
			setTimeout(() => element.remove(), 5200);
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		const floating = document.getElementById("floating");
		if (floating) {
			spawnFloating(floating, "heart", 8);
			spawnFloating(floating, "flower", 6);
			setInterval(() => spawnFloating(floating, "heart", 4), 3500);
		}

		if (document.body.classList.contains("surprise-page")) {
			throwConfetti(document.getElementById("celebrate") || document.body, 60);

			const video = document.getElementById("rakshaVideo");
			const overlay = document.getElementById("videoOverlay");
			const unmuteButton = document.getElementById("unmuteBtn");
			if (video) {
				if (unmuteButton) {
					unmuteButton.addEventListener("click", () => {
						video.muted = false;
						video.play().catch(() => {});
						if (overlay) overlay.classList.add("hidden");
					});
				}
			}
		}
	});
}());
