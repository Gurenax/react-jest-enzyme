import React from 'react'

const Link = ({
  title,
  url
}) => (
  <a href={url}
    onClick={() => {
      alert('Clicked!')
  }}>
    {title}
  </a>
)

export default Link
