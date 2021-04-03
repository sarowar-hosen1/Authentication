import firebase from 'firebase/app';
import 'firebase/auth';
import { useState } from 'react';
import Config from '../Config/Config'
import {userInfo} from '../../Redux/actions/index';
import { useDispatch } from 'react-redux';

if (!firebase.apps.length) {
    firebase.initializeApp(Config);
} else {
    firebase.app()
}

export const Auth = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    //create user
    const createUser = (name, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: name,
                }).then(function () {
                    const {displayName, email, emailVerified} = result.user;
                    const signInUser =  {name: displayName, email, emailVerified}
                    dispatch(userInfo(signInUser))
                })
            })
            .catch((error) => {
                var errorMessage = error.message;
                setError(errorMessage)
            });

    }

    //Sign in with email and password
    const signInWithEmailPassword = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                const { displayName, email, emailVerified } = result.user;
                const signInUser = { name: displayName, email, emailVerified };
                dispatch(userInfo(signInUser))
            })
            .catch(err => {
                setError(err.message);
            })
    }

    //sign in with GoogleAuthProvider
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signInUser = { name: displayName, email, photo: photoURL };
                dispatch(userInfo(signInUser))
            }).catch((err) => {
                setError(err.message);
            })
    }

    //sign in with facebook
    const signInWithFb = (user) => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signInUser = { name: displayName, email, photo: photoURL };
                dispatch(userInfo(signInUser))
                window.location.reload();
            })
            .catch(error => {
                setError(error.message);
            })
    }


    return ({
        error,
        createUser,
        signInWithEmailPassword,
        signInWithGoogle,
        signInWithFb,
    })

}