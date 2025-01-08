import React from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

class MySwiper extends React.Component {
  state = {
    shouldNotSwipe: false,
  }

  toggleSwiping = () => {
    this.setState({
      shouldNotSwipe: !this.state.shouldNotSwipe
    });
  }
 
  render() {
     const params = {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
     
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    
    return (
      <div>
        React id swiper
        <button onClick={this.toggleSwiping}>Toggle Swiping</button>
        Should swipe: {this.state.shouldNotSwipe}
        <Swiper {...params}>
          <div className="slide1">Slide 1</div>
          <div className="slide2">Slide 2</div>
          <div className="slide3">Slide 3</div>
          <div className="slide4">Slide 4</div>
          <div className="slide5">Slide 5</div>
          <div className="slide1">Slide 6</div>
          <div className="slide2">Slide 7</div>
          <div className="slide3">Slide 8</div>
           <div className="slide1">Slide 1</div>
          <div className="slide2">Slide 2</div>
          <div className="slide3">Slide 3</div>
          <div className="slide4">Slide 4</div>
          <div className="slide5">Slide 5</div>
         <div className="slide1">Slide 1</div>
          <div className="slide2">Slide 2</div>
          <div className="slide3">Slide 3</div>
          <div className="slide4">Slide 4</div>
          <div className="slide5">Slide 5</div>
          <div className="slide1">Slide 6</div>
          <div className="slide2">Slide 7</div>
          <div className="slide3">Slide 8</div>
          
          
        </Swiper>
      </div>
    );
  }
};

export default MySwiper;
