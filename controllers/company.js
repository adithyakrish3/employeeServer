const Company = require('../models/company')
const { fetchCoordinates } = require('../external/city')

createCompany = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a company',
        })
    }

    const locationData = await fetchCoordinates(body)
    if(locationData.length < 1 ) {
        return res.status(400).json({
            success: false,
            error: 'Please enter the correct address',
        })
    }

    const coordinates = locationData[0];
    body.latitude = coordinates.latitude
    body.longitude = coordinates.longitude

    const company = new Company(body)

    if (!company) {
        return res.status(400).json({ success: false, error: err })
    }

    company
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: company._id,
                message: 'Company created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Company not created!',
            })
        })
}

getCompanyById = async (req, res) => {
    await Company.findOne({ _id: req.params.id }, (err, company) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!company) {
            return res
                .status(404)
                .json({ success: false, error: `Company not found` })
        }
        return res.status(200).json({ success: true, data: company })
    }).catch(err => console.log(err))
}

getCompanies = async (req, res) => {
    await Company.find({}, (err, companies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!companies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Companies not found` })
        }
        return res.status(200).json({ success: true, data: companies })
    }).catch(err => console.log(err))
}

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
}