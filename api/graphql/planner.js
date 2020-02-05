const fetch = require('node-fetch');

const address = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

async function getPlans(coords) {
  const  query = `{
  plan(
    from: {lat: ${coords.from_lat}, lon: ${coords.from_lon}}
    to: {lat: ${coords.to_lat}, lon: ${coords.to_lon}}
    maxWalkDistance: 3000
  ) {
    itineraries {
      duration
      endTime
      fares {
        currency
        cents
      }
      legs {
        mode
        distance
        from {
          name
        }
        to {
          name
        }
        agency {
          name
        }
      }
    }
  }
}`;

  const data = await fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: query})
  })
  .then(r => r.json())
  return data
}

module.exports.getPlans = getPlans;
