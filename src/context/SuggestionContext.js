import React, { useContext, useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
const SuggestionContext = React.createContext()

export const useSuggestionFunction = () => {
  return useContext(SuggestionContext)
}

export const SuggestionProvider = ({ children }) => {
  const [suggestionsFB, setSuggestionsFB] = useState([])

  useEffect(() => {
    const popularActivities = async () => {
      const popularTrueActivities = await firestore()
        .collection('Activities')
        .where('tg_favorite', '==', true)
        .get()

      let activities = popularTrueActivities.docs.map((doc) => doc.data())
      console.log(
        'popularTrueActivities.docs.map((doc) => doc.data())',
        activities.length
      )
      if (activities != null && activities.length > suggestionsFB.length) {
        for (let i = 0; i < activities.length; i++) {
          const dataInfo = {
            id: activities[i].activityID,
            title: activities[i].activity_title,
            city: activities[i].activity_city,
            description: activities[i].activity_description
          }
          setSuggestionsFB((prev) => [...prev, dataInfo])
        }
      }
    }
    popularActivities()
  }, [])
  console.log('suggestionsFB', suggestionsFB)

  //   {
  //     idSuggestion: '1',
  //     photo:
  //       'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  //     title: 'Katthem',
  //     city: 'Götebrg',
  //     description: 'Städning, matning och en massa kel!',
  //     active: true
  //   },
  //   {
  //     idSuggestion: '2',
  //     photo:
  //       'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  //     title: 'Studiehjälp kjkkjjkljljoijinlojokojinbhbjhbjbojiuj ',
  //     city: 'Malmö',
  //     description: 'Hjälper elever med läxorna',
  //     active: true
  //   }
  // ])

  return (
    <SuggestionContext.Provider
      value={{
        popularActivities: suggestionsFB
      }}
    >
      {children}
    </SuggestionContext.Provider>
  )
}
