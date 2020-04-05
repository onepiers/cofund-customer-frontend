import {fade} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {debounce} from "lodash";
import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory} from 'react-router-dom';
import {useStoreon} from "storeon/react";
import Logo from '../assets/cofund.svg';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.cofound.de">
                CoFund
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    disabled: {
        backgroundColor: fade(theme.palette.common.black, 0.05)
    }
}));

export default function SignUp() {
    const {t} = useTranslation();
    const classes = useStyles();
    const [form, setForm] = useState({data: {firstName: null, lastName: null, mail: null, slug: null}, valid: false, invalidSlug: false});
    const debouncedSlugValidation = debounce((value) => validateSlug(value), 500);

    const {dispatch, entrepreneur, token} = useStoreon('entrepreneur', 'token');
    const history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push('/anmeldung')
        } else if (!entrepreneur) {
            dispatch('entrepreneur/load')
        } else if (entrepreneur.email) {
            history.push('/meinespenden')
        } else {
            validateSlug(entrepreneur.slug)
        }
    }, [token, history, entrepreneur, dispatch])

    function isValid(data) {
        return Object.keys(data).filter((key) => !data[key] || data[key].length === 0).length === 0;
    }

    function setValue(name, value, valid = true) {
        const newData = {...form.data, [name]: (valid ? value: null)};
        setForm({valid: isValid(newData), data: newData});
    }

    function register(event) {
        event.preventDefault();
        const requestData = {
            id: entrepreneur.id,
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.mail,
            slug: form.data.slug
        }
        dispatch('entrepreneur/update', requestData)
    }

    function validateSlug(slug) {
        if (slug === entrepreneur.slug) {
            const newData = {...form.data, slug};
            setForm({valid: isValid(newData), data: newData});
            return;
        }
        fetch('/api/entrepreneurs/public/slug/validate', {
            method: "POST", headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({slug: slug})
        }).then((response) => {
            if(response.status === 200) {
                const newData = {...form.data, slug};
                setForm({valid: isValid(newData), data: newData});
            } else {
                const newData = {...form.data, slug: null};
                setForm({valid: isValid(newData), data: newData});
            }
        });
        setValue('slug', slug);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {entrepreneur &&
                <div className={classes.paper}>
                    <Link href="/" variant="body2">
                        <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                    </Link>
                    <Typography component="h1" variant="h5">
                        Gib bitte deine Daten an
                </Typography>
                    <form className={classes.form} noValidate onSubmit={register}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField className={classes.disabled}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    name="company"
                                    label="Unternehmen"
                                    type="company"
                                    id="company"
                                    value={entrepreneur.company}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.disabled}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    name="address"
                                    label="Addresse"
                                    type="address"
                                    id="address"
                                    value={entrepreneur.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField className={classes.disabled}
                                    autoComplete="zipCode"
                                    name="zipCode"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="zipCode"
                                    label="Postleitzahl"
                                    value={entrepreneur.zip}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField className={classes.disabled}
                                    autoComplete="city"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="city"
                                    label="Stadt"
                                    name="city"
                                    value={entrepreneur.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Vorname"
                                    autoComplete="given-name"
                                    onChange={(event) => setValue('firstName', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Nachname"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(event) => setValue('lastName', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(event) => setValue('mail', event.target.value, event.target.validity.valid)}
                                />
                            </Grid>
                            {t('signup.slug.description')}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="slug"
                                    label={t('signup.slug.label')}
                                    name="slug"
                                    error={form.invalidSlug}
                                    defaultValue={entrepreneur.slug}
                                    onChange={(event) => debouncedSlugValidation(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!form.valid}
                        >
                            {t('signup.button')}
                        </Button>
                    </form>
                </div>
            }
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
