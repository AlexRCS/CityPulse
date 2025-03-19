import Aside from "../Layout/aside/aside"
import Body from "../Layout/body/body"
import Footer from "../Layout/footer/footer"
import Header from "../Layout/header/header"
import './Tourism.css'

function Tourism() {
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

export default Tourism
