import React from 'react'
import "./SideBar.css"

function SideBar() {
  return (
    <div className="row-view3">
					<div className="column3">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/yao6rera_expires_30_days.png"} 
							className="image2"
						/>
						<span className="text7" >
							{"Histórico"}
						</span>
					</div>
					<button className="button-column"
						onClick={()=>alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/tfec9zbw_expires_30_days.png"} 
							className="image2"
						/>
						<span className="text8" >
							{"Cronômetro"}
						</span>
					</button>
					<div className="column4">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/vbsjvt2m_expires_30_days.png"} 
							className="image2"
						/>
						<span className="text7" >
							{"Ciclos"}
						</span>
					</div>
					<div className="column4">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/hr2o6e9i_expires_30_days.png"} 
							className="image2"
						/>
						<span className="text7" >
							{"Austes"}
						</span>
					</div>
				</div>
  )
}

export default SideBar