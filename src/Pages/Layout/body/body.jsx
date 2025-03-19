import React from 'react';
import Map from '../../../Services/widget/map/map'
import './body.css';

function Body({ children }) {
  const childrenArray = React.Children.toArray(children);
  const childOne = childrenArray.find(child => child.props.childId === '1');
  const childTwo = childrenArray.find(child => child.props.childId === '2');
  const childThree = childrenArray.find(child => child.props.childId === '3');
  const childFour = childrenArray.find(child => child.props.childId === '4');

  return (
    <article>
      <section className="widgets">
        {childOne}
        <div className="city-view">
          <Map />
          {childTwo}
        </div>
      </section>
      <section className='city-news'>
        {childThree}
      </section>
      <section className='city-transports'>
        {childFour}
      </section>
    </article>
  );
}

export default Body;
