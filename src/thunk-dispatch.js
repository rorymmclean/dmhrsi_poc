import { unwrapResult } from '@reduxjs/toolkit';
import { store } from 'index';

export const ThunkDispatch = thunkAPI => {
    return new Promise((resolve, reject) => {
        store
            .dispatch(thunkAPI)
            .then(unwrapResult)
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            });
    });
};
