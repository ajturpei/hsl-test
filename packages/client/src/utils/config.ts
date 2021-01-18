const config = {
  apiKey: "5e581f69ad9c4225a83ac21d4bf37809",
  graphqlAPI: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
  mqttVPAPIDev: "ws://localhost:4000/graphql",
  mqttVPAPIProd:
    "wss://hslrealtime-env.eba-pqmaifhs.eu-north-1.elasticbeanstalk.com:4000/graphql",
  mapEndpoint:
    "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=",
  hslMap: "https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}@2x.png",
  initialRadius: 150,
  maxRadius: 1200,
  initialPositionCoords: { lat: 60.1699, lng: 24.9384 },
};

export default config;
