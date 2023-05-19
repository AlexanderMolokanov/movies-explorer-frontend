import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Promo from '../Promo/Promo';
import Portfolio from '../Portfolio/Portfolio';
import Techs from '../Techs/Techs';
import React from 'react';

function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe /> 
      <Portfolio />
    </main>
  );
}

export default Main;
