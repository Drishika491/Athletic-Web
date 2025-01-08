import React from 'react'
import NotFound from '../../components/NotFound'
import SubEventCompetitions from '../../components/SubEventCompetitions'

export default function EventsCompetitions() {
  return (
    <div>
        {/* <Navigation /> */}
        {/* <div className="h-[20px] bg-secondary"></div> */}
        <SubEventCompetitions />
        <NotFound />
    </div>
  )
}
