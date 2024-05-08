import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminHome({ userData }) {
  const [data, setData] = useState([]);
  const [APIData, setAPIData] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/users`)
        .then((response) => {
            setAPIData(response.data);
        })
}, [])

  
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  
  const getData = () => {
    axios.get(`http://localhost:3001/api/users`)
        .then((getData) => {
             setAPIData(getData.data);
         })
}

const onDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3001/api/users/supprimer/${id}`)
 .then(() => {
    getData();
})
}

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Welcom Admin</h3>
        <table style={{ width: 500 }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Supprimer</th>
          </tr>
         
          <Table.Body>
  {APIData.map((data) => {
     return (
       <Table.Row>
          <Table.Cell>{data.name}</Table.Cell>
           <Table.Cell>{data.email}</Table.Cell>
           <Table.Cell>{data.role}</Table.Cell>
           <Table.Cell>
           
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => onDelete(data._id)}
                  />
                </Table.Cell>
                
        </Table.Row>
   )})}
</Table.Body>

        </table>
        <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </div>
  );
}


