const image = new PictureJS.RawImage(`https://picsum.photos/${Math.floor(window.innerWidth/2)}`);

image.loadImage('.container', image.loadLens, [[(window.innerHeight/2)*0.35,(window.innerHeight/2)*0.35]]);
image.self.on('mouseover', image.lens.load);
image.self.on('mouseout', image.lens.quit);

PictureJS.Preview.output('.output');