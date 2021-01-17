const { MQTTPubSub } = require("graphql-mqtt-subscriptions");
const { connect } = require("mqtt");

const client = connect("mqtts://mqtt.hsl.fi", {
  reconnectPeriod: 1000,
});

const pubsub = new MQTTPubSub({
  client,
  dynamicSubscription: { enabled: true },
  publishOptions: { qos: 1 },
});

const resolvers = {
  Query: {
    vehicle: () => {
      return { id: "Vehicle1" };
    },
  },
  Subscription: {
    subscribe2vehicleData: {
      resolve: (payload) => {
        try {
          const { spd, hdg, lat, long, start } = payload.VP;
          return {
            spd,
            hdg,
            lat,
            long,
            start,
          };
        } catch (e) {
          console.log(e);
        }
      },
      subscribe: (_, args) => {
        if (
          args.topic.endsWith("/#") &&
          args.topic.indexOf("/hfp/v2/journey/") > -1
        ) {
          return pubsub.asyncIterator([args.topic]);
        }
      },
    },
  },
};

module.exports = { resolvers };
