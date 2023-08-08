import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

import { Modal } from 'react-bootstrap'
import * as yup from 'yup';
import AxiosApi from './API/createapi';


const Model = (props) => {
    const [roledata, setRoledata] = useState()
    const [companydata, setCompanydata] = useState()
    const [designationdata, setDesignationdata] = useState()
    const { editRow, handleClose, show, getdata } = props
    const token = localStorage.getItem('token')

    //validation
    const validationSchema = yup.object({
        name: yup
            .string('Enter your First Name')
            .required('First Name is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your Last Name')
            .required('Last Name is required'),
        role: yup
            .string('Enter your Role')
            .required('Role is required'),
        company: yup
            .string('Enter your Company')
            .required('Company is required'),
        designation: yup
            .string('Enter your Designation')
            .required('Designation is required'),
    });
    // console.log(editRow.first_name)
    // console.log(formik)
    function postData(values) {
        // console.log(values)
        values.role_id = values.role
        values.designation_id = values.designation
        values.company_id = values.company
        if (editRow && editRow.id) {
            values.id = editRow.id
        }
        AxiosApi({
            method: 'post',
            url: 'user/add',
            headers: {
                'token': token,
                // header2: value2
            },
            data: JSON.stringify(values)
        }).then((res) =>
            console.log(res)
        ).then(() => {
            getdata()
            handleClose()
        })
    }
    const getrole = () => {
        AxiosApi.get('get/role').then((res) => setRoledata(res.data))
    }
    const getcompany = () => {
        AxiosApi.get('get/company').then((res) => setCompanydata(res.data))
    }
    const getdesignation = () => {
        AxiosApi.get('get/designation').then((res) => setDesignationdata(res.data))
    }
    useEffect(() => {
        getrole()
        getcompany()
        getdesignation()
    }, [])

    // console.log(editRow)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Data</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <Formik
                    initialValues={{
                        name: editRow ? editRow.name : '',
                        email: editRow ? editRow.email : '',
                        password: editRow ? editRow.password : '',
                        role: editRow ? editRow.role_id : '',
                        company: editRow ? editRow.company_id : '',
                        designation: editRow ? editRow.designation_id : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={postData}

                >
                    {(props) => {
                        const { values, touched, errors, handleChange } = props;
                        return (
                            <Form>
                                <TextField
                                    name='name'
                                    label='Name'
                                    id="updateuName"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name} /><br></br>

                                <TextField id="updateMail"
                                    name='email'
                                    className='my-3'
                                    label='Email'
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email} /><br></br>

                                <FormControl>
                                    <InputLabel className={errors.role ? "text-danger" : ""} id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        name='role'
                                        style={{ width: '14rem' }}
                                        onClick={getrole}
                                        label="Role"
                                        defaultValue={values.role}
                                        onChange={handleChange}
                                        error={touched.role && errors.role}
                                    >
                                        <MenuItem defaultValue>Select</MenuItem>
                                        {roledata && roledata.map((item, index) => (
                                            <MenuItem key={index} value={item.role_id}> {item.role_name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText className={errors.role ? "text-danger" : ""}>{errors.role}
                                    </FormHelperText>
                                </FormControl>
                                <br></br>

                                <FormControl className='my-3'>
                                    <InputLabel className={errors.company ? "text-danger" : ""}>Company</InputLabel>
                                    <Select
                                        name='company'
                                        style={{ width: '14rem' }}
                                        onClick={getcompany}
                                        defaultValue={values.company}
                                        label="Company"
                                        onChange={handleChange}
                                        error={touched.company && errors.company}
                                    >
                                        <MenuItem defaultValue>Select</MenuItem>
                                        {companydata && companydata.map((item, index) => (
                                            <MenuItem key={index} value={item.company_id}> {item.company_name}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText className={errors.company ? "text-danger" : ""}>{errors.role}</FormHelperText>
                                </FormControl><br></br>

                                <FormControl >
                                    <InputLabel className={errors.designation ? "text-danger" : ""}>Designation</InputLabel>
                                    <Select
                                        name='designation'
                                        style={{ width: '14rem' }}
                                        onClick={getdesignation}
                                        label="Designation"
                                        onChange={handleChange}
                                        defaultValue={values.designation}
                                        error={touched.designation && errors.designation}
                                    >
                                        <MenuItem defaultValue>Select</MenuItem>
                                        {designationdata && designationdata.map((item, index) => (
                                            <MenuItem key={index} value={item.designation_id}> {item.designation_name}</MenuItem>

                                        ))}
                                    </Select>
                                    <FormHelperText className={errors.designation ? "text-danger" : ""}>{errors.role}</FormHelperText>
                                </FormControl><br></br>

                                <TextField id="password"
                                    name='password'
                                    className='my-3'
                                    label='Password'
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password} /><br></br>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default Model