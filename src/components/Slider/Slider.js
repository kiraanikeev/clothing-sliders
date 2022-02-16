import React, { useState, useEffect } from 'react';
import { SliderData, colorData } from './SliderData';

function Slider() {

    const [current, setCurrent] = useState(0);
    const [pocket, setPocket] = useState(false)
    const [hoodies, setHoodies] = useState('b__black_')
    const [color, setColor] = useState(1);
    const length = SliderData.length;
  useEffect(() => {
    if( color === '1'){
        setHoodies('b__black_')
    } else if(color ==='2'){
        setHoodies('b__grey_')
    }else if(color ==='3'){
        setHoodies('b__white_')
    }
  }, [color]);

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };
  
    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };
      if (!Array.isArray(SliderData) || SliderData.length <= 0) {
      return null;
    }

  const nextColor = () => {
    if (color !== colorData.length) {
      setColor(color + 1);
    } else if (color === colorData.length) {
      setColor(1);
    }
     };

  const prevColor = () => {
    if (color !== 1) {
      setColor(color - 1);
    } else if (color === 1) {
      setColor(colorData.length);
    }
  };
    
  const moveDot = (index) => {
    setColor(index);
  };

  return (
    <div>
              <button className='left-arrow' onClick={prevSlide}>1</button>
              <button className='right-arrow' onClick={nextSlide}>2</button>
              {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            { slide.image.includes('pocket-only') 
            ? index === current && (
              <img src={process.env.PUBLIC_URL + `/image/banana-apricot/${hoodies}${slide.image}.png`} alt='image222' className='image' />
            )
            :index === current && (
            <img src={process.env.PUBLIC_URL + `/image/banana-apricot/${hoodies}${slide.image}${!pocket ? 'all' : 'hood-only'}.png`} alt='image111' className='image' />
          )
        }
          </div>
        );
      })}
             <button className='left-arrow2' onClick={()=>{setPocket(!pocket)}}>3</button>
              <button className='right-arrow2' onClick={()=>{setPocket(!pocket)}}>4</button>
                
              <div className='containerDots'>
          {Array.from({ length: 3 }).map((item, index) => (
            <div
            key={item}
              onClick={() => moveDot(index + 1)}
              className={
                color === index + 1 ? "dotActive" : "dot"
              }
            ></div>
          ))}
        </div>
                <button onClick={nextColor}>next</button>
                <button onClick={prevColor}>prev</button>
                 </div>
  )
}

export default Slider