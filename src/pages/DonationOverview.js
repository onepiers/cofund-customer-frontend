import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory} from 'react-router-dom';
import {useStoreon} from 'storeon/react';
import Logo from "../assets/cofund.svg";

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function DonationOverview() {
    const {t} = useTranslation();
    const classes = useStyles();
    const {dispatch, entrepreneur, token, amount} = useStoreon('entrepreneur', 'token', 'amount');
    const history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push('/anmeldung')
        } else if (!entrepreneur) {
            dispatch('entrepreneur/load')
        } else if (!entrepreneur.email) {
            history.push('/signup')
        }
    }, [token, history, entrepreneur, dispatch])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link href="/" variant="body2">
                    <img src={Logo} style={{width: 128, height: 128}} alt="CoFund Logo" />
                </Link>
                <Typography component="h1" variant="h5">
                    Deine Gesamtsumme
                </Typography>
                <Typography component="h1" variant="h1" className={classes.paper}>
                    {amount.amount}€
                </Typography>
                <Typography component="h1" variant="h6">
                    von {amount.transactionQuantity} Spendern
                </Typography>
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {t('payout')}
            </Button>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
