from fastapi import APIRouter, HTTPException, status
from models.employees_model import EmployeesModel
from config.db import collection_employees
from schemas.employees_schema import list_serial_employees
from bson import ObjectId

employeesRouter = APIRouter()

# Get all employees
@employeesRouter.get("/employees")
async def get_all_employees():
    employees = list_serial_employees(collection_employees.find())
    if not employees:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No employees found")
    return employees

# Add a new employees
@employeesRouter.post("/employees")
async def add_employee(employees: EmployeesModel):
    try:
        result = collection_employees.insert_one(dict(employees))
        if not result.inserted_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to add employee")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return {
        "status": "OK",
        "message": "Employee added successfully."
    }


# Get a employees by id
@employeesRouter.get("/employees/{id}")
async def get_employee_by_id(id):
    employee = list_serial_employees(collection_employees.find({"_id": ObjectId(id)}))
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return employee

# Update a employees by id
@employeesRouter.put("/employees/{id}")
async def update_employee_by_id(id:str, employees: EmployeesModel):
    try:
        result = collection_employees.update_one({"_id": ObjectId(id)}, {"$set": dict(employees)})
        if not result.modified_count:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to update employee")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return {
        "status": "OK",
        "message": "Employee updated successfully."
    }

# Delete a employees by id
@employeesRouter.delete("/employees/{id}")
async def delete_employee_by_id(id):
    try:
        result = collection_employees.delete_one({"_id": ObjectId(id)})
        if not result.deleted_count:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to delete employee")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return {
        "status": "OK",
        "message": "Employee deleted successfully."
    }