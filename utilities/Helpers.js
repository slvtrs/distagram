const Helpers = {
  toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  darkenColor(rgba, perc=0.5){
    if(rgba.indexOf('rgba(') < 0){
      return rgba
    }

    let numbers = []
    let sections = rgba.split(',')
    for(let i=0; i<sections.length; i++){
      let number = sections[i].replace(/[^0-9\.]+/g, '');
      numbers.push( number )
    }
    let boldest = numbers[0]
    for(let i=0; i<numbers.length; i++){
      if(numbers[i] > boldest){
        boldest = numbers[i]
      }
    }
    let darkendNumbers = []
    for(let i=0; i<numbers.length; i++){
      // if(numbers[i] === boldest || i==numbers.length-1){ // leave boldest and alpha unchanged
      if(i==numbers.length-1){ // leave alpha unchanged
        darkendNumbers.push(numbers[i])
      }
      else {
        let darkened = Math.round(numbers[i] - (numbers[i] * perc))
        darkendNumbers.push(darkened)
      }
    }

    // let color = `rgba(${darkendNumbers[0]}, ${darkendNumbers[1]}, ${darkendNumbers[2]}, ${darkendNumbers[3]})`
    let color = `rgba(${darkendNumbers[1]}, ${darkendNumbers[2]}, ${darkendNumbers[0]}, ${darkendNumbers[3]})`
    return color
  },
  generateColor(index=null, shadesOfGray=null){
    // let x = 255*Math.random()
    // let y = (x < 255/2) ? (Math.random()*(255/2)*2) : (Math.random()*(255/2))
    // let z = 255*Math.random()
    let x = ((255/4) * Math.random())
    let y = ((255/4) * Math.random()) * 4
    let z = (255*0.75) + ((255/4) * Math.random())
    
    let colors = Helpers.shuffleArray( [x,y,z] )

    if(index !== null && shadesOfGray){
      let r = Math.round(Helpers.normalize(colors[0], 255, index, shadesOfGray))
      let g = Math.round(Helpers.normalize(colors[1], 255, index, shadesOfGray))
      let b = Math.round(Helpers.normalize(colors[2], 255, index, shadesOfGray))

      let a = Math.max(0.6, Helpers.normalize(Math.random(), 0.0, index, shadesOfGray)).toFixed(2)
      let color = `rgba(${r}, ${g}, ${b}, ${a})`
      return color
    }
    else {
      let a = Math.max(0.5, Math.random())
      let color = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${a})`
      return color
    }
  },
  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  normalize(value, range, index, shadesOfGray){
    const step = range/shadesOfGray
    const median = range/2
    if(value < median){
      value += step * index
      if(value > median) value = median
    }
    else if(value > median){
      value -= step * index
      if(value < median) value = median
    }
    return value
  }
};

export default Helpers