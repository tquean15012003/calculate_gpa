import React from 'react'
import HomeFooter from './HomeFooter/HomeFooter';
import HomeHeader from './HomeHeader/HomeHeader';

export default function HomeTemplate(props) {

    const { Component } = props;

    return (
        <>
            <HomeHeader />
            <Component />
            <HomeFooter />
        </>
    )
}