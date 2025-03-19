import { useNavigate } from 'react-router-dom'

import './news-box.css'


function NewsBox() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/Mobility`)
  }

  return (
    <div className='news-box' onClick={handleNavigate}>

    </div>
  )
}

export default NewsBox
