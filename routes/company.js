const express = require('express')

const CompanyController = require('../controllers/company')

const router = express.Router()

router.post('/company', CompanyController.createCompany)
router.get('/company/:id', CompanyController.getCompanyById)
router.get('/companies', CompanyController.getCompanies)

module.exports = router