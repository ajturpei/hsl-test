# HSL Test App

Idea of the app was to build something for a HSL power user who want to quickly move from point A to B. Power user basically knows which public transportations take you there and from where, but you want to quickly check the closest station realtime timetables with just one click after opening an app. Realtime time

This was a bit of polished POC version utilising the HSL Api for Graphql, React-leaflet for map and custom styling and React with typescript

Ideas for the future:

- Implement & design stations view
- POC uses initial location. Add automatic geolocation update and update stops if closest stops change
- Investigate more accurate geolocation e.g. from Google
- Port the code into React Native since the app is most useful with a mobile device.
- Add timeslots and address like home or work so that app can only suggest closest stops and realtime timetables that would try to guide you only routes and stops that are helping you to get there.

## Starting the app locally

- install packages (client & mqtt server) `yarn`
- start client `cd packages/client && yarn develop`
- start server `cd packages/server && yarn dev`

For Transportation map, requires an API key
