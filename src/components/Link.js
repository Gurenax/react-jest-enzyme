import React from 'react'

const Link = ({
  title,
  url,
  onLinkClick
}) => (
  <div className='output-area' onClick={onLinkClick}>
    <h2>A link to {title}</h2>
    <a href={url} onClick={()=>{ alert('Clicked!') }}>
      {title}
    </a>
  </div>
)

export default Link
