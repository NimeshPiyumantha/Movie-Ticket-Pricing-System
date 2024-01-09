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
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Title from "../Title/Title";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { movieActions } from "../../redux/movie/movieSlice";

interface IMovieEntry {
  id: string;
  mName: string;
  mYear: string;
  mCategory: string;
  mDuration: string;
  mLanguage: string;
  mDirector: string;
}

const MovieGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const movieList = useSelector(
    (state: RootState) => state.movieEntries.movieEntries
  );

  useEffect(() => {
    dispatch(movieActions.fetchMovieEntry());
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
      const newMovie: IMovieEntry = {
        id: "-1",
        mName: "",
        mYear: "",
        mCategory: "",
        mDuration: "",
        mLanguage: "",
        mDirector: "",
      };
      dispatch(movieActions.addMovieEntry(newMovie));
      setRowModesModel((oldModel) => ({
        [newMovie.id]: { mode: GridRowModes.Edit, fieldToFocus: "mName" },
        ...oldModel,
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          backgroundColor: "#ecf0f1",
          borderRadius: "1em",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
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
          }}
        >
          Add Movie
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
      dispatch(movieActions.deleteMovieEntry(row.id));
    }
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (
      row.mName === "" ||
      row.mYear === "" ||
      row.mCategory === "" ||
      row.mDuration === "" ||
      row.mLanguage === "" ||
      row.mDirector === ""
    ) {
      dispatch(movieActions.deleteMovieEntry(row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, mName, mYear, mCategory, mDuration, mLanguage, mDirector } =
      newRow;

    const newMovie: IMovieEntry = {
      id: id,
      mName: mName,
      mYear: mYear,
      mCategory: mCategory,
      mDuration: mDuration,
      mLanguage: mLanguage,
      mDirector: mDirector,
    };
    dispatch(movieActions.saveAndUpdateMovieEntry(newMovie));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    {
      field: "mName",
      headerName: "Name",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mYear",
      headerName: "Year",
      width: 100,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mCategory",
      headerName: "Category",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mDuration",
      headerName: "Duration",
      align: "center",
      headerAlign: "center",
      width: 130,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mLanguage",
      headerName: "Language",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "mDirector",
      headerName: "Director",
      align: "center",
      headerAlign: "center",
      width: 200,
      editable: true,
      headerClassName: "header-cell",
    },
    {
      field: "actions",
      headerAlign: "center",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
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
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row)}
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
          sx={{
            margin: "1em",
            borderRadius: "1em",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
          rows={movieList.map((movie) => ({
            ...movie,
          }))}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(handleRowModesModelChange) => {
            setRowModesModel(handleRowModesModelChange);
          }}
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

export default MovieGrid;
