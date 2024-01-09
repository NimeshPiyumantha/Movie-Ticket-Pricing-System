import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridToolbarContainer,
  GridPreProcessEditCellProps,
  GridEditDateCell,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  maxDateUser,
  minDateUser,
  validateAddressInput,
  validateEmailInput,
  validateInputUser,
  validateMobileInput,
  validateNameInput,
  validatePasswordInput,
} from "../../util/validationUtilUser";
import { ERoleTypeEnum } from "../../enum/roleTypeEnum";
import { generateAge } from "../../util/generateAgeUtil";
import { employeeActions } from "../../redux/employee/employeeSlice";
import Title from "../Title/Title";

interface IUserEntry {
  id: string;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

const EmployeeGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const userList = useSelector(
    (state: RootState) => state.employeeEntries.employeeEntries
  );

  useEffect(() => {
    dispatch(employeeActions.fetchEmployeeEntry());
  }, [dispatch]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  function EditToolbar() {
    const handleAddNew = () => {
      const newUser: IUserEntry = {
        id: "-1",
        roleType: "",
        name: "",
        address: "",
        email: "",
        mobileNumber: "",
        dob: "",
        password: "",
        gender: "",
      };
      dispatch(employeeActions.addEmployeeEntry(newUser));
      setRowModesModel((oldModel) => ({
        [newUser.email]: { mode: GridRowModes.Edit, fieldToFocus: "roleType" },
        ...oldModel,
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          backgroundColor: "#ecf0f1",
          borderRadius: "1em",
          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        }}
      >
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          variant="contained"
          sx={{
            "& .MuiButton-label": {
              textTransform: "none",
            },
            margin: "1em",
            backgroundColor: "#2f3542",
            borderRadius: "0.5em",
            boxShadow: "0 0 5px rgba(0,0,0,0.5)",
            color: "#ecf0f1",
            fontWeight: "bold",
          }}
        >
          Add User
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleSaveClick = (row: GridRowModel) => () => {
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View },
    });
  };

  const handleEditClick = (row: GridRowModel) => () => {
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.Edit },
    });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(employeeActions.deleteEmployeeEntry(row.row.id));
    }
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (
      row.name === "" ||
      row.mobileNumber === "" ||
      row.address === "" ||
      row.age === "" ||
      row.email === "" ||
      row.password === ""
    ) {
      dispatch(employeeActions.deleteEmployeeEntry(row.row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.row.email]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const {
      id,
      roleType,
      name,
      address,
      email,
      mobileNumber,
      dob,
      password,
      gender,
    } = newRow;

    const validationData = [
      { value: name, type: "name" },
      { value: address, type: "address" },
      { value: mobileNumber, type: "mobileNumber" },
      { value: email, type: "email" },
      { value: password, type: "password" },
    ];

    for (const data of validationData) {
      const error = validateInputUser(
        data.value,
        data.type as "name" | "address" | "mobileNumber" | "email" | "password"
      );
      if (error) {
        alert(error);
        if (data.type === "password") {
          console.log(data.value);
        }
        return Promise.resolve();
      }
    }
    const updatedUser: IUserEntry = {
      id: id,
      roleType: roleType,
      name: name,
      address: address,
      email: email,
      mobileNumber: mobileNumber,
      dob: dob,
      password: password,
      gender: gender,
    };
    dispatch(employeeActions.saveAndUpdateEmployeeEntry(updatedUser));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    {
      field: "roleType",
      headerName: "RoleType",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 150,
      minWidth: 120,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: [ERoleTypeEnum.ADMIN, ERoleTypeEnum.USER],
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 250,
      minWidth: 200,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateNameInput(params.props.value);
        return {
          ...params.props,
          style: { color: hasError ? "red" : "green" },
        };
      },
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateAddressInput(params.props.value);
        return {
          ...params.props,
          style: { color: hasError ? "red" : "green" },
        };
      },
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateEmailInput(params.props.value);
        return {
          ...params.props,
          style: { color: hasError ? "red" : "green" },
        };
      },
    },
    {
      field: "mobileNumber",
      headerName: "MobileNumber",
      type: "string",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateMobileInput(params.props.value);
        return {
          ...params.props,
          style: { color: hasError ? "red" : "green" },
        };
      },
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      type: "date",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <GridEditDateCell
            {...params}
            inputProps={{ max: maxDateUser(), min: minDateUser() }}
          />
        );
      },
    },
    {
      field: "password",
      headerName: "Password",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "string",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validatePasswordInput(params.props.value);
        return {
          ...params.props,
          style: { color: hasError ? "red" : "green" },
        };
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 60,
      minWidth: 40,
      headerClassName: "header-cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      maxWidth: 180,
      minWidth: 150,
      headerClassName: "header-cell",
      cellClassName: "actions",
      getActions: (row) => {
        const id = row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={
                <SaveIcon
                  sx={{
                    color: "green",
                  }}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              key={id}
              icon={
                <CancelIcon
                  sx={{
                    color: "blue",
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            onClick={handleEditClick(row.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <>
        <Title>Manage Employee</Title>
        <DataGrid
          sx={{
            margin: "1em",
            borderRadius: "1em",
            boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          }}
          rows={userList.map((user) => ({
            ...user,
            dob: new Date(user.dob),
            age: generateAge(user.dob),
          }))}
          getRowId={(row) => row.email}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(handleRowModesModelChange) =>
            setRowModesModel(handleRowModesModelChange)
          }
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{
            toolbar: EditToolbar,
          }}
        />
      </>
    </Box>
  );
};

export default EmployeeGrid;
