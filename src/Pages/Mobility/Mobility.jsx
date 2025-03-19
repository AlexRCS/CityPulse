import PublicTransport from "../../Services/widget/transport/transport"  
import Aside from "../Layout/aside/aside"
import Body from "../Layout/body/body"
import Footer from "../Layout/footer/footer"
import Header from "../Layout/header/header"

import './Mobility.css'

function Mobility() {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Body>
          <div childId='1' className="transport">
            <PublicTransport/>
          </div>
        </Body >
      </main>
      <Footer />
    </>
  )
}

export default Mobility
