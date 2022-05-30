import express from 'express'
import { getCommonFailures, getCommonFailure, insertCommonFailure, updateCommonFailure, deleteCommonFailure } from '../controllers/CommonFailuresController.js'
import { deleteCompany, getCompanies, getCompany, insertCompany, updateCompany } from '../controllers/CompanyController.js'
import { deleteCustomerContact, getAllContacts, getCustomerContact, getCustomerContacts, insertCustomerContact, updateCustomerContact } from '../controllers/CustomerContactsController.js'
import { deleteCustomer, getCustomer, getCustomers, insertCustomer, updateCustomer } from '../controllers/CustomersController.js'
import { deleteEmployee, getEmployee, getEmployees, insertEmployee, updateEmployee } from '../controllers/EmployeesController.js'
import { deleteLocation, getLocation, getLocations, insertLocation, updateLocation } from '../controllers/LocationsController.js'
import { getMovementType, getMovementTypes } from '../controllers/MovementTypesController.js'
import { deletePartCategory, getPartcategory, getPartsCategories, insertPartCategory, updatePartCategory } from '../controllers/PartsCategoryController.js'
import { deleteParts, getPart, getParts, insertPart, updatePart } from '../controllers/PartsController.js'
import { getAllServices, getService, getServiceDetails, getServiceFailures, getServiceFiles, insertService, saveService, saveServiceFile, updateService } from '../controllers/ServicesController.js'
import { getAllServiceStatus, getServiceStatus } from '../controllers/ServiceStatusController.js'
import { deleteSymptomCategory, getSymptomCategory, getSymptomsCategories, insertSymptomCategory, updateSymptomCategory } from '../controllers/SymptomsCategoriesController.js'
import { deleteVehicle, getAllVehicles, getVehicle, getVehicles, insertVehicle, updateVehicle } from '../controllers/VehiclesController.js'
import { deleteVendor, getVendor, getVendors, insertVendor, updateVendor } from '../controllers/VendorController.js'
import { deleteWarehouse, getWarehouse, getWarehouses, insertWarehouse, updateWarehouse } from '../controllers/WarehouseController.js'
import { deleteZipCode, getFilterZipCodes, getPaginatedZipCodes, getZipCode, getZipCodes, insertZipCode, updateZipCode } from '../controllers/ZipCodesController.js'
import uploadfile from './uploadfile.js'
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
router.get('/zipcodessearch/:filterStr',getFilterZipCodes) 
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

router.get('/movementtypes/', getMovementTypes)
router.get('/movementtypes/:id', getMovementType)

router.get('/partscategories/', getPartsCategories) 
router.get('/partscategories/:id',getPartcategory)
router.post('/partscategories/', insertPartCategory )
router.put('/partscategories/:id', updatePartCategory )
router.delete('/partscategories/:id', deletePartCategory )

router.get('/vendors/', getVendors) 
router.get('/vendors/:id',getVendor)
router.post('/vendors/', insertVendor )
router.put('/vendors/:id', updateVendor )
router.delete('/vendors/:id', deleteVendor )

router.get('/parts/', getParts) 
router.get('/parts/:id',getPart)
router.post('/parts/', insertPart )
router.put('/parts/:id', updatePart )
router.delete('/parts/:id', deleteParts )

router.get('/servicestatus/', getAllServiceStatus   ) 
router.get('/servicestatus/:id',getServiceStatus) 

router.get('/services/', getAllServices) 
router.get('/services/:id',getService)
router.get('/services/failures/:id',getServiceFailures)
router.get('/services/details/:id',getServiceDetails)
router.get('/services/files/:id',getServiceFiles)
router.post('/service/savefile/',uploadfile, saveServiceFile )
router.post('/services/', insertService )
router.post('/service/save/:id', saveService )
router.put('/services/:id', updateService ) 
export default router