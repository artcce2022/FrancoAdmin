import express from 'express'
import { deleteCompany, getCompanies, getCompany, insertCompany, updateCompany } from '../controllers/CompanyController.js'
import { deleteEmployee, getEmployee, getEmployeeList, insertEmployee, updateEmployee } from '../controllers/EmployeesController.js'
import { deleteLocation, getLocation, getLocations, insertLocation, updateLocation } from '../controllers/LocationsController.js'
const router = express.Router()

router.get('/companies/', getCompanies)
router.get('/companies/:id',getCompany)
router.post('/companies/', insertCompany )
router.put('/companies/:id', updateCompany )
router.delete('/companies/:id', deleteCompany )

router.get('/locations/', getLocations)
router.get('/locations/:id',getLocation)
router.post('/locations/', insertLocation )
router.put('/locations/:id', updateLocation )
router.delete('/locations/:id', deleteLocation )

router.get('/employees/', getEmployeeList)
router.get('/employees/:id',getEmployee)
router.post('/employees/', insertEmployee )
router.put('/employees/:id', updateEmployee )
router.delete('/employees/:id', deleteEmployee )
export default router