import React, { useState, useEffect } from "react";
import { BsSearch } from 'react-icons/fa';
import "./style.css";

const Order_list = () => {
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState('');

    // for status check


    const customerList = async () => {
        const res = await fetch(
            "https://my-json-server.typicode.com/Ved-X/assignment/orders"
        );
        const actualData = await res.json();
        // console.log(actualData[0]);
        setData(actualData);
    };

    const total_order = data.length;

    const setbyDate = data.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));

    console.log(setbyDate)

    useEffect(() => {
        customerList();
    }, []);


    const deleveredItem = () => {
        data.filter((val) => {
            if( val.status === "Delevered") {
                return val;
            }
        })
    }
    console.log(deleveredItem)

    return (
        <>
            <div className="container">
                <div className="all_order_head">
                    <p className="all_order">
                        All Orders <span className="toal_order">{total_order}</span>
                    </p>
                    <p className="all_order_right">Showing {total_order} orders</p>
                </div>
                <div className="search_bar">
                    <input
                        type="search"
                        className="search"
                        placeholder='Search by customer name'
                        onChange={e => { setSearchName(e.target.value) }}
                    />

                        <select name="filter" className="filter_button"><i class="fas fa-sort-amount-up"></i>
                            <option value="none" selected>Filter</option>
                            <option value="delevered" onClick={deleveredItem} >delevered </option>
                            <option value="prepared">prepared</option>
                            <option value="completed">completed</option>
                        </select>

                    </div>
                <table className="list">
                    <thead className="list_head">
                        <tr>
                            <th className="order-id">
                                order id <i className="fas fa-caret-down"></i>
                            </th>
                            <th>
                                customer <i className="fas fa-caret-down"></i>
                            </th>
                            <th>
                                address <i className="fas fa-caret-down"></i>
                            </th>
                            <th>
                                product <i className="fas fa-caret-down"></i>
                            </th>
                            <th>
                                date order <i className="fas fa-caret-down"></i>
                            </th>
                            <th>
                                status <i className="fas fa-caret-down"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="list_body">
                        {

                            data.filter((val) => {
                                if (searchName == "") {
                                    return val;
                                } else if (val.customer.toLowerCase().includes(searchName.toLocaleLowerCase())) {
                                    return val;
                                }
                            }).map((val, index) => {
                                return (
                                    <tr key={index} className="row_element">
                                        <th className="order_id">#{val.order_id}</th>
                                        <td className="customer_name">{val.customer}r</td>
                                        <td className="country">
                                            <span className="country_name"> {val.country}</span>,<br /> <span className="country_address"></span> {val.address},
                                        </td>
                                        <td className="product">
                                            <span className="product_title">{val.product_title}</span> <br /> <span className="product_description">{val.product_description}</span>
                                        </td>
                                        {<td className="date">{val.date}</td>}
                                        <td className="status"><span className="order_status">{val.status}</span></td>
                                    </tr>

                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Order_list;
