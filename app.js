const size = 1000;
const image = new PictureJS.RawImage('https://picsum.photos/'+size);
const preview = PictureJS.Preview.output('.output');

image.loadImage('.container', image.loadLens, [[size*0.35,size*0.35]]);
image.self.on('mouseover', image.lens.load);
image.self.on('mouseout', image.lens.quit);