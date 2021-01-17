# HSL Test App

Idea of the app was to build something for a HSL power user who want to quickly move from point A to B. Power user basically knows which public transportations take you there and from where, but you want to quickly check the closest station realtime timetables with just one click after opening an app. Realtime time

This was a bit of polished POC version utilising the HSL Api for Graphql, React-leaflet for map and custom styling and React with typescript

Ideas for the future:

- Implement & design stations view
- POC uses initial location. Add automatic geolocation update and update stops if closest stops change
- Investigate more accurate geolocation e.g. from Google
- Port the code into React Native since the app is most useful with a mobile device.
- Add timeslots and address like home or work so that app can only suggest closest stops and realtime timetables that would try to guide you only routes and stops that are helping you to get there.

## Starting the app

`npm i`
`npm run start`

App must be run in https:// to enable browser location as it relys on user's location. <br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

Transportation map was used and it requires an API key
