import React from 'react';
import './App.scss';
import SqlEditor, { READ_VALIDATORS } from 'react-sql-editor';

var query
class MainPage extends React.Component {
  state = {
    query: null,
    tableData: [],
    queryMsg: "",
    queries: [{
      label: "create",
      query: `CREATE TABLE Persons (
        PersonID int,
        LastName varchar(255),
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255)
    );`
    },{
      label: "select",
      query: `Select * from Persons;`
    },{
      label: "insert",
      query: `INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
      VALUES (1234, 'Tom B', 'Erichsen', '4006 Roank street', 'Norway');`
    }]
  }
  handleQueryChange = (data) => {
    // if(event.target){
    this.setState({ query: data });
    // }
  }

  executeQuery = () => {
    let tableData = this.state.tableData;
    switch(this.state.type){
      case 'create': this.setState({queryMsg: "Table created Successfully"});
      break;
      case 'select': const table = this.state.tableData.map((item) => {
      return <tr><td>{item.personId}</td><td>{item.lastName}</td>
      <td>{item.firstName}</td>
      <td>{item.address}</td>
      <td>{item.city}</td></tr>})
      this.setState({queryMsg: table})
      break;
      case 'insert':
        const values = this.state.query.split('(')[2].replace(');','').split(',');
      tableData.push({personId: values[0], lastName: values[1], firstName: values[2], address: values[3], city: values[4]})
      this.setState({queryMsg: "Inserted (1) row successfully"});
      break;
      case 'default': //write code
      break;
    }
  }
  handleQuery = (type) => {
    this.setState({query: this.state.queries.filter((obj)=> obj.label == type)[0].query, type, queryMsg: ""});
  }
  render() {
    const { query, queryMsg,type } = this.state;
    console.log("query", queryMsg);
    return (
      <div >
        <div className='heading'>SQL IDE editor</div>
        <SqlEditor
          title="Sql Editor"
          // width="60%"
          height="300px"
          isShowHeader={true}
          value={this.state.query}
          onChange={data => {
            // query = data;
            console.log('data', data)
            this.handleQueryChange(data);
          }}
          // onBlur={event => {
          //   this.handleQueryChange(event);
          // }}
          validatorConfig={{
            maxSqlNum: 1,
            // validators: READ_VALIDATORS,
          }}
        /><div><button style={{ float: 'right' }} className="button"  onClick={() =>this.executeQuery()}>Execute query</button><button style={{ float: 'right' }} className="button"  onClick={() => this.handleQuery('insert')}>Insert Rows</button><button style={{ float: 'right' }}  onClick={() => this.handleQuery('select')} className="button">Select Table</button>
          <button style={{ float: 'right' }} className="button" onClick={() => this.handleQuery('create')}>Create Table</button></div><div className="result-div"><div className='result-text' style={{fontWeight: 'bold'}}>Result of the query(Please select from available queries): </div>
          {type == "select" ? <table className='result-text' style={{border: "1px solid white"}}><tr>< td>PersonID</td>
          <td>LastName</td>
         <td>FirstName</td> 
         <td>Address</td> 
         <td>City</td> </tr><tbody>{this.state.tableData.map((item) => {
      return <tr><td>{item.personId}</td><td>{item.lastName}</td>
      <td>{item.firstName}</td>
      <td>{item.address}</td>
      <td>{item.city}</td></tr>})}</tbody></table>: <div className='green-text'>{queryMsg}</div>}</div>
          </div>)
  }
}

export default MainPage;
