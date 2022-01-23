
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import api from '../api/axiosBase';
import { useNavigate } from 'react-router-dom';


import "../css/index.css"
const Index = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {

        api.post("/login/login", { username, password }).then((result) => {
            if (result.data.login) {
                navigate('/peliculas');

            }
            else {
                alert("error, intenta con usuario usuario")
            }
        }).catch((ex) => { })

    }
    return (
        <div className="root">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Usuario"
                        id="margin-normal"
                        value={username}
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Clave"
                        id="margin-normal"
                        value={password}
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={(e) => login(e)}
                    >iniciar sesion</Button>

                </Grid>
            </Grid>
        </div>
    )
}

export default Index;