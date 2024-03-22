
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useCookies } from 'react-cookie';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Fab, TextField } from '@mui/material';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import * as yup from "yup";
import { deepOrange } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export function UserDhasbord2() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const [open, setOpen] = React.useState(false);
  const [captcha , setcaptcha] =useState([]);

  function handleClickOpen (){
  
    var code =0;
    var a = Math.random() * 10;
    var b = Math.random() * 10;
    var c = Math.random() * 10;
    var d = Math.random() * 10;
    var e = Math.random() * 10;
    var f = Math.random()* 10;

    code = `${Math.round(a)}${Math.round(b)}${Math.round(c)}${Math.round(d)}${Math.round(e)}${Math.round(f)}`

    setcaptcha(code);
    alert(code)
    return setOpen(true)

  }


  const handleClose = () => {
    setOpen(false);
  };



  const [cookie, setcookie, removecookie] = useCookies("userid");
  const navigater = useNavigate();
  const [Users, setUsers] = useState([])
  const [appointments, setappointment] = React.useState([{ Appointment_Id: 0, Title: '', Description: '', Date: '' }]);

  const [EditTasks, setEditTasks] = useState([{ Appointment_Id: 0, Title: '', Description: '', Date: '' }])




  React.useEffect(() => {
    axios.get(`http://127.0.0.1:9146/Appointment/${cookie['userid']}`)
      .then(response => {
        setappointment(response.data)
      })


  }, []);

  function Handlelogout() {
    removecookie('userid');
    navigater('/login');
    window.location.reload();
  }



  const fomik = useFormik({
    initialValues: {
      Appointment_Id:0,
      Title: '',
      Description: '',
      Date: '',
      UserId: cookie['userid']

    },
    validationSchema: yup.object({ Title: yup.string(), Description: yup.string() }),
    onSubmit: (taskappointment) => {
      axios.post("http://127.0.0.1:9146/add-task", taskappointment)
      alert("Appointment Added");
      window.location.reload();
    }
  })

 


  function handleEditClick(id) {
    axios.get(`http://127.0.0.1:9146/get-task/${id}`)
      .then(response => {
        setEditTasks(response.data);
      })
  }

  const editFormik = useFormik({
    initialValues: {
      Appointment_Id: EditTasks[0].Appointment_Id,
      Title: EditTasks[0].Title,
      Description: EditTasks[0].Description,
      Date: EditTasks[0].Date,
      UserId: EditTasks[0].UserId
    },
    onSubmit: (task) => {

      axios.put(`http://127.0.0.1:9146/edit-task/${EditTasks[0].Appointment_Id}`, task);
      alert('Appointment is Edited');
      window.location.reload();
    },
    enableReinitialize: true
  })

  function GetProfile() {
    axios.get(`http://127.0.0.1:9146/Users/${cookie['userid']}`)
      .then(response => {
        setUsers(response.data)
      })
  }

   function HandleDelete(e) {
    axios.delete(`http://127.0.0.1:9146/delete-task/${e.target.name}`)
    alert("delete successfully..")

  }





  return (
    <div>
      <header >
        {/* NavBar */}

        <AppBar >
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {cookie['userid']}

              </Typography>

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {cookie['userid']}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="" alt="Remy Sharp" sx={{ bgcolor: deepOrange[500] }}></Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {
                    <MenuItem onClick={handleCloseUserMenu}>

                      <div>
                        <Button onClick={Handlelogout} className='mb-2 ' variant="outlined" color="secondary">Logout</Button> <br />
                        <Button className='mt-3' onClick={GetProfile} data-bs-target="#profile1" data-bs-toggle="modal" variant="contained">Profile</Button>
                      </div>
                    </MenuItem>
                  }
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </header>

      {/* Personal Details */}


      <section className='userdashbord-section'>
        <div className='add'>
          <div className="modal fade" style={{ marginTop: '60px' }} id="profile1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Personal Details</h3>
                  <button type="button" className="btn-close me-4" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className='d-flex flex-wrap justify-content-between'>
                    <div className='img'>
                      <img src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" alt="" />
                      {/* <Fab color="primary" aria-label="add">
                        <AddIcon />
                      </Fab> */}
                     


                    </div>
                    <div >
                      <div>
                        {
                          Users.map(item =>
                            <div key={item.UserId}>
                              <h2>User Name :-</h2>
                              <h4 className='text-primary'><b>{item.UserName}</b></h4>
                              <h2 className='mt-4'>User Id :-</h2>
                              <h4 className='text-success'><b>{item.UserId}</b></h4>
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div style={{ marginRight: '160px' }}>
                      {
                        Users.map(items =>
                          <div className='userde' key={items.Mobile}>
                            <h4>Mobile No :-</h4>
                            <h5><b>{items.Mobile}</b></h5>
                            <h4>Email Id :-</h4>
                            <h5><b>{items.Email}</b></h5>
                            <h4>Password :-</h4>
                            <h5><b>{items.Password}</b></h5>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

       {/* Add Appointment */}

          <div>
            <Button id='b1' variant="outlined" onClick={handleClickOpen}>
              <b>Add Appointment</b>
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description" >
              <DialogTitle className=' pop-title'><span className='h2'> Add Appointment  <span onClick={handleClose} className='bi bi-x-lg  ms-5 pop-icon'></span></span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <form onSubmit={fomik.handleSubmit}>
                    <dl className='pop'>
                      <td>Appointment Id</td>
                      <dd >  <TextField id="standard-basic" value={captcha} onChange={fomik.handleChange}     type="number" name='Appointment_Id' className='w-100' label="Enter Appointment Id" variant="standard" /></dd>

                      <td>Title</td>
                      <dd>  <TextField  id="standard-basic" name='Title' onChange={fomik.handleChange} className='w-100' label="Enter Title" variant="standard" /></dd>
                      <span className='text-danger'>{fomik.errors.Title}</span>
                      <td>Description</td>
                      <dd><textarea className='form-control' name='Description' onChange={fomik.handleChange} rows="3" cols="40">
                      </textarea></dd>
                      <span className='text-danger'>{fomik.errors.Description}</span>
                      <td>Date</td>
                      <dd><input  className='form-control' onChange={fomik.handleChange} name='Date' type="date" /></dd>

                    </dl>
                    <div className='text-center mb-4'>
                      <Button className=' pt-2 pb-2 ps-4 pe-4' type='submit' variant="outlined" endIcon={<SendIcon />}> <b> Add  Appointment</b></Button>
                    </div>
                  </form>
                </DialogContentText>
              </DialogContent>
            </Dialog>

          </div>
        </div>

        {/* Display Appointment */}

        
        <div className='content'>
          {
            appointments.map(appointment =>
              <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible fade show" role="alert">
                <div className='d-flex justify-content-between'> <h3 className='text-primary' key={appointment.Title}>{appointment.Title}</h3>
                  <Button name={appointment.Appointment_Id} onClick={HandleDelete} className=' bi bi-trash' color="error" data-bs-dismiss="alert" aria-label="Close"></Button>
                </div>
                <p className='de' key={appointment.Description}>{appointment.Description}</p>
                <p key={appointment.Date}><span className='bi bi-calendar-check-fill '> </span>{appointment.Date}</p>
                <Button className='mt-3' onClick={() => handleEditClick(appointment.Appointment_Id)} data-bs-target="#exampleModal" data-bs-toggle="modal" variant="outlined" color="secondary">Edit Appointment</Button>
              </div>

            )
          }

              {/* Edit Appointment Section */}


          <div className="modal fade" style={{ marginTop: '50px' }} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title text-success" id="exampleModalLabel"><b>Edit Appointment</b></h2>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={editFormik.handleSubmit}>
                    <dl className='pop'>
                      <td>Title</td>
                      <dd>  <TextField value={editFormik.values.Title} id="standard-basic" name='Title' onChange={editFormik.handleChange} className='w-100' label="Enter Title" variant="standard" /></dd>
                      <td>Description</td>
                      <dd><textarea className='form-control' value={editFormik.values.Description} name='Description' onChange={editFormik.handleChange} rows="3" cols="40">
                      </textarea></dd>
                      <td>Date</td>
                      <dd><input className='form-control' value={editFormik.values.Date} onChange={editFormik.handleChange} name='Date' type="date" /></dd>

                    </dl>
                    <div className='text-center mb-4'>
                      <Button className=' pt-2 pb-2 ps-4 pe-4' type='submit' variant="outlined" endIcon={<SendIcon />}> <b>Save Appointment</b></Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

