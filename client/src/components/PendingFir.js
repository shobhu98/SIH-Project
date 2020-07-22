import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  


export default class PendingFir extends Component{
  state={
    columns: [
      { title: 'FIR id', field: 'firid' },
      { title: 'Complainant Name', field: 'name' },
      { title: 'Status', field: 'status'}
    ],

    data: [
      { 
        name: 'Mehmet Gupta', firid: 'MPDN18', status: 'Pending'
      },
      {
        name: 'Zerya Betül', firid: 'KNPE11', status: 'More information Requested'
      },
      { 
        name: 'Mehmet Gupta', firid: 'MPDN18', status: 'Pending'
      },
      {
        name: 'Zerya Betül', firid: 'KNPE11', status: 'More information Requested'
      },
      { 
        name: 'Mehmet Gupta', firid: 'MPDN18', status: 'Pending'
      },
      {
        name: 'Zerya Betül', firid: 'KNPE11', status: 'More information Requested'
      },
    ],
    actions: [
      {
        icon: () => <CheckIcon/>,
        tooltip: 'Accept FIR',
        onClick: (event, rowData) => alert("Accepted " + rowData.firid)
      },
      rowData => ({
        icon: () => <WarningIcon/>,
        tooltip: 'Request more information',
        onClick: (event, rowData) => alert("More infromation requested for " + rowData.firid),
        disabled: rowData.status === "More information Requested"
      })
    ]
  }

  handleRowClick = (event, rowData) => {
    alert("Downloading: "+rowData.firid);
  };


  componentWillMount(){
    //API Call to fetch pending FIR list
    

  }
  
  render(){
    return (
      <MaterialTable
        options={{
          exportButton: true,
          exportFileName: 'Pending_FIRs',
          actionsColumnIndex: -1,
         
        }}
        onRowClick={this.handleRowClick}
        icons={tableIcons}
        title="Pending FIR"
        columns={this.state.columns}
        data={this.state.data}
        actions={this.state.actions}
      />
    );
  }

}
