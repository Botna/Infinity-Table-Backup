//Wave.js
//test comments!!!

//more Tests!
function Wave(){
        this.name = "Color Wave"
		
		this.max = .1
		//this is the maximum points that we can manipulate our lightness/saturation 
        this.config = {
                color: {
                        type: 'color',
                        value: {
                                r: 0,
                                g: 0,
                                b: 255
                        }
                },
				speed: {
                        type: 'range',
                        name: 'Speed',
                        value: .5,
                        min: .05,
                        max: 1,
                        step: .05
                },
				depth: {
					type: 'range',
					name: 'depth',
					value: .5,
                    min: 0,
                    max: 1,
                    step: 0.05
				},
				nodes:{
					type:'range',
					name:'nodes',
					value: 1,
					min: 1,
					max: 4,
					step: 1
				}
        }
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
/**
 * Return the pixel buffer with an animation applied
 * @param  {PixelBuffer} pixelBuffer Pixel Buffer representing the strand of pixels
 * @return {PixelBuffer}             The modified pixel buffer
 */
Wave.prototype.requestFrame = function(frame, pixelBuffer){
	
		var hsl = rgbToHsl(this.config.color.value.r, this.config.color.value.g, this.config.color.value.b)
		var hue = hsl[0]*360
		var saturation = hsl[1]
		var lightness = .5; 
		
		var flag = false;
		
		var pixels = pixelBuffer.buffer.length / 3	
		var denominator = pixels/(this.config.nodes.value) ;
		var offset = ((frame* this.config.speed.value)%denominator );
for (var i = 0; i <pixels; i++)
	{
		//var hue = hsl[0]*360
		//var saturation = 1;
		//var lightness = .5;
		
		var changeValue  = (Math.sin(((i+offset)/denominator)*2*Math.PI))*this.max*this.config.depth.value; //*.05
		var newLightness = 0;
		 if(hue > 180)
		{
			newLightness = lightness + (2.5*changeValue);
				
		}
		else
			newLightness = lightness + changeValue;
				
		
		
		pixelBuffer.setHSL(i, hue, saturation, newLightness);
	}		
		// for(var i = 0; i < pixels; i++){
			    
				
			   
				// var oscillation = Math.sin(((i+offset)/denominator)*Math.PI*2*this.frequency); //- (this.max*this.config.depth.value);
				// var changeVal = oscillation*this.max;

			    // changeVal*= this.config.depth.value;
				
			   
			    // if(hue > 180)
				// {
				// lightness += (2.5*changeVal);
				
				// }
				// else
				// lightness += changeVal;
				// var index = i;
				
				
			    // pixelBuffer.setHSL(i, hue, saturation, lightness)			   
         //}
		
		
		
		
		return pixelBuffer
}

module.exports = Wave

