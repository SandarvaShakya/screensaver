const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = Math.ceil(innerWidth / 2)
canvas.height = 400

const form = document.querySelector('.form')
// form submission
form.addEventListener('submit', (event) => {
    event.preventDefault()
    numberOfParticles = form['number-of-particles'].value
    typeOfParticle = form['type-of-particle'].value.toLowerCase()

    init()
})

// reset the boxes on screen resize
window.addEventListener('resize', () => {
    canvas.width = Math.ceil(innerWidth / 2)
    canvas.height = 400

    init()
})

// animation loop
const animate = () => {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)

    // movement of the boxes
    if(particles.length > 0){
        particles.forEach(particle => {
            particle.move(particles)
        })
    }
}

const generateParticles = () => {
    const [boxWidth, boxHeight] = [50, 50]
    const radius = 30
    for(let i = 0; i < numberOfParticles; i++){
        const xDisplacement = (Math.random() - 0.5) * 5
        const yDisplacement = (Math.random() - 0.5) * 5
        const color = getRandomColor()

        if(typeOfParticle === 'box'){
            let xPosition = Math.floor(Math.random() * (canvas.width - boxWidth * 2)) + boxWidth
            let yPosition = Math.floor(Math.random() * (canvas.height - boxHeight * 2)) + boxHeight
            let box = new Box(xPosition, yPosition, boxWidth, boxHeight, xDisplacement, yDisplacement, color)
            if(i !== 0){
                for(let j = 0; j < particles.length; j++){
                    if(Box.hasCollided(box, particles[j])){
                        box.x = Math.floor(Math.random() * (canvas.width - boxWidth * 2))
                        box.y = Math.floor(Math.random() * (canvas.height - boxHeight * 2))
                        j = 0
                    }
                }
            }
            particles.push(box)
        }else if(typeOfParticle === 'circle'){
            const xPosition = Math.floor(Math.random() * (canvas.width - radius * 2)) + radius
            const yPosition = Math.floor(Math.random() * (canvas.height - radius * 2)) + radius
            particles.push(new Circle(xPosition, yPosition, radius, xDisplacement, yDisplacement, color))
        }
    }
}

// Initializing and assigning all the variables
const init = () => {
    particles = []
    generateParticles()    
}

init()
animate()