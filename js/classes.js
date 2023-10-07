class Particle {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}
}

class Box extends Particle {
	constructor(x, y, width, height, dx, dy, color) {
		super(x, y, color);
		this.width = width;
		this.height = height;

		this.dx = dx;
		this.dy = dy;
	}

	draw() {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	move(particles) {
		this.draw();
		for (let i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;

			// collision detection
			if (Box.hasCollided(this, particles[i])) {
				const xDistance =
					this.x + this.width / 2 - (particles[i].x + particles[i].width / 2);
				const yDistance =
					this.y + this.height / 2 - (particles[i].y + particles[i].height / 2);

				if (Math.abs(xDistance) > Math.abs(yDistance)) {
					this.dx = -this.dx;
				} else {
					this.dy = -this.dy;
				}
			}
		}

		// move to the opposite x direction
		if (this.x + this.width >= canvas.width || this.x <= 0) {
			this.dx = -this.dx;
		}

		// move to the opposite y direction
		if (this.y + this.height >= canvas.height || this.y <= 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	/**
	 * Checks for collision between two boxes
	 *
	 * @param {Box} box1
	 * @param {Box} box2
	 * @returns true if two boxes collide
	 */
	static hasCollided(box1, box2) {
		if (
			box1.x + box1.width >= box2.x &&
			box1.x <= box2.x + box2.width &&
			box1.y + box1.height >= box2.y &&
			box1.y <= box2.y + box2.height
		) {
			return true;
		}
		return false;
	}
}

class Circle extends Particle {
	constructor(x, y, radius, dx, dy, color) {
		super(x, y, color);
		this.radius = radius;
		this.dx = dx;
		this.dy = dy;
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.strokeStyle = this.color;
		context.stroke();
		context.fillStyle = this.color;
		context.fill();
	}

	move(particles) {
		this.draw();
		for (let i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;

			// collision detection
			if (Circle.hasCollided(this, particles[i])) {
				this.dx = -this.dx;
				this.dy = -this.dy;
			}
		}

		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	/**
	 * Checks for collision between two circles
	 *
	 * @param {Circle} circle1
	 * @param {Circle} circle2
	 * @returns true if two circles collide
	 */
	static hasCollided(circle1, circle2) {
		const dx = circle2.x - circle1.x;
		const dy = circle2.y - circle1.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance <= circle1.radius + circle2.radius) {
			return true;
		}
		return false;
	}
}
