import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useState, useCallback, useRef } from "react";
import data from "../data/near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Row } from "../models";
import { parseRows } from "../helpers";
import "./styles.css";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true, filter: 'agTextColumnFilter' },
  { field: "discovery_date", headerName: "Discovery Date", sortable: true, valueFormatter: (params) => (params.value as Date).toLocaleDateString() },
  { field: "h_mag", headerName: "H (mag)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "q_au_1", headerName: "q (au)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true, filter: 'agTextColumnFilter' },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, sortable: true, filter: 'agTextColumnFilter' },
];

const NeoGrid = (): JSX.Element => {
  const [rows, setRows] = useState<Row[]>(parseRows(data));
  const gridRef = useRef<AgGridReact>(null);
  const clearFilters = useCallback(() => {
    if (gridRef.current !== null){      
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.setDefaultColDef({sort: null})
    }
  }, []);

  return (
    <div>
      <div>
        <h2 style={{ marginBottom: '15px' }}>Near-Earth Object Overview</h2>
        <button onClick={clearFilters}>Clear Filters and Sorters</button>
      </div>
      <div className="ag-theme-alpine ag-theme-quartz" style={{ height: 900, width: 1920 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={columnDefs}
          rowGroupPanelShow={'always'}
          enableRangeSelection={true}
          multiSortKey={'ctrl'}
        />
      </div>
    </div>
  );
};

export default NeoGrid;
