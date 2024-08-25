const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  graphqlAPI: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
  mqttVPAPIDev: "ws://localhost:4000/graphql",
  mqttVPAPIProd:
    "wss://hslrealtime-env.eba-pqmaifhs.eu-north-1.elasticbeanstalk.com:4000/graphql",
  hslMap: "https://cdn.digitransit.fi/map/v2/hsl-map/{z}/{x}/{y}.png",
  initialRadius: 150,
  maxRadius: 1200,
  initialPositionCoords: { lat: 60.1699, lng: 24.9384 },
  subscriptionKey: process.env.REACT_APP_SUBSCRIPTION_KEY,
};

export default config;
