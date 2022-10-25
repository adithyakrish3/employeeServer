const superagent = require('superagent');

const fetchLocationFromRequest = (req) => {
    let location = '';

    Object.keys(req).forEach((key, index) => {
        if(key !== 'name') {
            location = location + req[key];
            if(index < Object.keys(req).length - 1)
                location = location + ', '
        }
    })

    return location;

}

const fetchCoordinates = async (req) => {
    const response = await superagent.get(`http://api.positionstack.com/v1/forward`)
    .query({ access_key: '<MY_SECRET_KEY>', query: fetchLocationFromRequest(req), limit: 1 })

    return response.body.data
}

module.exports = { fetchCoordinates }