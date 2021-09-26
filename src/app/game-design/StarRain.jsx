import React from "react"

export const StarRain = () => {
  return (
    <div className="star-rain-container">
      <div className="star" id="star-01">
        <Star />
      </div>
      <div className="star" id="star-02">
        <Star />
      </div>
      <div className="star" id="star-03">
        <Star />
      </div>
      <div className="star" id="star-04">
        <Star />
      </div>
      <div className="star" id="star-05">
        <Star />
      </div>
      <div className="star" id="star-06">
        <Star />
      </div>
    </div>
  )
}

const Star = () => (
  <svg viewBox="0 0 217.791 210.633">
    <path
      fill="#FFFFE6"
      d="M94.15,77.97c0,0-2-54,10-73.5s23,28.5,25.5,72.5c0,0,69.197,4.589,86.5,21c13.637,12.934-61.5,31-87,33.5
	c-2,14.5-1.831,60.464-16.5,75.5c-20,20.5-25.5-50.5-23-78c-19-1.5-81.5-3.5-89-17.5S52.15,85.97,94.15,77.97z"
    />
  </svg>
)
