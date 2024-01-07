from fastapi import APIRouter, HTTPException, status
from utils.encryption_decryption_password import encrypt_password,decrypt_password
from models.employees_model import EmployeesModel
from config.db import collection_employees
from schemas.employees_schema import list_serial_employees
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load the environment variables
load_dotenv()

key = os.getenv('ENCRYPTION_KEY')

employeesRouter = APIRouter()

# Get all employees
@employeesRouter.get("/employees")
async def get_all_employees():
    employees = list_serial_employees(collection_employees.find())
    if not employees:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No employees found")
    # Decrypt the password for each employee in the list
    for employee in employees:
        try:
            decrypted_password = decrypt_password(employee['password'], key)  # Replace 'key' with your actual key
            # Update the employee dictionary with the decrypted password (if needed)
            employee['password'] = decrypted_password
        except Exception as e:
            # Handle decryption errors (e.g., InvalidToken) appropriately
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return employees

# Add a new employees
@employeesRouter.post("/employees")
async def add_employee(employees: EmployeesModel):
    encrypted_password = encrypt_password(employees.password, key)
    employees.password = encrypted_password
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
    # Fetch the employee using the provided ID
    employee = list_serial_employees(collection_employees.find({"_id": ObjectId(id)}))
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    # Extract the encrypted password from the employee dictionary
    encrypted_password = employee[0]['password']
    try:
        # Decrypt the password using the decrypt_password function
        decrypted_password = decrypt_password(encrypted_password, key)
        # Replace the encrypted password with the decrypted password in the employee dictionary
        employee[0]['password'] = decrypted_password
    except Exception as e:
        # Handle decryption errors appropriately
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return employee

# Update a employees by id
@employeesRouter.put("/employees/{id}")
async def update_employee_by_id(id:str, employees: EmployeesModel):
    encrypted_password = encrypt_password(employees.password, key)
    employees.password = encrypted_password
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