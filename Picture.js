const PictureJS = (() => {
    return {
        RawImage: class {
            constructor(URL) {
                this.image = new Image();
                this.URL = URL;

                this.Image = {
                    on: (event, callback) => {
                        this.Image.canvas.addEventListener(event, callback());
                    }
                }

                this.Lens = {
                    quit: () => {
                        this.container.removeChild(this.Lens.canvas);
                    }
                }
            }

            loadImage(container, callback, args) {
                this.container = document.querySelector(container);
                this.image.src = this.URL;
                this.image.crossOrigin = "Anonymous";

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                this.Image.canvas = canvas;
                this.Image.context = context;

                this.image.onload = () => {
                    canvas.width = this.image.width;
                    canvas.height = this.image.height;
                    context.drawImage(this.image, 0, 0, canvas.width, canvas.height);

                    this.imageDimensions = [this.image.width, this.image.height];
                    this.container.appendChild(canvas);

                    callback(canvas, context, this.container, ...args);
                }
            }

            loadLens(imageSource, imageContext, container, dimensions) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                this.Lens.canvas = canvas;
                this.Lens.context = context;

                canvas.width = imageSource.width;
                canvas.height = imageSource.height;
                canvas.style.pointerEvents = "none";

                imageSource.addEventListener('mousemove', (e) => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle = "rgba(0,0,0,0.25)";
                    context.fillRect(e.clientX - (dimensions[0] / 2), e.clientY - (dimensions[1] / 2), dimensions[0], dimensions[1]);
                    PictureJS.Preview.setRectDimensions([e.clientX - (dimensions[0] / 2), e.clientY - (dimensions[1] / 2), dimensions[0], dimensions[1]], imageContext);
                });

                container.appendChild(canvas);
            }
        },
        Preview: class {
            static setRectDimensions(rectDimensions, imageContext, imageObject) {
                this.rectDimensions = rectDimensions;
                this.imageContext = imageContext;
                this.updatePreview();
            }

            static output(container) {
                this.container = document.querySelector(container);
                this.canvas = document.createElement('canvas');
                this.context = this.canvas.getContext('2d');
                this.container.appendChild(this.canvas);
            }

            static updatePreview() {
                const rectData = this.imageContext.getImageData(...this.rectDimensions);
                this.canvas.width = rectData.width;
                this.canvas.height = rectData.height;
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.putImageData(rectData, 0, 0);
            }
        }
    }
})();