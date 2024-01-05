import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Title from "../Title/Title";
import { useState } from "react";

interface IMovieEntry {
  id: number;
  mName: string;
  mYear: string;
  mCategory: string;
  mDuration: string;
  mLanguage: string;
  mDirector: string;
}

const initialRows: GridRowsProp = [
  {
    id: 1,
    mName: "Sample Movie Name",
    mYear: "2023",
    mCategory: "Action",
    mDuration: "150 Minutes",
    mLanguage: "English",
    mDirector: "Sample Director Name",
  },
  {
    id: 2,
    mName: "Sample Movie Name2",
    mYear: "2023",
    mCategory: "Action",
    mDuration: "150 Minutes",
    mLanguage: "English",
    mDirector: "Sample Director Name",
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 3;
    setRows((oldRows) => [
      {
        id,
        mName: "",
        mYear: "",
        mCategory: "",
        mDuration: "",
        mLanguage: "",
        mDirector: "",
        isNew: true,
      },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "mName" },
      ...oldModel,
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        variant="contained"
        sx={{
          "& .MuiButton-label": {
            textTransform: "none",
          },
          margin: "1em",
        }}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const MovieGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      editable: false,
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "mName",
      headerName: "Name",
      width: 200,
      align: "center",
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mYear",
      headerName: "Year",
      width: 100,
      align: "center",
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mCategory",
      headerName: "Category",
      align: "center",
      width: 150,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mDuration",
      headerName: "Duration",
      align: "center",
      width: 130,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mLanguage",
      headerName: "Language",
      align: "center",
      width: 150,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mDirector",
      headerName: "Director",
      align: "center",
      width: 200,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
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
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={
                <CancelIcon
                  sx={{
                    color: "blue",
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
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
        overflowX: "auto",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <>
        <Title>Manage Movies</Title>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </>
    </Box>
  );
};

export default MovieGrid;
