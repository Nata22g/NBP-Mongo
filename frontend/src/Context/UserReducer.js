import { useCookies } from 'react-cookie';
import React, { useState } from 'react';

const UserReducer = (state, action) => {
    switch (action.tip) {

        case "LOGIN_SUCCESS":
            {
                return {
                    user: action.payload,
                    ucitavaSe: false,
                    error: null,
                }
            }
        case "UPDATE_USER":
            return {
                user: action.payload,
                ucitavaSe: false,
                error: null,
            };
        case "ODJAVI":
            {
                localStorage.clear()

                return {
                    user: null,
                    ucitavaSe: false,
                    error: null,
                };
            }
        case "LOGIN_START":
            {
                return {
                    user: null,
                    ucitavaSe: true,
                    error: null,
                };
            }
        case "LOGIN_FAIL":
            {
                return {
                    user: null,
                    ucitavaSe: false,
                    error: true,
                };
            }

        default:
            return state;
    }
};

export default UserReducer
