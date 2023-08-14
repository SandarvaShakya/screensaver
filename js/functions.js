/**
 * Generates a random color with a random opacity
 * @returns the color in rgba format
 */
const getRandomColor = () => {
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    let opacity = 1

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}