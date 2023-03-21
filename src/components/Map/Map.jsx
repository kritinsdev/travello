import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography } from '@mui/material';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

export default function Map() {
    const coordinates = {lat: 0, lng: 0};
    
    return (
        <div>
            <GoogleMapReact
                bootstrapURLKeys={{key: ''}}
                defaultCenter={''}
            >

            </GoogleMapReact>
        </div>
    );
}