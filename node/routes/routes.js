import express from 'express'
import { getCommonFailures, getCommonFailure, insertCommonFailure, updateCommonFailure, deleteCommonFailure } from '../controllers/CommonFailuresController.js'
import { deleteCompany, getCompanies, getCompany, insertCompany, updateCompany } from '../controllers/CompanyController.js'
import { deleteCustomerContact, getAllContacts, getCustomerContact, getCustomerContacts, insertCustomerContact, updateCustomerContact } from '../controllers/CustomerContactsController.js'
import { deleteCustomer, getCustomer, getCustomers, insertCustomer, updateCustomer } from '../controllers/CustomersController.js'
import { deleteEmployee, getEmployee, getEmployees, insertEmployee, updateEmployee } from '../controllers/EmployeesController.js'
import { deleteLocation, getLocation, getLocations, insertLocation, updateLocation } from '../controllers/LocationsController.js'
import { deleteSymptomCategory, getSymptomCategory, getSymptomsCategories, insertSymptomCategory, updateSymptomCategory } from '../controllers/SymptomsCategoriesController.js'
import { deleteVehicle, getAllVehicles, getVehicle, getVehicles, insertVehicle, updateVehicle } from '../controllers/VehiclesController.js'
import { deleteWarehouse, getWarehouse, getWarehouses, insertWarehouse, updateWarehouse } from '../controllers/WarehouseController.js'
import { deleteZipCode, getPaginatedZipCodes, getZipCode, getZipCodes, insertZipCode, updateZipCode } from '../controllers/ZipCodesController.js'
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

router.get('/employees/', getEmployees)
router.get('/employees/:id',getEmployee)
router.post('/employees/', insertEmployee )
router.put('/employees/:id', updateEmployee )
router.delete('/employees/:id', deleteEmployee )

router.get('/scategories/', getSymptomsCategories)
router.get('/scategories/:id',getSymptomCategory)
router.post('/scategories/', insertSymptomCategory )
router.put('/scategories/:id', updateSymptomCategory )
router.delete('/scategories/:id', deleteSymptomCategory )

router.get('/failures/', getCommonFailures)
router.get('/failures/:id',getCommonFailure)
router.post('/failures/', insertCommonFailure )
router.put('/failures/:id', updateCommonFailure )
router.delete('/failures/:id', deleteCommonFailure )


router.get('/zipcodesall/', getZipCodes)
router.get('/zipcodes/', getPaginatedZipCodes)
router.get('/zipcodes/:id',getZipCode)
router.post('/zipcodes/', insertZipCode )
router.put('/zipcodes/:id', updateZipCode )
router.delete('/zipcodes/:id', deleteZipCode )

router.get('/customers/', getCustomers)
router.get('/customers/:id',getCustomer)
router.post('/customers/', insertCustomer )
router.put('/customers/:id', updateCustomer )
router.delete('/customers/:id', deleteCustomer )
 
router.get('/warehouse/', getWarehouses)
router.get('/warehouse/:id',getWarehouse)
router.post('/warehouse/', insertWarehouse )
router.put('/warehouse/:id', updateWarehouse )
router.delete('/warehouse/:id', deleteWarehouse )

router.get('/customervehicles/:id', getVehicles)
router.get('/allvehicles/', getAllVehicles)
router.get('/vehicles/:id',getVehicle)
router.post('/vehicles/', insertVehicle )
router.put('/vehicles/:id', updateVehicle )
router.delete('/vehicles/:id', deleteVehicle )

router.get('/customercontacts/:id', getCustomerContacts)
router.get('/allcustomercontacts/', getAllContacts)
router.get('/customercontact/:id',getCustomerContact)
router.post('/customercontacts/', insertCustomerContact )
router.put('/customercontacts/:id', updateCustomerContact )
router.delete('/customercontacts/:id', deleteCustomerContact )
export default router