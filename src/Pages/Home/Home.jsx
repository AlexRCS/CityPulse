import Aside from "../Layout/aside/aside"
import Body from "../Layout/body/body"
import Footer from "../Layout/footer/footer"
import Header from "../Layout/header/header"
import SwipeBanner from "../../Components/swiper/swipe-banner"
import SwipeNews from "../../Components/swiper/swipe-news"
import Weather from "../../Services/widget/weather/weather"
import AirQuality from "../../Services/widget/air/air-quality"
import FireRiskAlert from "../../Services/widget/fire/fire-risk"
import PublicTransport from "../../Services/widget/transport/transport"
import NewsBox from "../../Components/news/news-box"
import Construction from "../../Services/widget/construction/construction"

import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Body>
          <div childId='1' className='climatics'>
            <Weather />
            <AirQuality />
            <FireRiskAlert />
          </div>
          <div childId='2'>
            <Construction />
          </div>
          <div childId='3' className="news-swiper">
            <SwipeBanner />
            <SwipeNews />
          </div>
          <div childId='4' className="home-transports">
            <NewsBox />
            <PublicTransport />
          </div>
        </Body>
      </main>
      <Footer />
    </>
  )
}

export default Home


