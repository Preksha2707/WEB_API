import React, { Component, useState, useEffect  } from 'react';
//import { Route } from 'react-router';
//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

import './custom.css'

//import React, { useState, useEffect } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAddItem = async () => {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: itemName, Price: itemPrice }),
            });
            if (response.ok) {
                fetchItems();
                setItemName('');
                setItemPrice('');
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    const handleUpdateItem = async () => {
        if (!itemIdToUpdate) return;

        try {
            const response = await fetch(`/api/items/${itemIdToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: itemName, Price: itemPrice }),
            });
            if (response.ok) {
                fetchItems();
                setItemIdToUpdate(null);
                setItemName('');
                setItemPrice('');
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    //Delete the items
    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchItems();
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    //Edit the items
    const handleEditItem = (item) => {
        setItemIdToUpdate(item.id);
        setItemName(item.name);
        setItemPrice(item.price);
    };


    return (
        <body style={{
            backgroundColor: '#f5f5f5', 
            
            height: '100%'
        }}>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: 'lightcyan' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px', color: 'royalblue' }}><b><u> CRUD for List Of Items</u></b></h1><br />
                
                <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center', color: 'royalblue', padding: '8px', border: '1px solid black' }}>NAME</th>
                            <th style={{ textAlign: 'center', color: 'royalblue', padding: '8px', border: '1px solid black' }}>PRICE</th>
                            <th style={{ textAlign: 'center', color: 'royalblue', padding: '8px', border: '1px solid black' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td style={{ textAlign: 'center', color: 'black', padding: '8px', border: '1px solid black' }}>{item.name}</td>
                                <td style={{ textAlign: 'center', color: 'black', padding: '8px', border: '1px solid black' }}>{item.price}</td>
                                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid black' }}>
                                    <button style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'green',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        marginRight: '5px'
                                    }}
                                        onClick={() => handleEditItem(item)}>Edit</button>
                                    <button style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'tomato',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {itemIdToUpdate ? (
                    <div style={{ marginTop: '20px', marginLeft: '450px' }}>

                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />

                        <input
                            type="text"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />
                        <button onClick={handleUpdateItem}>Update</button>
                    </div>
                ) : (
                    <div style={{ marginTop: '20px', marginLeft: '450px' }}>
                        <span style={{ color: 'RoyalBlue', marginRight: '10px'}}><b> Enter the Name</b></span>
                        <input
                                type="text" 
                                value={itemName}

                            onChange={(e) => setItemName(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}

                            />&nbsp; &nbsp;
                        <span style={{ color: 'RoyalBlue', marginRight: '10px' }}><b>Enter the Price</b></span>
                        <input
                            type="text"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                            />&nbsp; &nbsp; &nbsp;
                        <button onClick={handleAddItem} style={{
                            padding: '5px 10px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',

                        }}
                        >Add Item</button>
                    </div>
                )}
            </div>
        </body>
       
    );
}

export default App;

