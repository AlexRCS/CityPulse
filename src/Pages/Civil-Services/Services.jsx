import Aside from "../Layout/aside/aside"
import Body from "../Layout/body/body"
import Footer from "../Layout/footer/footer"
import Header from "../Layout/header/header"
import './Services.css'

function Services() {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Body />
      </main>
      <Footer/>
    </>
  )
}

export default Services
