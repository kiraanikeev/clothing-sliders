import React, { useState, useEffect } from "react";
import { SliderData, colorData } from "./SliderData";
import leftArrow from "../../img/left.png";
import rightArrow from "../../img/right.png";
import leftArrow2 from "../../img/left2.png";
import rightArrow2 from "../../img/right2.png";

function Slider() {
  //определяем текущщую модель
  const [current, setCurrent] = useState(0);
  //определяем наличие кармана
  const [pocket, setPocket] = useState(false);
  //порядковый номер цвета элемента
  const [color, setColor] = useState(1);
  //определяем основной цвет
  const [hoodies, setHoodies] = useState("b__black_");
  const length = SliderData.length;

  //меняем основной цвет
  useEffect(() => {
    if (color == "1") {
      setHoodies("b__black_");
    } else if (color == "2") {
      setHoodies("b__grey_");
    } else if (color == "3") {
      setHoodies("b__white_");
    }
  }, [color]);
  //верхний слайдер
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }
  //нажний слайдер
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
  //нажатие на цвет
  const moveDot = (index) => {
    setColor(index);
  };

  return (
    <div>
      <img
        className="right-arrow"
        src={rightArrow}
        onClick={prevSlide}
        alt="right"
      />
      <img
        className="left-arrow"
        src={leftArrow}
        onClick={nextSlide}
        alt="left"
      />
      {SliderData.map((slide, index) => {
        return (
          <div key={index}>
            {slide.image.includes("pocket-only")
              ? index === current && (
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/image/banana-apricot/${hoodies}${slide.image}.png`
                    }
                    alt="Худи только с цветным карманом"
                    className="image"
                  />
                )
              : index === current && (
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/image/banana-apricot/${hoodies}${slide.image}${
                        !pocket ? "all" : "hood-only"
                      }.png`
                    }
                    alt="Худи"
                    className="image"
                  />
                )}
          </div>
        );
      })}
      <img
        className="right-arrow2"
        src={rightArrow}
        onClick={() => {
          setPocket(!pocket);
        }}
        alt="right"
      />
      <img
        className="left-arrow2"
        src={leftArrow}
        onClick={() => {
          setPocket(!pocket);
        }}
        alt="left"
      />

      <div className="containerDots">
        <img
          className="colorButton"
          src={leftArrow2}
          onClick={prevColor}
          alt="left"
        />
        <span className="text">Цвет элементов</span>
        <img
          className="colorButton"
          src={rightArrow2}
          onClick={nextColor}
          alt="right"
        />
        <div className="dots">
          {Array.from({ length: 3 }).map((e, index) => (
            <div
              key={index}
              onClick={() => moveDot(index + 1)}
              className={color === index + 1 ? "dotActive" : "dot"}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
